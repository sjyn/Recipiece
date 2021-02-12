import time

from bson import ObjectId

from Api import BaseApi
from Database import DatabaseConstants, Models


class RecipeBookApi(BaseApi.UserOwnedApi[Models.RecipeBook]):
    _TABLE_NAME = DatabaseConstants.RECIPE_BOOKS

    @classmethod
    def create(cls, entity: Models.RecipeBook, userId: str) -> Models.RecipeBook:
        entity['created'] = int(time.time())
        entity['owner'] = userId
        return super().create(entity, userId)

    @classmethod
    def loadRecipesForBook(cls, bookId: str, page: int) -> [Models.Recipe]:
        recipeBook = cls.getById(bookId)
        objIds = [ObjectId(entityId) for entityId in recipeBook.get('recipes')]
        skipped = DatabaseConstants.PAGE_SIZE * page
        cursor = cls.database.client[DatabaseConstants.RECIPES].find(
            filter={'_id': {'$in': objIds}},
            skip=skipped,
            limit=DatabaseConstants.PAGE_SIZE
        ).sort('created')
        return list(cursor)

