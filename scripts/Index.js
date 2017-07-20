import Trie from './Trie';
import dictionary from './words.json';

const Tree = new Trie();

$(document).ready( () => {
  Tree.populate(dictionary);
})

const append = () => {
  const listItems = $('button');

  const string = $('#search').val();

  const suggestions = Tree.suggest(string);

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

  Tree.select(selected);
  append();
}

$('#search').on('keyup', function() {
  append();
})

$('#addSuggestions').on('click', '#sug-btn', function(e) {
  selectWord(e);
})
