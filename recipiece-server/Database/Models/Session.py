from typing import Literal

from Database.Models import BaseModel


class Session(BaseModel.UserOwnedModel, total=False):
    sessionType: Literal['login', 'shopping_list']
