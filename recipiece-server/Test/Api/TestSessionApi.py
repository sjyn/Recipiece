import time

from Api import SessionApi, UserApi
from Api.Exceptions import ApiExceptions
from Test import BaseTestCase


class TestSessionApi(BaseTestCase.BaseTestCase):
    def test_ValidateSession(self):
        user = UserApi.UserApi.create('test-recipes@asdf.qwer', 'asdfqwer')
        sessionDict = {
            'owner': user['_id'],
            'created': time.time()
        }
        sessionDict = SessionApi.SessionApi.create(sessionDict, user['_id'])

        serialized = SessionApi.SessionApi.serializeSession(sessionDict)
        validated = SessionApi.SessionApi.validateSession(serialized)
        self.assertEqual(validated['owner'], user['_id'])

    def test_ValidateSessionFailsWithBadToken(self):
        user = UserApi.UserApi.create('test-recipes@asdf.qwer', 'asdfqwer')
        sessionDict = {
            'owner': user['_id'],
            'created': time.time()
        }
        sessionDict = SessionApi.SessionApi.create(sessionDict, user['_id'])
        serialized = SessionApi.SessionApi.serializeSession(sessionDict)

        serialized = 'a' + serialized[1:]

        with self.assertRaises(ApiExceptions.UnauthorizedException):
            SessionApi.SessionApi.validateSession(serialized)
