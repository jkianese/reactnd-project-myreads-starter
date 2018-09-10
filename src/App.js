import React from 'react';
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends React.Component {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  state = {
     books: []
   } 

   componentDidMount() {
     BooksAPI.getAll().then((books) => { 
       this.setState ({ books }) // or, books: books
     })
   }

   moveToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf); 

    BooksAPI.getAll().then((books) => { // try to write code that won't duplicate
      this.setState ({ books }) // or, books: books
    })
   }

  render() {
    return (
      <div className="app">
        <MainPage books={this.state.books}
          moveToShelf={this.moveToShelf}
      />
      {/*<SearchPage moveToShelf={this.moveToShelf} /> 
      */} </div>
    )
  }
}

export default BooksApp
