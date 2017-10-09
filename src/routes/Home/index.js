import React from 'react';
import { Route, Link } from 'react-router-dom';

import Cat from './Cat/index';
import Dog from './Dog/index';

class Home extends React.Component {
  render() {
    const {
      match
    } = this.props;

    return (
      <div>
        <h1>Home</h1>
        <Link to={ `${match.url}/cat` }>to cat view</Link> | <Link to={ `${match.url}/dog` }>to dog view</Link>

        <Route path={ `${match.url}/cat` } exact component={ Cat } />
        <Route path={ `${match.url}/dog` } exact component={ Dog } />
      </div>
    );
  }
}

export default Home;
