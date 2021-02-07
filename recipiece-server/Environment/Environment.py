from typing import Type, Optional

from pymongo import MongoClient

from Database.Database import Database
from Environment import BaseEnv


class Environment:
    env: BaseEnv.BaseEnv = None
    dbImported = False

    @classmethod
    def setEnv(cls, env: BaseEnv.BaseEnv):
        cls.env = env

    @classmethod
    def getDatabase(cls) -> Optional[Type[Database]]:
        if cls.env:
            from Database import MongoDatabase
            dbClass = MongoDatabase.MongoDatabase
            if not cls.dbImported:
                mongoClient = MongoClient(
                    host=Environment.env.DB_HOST,
                    port=Environment.env.DB_PORT,
                    password=Environment.env.DB_PASSWORD,
                    username=Environment.env.DB_USER
                )
                dbClass.mongoClient = mongoClient
                dbClass.client = mongoClient[Environment.env.DB_NAME]
                cls.dbImported = True
            return dbClass
        return None
