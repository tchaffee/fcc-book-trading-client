import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import './AddBook.css';

class AddBook extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: [],
      selectedId: null,
      selectedTitle: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event[0]) {
      this.setState({ 
        selectedId: event[0].id,
        selectedTitle: event[0].volumeInfo.title
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.addBook) {
       return this.props.addBook(this.state.selectedId, this.state.selectedTitle)
      .then( () => {
        if (this.refs.typeahead) {
          this.refs.typeahead.getInstance().clear();
        }
      });
    }
  }

  render() {
  
    return (
      <div className="AddBook">

        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup controlId="formInlineName">
            <AsyncTypeahead
              ref="typeahead"
              data-test="add-books-input"
              onSearch={query => (
                fetch(`https://www.googleapis.com/books/v1/volumes?q=title:${query}`)
                  .then(resp => resp.json())
                  .then(json => this.setState({options: json.items}))
              )}
              options={this.state.options}
              onChange={this.handleChange}
              labelKey={option => {
                if (option.volumeInfo.authors) {
                  return `${option.volumeInfo.title} by ${option.volumeInfo.authors[0]}`;
                } else {
                  return option.volumeInfo.title;
                }
              }}
              renderMenuItemChildren={(result, props) => {
                let returnImage = null
                  , returnText = result.volumeInfo.title;

                if (result.volumeInfo.authors) {
                  returnText += ` by ${result.volumeInfo.authors[0]}`;
                }

                if (result.volumeInfo.imageLinks) {
                  returnImage = (
                    <img alt={returnText} className="dropdownThumb" src={result.volumeInfo.imageLinks.smallThumbnail} />
                  );
                }

                return (
                  <div>
                    {returnImage}
                    {returnText}
                  </div>
                );
              }}
            />
            </FormGroup>
            <Button type="submit">Add</Button>
        </Form>
      </div>
    );
  }
}

export default AddBook;
