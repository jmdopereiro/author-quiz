import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {sample, shuffle} from 'underscore';
import AddAuthorForm from "./AddAuthorForm";


const authors = [
   {
      name: 'Mark Twain',
      imageURL: 'images/authors/85px-Mark_Twain_by_AF_Bradley.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['The adventures of Huckleberry Finn', 'Life on the Mississippi', 'Roughing it']
   },
   {
      name: 'Joseph Conrad',
      imageURL: 'images/authors/86px-Joseph_Conrad,_Fotografie_von_George_Charles_Beresford,_1904.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['Heart of Darkness']
   },
   {
      name: 'J. K. Rowling',
      imageURL: 'images/authors/J.K.Rowling.jpeg',
      imageSource: 'Wikimedia Commons',
      books: ['Harry Potter and the Sorcerers Stone', 'Harry Potter', 'Fantastic Beasts']
   },
   {
      name: 'Stephen King',
      imageURL: 'images/authors/StephenKing.jpeg',
      imageSource: 'Wikimedia Commons',
      books: ['The Shining', 'IT']
   },
   {
      name: 'Charles Dickens',
      imageURL: 'images/authors/CharlesDickens.jpeg',
      imageSource: 'Wikimedia Commons',
      books: ['Oliver Twist', 'A tale of two cities', 'David Copperfield']
   },
   {
      name: 'William Shakespeare',
      imageURL: 'images/authors/WilliamShakespeare.jpeg',
      imageSource: 'Wikimedia Commons',
      books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
   }
];

function getTurnData(authors) {
   const allBooks = authors.reduce(function (p, c, i) {
         return p.concat(c.books);
         }, []);

   const fourRandomBooks = shuffle(allBooks).slice(0, 4);
   const answer = sample(fourRandomBooks);

   return {
      books: fourRandomBooks,
      author: authors.find((author) => author.books.some((title) => title === answer))
   };
}

function reducer(
   state = {authors, turnData: getTurnData(authors), highlight: ''}, action) {
   switch (action.type) {
      case 'ANSWER_SELECTED': {
         console.log(action);
         const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
         return Object.assign({}, state, {highlight: isCorrect ? 'correct' : 'wrong'});
      }
      case 'CONTINUE': {
         return Object.assign({}, state, {
            highlight: '',
            turnData: getTurnData(state.authors)
         });
      }
      case 'ADD_AUTHOR': {
         return Object.assign({}, state, {
            authors: state.authors.concat([action.author])
         });
      }
      default: return state;
   }
}

let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <ReactRedux.Provider store={store}>
            <Route exact path="/" component={AuthorQuiz}/>
            <Route path="/add" component={AddAuthorForm}/>
         </ReactRedux.Provider>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
