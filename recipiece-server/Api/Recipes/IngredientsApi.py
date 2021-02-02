from Api.Recipes import RecipePartApi
from Database import DatabaseConstants


class IngredientsApi(RecipePartApi.RecipePartApi):
    _TABLE_NAME = DatabaseConstants.RECIPE_INGREDIENTS

    @classmethod
    def createForRecipe(cls, recipeId: int, entities: [dict]) -> [dict]:
        for entity in entities:
            entity['unit'] = entity.get('unit', None)
        return super().createForRecipe(recipeId, entities)
