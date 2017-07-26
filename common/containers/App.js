import React, { Component } from 'react';
import Header from '../components/Header';
import { renderRoutes } from 'react-router-config';

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        { renderRoutes(this.props.route.routes) }
      </div>
    );
  }
}
export default App;
