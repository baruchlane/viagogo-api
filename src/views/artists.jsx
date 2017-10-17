import React from 'react';
import Layout from './layout';
import Artist from './artist';

export default class Artists extends React.Component {
  render() {
    const artists = this.props.items.map(artist => {
      const { _embedded: { category: { id, name } } } = artist;
      return {id, name};
    });
    const heading = artists.length ?
      'Which Artist/Category Did You Mean?' :
      'No Artists Found!';
    return (
      <Layout>
        <div id="noo">{heading}</div>
        {
          artists.map(artist => <Artist key={artist.id} {...artist} />)
        }
      </Layout>
    );
  }
}