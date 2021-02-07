from bson import ObjectId

from Api import BaseApi
from Database import DatabaseConstants


class RecipeBookApi(BaseApi.UserOwnedApi):
    _TABLE_NAME = DatabaseConstants.RECIPE_BOOKS

    @classmethod
    def create(cls, entity: dict, userId: str) -> dict:
        entity['owner'] = userId
        return super().create(entity, userId)

    @classmethod
    def loadRecipesForBook(cls, bookId: str, page: int) -> [dict]:
        recipeBook = cls.getById(bookId)
        objIds = [ObjectId(entityId) for entityId in recipeBook.get('recipes')]
        skipped = DatabaseConstants.PAGE_SIZE * page
        cursor = cls.database.client[cls._TABLE_NAME].find(
            filter={'_id': {'$in': objIds}},
            skip=skipped,
            limit=DatabaseConstants.PAGE_SIZE
        ).sort('created')
        return list(cursor)

