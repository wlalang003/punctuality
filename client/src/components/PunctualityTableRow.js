import React, { Component } from 'react';
import moment from 'moment';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
//import moment from 'moment';
export default class PunctualityTableRow extends Component {
  durationStyle = {
    display: 'inline-block',
    marginLeft: 5,
    backgroundColor: 'red',
    color: 'white',
    padding: 3
  };
  constructor(props) {
    super(props);
  }
  render() {
    const row = this.props.row;
    return (
      <TableRow>
        <TableRowColumn>{row.day.format('MMMM Do YYYY')}</TableRowColumn>
        <TableRowColumn>{row.rosterStart.format('HH:mma')}</TableRowColumn>
        <TableRowColumn>
          {this.renderShiftStart(row.shiftStart, row.rosterStart)}
        </TableRowColumn>
        <TableRowColumn>{row.rosterFinish.format('HH:mma')}</TableRowColumn>
        <TableRowColumn>
          {this.renderShiftFinish(row.shiftFinish, row.rosterFinish)}
        </TableRowColumn>
      </TableRow>
    );
  }

  renderDuration(duration) {
    return <Paper style={this.durationStyle}>{duration}</Paper>;
  }

  renderShiftStart(shiftStart, rosterStart) {
    if (shiftStart == null) {
      return 'no start time clocked';
    }
    let message = '';
    let duration = null;
    if (rosterStart.isBefore(shiftStart, 'minute')) {
      duration = moment.duration(shiftStart.diff(rosterStart)).humanize();
      message = 'arrived late';
    } else {
      message = 'on time';
    }

    return (
      <Tooltip
        placement="top"
        trigger={['hover']}
        overlay={<span>{shiftStart.format('HH:mma')}</span>}
      >
        <span>
          {message}
          {duration != null ? this.renderDuration(duration) : null}
        </span>
      </Tooltip>
    );
  }
  renderShiftFinish(shiftFinish, rosterFinish) {
    if (shiftFinish == null) {
      return 'no finish time clocked';
    }
    let duration = null;
    let message = '';
    if (rosterFinish.isAfter(shiftFinish, 'minute')) {
      duration = moment.duration(rosterFinish.diff(shiftFinish)).humanize();
      message = 'left early';
    } else {
      message = 'on time';
    }

    return (
      <Tooltip
        placement="top"
        trigger={['hover']}
        overlay={<span>{shiftFinish.format('HH:mma')}</span>}
      >
        <span>
          {message}
          {duration != null ? this.renderDuration(duration) : null}
        </span>
      </Tooltip>
    );
  }
}
