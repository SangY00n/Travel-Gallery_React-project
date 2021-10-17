import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div style={{
//   color: 'white', 
//   background: 'grey',
//   padding: '15px 10px',
//   display: 'inline-flex',
//   textAlign: 'center',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: '100%',
//   transform: 'translate(-50%, -50%)'
// }}>{text}</div>;

class GetMarkerMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: this.props.lat,
        lng: this.props.lng,
      },
      zoom: this.props.zoom,
    }
  }

  handleApiLoaded = (map, maps) => {
    var marker = new maps.Marker({
      position: this.state.center,
      map: map,
    })
    marker.bindTo('position', map, 'center');

    maps.event.addListener(map, 'dragend', function () {
      // console.log(map.center.lat());

      this.props.onMove(map.center.lat(), map.center.lng());
    }.bind(this))

    maps.event.addListener(map, 'zoom_changed', function () {

      this.props.onMove(map.center.lat(), map.center.lng());
    }.bind(this))

  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}


        // 구글맵의 map, maps를 만지기 위한 코드 두줄. handleApiLoaded 함수에서 map과 maps를 이용할 수 있다!!
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
      >
      </GoogleMapReact>
    );
  }

}

export default GetMarkerMap;