from typing import Union


IdType = Union[int, str]


class Database:
    client = None

    @classmethod
    def create(cls, collection: str, entity: dict) -> dict:
        raise NotImplementedError()

    @classmethod
    def update(cls, collection: str, entityId: IdType, entity: dict) -> dict:
        raise NotImplementedError()

    @classmethod
    def delete(cls, collection: str, entityId: IdType):
        raise NotImplementedError()

    @classmethod
    def getById(cls, collection: str, entityId: IdType) -> dict:
        raise NotImplementedError()

    @classmethod
    def clear(cls):
        raise NotImplementedError()
