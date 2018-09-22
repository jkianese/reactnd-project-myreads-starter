import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import Book from './Book' 
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
      query: '',
      searched: [] 
  }
  
  // managing the input state
  updateQuery = (query) => {
    this.setState({query: query})
    
    if (query) { 
      BooksAPI.search(query).then((searched) => {
        if (searched.error) {
            this.setState({ searched: [] });
        } else {
        this.setState({ searched });
        }
      })
    } else {
      this.setState({ searched: [] });
    }

  }

  render () {
      return (
          <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/' >Close</Link> 
            <div className="search-books-input-wrapper">
              
              <input type="text" placeholder="Search by title or author"
                  value={this.state.query} 
                  onChange={(e) => this.updateQuery(e.target.value)}
              />

            </div>
          </div>
              
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.searched.map(searchedBook => {
                let shelf = "none";
                
                this.props.books.map(book => (
                    book.id === searchedBook.id ?
                    shelf = book.shelf : ''
                ));
                
                return (
                    <li key={searchedBook.id}>
                        <Book book={searchedBook} 
                        updateBook={this.props.updateBook}
                        currentShelf={shelf}
                        />
                    </li>
                )
              })
              }    
            </ol>    

          </div>
        </div>
      );
  }
}

export default SearchBooks
