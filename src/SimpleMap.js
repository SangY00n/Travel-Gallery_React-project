import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';

const Marker = ({ image }) => <div style={{
  color: 'white',
  background: 'black',
  padding: '15px 15px',
  display: 'inline-flex',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  // borderRadius: '100%',
  borderRadius: '20%',
  transform: 'translate(-50%, -50%)',

  width: '50px',
  height: '50px',
  overflow: 'hidden',
  margin: '0 auto',
}}>{image}</div>;
// const handleApiLoaded = (map, maps) => {
//   // use map and maps objects
// };

class SimpleMap extends Component {
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

  imageHandler = (image) => {
    var URL = window.URL || window.wedkitURL;
    var imgURL = null;

    imgURL = URL.createObjectURL(image);

    return imgURL;
  }

  render() {

    var URL = window.URL || window.wedkitURL;
    var imageSpace = "";
    var imgURL = null;
    imgURL = URL.createObjectURL(this.props.image);
    imageSpace = <img src={imgURL} alt="게시물 이미지" style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }} />

    return (
      // Important! Always set the container height explicitly
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      // yesIWantToUseGoogleMapApiInternals={true}
      // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <Marker
          lat={this.state.center.lat}
          lng={this.state.center.lng}
          image={imageSpace}
        />
      </GoogleMapReact>
    );
  }

}

export default SimpleMap;