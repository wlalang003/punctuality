import React, { Component } from 'react';
//import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PunctualityTable from './PunctualityTable';
import { Card, CardHeader, CardText } from 'material-ui/Card';

class App extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.dates.from, this.props.dates.to);
  }
  render() {
    return (
      <MuiThemeProvider>
        <Card>
          <CardHeader
            title="Carlo"
            style={{ borderBottom: '1px solid rgb(201, 227, 230)' }}
            titleStyle={{ fontSize: 20 }}
            avatar="https://udemy-images.udemy.com/user/50x50/28935206_a773.jpg"
          />
          <CardText>
            <PunctualityTable />
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ dates }) {
  return { dates };
}

export default connect(mapStateToProps, actions)(App);
