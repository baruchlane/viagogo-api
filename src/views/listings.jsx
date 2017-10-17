import React from 'react';
import Layout from './layout';
import Listing from './listing';

export default class Events extends React.Component {
  render() {
    const { _embedded: { items : listings } } = this.props;

    return (
      <Layout>
        <div id="noo">Available Tickets</div>
        {
          listings.map(listing => (<Listing key={listing.id} {...listing} />))
        }
      </Layout>
    );
  }
}