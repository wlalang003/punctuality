import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
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
    const pagination = this.props.pagination;
    const endIndex = pagination.page * pagination.perPage - 1;
    const startIndex = endIndex - pagination.perPage + 1;
    return rows.map((row, index) => {
      if (index <= endIndex && index >= startIndex) {
        return <PunctualityTableRow key={index} row={row} />;
      }
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
            // TODO: add sort key icons?
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
      </Table>
    );
  }
}

function mapStateToProps({ punctuality, pagination }) {
  return { punctuality, pagination };
}

export default connect(mapStateToProps)(PunctualityTable);
