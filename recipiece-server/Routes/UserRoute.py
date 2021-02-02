import flask
from flask import Blueprint

from Api import UserApi


users = Blueprint('users', __name__, url_prefix='/users')


@users.route('/', methods=['POST'])
def createUser():
    username = flask.request.json['email']
    password = flask.request.json['password']
    UserApi.UserApi.create(username, password)
    sessionToken, userId = UserApi.UserApi.loginUser(username, password)
    return {
        'token': sessionToken,
        'id': userId
    }, 201


@users.route('/login', methods=['POST'])
def loginUser():
    username = flask.request.json['email']
    password = flask.request.json['password']
    sessionToken, userId = UserApi.UserApi.loginUser(username, password)
    return {
        'token': sessionToken,
        'id': userId
    }, 200
