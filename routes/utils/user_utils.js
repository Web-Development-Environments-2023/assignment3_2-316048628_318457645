const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into favoriterecipes values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipe_id from favoriterecipes where user_id='${user_id}'`);
    return recipes_id;
}


async function getMyRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select * from newrecipes where user_id='${user_id}'`);
    return recipes_id;
}

async function get3LastWatchedRecipes(user_id){
    // const recipes_id = await DButils.execQuery(`select * from lastwatchedrecipes where user_id='${user_id}' ORDER BY date DESC LIMIT 3`);
    console.log("in utils",user_id);
    const recipes_id = await DButils.execQuery(`select * from lastwatchedrecipes where user_id='${user_id}' AND date IN(SELECT MAX(date) FROM lastwatchedrecipes GROUP BY recipe_id) ORDER BY date DESC LIMIT 3`);
    console.log("recipes_id",recipes_id);
    return recipes_id;
}

async function checkIfRecipeInLastWatched(user_id,recipeId){
    const recipe = await DButils.execQuery(`select * from lastwatchedrecipes where user_id='${user_id}' AND recipe_id='${recipeId}'`);
    return recipe;
}

async function addToLastWatchedRecipes(user_id, recipe_id){
    await DButils.execQuery(`insert into lastwatchedrecipes values ('${user_id}',${recipe_id},now())`);
}


exports.addToLastWatchedRecipes = addToLastWatchedRecipes;
exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.get3LastWatchedRecipes = get3LastWatchedRecipes;
exports.getMyRecipes = getMyRecipes;
exports.checkIfRecipeInLastWatched=checkIfRecipeInLastWatched;