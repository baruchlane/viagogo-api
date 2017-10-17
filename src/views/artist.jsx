import React from 'react';

export default class Artist extends React.Component {
  render() {
    const {id, name} = this.props;

    return (
      <a className="card dis-flex update-cont links" href={`/artist/${id}`}>
        {name}
      </a>
    )
  }
}