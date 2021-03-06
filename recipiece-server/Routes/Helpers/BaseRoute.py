import json
import urllib
from typing import Type, Union

import flask
from flask_classful import FlaskView, route

from Api import BaseApi
from Api.Exceptions import ApiExceptions
from Routes.AuthMiddleware import authorized


class BaseRoute(FlaskView):
    __apiType = Union[Type[BaseApi.BaseApi], Type[BaseApi.UserOwnedApi]]

    @property
    def userId(self) -> str:
        session = flask.request.environ.get('session')
        if session is not None:
            return session['owner']

        # return flask.request.environ.get('session', {'owner': None})['owner']

    def __init__(self, api: __apiType, requireAuth=True, checkOwner=True):
        self.api = api
        self.requireAuth = requireAuth
        self.checkOwner = checkOwner

    def _checkOwnership(self, ownedEntity: dict):
        if self.userId != ownedEntity['owner']:
            raise ApiExceptions.UnauthorizedException()

    def makeResponse(self, data: dict, currentPage=None, nextPage=None):
        response = {'data': data}
        if currentPage is not None:
            response['current'] = currentPage
        if nextPage is not None:
            response['next'] = nextPage
        return response


class GettableIdRoute(BaseRoute):
    @route('/<entityId>', methods=['GET'])
    def getById(self, entityId):
        if self.requireAuth:
            response = self.__getByIdAuth(entityId)
        else:
            response = self._getById(entityId)
        return self.makeResponse(response)

    @authorized
    def __getByIdAuth(self, entityId: str) -> dict:
        return self._getById(entityId)

    def _getById(self, entityId: str) -> dict:
        return self.api.getById(entityId)


class CreatableRoute(BaseRoute):
    @route('/', methods=['POST'])
    def createEntity(self):
        body = flask.request.json
        if self.requireAuth:
            response = self.__createEntityAuth(body)
        else:
            response = self._createEntity(body)
        return self.makeResponse(response), 201

    @authorized
    def __createEntityAuth(self, entityBody: dict) -> dict:
        return self._createEntity(entityBody)

    def _createEntity(self, entityBody: dict) -> dict:
        return self.api.create(entityBody, self.userId)


class UpdatableRoute(BaseRoute):
    @route('/<entityId>', methods=['PUT'])
    def updateEntity(self, entityId: str):
        body = flask.request.json
        if self.requireAuth:
            response = self.__updateEntityAuth(entityId, body)
        else:
            response = self._updateEntity(entityId, body)
        return self.makeResponse(response), 200

    @authorized
    def __updateEntityAuth(self, entityId: str, entityBody: dict) -> dict:
        return self._updateEntity(entityId, entityBody)

    def _updateEntity(self, entityId: str, entityBody: dict) -> dict:
        entity = self.api.getById(entityId)
        if self.checkOwner:
            self._checkOwnership(entity)
        return self.api.update(entityId, entityBody)


class DeletableRoute(BaseRoute):
    @route('/<entityId>', methods=['DELETE'])
    def deleteEntity(self, entityId: str):
        self._deleteEntity(entityId)
        return '', 204

    def _deleteEntity(self, entityId: str):
        if self.checkOwner:
            entity = self.api.getById(entityId)
            self._checkOwnership(entity)
        self.api.delete(entityId)

    @authorized
    def __deleteEntityAuth(self, entityId: str):
        return self._deleteEntity(entityId)


class ListableRoute(BaseRoute):
    @route('/list/<userId>', methods=['GET'])
    def listForUser(self, userId):
        requestedPage = int(flask.request.args.get('page', 0))

        queryDict = flask.request.args.get('query', None)
        if queryDict is not None:
            queryDict = json.loads(queryDict)
        if self.requireAuth:
            response = self.__listForUserAuth(userId, requestedPage, queryDict)
        else:
            response = self._listForUser(userId, requestedPage, queryDict)
        return self.makeResponse(response, currentPage=requestedPage, nextPage=requestedPage + 1)

    def _listForUser(self, userId: str, page: int, queryDict: dict = None) -> [dict]:
        return self.api.listForUser(userId, page, queryDict)

    @authorized
    def __listForUserAuth(self, userId: str, page: int, queryDict: dict = None) -> [dict]:
        return self._listForUser(userId, page, queryDict)
