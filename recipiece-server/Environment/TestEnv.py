from Environment import BaseEnv


class TestEnv(BaseEnv.BaseEnv):
    DB_NAME = 'recipiece'
    DB_PASSWORD = 'test1234'
    DB_PORT = 3307
    DB_HOST = 'localhost'
