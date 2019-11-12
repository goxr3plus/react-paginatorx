# React-paginator
A ReactJS component that creates a pagination .

![image](https://user-images.githubusercontent.com/20374208/67392023-77849800-f5a8-11e9-8cd9-95e6eed9bdf0.png)


# TODO
* Add more functionality like [ Go To Page ]
* Provide more listeners
* Publish it on npm central

# Example Usage 

```JS
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

```
