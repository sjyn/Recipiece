from Database.Models import BaseModel


class Equipment(BaseModel.UserOwnedModel, total=False):
    name: str
