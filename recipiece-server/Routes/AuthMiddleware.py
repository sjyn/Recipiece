import flask
from flask import Request

from Api import SessionApi
from Api.Exceptions import ApiExceptions


def authorized(func):
    def checkAuth():
        if flask.request.environ['session'] is None:
            raise ApiExceptions.UnauthorizedException
        else:
            return func()
    return checkAuth


class AuthMiddleware:
    app = None

    def __init__(self, app):
        self.app = app

# def __init__(self, app):
    #     self.app = app
    #
    # def __call__(self, environ, start_response):
    #     request = Request(environ)
    #     sessionToken = request.headers.get('authorization')
    #     if sessionToken is not None:
    #         session = SessionApi.SessionApi.validateSession(sessionToken)
    #         environ['session'] = session
    #     else:
    #         environ['session'] = None
    #     return self.app(environ, start_response)
