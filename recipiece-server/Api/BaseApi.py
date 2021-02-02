from Database import Database


class BaseApi:
    _TABLE_NAME = None

    @classmethod
    def create(cls, entity: dict) -> dict:
        return Database.Database.create(cls._TABLE_NAME, entity)

    @classmethod
    def update(cls, entityId: int, updateDict: dict) -> dict:
        return Database.Database.update(cls._TABLE_NAME, entityId, updateDict)

    @classmethod
    def delete(cls, entityId: int):
        Database.Database.delete(cls._TABLE_NAME, entityId)

    @classmethod
    def getById(cls, entityId: int) -> dict:
        return Database.Database.getById(cls._TABLE_NAME, entityId)
