import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableFooter,
  TableRowColumn
} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import PunctualityTableRow from './PunctualityTableRow';

class PunctualityTable extends Component {
  state = {
    fixedHeader: true,
    fixedFooter: false,
    stripedRows: false,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false
  };

  handleShiftsPerPage(event, index, value) {
    let newPerPage = value;
    if (value === 'all') {
      newPerPage = this.props.punctuality.length;
    }
    this.props.updatePerPage(newPerPage, value);
  }

  handleShiftsPrev() {
    this.props.updatePage(this.props.pagination.page - 1);
  }

  handleShiftsNext() {
    this.props.updatePage(this.props.pagination.page + 1);
  }

  computePaginationIndex() {
    const pagination = this.props.pagination;
    const endIndex = pagination.page * pagination.perPage - 1;
    const startIndex = endIndex - pagination.perPage + 1;
    return {
      endIndex,
      startIndex
    };
  }

  render() {
    switch (this.props.punctuality) {
      case null:
        return <div>Loading</div>;
      default:
        return this.renderTable();
    }
  }

  renderTableRows() {
    const rows = this.props.punctuality.sort((a, b) => {
      return b.day.toDate() - a.day.toDate();
    });
    const pagination = this.computePaginationIndex();
    return rows.map((row, index) => {
      if (index <= pagination.endIndex && index >= pagination.startIndex) {
        return <PunctualityTableRow key={index} row={row} />;
      }
      return null;
    });
  }

  renderTable() {
    return (
      <Table
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={this.state.selectable}
        multiSelectable={this.state.multiSelectable}
      >
        <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          enableSelectAll={this.state.enableSelectAll}
        >
          <TableRow>
            <TableHeaderColumn>Day</TableHeaderColumn>
            <TableHeaderColumn>Rostered Start</TableHeaderColumn>
            <TableHeaderColumn>Actual Start</TableHeaderColumn>
            <TableHeaderColumn>Rostered Finish</TableHeaderColumn>
            <TableHeaderColumn>Actual Finish</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}
        >
          {this.renderTableRows()}
        </TableBody>
        <TableFooter adjustForCheckbox={false}>
          <TableRow>
            <TableRowColumn style={{ textAlign: 'left' }}>
              <SelectField
                floatingLabelText="Shifts per page"
                value={this.props.pagination.menuValue}
                onChange={this.handleShiftsPerPage.bind(this)}
              >
                <MenuItem value={25} primaryText="25" />
                <MenuItem value={50} primaryText="50" />
                <MenuItem value={100} primaryText="100" />
                <MenuItem value={'all'} primaryText="All" />
              </SelectField>
            </TableRowColumn>
            <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
              {this.renderTotalCountFooter()}
            </TableRowColumn>
            <TableRowColumn style={{ textAlign: 'right' }}>
              <div>
                <FlatButton
                  label="Previous"
                  disabled={this.props.pagination.page === 1}
                  onClick={this.handleShiftsPrev.bind(this)}
                  style={{ marginRight: 12 }}
                />
                <FlatButton
                  label="Next"
                  disabled={
                    this.props.pagination.page >=
                    this.props.punctuality.length /
                      this.props.pagination.perPage
                  }
                  onClick={this.handleShiftsNext.bind(this)}
                />
              </div>
            </TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }

  renderTotalCountFooter() {
    const pagination = this.computePaginationIndex();
    const start = pagination.startIndex + 1;
    const end = pagination.endIndex + 1;
    const totalLength = this.props.punctuality.length;
    return (
      'Showing ' +
      start +
      ' to ' +
      (end > totalLength ? totalLength : end) +
      ' of ' +
      totalLength +
      ' shifts'
    );
  }
}

function mapStateToProps({ punctuality, pagination }) {
  return { punctuality, pagination };
}

export default connect(mapStateToProps, actions)(PunctualityTable);
