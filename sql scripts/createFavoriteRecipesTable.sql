CREATE TABLE FavoriteRecipes(  
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    PRIMARY KEY (user_id,recipe_id)
) DEFAULT CHARSET UTF8 COMMENT 'newTable';