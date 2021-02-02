from Api.Recipes import RecipePartApi
from Database import DatabaseConstants


class StepsApi(RecipePartApi.RecipePartApi):
    _TABLE_NAME = DatabaseConstants.RECIPE_STEPS
