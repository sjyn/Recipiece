import time

from Api import BaseApi
from Database import Models


class EquipmentApi(BaseApi.UserOwnedApi[Models.Equipment]):
    @classmethod
    def create(cls, entity: Models.Recipe, userId: str) -> Models.Recipe:
        entity['created'] = int(time.time())
        entity['owner'] = userId
        return super().create(entity, userId)
