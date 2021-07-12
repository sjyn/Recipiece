import json

from Test import BaseRouteTest


class TestUserRoute(BaseRouteTest.BaseRouteTest):
    def _createUser(self):
        body = {
            'email': 'test1@asdf.qwer',
            'password': 'asdfqwer'
        }
        response = self.post('/users', body)
        self.assertEqual(201, response.status_code)
        responseDict = json.loads(response.data)['data']
        self.assertIsNotNone(responseDict.get('token', None))
        self.assertIsNotNone(responseDict.get('_id', None))
        return responseDict

    def test_CreateUser(self):
        self._createUser()

    def test_LoginUser(self):
        # create the user
        body = {
            'email': 'test1@asdf.qwer',
            'password': 'asdfqwer'
        }
        response = self.post('/users', body)
        self.assertEqual(201, response.status_code)

        # log in the user
        response = self.post('/users/login', body)
        self.assertEqual(200, response.status_code)
        responseDict = json.loads(response.data)['data']
        self.assertIsNotNone(responseDict.get('token', None))
        self.assertIsNotNone(responseDict.get('_id', None))

    def test_LogoutUser(self):
        pass

    def test_LogoutUserFailsWithBadTokens(self):
        pass

    def test_LogoutEverywhere(self):
        pass

    def test_LogoutEverywhereWithBadTokens(self):
        pass

    def test_DeleteUser(self):
        pass

    def test_DeleteUserFailsWithBadTokens(self):
        pass
