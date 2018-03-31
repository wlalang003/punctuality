import React, { Component } from 'react';
//import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PunctualityTable from './PunctualityTable';

class App extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.dates.from, this.props.dates.to);
  }
  render() {
    return (
      <MuiThemeProvider>
        <PunctualityTable />
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ dates }) {
  return { dates };
}

export default connect(mapStateToProps, actions)(App);
