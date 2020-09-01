import React, { Component } from "react";

class CellGrid extends Component {
  render() {
    return this.getCellGrid();
  }

  getCellClasses(row, col) {
    let classes = "btn rounded-0 square cell btn-";
    classes += this.props.currentState[row][col] === 1 ? "dark" : "light";
    return classes;
  }

  getCell(row, col) {
    return (
      <span
        type="button"
        className={this.getCellClasses(row, col)}
        onClick={() => this.props.onCellClick(row, col)}>
      </span>
    );
  }

  getCellRow(rowArray, row) {
    let col = 0;
    return (
      <tr key={row}>
        {rowArray.map(() => (
          <th key={col}>{this.getCell(row, col++)}</th>
        ))}
      </tr>
    );
  }

  getCellGrid() {
    let row = 0;
    return (
      <table className="w3-centered w3-card-4">
        {/* <tbody>
          {this.props.currentState.map((rowArray) =>
            this.getCellRow(rowArray, row++)
          )}
        </tbody> */}
      </table>
    );
  }
}

export default CellGrid;