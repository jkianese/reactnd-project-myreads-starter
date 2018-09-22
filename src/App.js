import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  } 

  //get books on load
  componentDidMount() {
    BooksAPI.getAll().then((books) => { 
      this.setState ({books}) 
    })
  }
 
 updateBook = (book, shelf) => {
  BooksAPI.update(book, shelf).then(data =>{
    book.shelf = shelf

    let newBooks = this.state.books.filter(b => b.id !== book.id)

    newBooks.push(book);
    this.setState({books: newBooks})
  })
}

 render() {

  const { books } = this.state

   return (
     <div className="app">
     <Route exact path="/" render={() => (
       <BookShelf 
       books={books}
       updateBook={this.updateBook}
     />
     )} />

     {/* <Route path="/search" component={SearchBooks} /> */}
   
     <Route path="/search" render={() => (
       <SearchBooks 
       books={books}
       updateBook={this.updateBook}
     />  
     )} />
     </div> 
   )
 }
}

export default BooksApp