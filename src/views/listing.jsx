import React from 'react';
import moment from 'moment';

export default class Event extends React.Component {
  render() {
    const {
      number_of_tickets: numberOfTickets,
      seating: {
        section,
        row
      },
      ticket_price: {
        amount
      }
    } = this.props;

    return (
      <div className="card links">
        <div>{numberOfTickets} ticket(s)</div>
        <div>Section: {section} {row ? ', Row: '+ row : ''}</div>
        <div>${amount}</div>
      </div>
    );
  }
}