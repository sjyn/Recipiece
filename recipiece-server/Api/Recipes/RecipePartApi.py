from collections import OrderedDict

from Api import BaseApi
from Database import Database


class RecipePartApi(BaseApi.BaseApi):
    @classmethod
    def clearForRecipe(cls, recipeId: int):
        query = f"DELETE FROM `{cls._TABLE_NAME}` WHERE `recipe` = {recipeId}"
        Database.Database.runQuery(query).close()

    @classmethod
    def fetchForRecipe(cls, recipeId: int) -> [dict]:
        query = f"SELECT * FROM `{cls._TABLE_NAME}` WHERE `recipe` = {recipeId}"
        with Database.Database.runQuery(query) as cursor:
            return cursor.fetchall()

    @classmethod
    def createForRecipe(cls, recipeId: int, entities: [dict]) -> [dict]:
        orderedDicts = []
        for entity in entities:
            entity['recipe'] = recipeId
            orderedDicts.append(OrderedDict(sorted(entity.items())))
        Database.Database.createMany(cls._TABLE_NAME, orderedDicts)
        return orderedDicts

    @classmethod
    def updateForRecipe(cls, recipeId: int, newEntities: [dict]) -> [dict]:
        cls.clearForRecipe(recipeId)
        for entity in newEntities:
            entity['recipe'] = recipeId
        return cls.createForRecipe(recipeId, newEntities)
