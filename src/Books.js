import React, { Component } from 'react';

class Books extends Component {

  constructor (props) {
    super(props);

    this.state = {
    };
  }

  render() {

    // TODO: Replace 'index' for key with an id for the book.
    const booksList = this.props.data.map( (el, index) => {
      return (
        <div key={index} className="Book">{el.title}</div>
      );
    });

    return (
      <div className="BookList">
        {booksList}
      </div>
    );
  }
}

export default Books;
