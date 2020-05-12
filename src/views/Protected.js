import React, { Component } from "react";

export default class Protected extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Protected</h1>
      </div>
    );
  }
}
