from typing import TypedDict, List, Optional

from Database.Models import BaseModel


class ShoppingListItem(TypedDict, total=False):
    id: str
    name: str
    notes: str
    category: str
    ordinal: int
    completed: bool
    recipe: Optional[str]


class ShoppingList(BaseModel.UserOwnedModel, total=False):
    name: str
    listItems: List[ShoppingListItem]
