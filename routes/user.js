var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users").then((users) => {
      if (users.find((x) => x.user_id === req.session.user_id)) {
        req.user_id = req.session.user_id;
        next();
      }
    }).catch(err => next(err));
  } else {
    res.sendStatus(401);
  }
});


/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipe_id;
    await user_utils.markAsFavorite(user_id,recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
    } catch(error){
    next(error);
  }
})

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get('/favorites', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    let favorite_recipes = {};
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});



/**
 * This path gets body with recipeId and Date and save this recipe in the last watched list of the logged-in user
 */
 router.post('/lastWatched', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const recipe_id = req.body.recipe_id;
    await user_utils.addToLastWatchedRecipes(user_id,recipe_id);
    res.status(200).send("The recipe successfully added to last whatched recipes");
    } catch(error){
    next(error);
  }
})


router.get("/lastWatched", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    console.log("In users. get last...",user_id);
    const last_recipes_id = await user_utils.get3LastWatchedRecipes(user_id);
    console.log("last recipes id",last_recipes_id);
    let last_recipes_array = [];
    last_recipes_id.map((element) => last_recipes_array.push(element.recipe_id));
    console.log("after map in users",last_recipes_array);
    const last_watched = await recipe_utils.get3LastWatchedInfo(last_recipes_array);
    console.log("last_watched info",last_watched);
    res.status(200).send(last_watched);
  } catch (error) {
    next(error);
  }
});


router.get("/lastWatched/:recipeId", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    console.log("In users. get last...",user_id);
    const recipe = await user_utils.checkIfRecipeInLastWatched(user_id,req.params.recipeId);
    console.log("response recipe :",recipe);
    const seen_recipe=[];
    if (typeof recipe !== 'undefined')
    {
      console.log("recipe is not undefined")
      seen_recipe.push(recipe);
    }
    console.log("seen_recipe",seen_recipe);
    res.status(200).send(seen_recipe);
  } catch (error) {
    next(error);
  }
});


/**
 * This path returns the recipes that were created by the logged-in user
 */
router.get('/myRecipes', async (req,res,next) => {
  try{
    const user_id = req.session.user_id;
    const results = await user_utils.getMyRecipes(user_id);
    res.status(200).send(results);
  } catch(error){
    next(error); 
  }
});

router.post("/myRecipes", async (req, res, next) => {
  try {
    let recipe_details = {
      title: req.body.title,
      readyInMinutes: req.body.readyInMinutes,
      imageUrl: req.body.imageUrl,
      aggregateLikes: req.body.aggregateLikes,
      vegan: req.body.vegan,
      vegetarian: req.body.vegetarian,
      glutenFree: req.body.glutenFree,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      numOfServings: req.body.numOfServings,
      user_id: req.session.user_id,
    };
    recipe_utils.addRecipeToDB(recipe_details);
    res.status(201).send({ message: "recipe created", success: true });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
