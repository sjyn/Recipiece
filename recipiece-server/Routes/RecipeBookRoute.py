import flask
from flask_classful import route

from Api import RecipeBookApi
from Routes.Helpers import BaseRoute


class RecipeBookRoute(
    BaseRoute.ListableRoute,
    BaseRoute.CreatableRoute,
    BaseRoute.UpdatableRoute,
    BaseRoute.DeletableRoute,
    BaseRoute.GettableIdRoute
):
    def __init__(self):
        super().__init__(RecipeBookApi.RecipeBookApi)

    @route('/<bookId>/list', methods=['GET'])
    def fetchRecipesForBook(self, bookId: str):
        page = int(flask.request.args.get('page', 0))
        data = RecipeBookApi.RecipeBookApi.loadRecipesForBook(bookId, page)
        return self.makeResponse(data, page, page + 1)
