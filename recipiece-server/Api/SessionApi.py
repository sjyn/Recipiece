import base64

from Api import BaseApi
from Api.Exceptions import ApiExceptions
from Database import DatabaseConstants, Models


class SessionApi(BaseApi.BaseApi[Models.Session]):
    _TABLE_NAME = DatabaseConstants.USER_SESSIONS

    @classmethod
    def validateSession(cls, serializedSession: str) -> Models.Session:
        deserialized = cls.deserializeSession(serializedSession)
        # @TODO -- eventually implement timeout
        try:
            session = cls.getById(deserialized['_id'])
        except:
            raise ApiExceptions.UnauthorizedException()
        if session is not None:
            return session
        else:
            raise ApiExceptions.UnauthorizedException()

    @classmethod
    def deserializeSession(cls, token: str) -> Models.Session:
        decodedSession = base64.b64decode(token.encode('utf-8')).decode('utf-8')
        parts = decodedSession.split('.')
        return {
            '_id': parts[0],
            'owner': parts[1],
            'created': int(parts[2])
        }

    @classmethod
    def serializeSession(cls, sessionDict: Models.Session) -> str:
        utcCreated = int(sessionDict['created'])
        valToEncode = f"{sessionDict['_id']}.{sessionDict['owner']}.{utcCreated}".encode('utf-8')
        return base64.b64encode(valToEncode).decode('utf-8')
