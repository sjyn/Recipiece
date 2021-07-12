import Database.DatabaseConstants
from Api import BaseApi
from Database import Models


class ShoppingListApi(BaseApi.UserOwnedApi[Models.ShoppingList]):
    _TABLE_NAME = Database.DatabaseConstants.SHOPPING_LISTS
