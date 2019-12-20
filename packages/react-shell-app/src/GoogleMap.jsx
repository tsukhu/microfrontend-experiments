import React, { Component } from "react";

export default class extends Component {
  // After the first render do not rerender
  shouldComponentUpdate() {
    return false;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.map.panTo({ lat: nextProps.lat , lng: nextProps.lng})
  }

  componentDidMount() {
    this.map = new window.google.maps.Map(this.refs.map, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: 8
    });
  }

  render() {
    return <div id="map" ref="map" />;
  }
}
