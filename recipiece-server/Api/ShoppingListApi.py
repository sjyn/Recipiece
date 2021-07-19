import Database.DatabaseConstants
from Api import BaseApi, SessionApi
from Database import Models


class ShoppingListApi(BaseApi.UserOwnedApi[Models.ShoppingList]):
    _TABLE_NAME = Database.DatabaseConstants.SHOPPING_LISTS

    @classmethod
    def generateShareableToken(cls, shoppingList: Models.ShoppingList, emailAddress: str):
        newToken = Models.Session(
            sessionType='shopping_list',
            owner=shoppingList['owner']
        )
        newToken = SessionApi.SessionApi.create(newToken, newToken['owner'])
        return SessionApi.SessionApi.serializeSession(newToken)

    @classmethod
    def removeSharableToken(cls, listId: str, emailAddress: str):
        pass
