from typing import TypeVar, Generic, TypedDict, Type, Optional

from pymongo.cursor import Cursor

from Database import DatabaseConstants, MongoDatabase
from Database.Database import IdType
from Environment.Environment import Environment
from Util.ClassProperty import classproperty

T = TypeVar('T', dict, TypedDict)


class BaseApi(Generic[T]):
    _TABLE_NAME = None

    # noinspection PyMethodParameters
    @classproperty
    def database(cls) -> Optional[Type[MongoDatabase.MongoDatabase]]:
        return Environment.getDatabase()

    @classmethod
    def create(cls, entity: T, userId: str) -> T:
        return cls.database.create(cls._TABLE_NAME, entity)

    @classmethod
    def update(cls, entityId: IdType, updateDict: T) -> T:
        return cls.database.update(cls._TABLE_NAME, entityId, updateDict)

    @classmethod
    def delete(cls, entityId: IdType):
        cls.database.delete(cls._TABLE_NAME, entityId)

    @classmethod
    def getById(cls, entityId: IdType) -> T:
        return cls.database.getById(cls._TABLE_NAME, entityId)

    @classmethod
    def _sanitizeEntity(cls, entity: T) -> T:
        # do any processing here to make this clean for a response
        entity['_id'] = str(entity['_id'])
        return entity


class UserOwnedApi(BaseApi[T]):
    @classmethod
    def listForUser(cls, userId: IdType, page: int) -> [T]:
        query = {'owner': userId}
        numToSkip = page * DatabaseConstants.PAGE_SIZE
        cursor: Cursor = cls.database.client[cls._TABLE_NAME].find(
            filter=query,
            skip=numToSkip,
            limit=DatabaseConstants.PAGE_SIZE
        )
        return list(cursor)
