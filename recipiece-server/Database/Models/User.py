from Database.Models import BaseModel


class User(BaseModel.BaseModel):
    email: str
    password: bytes
    salt: bytes
    nonce: bytes
    preferences: dict
    created: int
