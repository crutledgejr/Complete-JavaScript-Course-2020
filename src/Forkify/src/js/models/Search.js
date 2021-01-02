import axios from 'axios'

/* CONST FOR API URLs */
// https://forkify-api.herokuapp.com/api/search
// https://forkify-api.herokuapp.com/api/get

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
      this.result = res.data.recipes;
    } catch(err) {
      console.log(`[Search.js] ${err}`);
    }
  }
}
