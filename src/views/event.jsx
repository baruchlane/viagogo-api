import React from 'react';
import moment from 'moment';

export default class Event extends React.Component {
  render() {
    const { id, name, startDate, numberOfTickets, cityId, city, state, countryCode, countryName, price, lowest} = this.props;

    const display = price ? `${numberOfTickets < 10 ? `Only` : ``}  ${numberOfTickets} tickets left, 
      starting at $${price}` : 'Sold Out!';

    return (
      <a className="card links" key={id} href={`/event/${id}`}>
        <div>{city}, {state} {countryName}</div>
        <div>{name}</div>
        <div>{moment(startDate).format('ddd, MMM D, YYYY, h:mma')}</div>
        <div>{display}</div>
        {lowest && (<div className="red">(lowest price in the country!)</div>)}
      </a>
    )
  }
}