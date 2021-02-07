from Api import UserApi, RecipeApi
from Database import DatabaseConstants
from Test import BaseTestCase


class TestRecipeApi(BaseTestCase.BaseTestCase):
    def _createRecipe(self) -> (dict, dict):
        user = UserApi.UserApi.create('test-recipes@asdf.qwer', 'asdfqwer')
        recipeBody = {
            'name': 'Test Recipe',
            'description': 'A really cool recipe that we can test with',
            'owner': user['_id'],
            'private': False,
            'steps': [
                {'content': 'asdfqwer', 'idx': 0},
                {'content': 'z' * 1000, 'idx': 1},
                {'content': 'uiop' * 1000, 'idx': 2}
            ],
            'ingredients': [
                {
                    'name': 'milk',
                    'amount': '1/2',
                    'unit': 'cup',
                    'idx': 0,
                },
                {
                    'name': 'egg',
                    'amount': '3',
                    'idx': 1,
                },
                {
                    'name': 'water',
                    'amount': '150',
                    'unit': 'ml',
                    'idx': 2,
                }
            ]
        }
        recipe = RecipeApi.RecipeApi.create(recipeBody)
        self.assertEqual('Test Recipe', recipe['name'])
        self.assertEqual('A really cool recipe that we can test with', recipe['description'])
        self.assertEqual(3, len(recipe['steps']))
        self.assertEqual(3, len(recipe['ingredients']))
        return user, recipe

    def test_CreateRecipe(self):
        self._createRecipe()

    def test_UpdateRecipe(self):
        _, recipe = self._createRecipe()
        recipe['name'] = 'A new name'
        recipe['ingredients'].append({
            'name': 'A new ingredient',
            'amount': '1.25',
            'unit': 'T',
            'idx': 4,
        })
        recipe['steps'] = recipe['steps'][0:2]
        updatedRecipe = RecipeApi.RecipeApi.update(recipe['_id'], recipe)
        self.assertEqual(4, len(updatedRecipe['ingredients']))
        self.assertEqual(2, len(updatedRecipe['steps']))
        self.assertIsNotNone(updatedRecipe.get('_id', None))
        self.assertEqual(recipe['name'], updatedRecipe['name'])

    def test_GetRecipe(self):
        _, recipe = self._createRecipe()
        fetchedRecipe = RecipeApi.RecipeApi.getById(recipe['_id'])
        self.assertEqual('Test Recipe', fetchedRecipe['name'])
        self.assertEqual('A really cool recipe that we can test with', fetchedRecipe['description'])
        self.assertEqual(3, len(fetchedRecipe['steps']))
        self.assertEqual(3, len(fetchedRecipe['ingredients']))

    def test_GetForUser(self):
        user = UserApi.UserApi.create('getForUser@asdf.qwer', 'asdfqwer')
        maxLim = int(DatabaseConstants.PAGE_SIZE + (DatabaseConstants.PAGE_SIZE / 2))
        for i in range(0, maxLim):
            RecipeApi.RecipeApi.create({
                'name': f'Test Recipe {i}',
                'description': f'Test Des {i}',
                'owner': user['_id'],
                'private': False,
                'ingredients': [{
                    'name': f'ing {i}',
                    'amount': '100',
                    'unit': 'grams',
                    'idx': 0
                }],
                'steps': [{
                    'content': 'asdf' * 20,
                    'idx': 0
                }]
            })

        firstPage = RecipeApi.RecipeApi.listForUser(user['_id'], 0, True)
        self.assertEqual(DatabaseConstants.PAGE_SIZE, len(firstPage))

        secondPage = RecipeApi.RecipeApi.listForUser(user['_id'], 1, True)
        self.assertEqual(DatabaseConstants.PAGE_SIZE / 2, len(secondPage))

    def test_GetForUserWithPrivateRecipes(self):
        user = UserApi.UserApi.create('getForUser@asdf.qwer', 'asdfqwer')
        for i in range(0, DatabaseConstants.PAGE_SIZE):
            RecipeApi.RecipeApi.create({
                'name': f'Test Recipe {i}',
                'description': f'Test Des {i}',
                'owner': user['_id'],
                'private': i % 2 == 0,
                'ingredients': [{
                    'name': f'ing {i}',
                    'amount': '100',
                    'unit': 'grams',
                    'idx': 0
                }],
                'steps': [{
                    'content': 'asdf' * 20,
                    'idx': 0
                }]
            })
        firstPage = RecipeApi.RecipeApi.listForUser(user['_id'], 0, allowPrivate=False)
        self.assertEqual(int(DatabaseConstants.PAGE_SIZE / 2), len(firstPage))
