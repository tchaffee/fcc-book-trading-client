import React, { Component } from 'react';
import Trades from './Trades';
import AddBook from './AddBook';

function loadData(props, that) {
  console.log('loading new books data...');
  props.booksGetter()
  .then(data => {
    that.setState({
      booksData: data.books
    });
  });
}

class Books extends Component {

  constructor (props) {
    super(props);

    this.state = {
      booksData: []
    };
  }

  componentWillMount () {
    console.log('willMount');
    console.log('this.props');
    console.log(this.props);
    loadData(this.props, this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      loadData(nextProps, this);
    }
  }

  render() {

    let addBook = null;

    // My books page? Allow user to add books.
    if (this.props.location.pathname === '/mybooks') {
      addBook = <AddBook addBook={this.props.addBook} />;
    }


    const booksList = this.state.booksData.map( (el, index) => {
      return (
        <div key={el._id} className="Book">{el.title}</div>
      );
    });

    return (
      <div className="BookList">
        <Trades />
        {addBook}
        {booksList}
      </div>
    );
  }
}

export default Books;
