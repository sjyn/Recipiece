from typing import TypedDict, Union, Optional

from bson import ObjectId


class BaseModel(TypedDict, total=False):
    _id: Union[str, ObjectId]
    created: Optional[int]


class UserOwnedModel(BaseModel):
    owner: str
