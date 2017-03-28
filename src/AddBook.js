import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class AddBook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
  
    let addBooks = null;

    return (
      <div className="AddBook">
        <Form inline onSubmit={this.handleSubmit}>
            <FormGroup controlId="formInlineName">
              <FormControl data-test="add-books-input" type="text" placeholder="Book Name" onChange={this.handleChange} />
            </FormGroup>
            <Button type="submit">Add</Button>
        </Form>
      </div>
    );
  }
}

export default AddBook;
