import flask
from flask import Flask
from flask_cors import CORS
from Api import SessionApi
from Api.Exceptions import ApiExceptions
from Routes import UserRoute, RecipeRoute

app = Flask(__name__)
CORS(app)
app.register_blueprint(UserRoute.users)
app.register_blueprint(RecipeRoute.recipes)


@app.before_request
def processAuth():
    sessionToken = flask.request.authorization
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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8080', debug=True)
