/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
module.exports = (app) => {
  const RecipeSchema = require('../models/recipe');
  const UserSchema = require('../models/user');

  // route for showing favorites
  app.get('/dashboard/favorites', (req, res) => {
    // TODO: (1) Find user's favorites (2) show all of them
    if (app.locals.user) {
      const userId = app.locals.user.id;
      UserSchema.findById(userId, (errFindingUser, user) => {
        if (errFindingUser) return res.next(errFindingUser);
        // to get updated user object
        RecipeSchema.find()
          .where('_id')
          .in(user.arrayOfFavoriteRecipes)
          .exec((_err, userFaves) => res.render('dashboard/favorites', {
            recipes: userFaves,
            instructions: 'You must save recipes as favorites.',
          }));
      });
    } else {
      return res.render('dashboard/favorites');
    }
  });

  // Send a POST request to the database to create the recipes collection
  app.post('/favorites/', (req) => {
    const favoriteId = req.body.recipeId;
    const userId = app.locals.user.id;

    // find recipe, add userId to usersWhoFavorited
    RecipeSchema.findById(favoriteId, (errFindingFave, favoriteInDB) => {
      if (errFindingFave) return next(errFindingFave);
      if (favoriteInDB.usersWhoFavorited.includes(userId)) {
        // user already favorited, and is trying to un-favorite
        RecipeSchema.findByIdAndUpdate(favoriteId, {
          $pull: {
            usersWhoFavorited: userId,
          },
        }, (errPullingFave) => {
          if (errPullingFave) return next(errPullingFave);
        });
      } else {
        // user has not favorited before
        RecipeSchema.findByIdAndUpdate(favoriteId, {
          $addToSet: {
            usersWhoFavorited: userId,
          },
        }, (errSavingFave) => {
          if (errSavingFave) return next(errSavingFave);
        });
      }
    });

    // find user, save favorite to arrayOfFavoriteRecipes
    UserSchema.findById(userId, (errFindingUser, userInDB) => {
      if (errFindingUser) return next(errFindingUser);
      if (userInDB.arrayOfFavoriteRecipes.includes(favoriteId)) {
        // already favorited, remove from arrayOfFavoriteRecipes
        UserSchema.findByIdAndUpdate(userId, {
          $pull: {
            arrayOfFavoriteRecipes: favoriteId,
          },
        }, (errRemovingFave, user) => {
          if (errRemovingFave) return next(errRemovingFave);
          app.locals.user = user;
          app.locals.user.arrayOfFavoriteRecipes.pull(favoriteId); // update user locally
        });
      } else {
        // user has not favorited before, add to arrayOfFavoriteRecipes
        UserSchema.findByIdAndUpdate(userId, {
          $addToSet: {
            arrayOfFavoriteRecipes: favoriteId,
          },
        }, (errAddingFave, user) => {
          if (errAddingFave) return next(errAddingFave);
          app.locals.user = user;
          app.locals.user.arrayOfFavoriteRecipes.push(favoriteId); // update user locally
        });
      }
    });
  });
};
