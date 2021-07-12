import time

from bson import ObjectId

from Api import UserApi, SessionApi, RecipeApi, RecipeBookApi
from Api.Exceptions import ApiExceptions
from Database import Models, DatabaseConstants
from Test import BaseTestCase


class TestUserApi(BaseTestCase.BaseTestCase):
    _DEFAULT_PASS = 'test1234'
    _DEFAULT_EMAIL = 'test@asdf.qwer'

    def _createUser(self) -> Models.User:
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

    def test_LogoutUser(self):
        user = self._createUser()
        session1 = SessionApi.SessionApi.create({
            'owner': user['_id'],
            'created': int(time.time())
        }, user['_id'])
        session2 = SessionApi.SessionApi.create({
            'owner': user['_id'],
            'created': int(time.time())
        }, user['_id'])

        UserApi.UserApi.logoutUser(session1)
        # expect the first session to be not found
        fetchedSession = SessionApi.SessionApi.getById(session1['_id'])
        self.assertIsNone(fetchedSession)
        fetchedSession = SessionApi.SessionApi.getById(session2['_id'])
        self.assertIsNotNone(fetchedSession)

    def test_LogoutEverywhere(self):
        user = self._createUser()
        # create a bunch of sessions for the user
        sessions = []
        for _ in range(0, 20):
            sessions.append(SessionApi.SessionApi.create({
                'created': int(time.time()),
                'owner': user['_id']
            }, user['_id']))
        # logout everywhere using the first session
        UserApi.UserApi.logoutEverywhere(sessions[0])
        # try to fetch the sessions - we shouldn't find any
        sessions = self.database.client[DatabaseConstants.USER_SESSIONS].find({'_id': ObjectId(user['_id'])})
        sessions = list(sessions)
        self.assertEquals(0, len(sessions))

    def test_changePassword(self):
        initialUser = self._createUser()
        # create a session for the user
        UserApi.UserApi.loginUser(initialUser['email'], self._DEFAULT_PASS)
        newPass = f'{self._DEFAULT_PASS}1!'
        UserApi.UserApi.changePasswordForUser(initialUser['_id'], self._DEFAULT_PASS, newPass)

        fetchedUser = UserApi.UserApi.getById(initialUser['_id'])
        self.assertEqual(initialUser['salt'], fetchedUser['salt'])
        self.assertEqual(initialUser['nonce'], fetchedUser['nonce'])
        self.assertNotEqual(initialUser['password'], fetchedUser['password'])

    def test_DeleteUser(self):
        user = self._createUser()
        createdId = user['_id']

        sessions = []
        recipes = []
        books = []
        for i in range(0, 20):
            sessions.append(SessionApi.SessionApi.create({
                'created': int(time.time()),
                'owner': user['_id']
            }, user['_id']))
            recipes.append(RecipeApi.RecipeApi.create(Models.Recipe(
                name=f'Recipe {i}',
                description=f'Recipe number {i}',
                ingredients=[],
                steps=[],
                links=[],
                private=False,
                owner=createdId
            ), createdId))
            books.append(RecipeBookApi.RecipeBookApi.create(Models.RecipeBook(recipes=[]), createdId))

        # delete the user
        thread = UserApi.UserApi.delete(createdId)
        thread.join()

        # try to get the user -- it shouldn't be there
        fetchedUser = UserApi.UserApi.getById(createdId)
        self.assertIsNone(fetchedUser)

        def assertEntitiesDeleted(entities, api):
            eIds = [e['_id'] for e in entities]
            for eId in eIds:
                self.assertIsNone(api.getById(eId))

        assertEntitiesDeleted(sessions, SessionApi.SessionApi)
        assertEntitiesDeleted(recipes, RecipeApi.RecipeApi)
        assertEntitiesDeleted(books, RecipeBookApi.RecipeBookApi)
