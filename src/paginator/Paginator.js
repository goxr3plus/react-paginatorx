import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./Paginator.css";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

class Paginator extends Component {
  constructor(props) {
    super(props);

    //Vars
    const {
      allRecords,
      pageLimit = 10,
      currentPage = 1,
      pageNeighbours = 0
    } = this.props;

    //State
    this.state = {
      pageNeighbours: Math.max(0, Math.min(pageNeighbours, 2)),
      totalPages: Math.ceil(allRecords.length / pageLimit),
      currentPage
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!_.isEqual(prevProps.allRecords, this.props.allRecords)) {
      //Vars
      const { allRecords, pageLimit = 10, pageNeighbours = 0 } = this.props;

      //State
      this.setState(
        {
          pageNeighbours: Math.max(0, Math.min(pageNeighbours, 2)),
          totalPages: Math.ceil(allRecords.length / pageLimit),
          currentPage: 1
        },
        () => this.gotoPage(1)
      );
    }
  };

  componentDidMount = () => {
    this.gotoPage(this.state.currentPage);
  };

  gotoPage = page => {
    const { allRecords, pageLimit, onPageChanged = f => f } = this.props;
    const { totalPages } = this.state;

    const currentPage = Math.max(0, Math.min(page, totalPages));
    const offset = (currentPage - 1) * pageLimit;
    const currentRecords = [...allRecords].slice(offset, offset + pageLimit);

    const paginationData = {
      allRecords,
      currentPage,
      totalPages,
      currentRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, e) => {
    e.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = e => {
    e.preventDefault();
    this.gotoPage(this.state.currentPage - this.state.pageNeighbours * 2 - 1);
  };

  handleMoveRight = e => {
    e.preventDefault();
    this.gotoPage(this.state.currentPage + this.state.pageNeighbours * 2 + 1);
  };

  range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

  fetchPageNumbers = () => {
    const { pageNeighbours, currentPage, totalPages } = this.state;

    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = this.range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = this.range(
          startPage - singleSpillOffset,
          startPage - 1
        );
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = this.range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return this.range(1, totalPages);
  };

  render() {
    // if (!this.state.totalRecords) return null //TO think

    if (this.state.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    console.log("Reached here");

    return (
      <div>
        <nav aria-label="Pagination">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden="true">&lt;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={this.handleMoveRight}
                    >
                      <span aria-hidden="true">&gt;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? " active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={e => this.handleClick(page, e)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }
}

Paginator.propTypes = {
  allRecords: PropTypes.array.isRequired,
  pageLimit: PropTypes.number.isRequired,
  pageNeighbours: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired
};

export default Paginator;
