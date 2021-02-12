import flask
from flask_classful import route

from Api import UserApi
from Api.Exceptions import ApiExceptions
from Routes.AuthMiddleware import authorized
from Routes.Helpers import BaseRoute


class UserRoute(
    BaseRoute.DeletableRoute,
    BaseRoute.GettableIdRoute,
):
    def __init__(self):
        super().__init__(UserApi.UserApi, checkOwner=False)

    @route('/', methods=['POST'])
    def createUser(self):
        username = flask.request.json['email']
        password = flask.request.json['password']
        UserApi.UserApi.create(username, password)
        sessionToken, userId = UserApi.UserApi.loginUser(username, password)
        data = {'token': sessionToken, '_id': userId}
        return self.makeResponse(data), 201

    @route('/login', methods=['POST'])
    def loginUser(self):
        username = flask.request.json['email']
        password = flask.request.json['password']
        sessionToken, userId = UserApi.UserApi.loginUser(username, password)
        data = {
            'token': sessionToken,
            '_id': userId
        }
        return self.makeResponse(data), 200

    @route('/logout', methods=['POST'])
    @authorized
    def logoutUser(self):
        session = flask.request.environ['session']
        UserApi.UserApi.logoutUser(session)
        return '', 204

    @route('/logout-everywhere', methods=['POST'])
    @authorized
    def logoutUserEverywhere(self):
        session = flask.request.environ['session']
        UserApi.UserApi.logoutEverywhere(session)
        return '', 204

    @route('/<userId>/password-change', methods=['POST'])
    @authorized
    def changePassword(self, userId: str):
        oldPassword = flask.request.json.get('old')
        newPassword = flask.request.json.get('new')
        if self.userId != userId:
            raise ApiExceptions.ForbiddenException()
        UserApi.UserApi.changePasswordForUser(userId, oldPassword, newPassword)
        return '', 204

    def _deleteEntity(self, entityId: str):
        if self.userId != entityId:
            raise ApiExceptions.UnauthorizedException()
        # delete all the sessions for this user
        session = flask.request.environ['session']
        UserApi.UserApi.logoutEverywhere(session)
        # delete the user
        super()._deleteEntity(entityId)

    def _getById(self, entityId: str) -> dict:
        if self.userId != entityId:
            raise ApiExceptions.UnauthorizedException()
        entity = super()._getById(entityId)
        if entity is None:
            raise ApiExceptions.NotFoundException()
        del entity['salt']
        del entity['password']
        del entity['nonce']
        return entity
