from bson import ObjectId

from Database import Database
from Database.Database import IdType
from Environment.Environment import Environment


class MongoDatabase(Database.Database):
    mongoClient = None
    client = None

    @classmethod
    def create(cls, collection: str, entity: dict) -> dict:
        insertedId = cls.client[collection].insert_one(entity).inserted_id
        return cls.getById(collection, str(insertedId))

    @classmethod
    def update(cls, collection: str, entityId: IdType, entity: dict) -> dict:
        # sanitize the _id out
        del entity['_id']
        # sanitize the owner if it's there (we don't change it)
        owner = None
        if 'owner' in entity:
            owner = entity['owner']
            del entity['owner']
        newValues = {'$set': entity}
        cls.client[collection].update_one({'_id': ObjectId(entityId)}, newValues)
        entity['_id'] = entityId
        if owner is not None:
            entity['owner'] = owner
        return entity

    @classmethod
    def delete(cls, collection: str, entityId: IdType):
        cls.client[collection].delete_one({'_id': ObjectId(entityId)})

    @classmethod
    def getById(cls, collection: str, entityId: IdType) -> dict:
        entity = cls.client[collection].find_one({'_id': ObjectId(entityId)})
        if entity is not None:
            entity['_id'] = str(entity['_id'])
        return entity

    @classmethod
    def clear(cls):
        cls.mongoClient.drop_database(Environment.env.DB_NAME)
