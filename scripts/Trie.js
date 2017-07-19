import Node from './Node';

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(data) {
    const node = new Node();

    if (!this.root) {
      this.root = node;
    }

    const letters = [...data.toLowerCase()];

    let currentNode = this.root;

    letters.forEach( letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    });

    if (!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++;
      currentNode.value = data;
    }

  };

  count() {

    return this.wordCount;
  };

  suggest(words) {
    let wordsArray = [...words]
    let currentNode = this.root;
    let suggestions = [];

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]]
    }

    const traverseTrie = (words, currentNode) => {
      const keys = Object.keys(currentNode.children);

      for (let j = 0; j < keys.length; j++) {
        const child = currentNode.children[keys[j]];
        const newString = words + child.letter;
        if (child.isWord) {
          suggestions.push({name: newString, frequency: child.frequency, lastTouched: child.lastTouched});
        }
        traverseTrie(newString, child);
      }
    };

    if (currentNode && currentNode.isWord) {
      suggestions.push({name: words, frequency: currentNode.frequency, lastTouched: currentNode.lastTouched})
    }

    if (currentNode) {
      traverseTrie(words, currentNode)
    }

    suggestions.sort((a, b) => b.frequency - a.frequency || b.lastTouched - a.lastTouched)

    // let t = performance.now()
    // console.log(parseInt(performance.now());
    return suggestions.map(obj => obj.name);
  };

  select(word) {

    let wordsArray = [...word];
    let currentNode = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]]
    }
    currentNode.frequency++
    currentNode.lastTouched = Date.now();

    // we want to suggest a word that has been selected in the past
    // we need to add a counter of some sort to know if the user has selected that word before
    // if the user has selected that word before then we put that word first in the suggestion box
    // we return an array called suggestions in our suggest function
    // in that array we need to place the word/s that have a count of being selected before from highest to lowest, highest being at [0] in the array
    //we need to store those words somehow to reference them later.  Is that done in a seperate object or on the nodes themselves somehow
    // return array of suggestions;
  };

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  };
}
