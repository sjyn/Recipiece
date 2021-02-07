from pymongo.cursor import Cursor

from Database import DatabaseConstants
from Database.Database import IdType
from Environment.Environment import Environment
from Util.ClassProperty import classproperty


class BaseApi:
    _TABLE_NAME = None

    # noinspection PyMethodParameters
    @classproperty
    def database(cls):
        return Environment.getDatabase()

    @classmethod
    def create(cls, entity: dict, userId: str) -> dict:
        return cls.database.create(cls._TABLE_NAME, entity)

    @classmethod
    def update(cls, entityId: IdType, updateDict: dict) -> dict:
        return cls.database.update(cls._TABLE_NAME, entityId, updateDict)

    @classmethod
    def delete(cls, entityId: IdType):
        cls.database.delete(cls._TABLE_NAME, entityId)

    @classmethod
    def getById(cls, entityId: IdType) -> dict:
        return cls.database.getById(cls._TABLE_NAME, entityId)

    @classmethod
    def _sanitizeEntity(cls, entity: dict) -> dict:
        # do any processing here to make this clean for a response
        entity['_id'] = str(entity['_id'])
        return entity


class UserOwnedApi(BaseApi):
    @classmethod
    def listForUser(cls, userId: IdType, page: int) -> [dict]:
        query = {'owner': userId}
        numToSkip = page * DatabaseConstants.PAGE_SIZE
        cursor: Cursor = cls.database.client[cls._TABLE_NAME].find(
            filter=query,
            skip=numToSkip,
            limit=DatabaseConstants.PAGE_SIZE
        )
        return list(cursor)
