import React, { Component } from "react";
import Paginator from "../paginator/Paginator";
import { Container } from "react-bootstrap";

export default class Example extends Component {
  constructor(props) {
    super(props);

    const initialItems = [...Array.from(Array(50).keys())];
    this.state = {
      items: initialItems,
      paginationItems: []
    };

    this.onPageChanged = this.onPageChanged.bind(this);
  }

  onPageChanged = data => {
    this.setState({
      paginationItems: data.currentRecords
    });
  };

  // -------------------------- RENDER ---------------------------------------
  render() {
    const { items, paginationItems } = this.state;

    const paginator = (
      <Paginator
        allRecords={items}
        pageLimit={2}
        currentPage={1}
        pageNeighbours={2}
        onPageChanged={this.onPageChanged}
      />
    );

    return (
      <Container>
        <h1>React Bootstrap 4 Paginator</h1>
        {paginator}
        <h3>Shown Elements</h3>
        {paginationItems.map((item, index) => {
          return <p> {item} </p>;
        })}
      </Container>
    );
  }
}
