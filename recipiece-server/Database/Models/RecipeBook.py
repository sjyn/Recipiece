from typing import List

from Database.Models import BaseModel


class RecipeBook(BaseModel.UserOwnedModel, total=False):
    recipes: List[str]
