export default class Node {
  constructor(letter) {
    this.letter = letter || null;
    this.isWord = false;
    this.children = {};
    this.value = letter;
    this.frequency = 0;
    this.lastTouched = 0;
  }
}
