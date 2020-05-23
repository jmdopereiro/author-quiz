import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
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

function onAnswerSelected(answer) {

   const isCorrect = state.turnData.author.books.some((book) => book === answer);
   console.log(isCorrect);
   state.highlight = isCorrect ? 'correct' : 'wrong';
   render();
}

function resetState() {
   return {
      turnData: getTurnData(authors),
      highlight: 'none'
   }
}

let state = resetState();

function App() {
   return(
      <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}
                  onContinue={() => {
                     state = resetState();
                     render();
                  }}/>
   )

}

const AuthorWrapper = withRouter(({history}) => {
   return <AddAuthorForm onAddAuthor={(author) => {
      authors.push(author);
      history.push('/');
   }}/>;
});

function render(){
   ReactDOM.render(
      <React.StrictMode>
         <BrowserRouter>
            <Route exact path="/" component={App}/>
            <Route path="/add" component={AuthorWrapper}/>
         </BrowserRouter>
      </React.StrictMode>,
      document.getElementById('root')
   );
}
render()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
