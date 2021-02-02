import json

from Test import BaseRouteTest


class TestUserRoute(BaseRouteTest.BaseRouteTest):
    def test_CreateUser(self):
        body = {
            'email': 'test1@asdf.qwer',
            'password': 'asdfqwer'
        }
        response = self.post('/users', body)
        self.assertEqual(201, response.status_code)
        responseDict = json.loads(response.data)
        self.assertIsNotNone(responseDict.get('token', None))
        self.assertIsNotNone(responseDict.get('id', None))

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
        responseDict = json.loads(response.data)
        self.assertIsNotNone(responseDict.get('token', None))
        self.assertIsNotNone(responseDict.get('id', None))
