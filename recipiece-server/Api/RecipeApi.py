import re
import time

from pymongo.cursor import Cursor

from Api import BaseApi
from Api.Exceptions import ApiExceptions
from Database import DatabaseConstants, Models
from Database.Database import IdType


class RecipeApi(BaseApi.UserOwnedApi[Models.Recipe]):
    _TABLE_NAME = DatabaseConstants.RECIPES

    @classmethod
    def create(cls, entity: Models.Recipe, userId: str) -> Models.Recipe:
        if len(entity.get('steps', [])) == 0 or len(entity.get('ingredients', [])) == 0:
            raise ApiExceptions.BadRequestException()
        entity['created'] = int(time.time())
        entity['owner'] = userId
        return super().create(entity, userId)

    @classmethod
    def listForUser(cls, userId: IdType, page: int, queryDict: dict, *args, **kwargs) -> [Models.Recipe]:
        query = {'owner': userId}
        allowPrivate = kwargs.get('allowPrivate', False)
        if not allowPrivate:
            query['private'] = False
        if queryDict is not None:
            nameFilter = queryDict.get('name', '').strip()
            if nameFilter != '':
                # run a case-insensitive match on the name
                query['name'] = {
                    '$regex': nameFilter,
                    '$options': 'i'
                }

            tagsFilter = queryDict.get('tags', [])
            if len(tagsFilter) > 0:
                query['tags'] = {
                    '$all': tagsFilter
                }
            print(query)
        numToSkip = page * DatabaseConstants.PAGE_SIZE
        cursor: Cursor = cls.database.client[cls._TABLE_NAME].find(
            filter=query,
            skip=numToSkip,
            limit=DatabaseConstants.PAGE_SIZE
        ).sort('created')
        return list(cursor)
