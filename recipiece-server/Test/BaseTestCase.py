import unittest

from Environment import TestEnv
from Environment.Environment import Environment

Environment.setEnv(TestEnv.TestEnv())


class BaseTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self._initDb()

    def _initDb(self):
        self.database = Environment.getDatabase()
        self.database.clear()
