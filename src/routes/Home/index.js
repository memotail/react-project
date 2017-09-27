import React from 'react';
import Routes from './Routes';

class Home extends React.Component {
  render() {
    return (
      <div>
        Home
        <Routes match={ this.props.match } />
      </div>
    );
  }
}

export default Home;
