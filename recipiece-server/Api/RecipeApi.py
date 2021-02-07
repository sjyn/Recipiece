import time

from pymongo.cursor import Cursor

from Api import BaseApi
from Database import DatabaseConstants
from Database.Database import IdType


class RecipeApi(BaseApi.UserOwnedApi):
    _TABLE_NAME = DatabaseConstants.RECIPES

    @classmethod
    def create(cls, entity: dict, userId: str) -> dict:
        entity['created'] = int(time.time())
        entity['owner'] = userId
        return super().create(entity, userId)

    @classmethod
    def listForUser(cls, userId: IdType, offset: int, allowPrivate: bool) -> [dict]:
        query = {'owner': userId}
        if not allowPrivate:
            query['private'] = False
        numToSkip = offset * DatabaseConstants.PAGE_SIZE
        cursor: Cursor = cls.database.client[cls._TABLE_NAME].find(
            filter=query,
            skip=numToSkip,
            limit=DatabaseConstants.PAGE_SIZE
        ).sort('created')
        return list(cursor)
