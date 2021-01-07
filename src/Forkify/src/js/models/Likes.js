export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, image) {
    const Like = {id, title, author, image};
    this.likes.push(Like);
    // Persist data in localStorage
    this.persistData();
    return Like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
    // Persist data in localStorage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));

    // Restoring from local storage
    if (storage) this.likes = storage;
  }
}
