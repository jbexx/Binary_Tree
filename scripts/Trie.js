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
          suggestions.push(newString);
        }
        traverseTrie(newString, child);
      }
    };

    if (currentNode && currentNode.isWord) {
      suggestions.push(words)
    }

    if (currentNode) {
      traverseTrie(words, currentNode)
    }

    return suggestions;
  };

  select() {

  };

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  };
}
