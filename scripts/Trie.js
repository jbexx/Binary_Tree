import Node from './Node';

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(prefix) {
    const node = new Node();

    if (!this.root) {
      this.root = node;
    }

    let currentNode = this.root;

    const letters = [...prefix.toLowerCase()];

    letters.forEach( letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    });

    if (!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++;
      currentNode.value = prefix;
    }

  }

  count() {

    return this.wordCount;
  }

  suggest(prefix) {
    const wordsArray = [...prefix];

    const suggestions = [];

    let currentNode = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]]
    }

    const traverseTrie = (prefix, currentNode) => {
      const keys = Object.keys(currentNode.children);

      for (let j = 0; j < keys.length; j++) {
        const child = currentNode.children[keys[j]];

        const newString = prefix + child.letter;

        if (child.isWord) {
          suggestions.push({name: newString,
            frequency: child.frequency,
            timeStamp: child.timeStamp});
        }
        traverseTrie(newString, child);
      }
    };

    if (currentNode && currentNode.isWord) {
      suggestions.push({name: prefix,
        frequency: currentNode.frequency,
        timeStamp: currentNode.timeStamp})
    }

    if (currentNode) {
      traverseTrie(prefix, currentNode)
    }

    suggestions.sort((a, b) => b.frequency - a.frequency || b.timeStamp - a.timeStamp)

    return suggestions.map(obj => obj.name);
  }

  select(prefix) {
    const wordsArray = [...prefix];
    let currentNode = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]]
    }
    currentNode.frequency++
    currentNode.timeStamp = Date.now();
  }

  populate(dictionary) {
    dictionary.forEach(prefix => {
      this.insert(prefix);
    })
  }
}
