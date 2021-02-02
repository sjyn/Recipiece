from Api import BaseApi, SessionApi
from Api.Exceptions import ApiExceptions
from Database import DatabaseConstants, Encryption
from Database.Database import Database


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
        return Database.create(cls._TABLE_NAME, userDict)

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
                    'owner': userLookup['id']
                }
                sessionDict = SessionApi.SessionApi.create(sessionDict)
                return SessionApi.SessionApi.serializeSession(sessionDict), userLookup['id']
            else:
                raise ApiExceptions.ForbiddenException()
        else:
            raise ApiExceptions.NotFoundException()

    @classmethod
    def logoutUser(cls, sessionId: int):
        SessionApi.SessionApi.delete(sessionId)

    @classmethod
    def _getByUsername(cls, username: str) -> dict:
        query = f'SELECT * FROM {cls._TABLE_NAME} WHERE `email` = "{username}"'
        with Database.runQuery(query) as cursor:
            return cursor.fetchone()
