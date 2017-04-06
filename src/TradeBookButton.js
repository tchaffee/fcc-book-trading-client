import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import './DeleteBook.css';

class TradeBookButton extends Component {

  constructor(props) {
    super(props);

    this.handleTrade = this.handleTrade.bind(this);
  }

  handleTrade(event) {
    event.preventDefault();

    if (this.props.requested) return;

    if (this.props.tradeBook) {
       return this.props.tradeBook(this.props.owner, this.props.googleId);
    }
  }

  render() {
    let icon = 'glyphicon-transfer';

    if (this.props.requested) {
      icon = 'glyphicon-time';
    }

    if (this.props.approved) {
      icon = 'glyphicon-ok-sign';
    }
    
    return (
      <Button type="button" className="trade close" onClick={this.handleTrade}>
        <span className={'glyphicon ' + icon} aria-hidden="true" />
      </Button>
    );
  }
}

export default TradeBookButton;
