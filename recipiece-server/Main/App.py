import flask
from flask import Flask
from flask_cors import CORS

from Api import SessionApi
from Api.Exceptions import ApiExceptions
from Routes import UserRoute, RecipeRoute, RecipeBookRoute
from Routes.Helpers import ResponseEncoder

app = Flask(__name__)
app.json_encoder = ResponseEncoder.ResponseEncoder
CORS(app)
UserRoute.UserRoute.register(app, route_base='/users/')
RecipeRoute.RecipeRoute.register(app, route_base='/recipes/')
RecipeBookRoute.RecipeBookRoute.register(app, route_base='/books/')


@app.before_request
def processAuth():
    sessionToken = flask.request.headers.get('authorization')
    if sessionToken is not None:
        sessionToken = sessionToken.replace('Bearer', '').strip()
        session = SessionApi.SessionApi.validateSession(sessionToken)
        flask.request.environ['session'] = session
    else:
        flask.request.environ['session'] = None


@app.errorhandler(ApiExceptions.BaseApiException)
def handleError(e: ApiExceptions.BaseApiException):
    return {
        'message': e.message
    }, e.errorCode


@app.route('/', methods=['GET'])
def hw():
    return 'Hello, World'
