from functools import wraps

import flask

from Api.Exceptions import ApiExceptions


def authorized(func):
    @wraps(func)
    def checkAuth(*args, **kwargs):
        if flask.request.environ['session'] is None:
            raise ApiExceptions.UnauthorizedException
        else:
            return func(*args, **kwargs)
    return checkAuth
