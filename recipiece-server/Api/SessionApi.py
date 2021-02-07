import base64

from Api import BaseApi
from Api.Exceptions import ApiExceptions
from Database import DatabaseConstants


class SessionApi(BaseApi.BaseApi):
    _TABLE_NAME = DatabaseConstants.USER_SESSIONS

    @classmethod
    def validateSession(cls, serializedSession: str) -> dict:
        decodedSession = base64.b64decode(serializedSession.encode('utf-8')).decode('utf-8')
        parts = decodedSession.split('.')
        # @TODO -- eventually implement timeout
        try:
            session = cls.getById(parts[0])
        except:
            raise ApiExceptions.UnauthorizedException()
        if session is not None:
            return session
        else:
            raise ApiExceptions.UnauthorizedException()

    @classmethod
    def serializeSession(cls, sessionDict: dict) -> str:
        utcCreated = int(sessionDict['created'])
        valToEncode = f"{sessionDict['_id']}.{sessionDict['owner']}.{utcCreated}".encode('utf-8')
        return base64.b64encode(valToEncode).decode('utf-8')
