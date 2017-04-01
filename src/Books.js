import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import Trades from './Trades';
import AddBook from './AddBook';
import DeleteBook from './DeleteBook';
import TradeBook from './TradeBook';
import './Books.css';



class Books extends Component {

  constructor (props) {
    super(props);

    this.state = {
      booksData: []
    };

    this.handleAddBook = this.handleAddBook.bind(this);
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
    this.handleTradeBook = this.handleTradeBook.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentWillMount () {
    this.loadData(this.props.booksGetter);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.loadData(nextProps.booksGetter);
    }
  }

  loadData(booksGetter) {
    booksGetter()
    .then(data => {
      this.setState({
        booksData: data.books
      });
    })
    .catch(reason => {
      console.log('Books.js loaddata caught an error.');
      console.log(reason);
    });
  }

  handleAddBook(googleId, title) {
    return this.props.addBook(googleId, title)
    .then( () => {
      this.loadData(this.props.booksGetter);
    })
    .catch(reason => {
      if ('Error: Unauthorized' === reason.toString()) {
        this.props.history.replace('/notauthorized');
      }
    });
  }

  handleDeleteBook(googleId) {
    return this.props.deleteBook(googleId)
    .then( () => {
      this.loadData(this.props.booksGetter);
    })
    .catch(reason => {
      if ('Error: Unauthorized' === reason.toString()) {
        this.props.history.replace('/notauthorized');
      }
    });
  }

  handleTradeBook(owner, googleId, requester) {
    return this.props.tradeBook(owner, googleId)
    .then( () => {
      this.loadData(this.props.booksGetter);
    })
    .catch(reason => {
      if ('Error: Unauthorized' === reason.toString()) {
        this.props.history.replace('/notauthorized');
      }
    });
  }

  render() {

    let addBook = null;

    console.log('Books.js props');
    console.log(this.props);

    // My books page? Allow user to add books.
    if (this.props.location.pathname === '/mybooks') {
      addBook = <AddBook addBook={this.handleAddBook} />;
    }

    const booksList = this.state.booksData.map( (el, index) => {

      let deleteBook = null;
      let tradeBook = null;
      let myBook = null;

      if (this.props.location.pathname === '/mybooks') {
        deleteBook = <DeleteBook deleteBook={this.handleDeleteBook} googleId={el.googleId} />;
      }

      if (this.props.location.pathname === '/allbooks') {
        if (this.props.user.user_id !== el.owner) {
          tradeBook = <TradeBook 
            tradeBook={this.handleTradeBook} 
            googleId={el.googleId} 
            owner={el.owner} 
            requested={el.requested}
          />;
        }
      }

      if (this.props.user.user_id == el.owner) {
        myBook = ( 
          <span className="myBooks-icon glyphicon glyphicon-user" aria-hidden="true" />
        );
      }

      return (
          <div key={el._id} className="coverContainer">
            <span className="book">
              <img alt={el.title} className="bookItem" src={`http://books.google.com/books/content?id=${el.googleId}&printsec=frontcover&img=1&zoom=5&edge=curl`} />
            </span>
            {myBook}
            {deleteBook}
            {tradeBook}
          </div>
      );
    });

    return (
      <div className="bookList">
        <Trades />
        {addBook}
        <Grid>
          <Row className="bookRow">
            <Col lg={12} className="bookColumns">
              {booksList}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Books;
