from typing import Optional, List, TypedDict

from Database.Models import BaseModel


class RecipeStepLength(TypedDict):
    time: int
    unit: str


class RecipeStep(TypedDict):
    content: str
    length: RecipeStepLength


class RecipeIngredient(TypedDict, total=False):
    name: str
    amount: str
    unit: Optional[str]


class RecipeAdvancedOptions(TypedDict, total=False):
    highAltitude: Optional[bool]
    altitude: Optional[int]


class Recipe(BaseModel.UserOwnedModel, total=False):
    name: str
    description: str
    private: bool
    steps: List[RecipeStep]
    ingredients: List[RecipeIngredient]
    links: Optional[List[str]]
    advanced: Optional[RecipeAdvancedOptions]
    tags: List[str]
