CREATE TABLE familyRecipes(  
    recipe_id int PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    recipeOwner VARCHAR(255) NOT NULL,
    preparationTime VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    ingredients VARCHAR(255) NOT NULL,
    instructions VARCHAR(255) NOT NULL,
    user_id INT NOT NULL
) DEFAULT CHARSET UTF8 COMMENT 'newTable';