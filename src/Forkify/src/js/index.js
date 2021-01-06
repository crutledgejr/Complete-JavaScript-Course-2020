import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/search-view';
import * as recipieView from './views/recipe-view';
import * as listView from './views/list-view';
import { elements, renderLoader, clearLoader } from './views/base';

/** GLOBAL STATE OF THE APP
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
window.appState = state;

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1 - get query from the view
  const query = searchView.getInput();
  console.log(`query grab ${query}`);

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
  console.log(id);

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
      recipieView.renderRecipe(state.recipe);
    } catch(err) {
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
    controlList();
  }
});
