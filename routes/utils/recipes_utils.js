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

async function getRecipesPreview(recipes_id_array){
    let favorite_recipes_promises = [];
    recipes_id_array.map((id) => favorite_recipes_promises.push(getRecipeDetails(id)) );
    let favorite_recipes_prev = await Promise.all(favorite_recipes_promises);
    return favorite_recipes_prev;
}

async function get3LastWatchedInfo(last_recipes_array)
{
    let watched_recipes_promises = [];
    last_recipes_array.map((id) => watched_recipes_promises.push(getRecipeDetails(id)) );
    let watched_recipes_info = await Promise.all(watched_recipes_promises);
    return watched_recipes_info;
}

async function searchRecipes(query,number,cuisine,diet,intolerance) {
    const result = await axios.get(`${api_domain}/complexSearch`, {
        params: {
            query: query,
            number: number,
            cuisine: cuisine,
            diet: diet,
            intolerance: intolerance,
            apiKey: process.env.spooncular_apiKey
        }
    });
    return result.data.results;
}

async function getFamilyRecipe()
{
    // const recipes_id = await DButils.execQuery(`select * from lastwatchedrecipes where user_id='${user_id}' ORDER BY date DESC LIMIT 3`);
    const recipes = await DButils.execQuery(`select * from familyrecipes`);
    return recipes;
}

exports.getFamilyRecipe = getFamilyRecipe;
exports.getRecipeDetails = getRecipeDetails;
exports.getRecipeFullDetails = getRecipeFullDetails;
exports.addRecipeToDB = addRecipeToDB;
exports.get3RandomRecipes = get3RandomRecipes;
exports.get3LastWatchedInfo = get3LastWatchedInfo;
exports.getRecipesPreview = getRecipesPreview;
exports.searchRecipes = searchRecipes;