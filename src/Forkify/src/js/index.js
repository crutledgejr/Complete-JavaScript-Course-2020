import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/search-view';
import * as recipieView from './views/recipe-view';
import * as listView from './views/list-view';
import * as likesView from './views/likes-view';
import { elements, renderLoader, clearLoader } from './views/base';

/** GLOBAL STATE OF THE APP
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1 - get query from the view
  const query = searchView.getInput();

  if (query) {
    // 2 - new search object and add to app state
    state.search = new Search(query);
  }

  // 3 - prep UI for results
  searchView.clearInput();
  searchView.clearResults();
  renderLoader(elements.searchRes);

  try {
    // 4 - search for recipes
    await state.search.getResults();

    // 5 - render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  } catch(err) {
    alert('Error processing search!');
    clearLoader();
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
})

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare the UI for changes
    recipieView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipieView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch(err) {
      console.log(err);
      alert('Error processing recipe!');
    }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * LIST CONTROLLER
 */
const controlList = () => {
  // Create list if none exists
  if (!state.list) state.list = new List();

  // Add ech ingredient to the list
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

//Handle delete and update list item events
elements.shoppingList.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // Handle delete button; remove item from model and view
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  // Handle count update
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

/**
 * LIKES CONTROLLER
 */
const controlLikes = () => {
  if (!state.likes) state.likes = new Likes();
  const currId = state.recipe.id;

  // User has not liked current recipe
  if (!state.likes.isLiked(currId)) {
    // Add like to the state
    const newLike = state.likes.addLike(
      currId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    // Toggle the like button
    likesView.toggleLikeBtn(true);

    // Add like to UI list
    likesView.renderLike(newLike);

  // User has not liked current recipe
  } else {
    // Remove like from the state
    state.likes.deleteLike(currId);

    // Toggle the like button
    likesView.toggleLikeBtn(false);

    // Remove like from UI list
    likesView.deleteLike(currId);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore likes on page load
window.addEventListener('load', () => {
  state.likes = new Likes();
  // Restore likes
  state.likes.readStorage();
  // Render existing likes
  state.likes.likes.forEach(like => likesView.renderLike(like));
})

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipieView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipieView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add ingredients to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // call likes controller
    controlLikes();
  }
});
