# Keto Recipe Finder

This project is intended to be an API that serves up keto recipes, and then converts them to a shopping list.
The v0 idea is to first serve up recipes. The v1 idea is to convert the recipes into a grocery list. This API will be built
using Node.js + Express.js. We will research API's that return recipes, and our API
will filter those out to show Keto recipes with a filter for Vegan and Gluten Free.

## Useful links:
View our live website at: https://keto-eating.herokuapp.com
View our API documentation at: https://keto-eating.github.io/Keto-Recipe-API/#/

## User Journeys
As a user I can browse keto recipes and save my favorites.
As a user I can search for keto recipes using the search bar to filter down results.
As a user I can add recipes to my grocery cart and then turn them into grocery lists.

### Project Team

Nicolai Safai, Phyllis Wong, and Leslie Kimm

### Roles

**Lead Backend Engineer / PM**<br>
Nicolai Safai<br><br>
**Lead Frontend Engineer**<br>
Phyllis Wong<br><br>
**Senior Engineer / QA**<br>
Leslie Kimm<br><br>

### Pages/Routes:
- **/** (home)<br>
- **/?term=pizza** (searches for keto recipes for 'pizza'. For multiple terms, separate each term by %20 or use the search bar)<br>
- **/favorites** (logged out: list of public favorites / logged in: list of your saved favorites)<br>
- **/login** (login for existing users)<br>
- **/signup** (create new account)<br>

### Milestones

-   [x] **Sep 28** Ship to Heroku
-   [x] **Oct 10** Non-authenticated landing page: MVP Search for food item --> return keto recipes
-   [x] **Oct 11** Stretch goal - authenticated version
-   [x] **Oct 12** Add test(s)
-   [x] **Oct 13** Add 1 nested route: user favorites
-   [x] **Oct 14** Re-deploy to Heroku
-   [x] **Nov 14** Create job to store API results to our own DB (WIP)
-   [x] **Nov 14** Re-factor search to look inside our own DB (WIP)
-   [x] **Nov 12** Shipped to our custom domain
-   [x] **Nov 12** Ship functional version and share with friends
-   [ ] Re-factor Favorites (WIP)
-   [ ] Add styling to dashboard, include a weekly meal plan
-   [ ] Create a cart object to store current week's recipes
-   [ ] Parse ingredientLines and create list
-   [ ] Add same ingredients with same units to create reduced grocery list
