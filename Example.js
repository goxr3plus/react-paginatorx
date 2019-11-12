import React, { Component } from 'react'

import Paginator from './../../components/Paginator/index'

class Example extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
    }

    this.onPageChanged = this.onPageChanged.bind(this)
  }

  onPageChanged = data => {
    this.setState({
      items: data.currentRecords,
    })
  }

  // -------------------------- RENDER ---------------------------------------
  render() {

    const paginator = (
      <Paginator
        allRecords={items}
        pageLimit={3}
        currentPage={1}
        pageNeighbours={1}
        onPageChanged={this.onPageChanged}
      />
    )
    
    return (
              <div style={{ marginTop: '10px', marginRight: '15px' }} className="pull-right">
                {paginator}
              </div>
           )
 }
}   
