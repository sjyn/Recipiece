import flask
from flask_classful import route

from Api import UserApi
from Routes.Helpers import BaseRoute


class UserRoute(BaseRoute.DeletableRoute):
    def __init__(self):
        super().__init__(UserApi.UserApi, checkOwner=False)

    @route('/', methods=['POST'])
    def createUser(self):
        username = flask.request.json['email']
        password = flask.request.json['password']
        UserApi.UserApi.create(username, password)
        sessionToken, userId = UserApi.UserApi.loginUser(username, password)
        data = {'token': sessionToken, 'id': userId}
        return self.makeResponse(data), 201

    @route('/login', methods=['POST'])
    def loginUser(self):
        username = flask.request.json['email']
        password = flask.request.json['password']
        sessionToken, userId = UserApi.UserApi.loginUser(username, password)
        data = {
            'token': sessionToken,
            'id': userId
        }
        return self.makeResponse(data), 200

    def _deleteEntity(self, entityId: str):
        pass
