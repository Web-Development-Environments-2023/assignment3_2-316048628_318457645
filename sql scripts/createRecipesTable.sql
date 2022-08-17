CREATE TABLE newRecipes(  
    recipe_id int PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    readyInMinutes VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    aggregateLikes INT NOT NULL,
    vegan BOOLEAN NOT NULL,
    vegetarian BOOLEAN NOT NULL,
    glutenFree BOOLEAN NOT NULL,
    ingredients VARCHAR(255) NOT NULL,
    instructions VARCHAR(255) NOT NULL,
    numOfServings INT NOT NULL,
    user_id INT NOT NULL
) DEFAULT CHARSET UTF8 COMMENT 'newTable';