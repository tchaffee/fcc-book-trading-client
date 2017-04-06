import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import './DeleteBook.css';

class ApproveTradeButton extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    if (this.props.tradeApproved) return;

    if (this.props.approveTradeRequest) {
       return this.props.approveTradeRequest(this.props.googleId);
    }
  }

  render() {
    let icon = 'glyphicon-question-sign';

    if (this.props.tradeApproved) {
      icon = 'glyphicon-ok-sign';
    }

    return (
      <Button type="button" className="approve close" onClick={this.handleClick}>
        <span className={'glyphicon ' + icon} aria-hidden="true" />
      </Button>
    );
  }
}

export default ApproveTradeButton;
