import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import PunctualityTableRow from './PunctualityTableRow';
const tableData = [
  {
    name: 'John Smith',
    status: 'Employed'
  },
  {
    name: 'Randal White',
    status: 'Unemployed'
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed'
  },
  {
    name: 'Steve Brown',
    status: 'Employed'
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed'
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed'
  },
  {
    name: 'Adam Moore',
    status: 'Employed'
  }
];

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

  renderTable() {
    console.log(this.props);
    return (
      <div>
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
            {this.props.punctuality.map((row, index) => (
              <PunctualityTableRow key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps({ punctuality }) {
  return { punctuality };
}

export default connect(mapStateToProps)(PunctualityTable);
