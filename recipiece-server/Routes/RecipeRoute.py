from Api import RecipeApi
from Routes.Helpers import BaseRoute


class RecipeRoute(
    BaseRoute.GettableIdRoute,
    BaseRoute.UpdatableRoute,
    BaseRoute.DeletableRoute,
    BaseRoute.CreatableRoute,
    BaseRoute.ListableRoute
):
    def __init__(self):
        super().__init__(RecipeApi.RecipeApi)

    def _getById(self, entityId: str) -> dict:
        recipe = self.api.getById(entityId)
        if recipe.get('private', False):
            self._checkOwnership(recipe)
        return recipe

    def _listForUser(self, userId: str, page: int) -> [dict]:
        allowPrivate = self.userId == userId
        return self.api.listForUser(userId, page, allowPrivate)
