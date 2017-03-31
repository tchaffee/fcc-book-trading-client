import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import './DeleteBook.css';

class DeleteBook extends Component {

  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    if (this.props.deleteBook) {
       return this.props.deleteBook(this.props.googleId);
    }
  }

  render() {
  
    return (
      <Button type="button" className="close" onClick={this.handleDelete}>×</Button>
    );
  }
}

export default DeleteBook;
