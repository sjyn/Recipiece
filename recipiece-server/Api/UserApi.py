import time

from Api import BaseApi, SessionApi
from Api.Exceptions import ApiExceptions
from Database import DatabaseConstants
from Util import Encryption


class UserApi(BaseApi.BaseApi):
    _TABLE_NAME = DatabaseConstants.USERS

    @classmethod
    def create(cls, username: str, password: str) -> dict:
        # expecting an email and password here, but we need to salt/hash the password
        passwordHash, salt, nonce = Encryption.encryptPassword(password)
        userDict = {
            'email': username,
            'password': passwordHash,
            'salt': salt,
            'nonce': nonce
        }
        return cls.database.create(cls._TABLE_NAME, userDict)

    @classmethod
    def loginUser(cls, username: str, password: str) -> (str, int):
        userLookup = cls._getByUsername(username)
        if userLookup is not None:
            expectedPassword = userLookup['password']
            expectedSalt = userLookup['salt']
            expectedNonce = userLookup['nonce']
            if Encryption.comparePasswords(expectedPassword, expectedNonce, expectedSalt, password):
                # generate a session for the user
                sessionDict = {
                    'owner': userLookup['_id'],
                    'created': time.time()
                }
                sessionDict = SessionApi.SessionApi.create(sessionDict)
                return SessionApi.SessionApi.serializeSession(sessionDict), userLookup['_id']
            else:
                raise ApiExceptions.ForbiddenException()
        else:
            raise ApiExceptions.NotFoundException()

    @classmethod
    def logoutUser(cls, sessionId: int):
        SessionApi.SessionApi.delete(sessionId)

    @classmethod
    def _getByUsername(cls, username: str) -> dict:
        found = cls.database.client[cls._TABLE_NAME].find_one({'email': username})
        if found is not None:
            found['_id'] = str(found['_id'])
        return found
