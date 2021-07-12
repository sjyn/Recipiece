from Api import ShoppingListApi
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
