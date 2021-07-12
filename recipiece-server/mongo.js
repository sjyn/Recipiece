conn = new Mongo();
db = conn.getDB("recipiece");

// collections
db.createCollection('Users');
db.createCollection('Recipes');
db.createCollection('RecipeBooks');
db.createCollection('UserSessions');
db.createCollection('StagedUsers');

// user indices
db.Users.createIndex({'email': 1}, {unique: true});

// recipe indices
db.Recipes.createIndex({'name': 1});
db.Recipes.createIndex({'owner': 1});
db.Recipes.createIndex({'created': 1});

// recipe book indices
db.RecipeBooks.createIndex({'owner': 1})
db.RecipeBooks.createIndex({'created': 1})
db.RecipeBooks.createIndex({'name': 1})

// staged user indices
db.StagedUsers.createIndex({'email': 1}, {unique: true});
db.StagedUsers.createIndex({'token': 1}, {unique: true});
