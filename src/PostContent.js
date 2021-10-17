import React, { Component } from 'react';
import EXIF from 'exif-js'
import SimpleMap from './SimpleMap.js';
import GetMarkerMap from './GetMarkerMap.js';

class PostContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            wtmX: null,
            wtmY: null,
            map: null,
        }
    }



    render() {
        var mapSpace = null;

        var getMarkerMap = function () {
            var initialCenter = {
                lat: 36.01508134061981,
                lng: 129.3225570661101,
            }
            this.setState({
                wtmX: initialCenter.lat,
                wtmY: initialCenter.lng,
            })
            mapSpace = <GetMarkerMap lat={initialCenter.lat} lng={initialCenter.lng} zoom={13} onMove={function (cLat, cLng) {
                this.setState({
                    wtmX: cLat,
                    wtmY: cLng,
                });
            }.bind(this)}></GetMarkerMap>
            this.setState({
                map: mapSpace,
            })
        }.bind(this);

        // 맵에 있는 마커의 위도, 경도 정보를 받아와서 this.state.wtmX 및 wtmY에 넣어주어야 함. setState 필수! -> Submit 버튼 클릭 시

        var makingMap = function (_wtmX, _wtmY, _image) {
            this.setState({
                wtmX: _wtmX,
                wtmY: _wtmY,
            })


            mapSpace = <SimpleMap lat={_wtmX} lng={_wtmY} zoom={11} image={_image}></SimpleMap>
            this.setState({
                map: mapSpace,
            })

            // 사진에서 위치 정보 받아와서 지도 구현

            //*********** 구글 맵 google-map-react 이용
            // https://github.com/google-map-react/google-map-react
        }.bind(this);

        return (
            <div>
                {/* 아래는 사진 EXIF 가져오기 위한 코드 두줄 */}
                <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/exif-js"></script>
                <script src="vendors/exif-js/exif-js"></script>
                <form onSubmit={function (e) {
                    e.preventDefault(); // 기존 onSubmit 기능 prevent => 새로고침 안되도록!

                    var date = new Date();
                    var curDate = date.toLocaleString();
                    var postData = {
                        title: e.target.title.value,
                        content: e.target.content.value,
                        image: this.state.file,
                        id: this.props.user.userId,
                        posted_date: curDate,
                        pw: this.props.user.userPw,
                        lat: this.state.wtmX,
                        lng: this.state.wtmY,
                    }

                    console.log("this image's lat and lng is", this.state.wtmX, this.state.wtmY);


                    if (postData.title === "") {
                        alert('제목을 입력하세요.')
                    } else if (postData.content === "") {
                        alert('내용을 입력해주세요.') // 나중에 내용 비어도 괜찮냐고 물어보는 confirm 띄우기
                        // if(confirm){
                        //     postDate.content="";
                        // }
                    } else if (postData.image === "") {
                        alert('사진이 없습니다.')
                    } else {
                        this.props.onSubmit(postData);
                        alert('Posted');
                    }
                }.bind(this)}>
                    <p>
                        제목 : <input type="text" name="title" placeholder="제목"></input>
                    </p>
                    {/* <p>
                        작성자 : <input type="text" name="id" placeholder="작성자명"></input>
                    
                        &nbsp; &nbsp; &nbsp; 비밀번호 : <input type="password" name="pw" placeholder="비밀번호"></input>
                    </p> */}
                    <p>
                        <textarea style={{ width: '500px', height: '200px' }}
                            name="content" placeholder="내용을 입력해주세요"></textarea>
                    </p>
                    <p>
                        사진을 선택해주세요 : <input type="file" id="image" name="image" accept="image/*" onChange={function (e) {
                            var imageFile = e.target.files[0];
                            this.setState({
                                file: imageFile,
                            })


                            // 사진 미리보기 구현
                            var reader = new FileReader();
                            reader.onload = function (event) {
                                var img = document.createElement("img");
                                img.setAttribute("src", event.target.result);
                                img.setAttribute("width", 400); // 사진 미리보기 img 태그의 witdh 설정
                                img.setAttribute("id", "thumbnailImg"); // 사진 미리보기 img 태그의 id 설정
                                document.querySelector("div#image_container").appendChild(img);

                                //사진 미리보기 구현은 끝



                                // reader.onload 과정에서 이미지의 EXIF 정보도 불러와 사진을 찍은 위치(위도, 경도) 가져오기
                                var tags = null;
                                var _wtmX = null;
                                var _wtmY = null;

                                EXIF.getData(imageFile, () => {

                                    tags = EXIF.getAllTags(imageFile);

                                    var exifLong = tags.GPSLongitude;
                                    var exifLat = tags.GPSLatitude;
                                    var exifLongRef = tags.GPSLongitudeRef;
                                    var exifLatRef = tags.GPSLatitudeRef;

                                    var latitude = null;
                                    var longitude = null;


                                    if (exifLat != null && exifLong != null) {
                                        if (exifLatRef === "S") {
                                            latitude = (exifLat[0] * -1) + (((exifLat[1] * -60) + (exifLat[2] * -1)) / 3600);
                                        } else {
                                            latitude = exifLat[0] + (((exifLat[1] * 60) + exifLat[2]) / 3600);
                                        }

                                        if (exifLongRef === "W") {
                                            longitude = (exifLong[0] * -1) + (((exifLong[1] * -60) + (exifLong[2] * -1)) / 3600);
                                        } else {
                                            longitude = exifLong[0] + (((exifLong[1] * 60) + exifLong[2]) / 3600);
                                        }
                                    } else {
                                        getMarkerMap();
                                        console.log("exif에서 위도 경도 얻을 수 없음");
                                    }


                                    if (latitude != null && longitude != null) {
                                        _wtmX = latitude;
                                        _wtmY = longitude;
                                        makingMap(_wtmX, _wtmY, imageFile); // map 만드는 함수 호춤
                                    }

                                    // 객체 내용 확인
                                    // console.log(tags);
                                    // 메타데이터 값 확인
                                    // console.log(tags.Artist);
                                    // console.log(tags.Orientation);
                                    // // 모든 키와 해당 키의 값 얻기
                                    // for( let key in tags) {
                                    //     console.log(key);
                                    //     console.log(tags[key]);
                                    // }



                                });




                            };
                            reader.readAsDataURL(e.target.files[0]);

                        }.bind(this)}></input>
                    </p>
                    <p>
                        <input type="submit" value="Post"></input>
                    </p>
                    <p>사진 미리보기</p>
                    <div id="image_container"></div>
                    <div id="single_map" style={{ width: '100%', height: '400px' }}>{this.state.map}</div>
                </form>
            </div>
        );
    }
}

export default PostContent;