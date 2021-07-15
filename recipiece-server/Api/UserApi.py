import base64
import time
from threading import Thread

from pymongo.collection import Collection

from Api import BaseApi, SessionApi, ShoppingListApi
from Api.Exceptions import ApiExceptions
from Api.Tasks import TaskRunner, UserTasks
from Database import DatabaseConstants, Models
from Database.Models import ShoppingList
from Util import Encryption


class UserApi(BaseApi.BaseApi[Models.User]):
    _TABLE_NAME = DatabaseConstants.USERS

    @classmethod
    def changePasswordForUser(cls, userId: str, oldPassword: str, newPassword: str):
        user = cls.getById(userId)
        if user is None:
            raise ApiExceptions.NotFoundException()
        # verify the old password
        expectedPassword = user['password']
        expectedSalt = user['salt']
        expectedNonce = user['nonce']
        if Encryption.comparePasswords(expectedPassword, expectedNonce, expectedSalt, oldPassword):
            decodedSalt = base64.b64decode(expectedSalt)
            decodedNonce = base64.b64decode(expectedNonce)
            passwordHash, _, _ = Encryption.encryptPassword(newPassword, decodedSalt, decodedNonce)
            user['password'] = passwordHash
            cls.update(userId, user)
        else:
            raise ApiExceptions.ForbiddenException()

    @classmethod
    def create(cls, username: str, password: str) -> Models.User:
        # expecting an email and password here, but we need to salt/hash the password
        passwordHash, salt, nonce = Encryption.encryptPassword(password)
        userDict = Models.User(
            email=username,
            password=passwordHash,
            salt=salt,
            nonce=nonce,
            created=int(time.time()),
            preferences={},
        )
        createdUser = cls.database.create(cls._TABLE_NAME, userDict)
        cls._createDefaultShoppingList(createdUser['_id'])
        return createdUser

    @classmethod
    def delete(cls, entityId: str) -> Thread:
        thread = TaskRunner.TaskRunner.runTask(UserTasks.UserTasks.deleteUserEntities, entityId)
        super().delete(entityId)
        return thread

    @classmethod
    def loginUser(cls, username: str, password: str) -> (str, int):
        userLookup = cls._getByUsername(username)
        if userLookup is not None:
            expectedPassword = userLookup['password']
            expectedSalt = userLookup['salt']
            expectedNonce = userLookup['nonce']
            if Encryption.comparePasswords(expectedPassword, expectedNonce, expectedSalt, password):
                # generate a session for the user
                sessionDict = Models.Session(
                    owner=userLookup['_id'],
                    created=int(time.time())
                )
                sessionDict = SessionApi.SessionApi.create(sessionDict, userLookup['_id'])
                return SessionApi.SessionApi.serializeSession(sessionDict), userLookup['_id']
            else:
                raise ApiExceptions.ForbiddenException()
        else:
            raise ApiExceptions.NotFoundException()

    @classmethod
    def logoutUser(cls, token: Models.Session):
        SessionApi.SessionApi.delete(token['_id'])

    @classmethod
    def logoutEverywhere(cls, token: Models.Session):
        sessionCollection: Collection = cls.database.client[DatabaseConstants.USER_SESSIONS]
        sessionCollection.delete_many({'owner': token['owner']})

    @classmethod
    def _getByUsername(cls, username: str) -> Models.User:
        found = cls.database.client[cls._TABLE_NAME].find_one({'email': username})
        if found is not None:
            found['_id'] = str(found['_id'])
        return found

    @classmethod
    def _createDefaultShoppingList(cls, userId: str):
        defaultList = ShoppingList(name='Groceries', listItems=[], owner=userId)
        ShoppingListApi.ShoppingListApi.create(defaultList, userId)
