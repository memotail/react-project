import React from 'react';
import { Link } from 'react-router-dom';

class Cat extends React.Component {
  render() {
    return (
      <div>
        Cat category, <Link to="/home/cat/detail/1">to Cat Detail</Link>
      </div>
    );
  }
}

export default Cat;
