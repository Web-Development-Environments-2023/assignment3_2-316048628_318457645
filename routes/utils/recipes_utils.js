const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: process.env.spooncular_apiKey
        }
    });
}

<<<<<<< HEAD
=======

>>>>>>> a4ad1a5d5b4f8070e1ee0ddb2ab0cf57d1bf2523
async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_info.data;
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,   
    }
}

async function getRecipeFullDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
<<<<<<< Updated upstream
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, analyzedInstructions } = recipe_info.data;
=======
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, analyzedInstructions, servings } = recipe_info.data;
>>>>>>> Stashed changes
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
<<<<<<< Updated upstream
        extendedIngredients: extendedIngredients,
        instructions: analyzedInstructions,
    }
}

exports.getRecipeDetails = getRecipeDetails;
exports.getRecipeFullDetails = getRecipeFullDetails;
=======
        ingredients: extendedIngredients,
        instructions: analyzedInstructions,
        numOfServing: servings,
    }
}

async function addRecipeToDB(recipe_details)
{
    await DButils.execQuery(
        `INSERT INTO recipes (id, title, readyInMinutes, image, popularity, vegan, vegetarian, glutenFree, extendedIngredients, instructions, numOfServing, user_id) VALUES ('${recipe_details.id}', '${recipe_details.title}', '${recipe_details.readyInMinutes}',
        '${recipe_details.image}', '${recipe_details.popularity}', '${recipe_details.vegan}', '${recipe_details.vegetarian}', '${recipe_details.glutenFree}', '${recipe_details.ingredients}', '${recipe_details.instructions}' , '${recipe_details.numOfServing}', '${recipe_details.user_id}')`
        );
}

async function get3RandomRecipes()
{
    const random_recipes = await axios.get(`${api_domain}/random`, {
        params: {
            number: 3,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return random_recipes.data;
>>>>>>> Stashed changes

}

exports.getRecipeDetails = getRecipeDetails;
exports.getRecipeFullDetails = getRecipeFullDetails;
exports.addRecipeToDB = addRecipeToDB;
exports.get3RandomRecipes = get3RandomRecipes;
