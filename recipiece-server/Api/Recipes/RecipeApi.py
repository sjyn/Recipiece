from typing import Optional

from Api import BaseApi
from Api.Recipes import IngredientsApi, StepsApi
from Database import DatabaseConstants, Database


class RecipeApi(BaseApi.BaseApi):
    _TABLE_NAME = DatabaseConstants.RECIPES

    @classmethod
    def create(cls, entity: dict) -> dict:
        ingredients = entity['ingredients']
        steps = entity['steps']
        entityToSave = entity.copy()
        del entityToSave['ingredients']
        del entityToSave['steps']
        recipe = super().create(entityToSave)
        recipe['ingredients'] = IngredientsApi.IngredientsApi.createForRecipe(recipe['id'], ingredients)
        recipe['steps'] = StepsApi.StepsApi.createForRecipe(recipe['id'], steps)
        return recipe

    @classmethod
    def getById(cls, entityId: int) -> Optional[dict]:
        recipeEntity = super().getById(entityId)
        if recipeEntity is None:
            return None
        recipeEntity['ingredients'] = IngredientsApi.IngredientsApi.fetchForRecipe(entityId)
        recipeEntity['steps'] = StepsApi.StepsApi.fetchForRecipe(entityId)
        return recipeEntity

    @classmethod
    def update(cls, entityId: int, updateDict: dict) -> dict:
        entityToUpdate = updateDict.copy()
        ingredients = updateDict['ingredients']
        steps = updateDict['steps']
        del entityToUpdate['ingredients']
        del entityToUpdate['steps']
        del entityToUpdate['id']
        updateDict['ingredients'] = IngredientsApi.IngredientsApi.updateForRecipe(entityId, ingredients)
        updateDict['steps'] = StepsApi.StepsApi.updateForRecipe(entityId, steps)
        super().update(entityId, entityToUpdate)
        return updateDict

    @classmethod
    def listForUser(cls, userId: int, offset: int, allowPrivate: bool) -> ([dict], int):
        if allowPrivate:
            whereClause = f'WHERE `owner` = {userId}'
        else:
            whereClause = f'WHERE `owner` = {userId} AND `private` != 1'
        rowsToSkip = offset * DatabaseConstants.PAGE_SIZE
        query = f"""SELECT * FROM `{cls._TABLE_NAME}` 
                {whereClause} 
                ORDER BY `created`
                LIMIT {DatabaseConstants.PAGE_SIZE} OFFSET {rowsToSkip}"""
        with Database.Database.runQuery(query) as cursor:
            return cursor.fetchall(), offset + 1
