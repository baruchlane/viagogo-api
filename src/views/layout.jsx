import React from 'react';

export default class Layout extends React.Component {
  render() {
    return (
      <html>
      <head>
        <title>Viagogo Task</title>
        <link rel="stylesheet" href={'/public/css/styles.css'} />
        <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,700" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="body-home">
        <div className="tri">
          <div className="content dis-flex card">{this.props.children}</div>
        </div>
      </body>
      </html>
    );
  }
}