from Test import BaseRouteTest


class TestRecipeRoute(BaseRouteTest.BaseRouteTest):
    def _getRecipeJson(self, userId: str):
        return {
            'name': 'Test Recipe',
            'description': 'A really cool recipe that we can test with',
            'private': 0,
            'owner': int(userId),
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

    def test_CreateRecipe(self):
        token, userId = self.createUser()
        headers = {
            'Authorization': f'Bearer {token}'
        }
        response = self.post('/recipes/', self._getRecipeJson(userId), headers=headers)
        self.assertEqual(201, response.status_code)

    def test_GetRecipeNotPrivate(self):
        pass

    def test_GetRecipePrivateWithOwner(self):
        pass

    def test_GetRecipePrivateWithDifferentOwner(self):
        pass
