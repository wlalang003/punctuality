import React, { Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
//import moment from 'moment';
export default class PunctualityTableRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const row = this.props.row;
    return (
      <TableRow>
        <TableRowColumn>{row.day.format('MMMM Do YYYY')}</TableRowColumn>
        <TableRowColumn>{row.rosterStart.format('HH:mma')}</TableRowColumn>
        <TableRowColumn>{this.parseShiftStart(row.shiftStart)}</TableRowColumn>
        <TableRowColumn>{row.rosterFinish.format('HH:mma')}</TableRowColumn>
        <TableRowColumn>
          {this.parseShiftFinish(row.shiftFinish)}
        </TableRowColumn>
      </TableRow>
    );
  }
  parseShiftStart(shiftStart) {
    if (shiftStart == null) {
      return 'no start time clocked';
    }
    // parse isBefore or After
    return 'on time';
  }
  parseShiftFinish(shiftFinish) {
    if (shiftFinish == null) {
      return 'no finish time clocked';
    }
    // parse isBefore or After
    return 'on time';
  }
}
