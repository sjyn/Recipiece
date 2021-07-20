import flask
from flask_classful import route

from Api import RecipeApi
from Api.Exceptions import ApiExceptions
from Routes.AuthMiddleware import authorized
from Routes.Helpers import BaseRoute


class RecipeRoute(
    BaseRoute.UpdatableRoute,
    BaseRoute.DeletableRoute,
    BaseRoute.CreatableRoute,
    BaseRoute.ListableRoute
):
    def __init__(self):
        super().__init__(RecipeApi.RecipeApi)

    @route('/<entityId>', methods=['GET'])
    def getById(self, entityId: str):
        return self.makeResponse(self._getById(entityId))

    @route('/from-url', methods=['POST'])
    @authorized
    def parseFromUrl(self):
        recipeUrl = flask.request.json.get('url', None)
        if recipeUrl is None:
            raise ApiExceptions.BadRequestException()
        return self.makeResponse(RecipeApi.RecipeApi.generateFromUrl(recipeUrl, self.userId))

    def _getById(self, entityId: str) -> dict:
        recipe = self.api.getById(entityId)
        if recipe.get('private', False):
            self._checkOwnership(recipe)
        if recipe.get('advanced', None) is None:
            recipe['advanced'] = {}
        return recipe

    def _listForUser(self, userId: str, page: int, queryDict: dict = None) -> [dict]:
        allowPrivate = self.userId == userId
        return self.api.listForUser(userId, page, queryDict, allowPrivate=allowPrivate)
