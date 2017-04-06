import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import AddBook from './AddBook';
import DeleteBook from './DeleteBook';
import TradeBookButton from './TradeBookButton';
import ApproveTradeButton from './ApproveTradeButton';
import './Books.css';

class Books extends Component {

  constructor (props) {
    super(props);

    this.state = {
      booksData: [],
      isFetching: true
    };

    this.handleAddBook = this.handleAddBook.bind(this);
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
    this.handleTradeBook = this.handleTradeBook.bind(this);
    this.handleApproveTradeRequest = this.handleApproveTradeRequest.bind(this);
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
    this.setState({ isFetching: true });
    
    booksGetter()
    .then(data => {
      this.setState({
        booksData: data.books,
        isFetching: false
      });
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

  handleApproveTradeRequest(googleId) {
    return this.props.approveTradeRequest(googleId)
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

    // Loading
    if (this.state.isFetching) {
      return <h2>Loading data....</h2>;
    }

    // My books page? Allow user to add books.
    if (this.props.location.pathname === '/mybooks') {
      addBook = <AddBook addBook={this.handleAddBook} />;
    }

    // No results
    if (this.state.booksData.length <= 0) {
      return (
        <div className="bookList">
          {addBook}
          <h2>No results</h2>
        </div>
      );
    }

    // TODO: Move this to a BooksList component.
    const booksList = this.state.booksData.map( (el, index) => {

      let deleteBook = null;
      let tradeBookButton = null;
      let myBook = null;
      let approveTradeButton = null;

      // "Requests for Me" page? Allow user to approve requests.
      if (this.props.location.pathname === '/tradesforme') {
        approveTradeButton = <ApproveTradeButton 
          approveTradeRequest={this.handleApproveTradeRequest} 
          tradeApproved={el.tradeApproved}
          googleId={el.googleId} 
        />;
      }

      if (this.props.location.pathname === '/mybooks') {
        deleteBook = <DeleteBook deleteBook={this.handleDeleteBook} googleId={el.googleId} />;
      }

      if (this.props.tradeBookButton) {
        if (this.props.user().user_id !== el.owner) {
          tradeBookButton = <TradeBookButton 
            tradeBook={this.handleTradeBook} 
            googleId={el.googleId} 
            owner={el.owner} 
            requested={el.requested}
            approved={el.tradeApproved}
          />;
        }
      }

      if (this.props.user().user_id === el.owner) {
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
            {tradeBookButton}
            {approveTradeButton}
          </div>
      );
    });

    return (
      <div className="bookList">
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
