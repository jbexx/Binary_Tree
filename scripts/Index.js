import Trie from './Trie';
import dictionary from './words.json';

const Tree = new Trie();

$(document).ready( () => {
  Tree.populate(dictionary);
})

const prepend = () => {
  const listItems = $('button');
  const string = $('#search').val();
  const suggestions = Tree.suggest(string);

console.log(suggestions);
  $(listItems).remove();

  for (let i = 0; i < 15 && suggestions.length; i++) {
    if (string !== '' && suggestions[i] !== undefined) {
      $('#addSuggestions').append(`
        <button id="sug-btn">${suggestions[i]}</button>
        `)
    }
  }
};

const selectWord = (e) => {
  const selected = e.target.innerHTML;
  
  console.log(selected);

  Tree.select(selected);
  prepend();
}

$('#search').on('keyup', function() {
  prepend();
})

$('#addSuggestions').on('click', '#sug-btn', function(e) {
  selectWord(e);
})
