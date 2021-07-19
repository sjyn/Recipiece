import flask
from flask_classful import route

from Api import ShoppingListApi
from Api.Exceptions import ApiExceptions
from Routes.AuthMiddleware import authorized
from Routes.Helpers import BaseRoute


class ShoppingListRoute(
    BaseRoute.UpdatableRoute,
    BaseRoute.DeletableRoute,
    BaseRoute.CreatableRoute,
    BaseRoute.ListableRoute,
    BaseRoute.GettableIdRoute
):
    def __init__(self):
        super().__init__(ShoppingListApi.ShoppingListApi)

    @route('/share/<listId>', methods=['POST'])
    @authorized
    def generateSharingToken(self, listId: str):
        shoppingList = self._getById(listId)
        if shoppingList is None:
            raise ApiExceptions.NotFoundException()
        self._checkOwnership(shoppingList)
        emailAddress = flask.request.json['email']
        return self.makeResponse(ShoppingListApi.ShoppingListApi.generateShareableToken(
            shoppingList['_id'],
            emailAddress
        ))

    @route('/share/<listId>', methods=['DELETE'])
    @authorized
    def deleteSharingToken(self, listId: str):
        shoppingList = self._getById(listId)
        if shoppingList is None:
            raise ApiExceptions.NotFoundException()
        self._checkOwnership(shoppingList)
