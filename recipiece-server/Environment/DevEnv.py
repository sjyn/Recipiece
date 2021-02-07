from Environment import BaseEnv


class DevEnv(BaseEnv.BaseEnv):
    DB_NAME = 'recipiece'
    DB_PASSWORD = 'test1234'
    DB_PORT = 27017
    DB_HOST = 'localhost'
    DB_USER = 'recipiece'
