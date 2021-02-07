from Api import UserApi
from Api.Exceptions import ApiExceptions
from Test import BaseTestCase


class TestUserApi(BaseTestCase.BaseTestCase):
    _DEFAULT_PASS = 'test1234'
    _DEFAULT_EMAIL = 'test@asdf.qwer'

    def _createUser(self):
        email = self._DEFAULT_EMAIL
        password = self._DEFAULT_PASS
        createdUser = UserApi.UserApi.create(email, password)

        self.assertEqual(email, createdUser['email'])
        self.assertNotEqual(password, createdUser['password'])
        self.assertIsNotNone(createdUser.get('salt', None))
        self.assertIsNotNone(createdUser.get('_id', None))
        self.assertIsNotNone(createdUser.get('nonce', None))
        return createdUser

    def test_CreateUser(self):
        self._createUser()

    def test_LoginUserWithValidCredentials(self):
        createdUser = self._createUser()
        response = UserApi.UserApi.loginUser(createdUser['email'], self._DEFAULT_PASS)
        self.assertIsNotNone(response)

    def test_LoginFailsWithBadPassword(self):
        createdUser = self._createUser()
        with self.assertRaises(ApiExceptions.ForbiddenException):
            UserApi.UserApi.loginUser(createdUser['email'], 'nonsense')

    def test_LoginFailsWithBadUsername(self):
        self._createUser()
        with self.assertRaises(ApiExceptions.NotFoundException):
            UserApi.UserApi.loginUser('non@sense.com', self._DEFAULT_PASS)
