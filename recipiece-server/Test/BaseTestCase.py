import unittest

import pymysql

from Database.Database import Database
from Environment import TestEnv


class BaseTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self._initDb()

    def _initDb(self):
        Database.connection = pymysql.connect(
            host=TestEnv.TestEnv.DB_HOST,
            port=TestEnv.TestEnv.DB_PORT,
            user='recipiece',
            password=TestEnv.TestEnv.DB_PASSWORD,
            database=TestEnv.TestEnv.DB_NAME,
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
        Database._clearDatabase()
