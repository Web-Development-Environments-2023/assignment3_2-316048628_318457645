CREATE TABLE lastwatchedrecipes(  
    user_id INT NOT NULL,
    recipe_id INT NOT NULL,
    date DATETIME
) DEFAULT CHARSET UTF8 COMMENT 'newTable';