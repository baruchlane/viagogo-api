import React from 'react';
import Layout from './layout';

export default class Search extends React.Component {
  render() {
    return (
      <Layout>
        <form action="/search" method="POST" className="dis-flex flex-col">
          <label id="noo" className="noo-cont">Enter Artist Name</label>
          <input type="text" name="artist" />
          <button className="btn-yes" type="submit">Submit</button>
        </form>
      </Layout>
    );
  }
}