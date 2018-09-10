import React, { Component } from 'react';
import Book from './Book'; 

import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
    state = {
        query: '',
        searchedBooks: [] // change array name
    }

    updateQuery = (query) => {
        this.setState({
            query: query
        })
        this.getSearch(query);  // change update function name
    }

    getSearch = (query) => { // change update function name
       if (query) { 
            BooksAPI.search(query).then((searchedBooks) => {
                if (searchedBooks.error) {
                    this.setState({ searchedBooks: [] });
                } else {
                this.setState({ searchedBooks });
                }
            })
        } else {
            this.setState({ searchedBooks: [] });
        }    
    }

    render () {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* TODO: Remove Later 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
                    value={this.state.query} 
                    onChange={(e) => this.updateQuery(e.target.value)}
                />

              </div>
            </div>
                
            <div className="search-books-results">
              <ol className="books-grid">
                {
                    this.state.searchedBooks.map(searchedBook => (
                        <li key={searchedBook.id}>
                            <Book 
                                book={searchedBook} 
                                moveToShelf={this.props.moveToShelf} // left off here
                            />
                        </li>
                    ))
                }    
              </ol>    

            </div>
          </div>
        );
    }
}

export default SearchPage;