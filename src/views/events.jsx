import React from 'react';
import Layout from './layout';
import Event from './event';

export default class Events extends React.Component {
  constructor(props) {
    super(props);

    this.events = props.items.map(event => {
      const {
        id,
        name,
        start_date : startDate,
        number_of_tickets: numberOfTickets,
        _embedded: {
          venue: {
            id: cityId,
            city,
            state_province: state,
            _embedded: {
              country: {
                code: countryCode,
                name: countryName
              }
            }
          }
        }
      } = event;
      const price = event.min_ticket_price && event.min_ticket_price.amount;
      return { id, name, startDate, numberOfTickets, cityId, city, state, countryCode, countryName, price};
    });

    this.eventsByCountry = this.events.reduce((map, event) => {
      (map[event.countryCode] = map[event.countryCode] || []).push(event);
      return map;
    }, {});
    Object.keys(this.eventsByCountry).forEach((code) => {
      const eventsInCountry = this.eventsByCountry[code];
      eventsInCountry.sort(sortByPrice);

      if (eventsInCountry.length > 1) {
        eventsInCountry.forEach(event => {
          event.lowest = event.price <= this.eventsByCountry[code][0].price;
        });
      }
    });
    this.events = [].concat(...Object.values(this.eventsByCountry));
    this.events.sort(sortByPrice);
  }

  render() {
    const heading = this.events.length ?
      `Upcoming ${this.events[0].name} Events` :
      `No Events!`;

    return (
      <Layout>
        <div id="noo">{heading}</div>
        {
          this.events.map(event => (<Event key={event.id} {...event} />))
        }
      </Layout>
    );
  }
}

const sortByPrice = (event1, event2) => {
  if (!event1.price) return 1;
  if (!event2.price) return -1;
  return (event1.price - event2.price);
};