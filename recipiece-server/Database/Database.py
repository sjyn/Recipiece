from typing import Any

import pymysql

from Environment import DevEnv


class Database:
    connection = pymysql.connect(
        host=DevEnv.DevEnv.DB_HOST,
        port=DevEnv.DevEnv.DB_PORT,
        user='recipiece',
        password=DevEnv.DevEnv.DB_PASSWORD,
        database=DevEnv.DevEnv.DB_NAME,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    @classmethod
    def create(cls, tableName: str, kvDict: dict) -> dict:
        insertedId = cls.createMany(tableName, [kvDict])
        return cls.getById(tableName, insertedId)

    @classmethod
    def createMany(cls, tableName: str, kvDicts: [dict]) -> int:
        # assume homogeneous
        firstDict = kvDicts[0]
        keys = '(' + ','.join([f'`{key}`' for key in firstDict.keys()]) + ')'

        valuesToFill = []
        valuesArray = []
        for kvDict in kvDicts:
            listedVals = list(kvDict.values())
            typedVals = ['%s'] * len(listedVals)
            values = '(' + ','.join(typedVals) + ')'
            valuesArray.append(values)
            valuesToFill.extend(listedVals)

        valuesStatement = ','.join(valuesArray)
        _STATEMENT = f'INSERT INTO `{tableName}` {keys} VALUES {valuesStatement}'
        with cls.runQuery(_STATEMENT, *valuesToFill) as cursor:
            insertedId = cursor.lastrowid
        cls.connection.commit()
        return insertedId

    @classmethod
    def update(cls, tableName: str, entityId: int, kvDict: dict) -> dict:
        colValList = []
        for key, _ in kvDict.items():
            colValList.append(f'{key} = %s')
        setStr = ', '.join(colValList)
        query = f"""UPDATE `{tableName}`
        SET {setStr}
        WHERE `id` = {entityId}
        """
        with cls.runQuery(query, *list(kvDict.values())) as cursor:
            updatedEntity = cursor.fetchone()
        cls.connection.commit()
        return updatedEntity

    @classmethod
    def delete(cls, tableName: str, entityId: int) -> bool:
        query = f"DELETE FROM `{tableName}` WHERE `id` = {entityId}"
        with cls.runQuery(query) as cursor:
            return cursor.rowcount > 0

    @classmethod
    def getById(cls, tableName: str, entityId: int) -> dict:
        query = f'SELECT * FROM `{tableName}` WHERE `id` = {entityId}'
        with cls.runQuery(query) as cursor:
            return cursor.fetchone()

    @classmethod
    def runQuery(cls, query: str, *queryArgs: [Any]):
        with cls.connection.cursor() as cursor:
            cursor.execute(query, args=queryArgs)
            return cursor

    @classmethod
    def _clearDatabase(cls):
        with cls.connection.cursor() as cursor:
            cursor.execute('DELETE FROM RecipeSteps')
            cursor.execute('DELETE FROM RecipeIngredients')
            cursor.execute('DELETE FROM Recipes')
            cursor.execute('DELETE FROM UserSessions')
            cursor.execute('DELETE FROM Users')
            cursor.execute('DELETE FROM RecipeBooks')
            cursor.execute('DELETE FROM BookRecipeLink')
        cls.connection.commit()
