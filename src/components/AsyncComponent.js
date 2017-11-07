import React from 'react'

import Loading from './Loading';

export default loadComponent => (
  class AsyncComponent extends React.Component {
    state = {
      Component: null,
    }

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }

      loadComponent()
        .then(module => module.default)
        .then((Component) => {
          if (!this.unmount) {
            this.setState({ Component });
          }
        })
        .catch((err) => {
          console.error(`Cannot load component in <AsyncComponent />`);
          throw err;
        });
    }

    componentWillUnmount() {
      this.unmount = true;
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const { Component } = this.state;
      return (Component) ? <Component {...this.props} /> : <Loading />;
    }
  }
);
