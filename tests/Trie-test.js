import { expect } from 'chai';
import Trie from '../scripts/Trie'
import Node from '../scripts/Node'

const fs = require ('fs');

const text = "/usr/share/dict/words";

let dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('Trie functionality', () => {

  describe('insert', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
    })

    it('should have a root', () => {
      expect(completeMe.root).to.equal(null);
    })

    it('should be able to insert a word and root should be a Node', () => {
      completeMe.insert('apple');

      expect(completeMe.root).to.be.instanceOf(Node)
    })

    it('should be able to insert a word and root should have children', () => {
      completeMe.insert('apple');

      expect(completeMe.root.children.a.letter).to.be.equal('a')

      expect(
        completeMe.root
        .children.a
        .children.p
        .letter
      ).to.equal('p')

    })

    it('should be able to insert a word and the last letter should have a isWord property of true', () => {
      completeMe.insert('app');
      completeMe.insert('apple');

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .children.e
        .letter
      ).to.equal('e')

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .isWord
      ).to.equal(true)

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .children.e
        .isWord
      ).to.equal(true)
    })

    it('should be able to insert multiple words correctly', () => {
      completeMe.insert('apples');
      completeMe.insert('apple');
      completeMe.insert('applecandy');
      completeMe.insert('applesauce');
      completeMe.insert('ape');
      completeMe.insert('app');
      completeMe.insert('apps');
      completeMe.insert('aligator');
      completeMe.insert('alf');
      completeMe.insert('bubbles');

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .children.e
        .children.s
        .isWord
      ).to.equal(true);

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .children.e
        .isWord
      ).to.equal(true);

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .children.e
        .children.c
        .children.a
        .children.n
        .children.d
        .children.y
        .isWord
      ).to.equal(true);

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .children.e
        .children.s
        .children.a
        .children.u
        .children.c
        .children.e
        .isWord
      ).to.equal(true);

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.e
        .isWord
      ).to.equal(true);

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .isWord
      ).to.equal(true);

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.s
        .isWord
      ).to.equal(true);

      expect(
        completeMe.root
        .children.a
        .children.l
        .children.i
        .children.g
        .children.a
        .children.t
        .children.o
        .children.r
        .isWord
      ).to.equal(true);

      expect(
        completeMe.root
        .children.a
        .children.l
        .children.f
        .isWord
      ).to.equal(true);

      expect(
        completeMe.root
        .children.b
        .children.u
        .children.b
        .children.b
        .children.l
        .children.e
        .children.s
        .isWord
      ).to.equal(true);

    })

    it('should be able to insert multiple words and children objects should have multiple properties', () => {
      completeMe.insert('apple');
      completeMe.insert('ape');

      let childKeys = Object.keys(
        completeMe.root
        .children.a
        .children.p
        .children
      );

      expect(childKeys).to.deep.equal(['p', 'e']);

    })

    it('should have nodes which represent incomplete words where the isWord property is false', () => {
      completeMe.insert('apple');

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .isWord
      ).to.equal(false);

    })
  })

  describe('count', () => {
    let completeMe;

    beforeEach( () => {
      completeMe = new Trie();
    });

    it('should return number of words inserted', () => {
      expect(completeMe.count()).to.equal(0);

      completeMe.insert('ape');
      expect(completeMe.count()).to.equal(1);

      completeMe.insert('app');
      expect(completeMe.count()).to.equal(2);

      completeMe.insert('apple');
      expect(completeMe.count()).to.equal(3);

      completeMe.insert('apples');
      expect(completeMe.count()).to.equal(4);
    })
  });

  describe('Suggest', () => {
    let completeMe;

    beforeEach( () => {
      completeMe = new Trie();

      completeMe.insert('app');
      completeMe.insert('apple');
      completeMe.insert('applesauce');
      completeMe.insert('apply');
      completeMe.insert('apt');
      completeMe.insert('cat');
      completeMe.insert('x-ray');
    })

    it('should return all children words of suggestion', () => {

      let suggestions = completeMe.suggest('app');

      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      suggestions = completeMe.suggest('applesb');

      expect(suggestions).to.deep.equal([])

      suggestions = completeMe.suggest('apple');

      expect(suggestions).to.deep.equal([ 'apple', 'applesauce' ])

      suggestions = completeMe.suggest('ca.');

      expect(suggestions).to.deep.equal([])

      suggestions = completeMe.suggest('x');

      expect(suggestions).to.deep.equal([ 'x-ray' ])
    })
  });

  describe('populate', () => {
    let completeMe;

    beforeEach( function () {
      this.timeout(3000);
      completeMe = new Trie();
      completeMe.populate(dictionary);
    });

    it('should populate with the whole dictionary', () => {
      expect(completeMe.wordCount).to.equal(234371);
    })


  })

  describe('select', () => {
    let completeMe;

    const sleep = (milliseconds) => {
      const start = new Date().getTime();
      for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    }

    beforeEach(function () {
      completeMe = new Trie();
    })

    it('should be able to select order of words returned by suggest', () => {
      completeMe.insert('app')
      completeMe.insert('apple')
      completeMe.insert('applesauce')
      completeMe.insert('apply')

      let suggestions = completeMe.suggest('app');

      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      completeMe.select('app');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])
      sleep(10);

      completeMe.select('apply');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'apply', 'app', 'apple', 'applesauce' ])
      sleep(10);

      completeMe.select('apple');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'apple', 'apply', 'app', 'applesauce' ])
      sleep(10);

      completeMe.select('app');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'apply', 'applesauce' ])
      sleep(10);

      completeMe.select('apply');
      sleep(10);
      completeMe.select('app');
      sleep(10);
      completeMe.select('apply');
      sleep(10);
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'apply', 'app', 'apple', 'applesauce' ])
    })
  })
})
