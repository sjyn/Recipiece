import json

from Database import DatabaseConstants
from Test import BaseRouteTest


class TestRecipeRoute(BaseRouteTest.BaseRouteTest):
    def _getRecipeJson(self, userId: str):
        return {
            'name': 'Test Recipe',
            'description': 'A really cool recipe that we can test with',
            'private': False,
            'owner': userId,
            'steps': [
                {'content': 'asdfqwer'},
                {'content': 'z' * 1000},
                {'content': 'uiop' * 1000}
            ],
            'ingredients': [
                {
                    'name': 'milk',
                    'amount': '1/2',
                    'unit': 'cup'
                },
                {
                    'name': 'egg',
                    'amount': '3'
                },
                {
                    'name': 'water',
                    'amount': '150',
                    'unit': 'ml'
                }
            ]
        }

    def test_CreateRecipe(self):
        token, userId = self.createUser()
        headers = {
            'Authorization': f'Bearer {token}'
        }
        response = self.post('/recipes/', self._getRecipeJson(userId), headers=headers)
        self.assertEqual(201, response.status_code)

    def test_CreateRecipeRequiresAuth(self):
        token, userId = self.createUser()
        # don't send any headers
        response = self.post('/recipes/', self._getRecipeJson(userId))
        self.assertEqual(401, response.status_code)

    def test_GetRecipeNotPrivate(self):
        pass

    def test_UpdateRecipeNotAllowedByOtherUser(self):
        token1, userId1 = self.createUser(email='asdf1@asdf.qwer')
        token2, userId2 = self.createUser(email='asdf2@asdf.qwer')
        originalRecipe = self._getRecipeJson(userId1)

        headers1 = {'Authorization': f'Bearer {token1}'}
        headers2 = {'Authorization': f'Bearer {token2}'}

        # create recipe for user 1
        response = self.post('/recipes/', originalRecipe, headers=headers1)
        self.assertEqual(201, response.status_code)
        createdRecipe = json.loads(response.data)['data']

        # try to update as user 2
        response = self.put(f'/recipes/{createdRecipe["_id"]}', createdRecipe, headers=headers2)
        self.assertEqual(401, response.status_code)

    def test_UpdateRecipe(self):
        token, userId = self.createUser()
        originalRecipe = self._getRecipeJson(userId)
        headers = {'Authorization': f'Bearer {token}'}

        createResponse = self.post('/recipes/', originalRecipe, headers=headers)
        self.assertEqual(201, createResponse.status_code)
        createdRecipe = json.loads(createResponse.data)['data']

        createdRecipe['name'] = 'New Name'
        createdRecipe['description'] = 'A new description'
        createdRecipe['steps'] = [{'content': 'new asdfqwer'}]
        createdRecipe['ingredients'] = [{
            'name': 'new milk',
            'amount': '1/4',
            'unit': 'gram'
        }]
        updatedResponse = self.put(f'/recipes/{createdRecipe["_id"]}', createdRecipe, headers=headers)
        self.assertEqual(200, updatedResponse.status_code)
        updatedRecipe = json.loads(updatedResponse.data)['data']
        self.assertEqual(createdRecipe['ingredients'], updatedRecipe['ingredients'])
        self.assertEqual(createdRecipe['steps'], updatedRecipe['steps'])
        self.assertEqual(createdRecipe['name'], updatedRecipe['name'])
        self.assertEqual(createdRecipe['description'], updatedRecipe['description'])
        self.assertEqual(createdRecipe['created'], updatedRecipe['created'])

    def test_GetRecipePrivateWithOwner(self):
        token, userId = self.createUser()
        recipe = self._getRecipeJson(userId)
        recipe['private'] = True
        createResp = self.post('/recipes/', recipe, headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(201, createResp.status_code)
        createdRecipe = json.loads(createResp.data)['data']

        fetchResponse = self.get(f'/recipes/{createdRecipe["_id"]}', headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(200, fetchResponse.status_code)
        fetchedRecipe = json.loads(fetchResponse.data)['data']
        self.assertEqual(createdRecipe, fetchedRecipe)

    def test_GetRecipePrivateWithDifferentOwnerFails(self):
        token1, userId1 = self.createUser(email='user1@asdf.qwer')
        token2, userId2 = self.createUser(email='user2@asdf.qwer')

        # create a private recipe for user1
        recipe = self._getRecipeJson(userId1)
        recipe['private'] = True
        createResp = self.post('/recipes/', recipe, headers={'Authorization': f'Bearer {token1}'})
        self.assertEqual(201, createResp.status_code)
        createdRecipe = json.loads(createResp.data)['data']

        # try to get the recipe as user2
        fetchResponse = self.get(f'/recipes/{createdRecipe["_id"]}', headers={'Authorization': f'Bearer {token2}'})
        self.assertEqual(401, fetchResponse.status_code)

    def test_GetRecipesForUserPaging(self):
        token, userId = self.createUser()
        headers = {'Authorization': f'Bearer {token}'}
        upper = (DatabaseConstants.PAGE_SIZE * 2) + 1
        for i in range(0, upper):
            recipe = self._getRecipeJson(userId)
            recipe['name'] = f'Test Recipe {i}'
            self.post('/recipes/', recipe, headers=headers)

        response = self.get(f'/recipes/list/{userId}?page=0', headers=headers)
        data = json.loads(response.data)
        firstPage = data['data']
        self.assertEqual(DatabaseConstants.PAGE_SIZE, len(firstPage))
        self.assertEqual(0, data['current'])
        self.assertEqual(1, data['next'])

        response = self.get(f'/recipes/list/{userId}?page=1', headers=headers)
        data = json.loads(response.data)
        secondPage = data['data']
        self.assertEqual(DatabaseConstants.PAGE_SIZE, len(secondPage))
        self.assertEqual(1, data['current'])
        self.assertEqual(2, data['next'])

        response = self.get(f'/recipes/list/{userId}?page=2', headers=headers)
        data = json.loads(response.data)
        thirdPage = data['data']
        self.assertEqual(1, len(thirdPage))
        self.assertEqual(2, data['current'])
        self.assertEqual(3, data['next'])
