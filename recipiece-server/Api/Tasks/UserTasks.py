import logging

from Database import DatabaseConstants
from Environment.Environment import Environment


class UserTasks:
    @classmethod
    def deleteUserEntities(cls, userId: str):
        database = Environment.getDatabase()
        query = {'owner': userId}
        logging.info(f'Deleting Sessions for user {userId}')
        database.client[DatabaseConstants.USER_SESSIONS].delete_many(query)
        logging.info(f'Deleting Recipe Books for user {userId}')
        database.client[DatabaseConstants.RECIPE_BOOKS].delete_many(query)
        logging.info(f'Deleting Recipes for user {userId}')
        database.client[DatabaseConstants.RECIPES].delete_many(query)
