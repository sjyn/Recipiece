from Environment import BaseEnv


class DevEnv(BaseEnv.BaseEnv):
    DB_NAME = 'recipiece'
    DB_PASSWORD = 'test1234'
    DB_PORT = 3306
    DB_HOST = 'localhost'
