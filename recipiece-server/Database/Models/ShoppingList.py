from typing import TypedDict, List

from Database.Models import BaseModel


class ShoppingListItem(TypedDict, total=False):
    id: str
    name: str
    notes: str
    category: str
    ordinal: int
    completed: bool


class ShoppingList(BaseModel.UserOwnedModel, total=False):
    name: str
    items: List[ShoppingListItem]
