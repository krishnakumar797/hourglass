import React from 'react';
import Head from 'next/head'

class Header extends React.Component {

  render() {
    return <div>
    <Head>
      <title>Hour Glass</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  </div>;
  }
}

export default Header;