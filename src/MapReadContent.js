import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import sample from './image/sample.jpg';

const Marker = ({ image }) => <div className="markers" style={{
    color: 'white',
    background: '#455d3e',
    padding: '10px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15%',
    transform: 'translate(-50%, -50%)',

    width: '60px',
    height: '60px',
    overflow: 'hidden',
    margin: '0 auto',
    transition: '400ms ease all',
}} onMouseEnter={function (e) {
    e.target.style.width = '200px';
    e.target.style.height = '200px';
    e.target.style.padding = '30px 30px';
}} onMouseLeave={function (e) {
    e.target.style.width = '60px';
    e.target.style.height = '60px';
    e.target.style.padding = '15px 15px';
}}>{image}</div>;

class MapReadContent extends Component {
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


    // handleApiLoaded = (map, maps) => {
    //     var marker = new maps.Marker({
    //       position: this.state.center,
    //       map: map,
    //     })

    // };

    render() {
        console.log("하이", process.env.REACT_APP_API_KEY);

        var _contents = this.props.contents;
        var markers = null;

        // 구글 맵 불러오기?





        var URL = window.URL || window.wedkitURL;
        var imageSpace = "";
        var imgURL = null;

        markers = _contents.map(function (element) {
            if (element.image != null) {


                imgURL = URL.createObjectURL(element.image); //createObjectURL은 parameter로 blob만 받는다, element.image는 blob

                imageSpace = <img src={imgURL} alt="게시물 이미지" style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '15%',
                    objectFit: 'cover',
                }} />
            } else {
                imageSpace = <img src={sample} alt="오설록 사진" style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '15%',
                    objectFit: 'cover',
                }} />
            }

            return (
                <Marker
                    lat={element.lat}
                    lng={element.lng}
                    image={imageSpace}
                    key={element.num}
                />
            );
        });



        return (
            <div id="single_map" style={{ width: '100%', height: '750px' }}>

                {/* Important! Always set the container height explicitly */}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}

                // 구글맵의 map, maps를 만지기 위한 코드 두줄. handleApiLoaded 함수에서 map과 maps를 이용할 수 있다!!
                // yesIWantToUseGoogleMapApiInternals={true}
                // onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                >
                    {markers}
                </GoogleMapReact>
            </div>
        );
    }
}

export default MapReadContent;