import json

from Test import BaseTestCase
from Server import app


class BaseRouteTest(BaseTestCase.BaseTestCase):
    client = None

    def setUp(self) -> None:
        super().setUp()
        app.config['TESTING'] = True
        self.client = app.test_client()

    def post(self, url: str, data: dict, headers=None):
        if headers is None:
            headers = {}
        headers['Content-Type'] = 'application/json'
        return self.client.post(url, json=data, headers=headers, follow_redirects=True)

    def put(self, url: str, data: dict, headers=None):
        if headers is None:
            headers = {}
        headers['content-type'] = 'application/json'
        return self.client.put(url, json=data, headers=headers, follow_redirects=True)

    def get(self, url: str, headers=None):
        if headers is None:
            headers = {}
        return self.client.get(url, headers=headers, follow_redirects=True)

    def delete(self, url: str, headers=None):
        if headers is None:
            headers = {}
        return self.client.delete(url, headers=headers, follow_redirects=True)

    def createUser(self) -> (str, str):
        testUser = {
            'email': 'test@asdf.qwer',
            'password': 'asdfqwer'
        }
        response = self.post('users/', testUser)
        responseJson = json.loads(response.data)
        return responseJson['token'], responseJson['id']
