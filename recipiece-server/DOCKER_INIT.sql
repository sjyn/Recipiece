CREATE TABLE IF NOT EXISTS Users (
    id INTEGER NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password BINARY(128) NOT NULL,
    salt BINARY(128) NOT NULL,
    nonce BINARY(128) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS UserSessions (
    id INTEGER NOT NULL AUTO_INCREMENT,
    owner INTEGER,
    created TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Recipes (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    owner INTEGER NOT NULL,
    private TINYINT(1),
    created TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    FOREIGN KEY(owner) REFERENCES Users(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS RecipeSubLink (
    id INTEGER NOT NULL AUTO_INCREMENT,
    parent INTEGER NOT NULL,
    child INTEGER NOT NULL,
    owner INTEGER NOT NULL,
    FOREIGN KEY(parent) REFERENCES Recipes(id),
    FOREIGN KEY(child) REFERENCES Recipes(id),
    FOREIGN KEY(owner) REFERENCES Users(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS RecipeSteps (
    id INTEGER NOT NULL AUTO_INCREMENT,
    content TEXT NOT NULL,
    recipe INTEGER NOT NULL,
    idx INTEGER NOT NULL,
    len INTEGER,
    FOREIGN KEY(recipe) REFERENCES Recipes(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS RecipeIngredients (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    amount VARCHAR(255) NOT NULL,
    unit VARCHAR(255),
    recipe INTEGER NOT NULL,
    idx INTEGER NOT NULL,
    FOREIGN KEY(recipe) REFERENCES Recipes(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS RecipeBooks (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    owner INTEGER,
    FOREIGN KEY(owner) REFERENCES Users(id),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS BookRecipeLink (
    recipe INTEGER NOT NULL,
    book INTEGER NOT NULL,
    owner INTEGER NOT NULL,
    FOREIGN KEY(recipe) REFERENCES Recipes(id),
    FOREIGN KEY(book) REFERENCES RecipeBooks(id),
    FOREIGN KEY(owner) REFERENCES Users(id)
);