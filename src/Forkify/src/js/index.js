import Search from './models/Search';
import * as searchView from './views/search-view';
import { elements, renderLoader, clearLoader } from './views/base';

/** GLOBAL STATE OF THE APP
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

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

  // 4 - search for recipes
  await state.search.getResults();

  // 5 - render results on UI
  clearLoader();
  searchView.renderResults(state.search.result);
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

