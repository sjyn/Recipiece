import flask
from flask import Blueprint

from Api.Recipes import RecipeApi
from Api.Exceptions import ApiExceptions
from Routes.AuthMiddleware import authorized


# class RecipeRoute:
recipes = Blueprint('recipes', __name__, url_prefix='/recipes')


def _checkOwnership(recipe):
    requestingUser = flask.request.environ.get('session')['owner']
    if requestingUser == recipe['owner']:
        return recipe
    raise ApiExceptions.UnauthorizedException


@authorized
@recipes.route('/', methods=['POST'])
def createRecipe():
    return RecipeApi.RecipeApi.create(flask.request.json), 201


@authorized
@recipes.route('/<int:recipeId>', methods=['PUT'])
def updateRecipe(recipeId):
    recipe = RecipeApi.RecipeApi.getById(recipeId)
    recipe = _checkOwnership(recipe)
    recipe = RecipeApi.RecipeApi.update(recipeId, recipe)
    return recipe


@authorized
@recipes.route('/<int:recipeId>', methods=['DELETE'])
def deleteRecipe(recipeId):
    recipe = RecipeApi.RecipeApi.getById(recipeId)
    RecipeApi.RecipeApi.delete(_checkOwnership(recipe))
    return '', 204


@authorized
@recipes.route('/<int:recipeId>', methods=['GET'])
def getRecipeById(recipeId):
    recipe = RecipeApi.RecipeApi.getById(recipeId)
    if recipe is None:
        raise ApiExceptions.NotFoundException
    requestingUser = flask.request.environ.get('session')['owner']
    if not recipe['private'] or requestingUser == recipe['owner']:
        return recipe
    raise ApiExceptions.UnauthorizedException


@authorized
@recipes.route('/list/<int:userId>', methods=['GET'])
def listForUser(userId):
    page = int(flask.request.args.get('page', 1))
    requestingUser = flask.request.environ.get('session')['owner']
    allowPrivate = requestingUser == userId
    results, nextOffset = RecipeApi.RecipeApi.listForUser(userId, page - 1, allowPrivate)
    return {
        'data': results,
        'next': nextOffset
    }
