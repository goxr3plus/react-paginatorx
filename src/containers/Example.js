import React, { Component } from "react";
import Paginator from "../paginator/Paginator";

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: ["a", "b", "c"]
    };

    this.onPageChanged = this.onPageChanged.bind(this);
  }

  onPageChanged = data => {
    this.setState({
      items: data.currentRecords
    });
  };

  // -------------------------- RENDER ---------------------------------------
  render() {
    const { items } = this.state;

    const paginator = (
      <Paginator
        allRecords={items}
        pageLimit={1}
        currentPage={1}
        pageNeighbours={1}
        onPageChanged={this.onPageChanged}
      />
    );

    return (
      <div style={{ marginTop: "10px", marginRight: "15px" }}>
        <h1> Paginator Example</h1>
        {paginator}
      </div>
    );
  }
}
