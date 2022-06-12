const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const DButils = require("./DButils");




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
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree, extendedIngredients, analyzedInstructions, servings } = recipe_info.data;
    return {
        id: id,
        title: title,
        readyInMinutes: readyInMinutes,
        image: image,
        popularity: aggregateLikes,
        vegan: vegan,
        vegetarian: vegetarian,
        glutenFree: glutenFree,
        ingredients: extendedIngredients,
        instructions: analyzedInstructions,
        numOfServing: servings,
    }
}

async function addRecipeToDB(recipe_details)
{
    await DButils.execQuery(
        `INSERT INTO newRecipes (title, readyInMinutes, imageUrl, popularity, vegan, vegetarian, glutenFree, ingredients, instructions, numOfServings, user_id) VALUES ('${recipe_details.title}', '${recipe_details.readyInMinutes}',
        '${recipe_details.imageUrl}', '${recipe_details.popularity}', '${recipe_details.vegan}', '${recipe_details.vegetarian}', '${recipe_details.glutenFree}', '${recipe_details.ingredients}', '${recipe_details.instructions}' , '${recipe_details.numOfServings}', '${recipe_details.user_id}')`
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

}

exports.getRecipeDetails = getRecipeDetails;
exports.getRecipeFullDetails = getRecipeFullDetails;
exports.addRecipeToDB = addRecipeToDB;
exports.get3RandomRecipes = get3RandomRecipes;
