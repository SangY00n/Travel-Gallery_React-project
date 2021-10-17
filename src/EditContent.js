import React, { Component } from 'react';
import GetMarkerMap from './GetMarkerMap.js';
import sample from './image/sample.jpg';


class EditContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: this.props.content.image,
            wtmX: this.props.content.lat,
            wtmY: this.props.content.lng,
        }
    }



    render() {
        var mapSpace = null;
        mapSpace = <GetMarkerMap lat={this.props.content.lat} lng={this.props.content.lng} zoom={13} onMove={function (cLat, cLng) {
            this.setState({
                wtmX: cLat,
                wtmY: cLng,
            });
        }.bind(this)}></GetMarkerMap>

        // 맵에 있는 마커의 위도, 경도 정보를 받아와서 this.state.wtmX 및 wtmY에 넣어주어야 함. setState 필수! -> Submit 버튼 클릭 시


        var URL = window.URL || window.wedkitURL; //
        var imageSpace = "";
        var imgURL = null;
        if (this.props.content.image != null) {

            imgURL = URL.createObjectURL(this.props.content.image); //createObjectURL은 parameter로 blob만 받는다, element.image는 blob

            imageSpace = <img src={imgURL} alt="게시물 이미지" width="400" />
        } else {
            // imageSpace="**이미지가 없는 게시물입니다.**"
            imageSpace = <img src={sample} alt="오설록 사진" width="400" />
        }


        var initTitle = this.props.content.title;
        var initTextarea = this.props.content.content;


        return (
            <div>
                <form onSubmit={function (e) {
                    e.preventDefault(); // 기존 onSubmit 기능 prevent => 새로고침 안되도록!

                    // var date = new Date();
                    // var curDate = date.toLocaleString();
                    // 나중에 수정일도 추가할까 생각 중
                    var editedData = {
                        title: e.target.title.value,
                        content: e.target.content.value,
                        image: this.props.content.image,
                        id: this.props.content.id,
                        posted_date: this.props.content.posted_date,
                        pw: this.props.content.pw,
                        lat: this.state.wtmX,
                        lng: this.state.wtmY,
                        key: this.props.content.key,
                        num: this.props.content.num,
                    }

                    console.log("this image's lat and lng is", this.state.wtmX, this.state.wtmY);


                    if (editedData.title === "") {
                        alert('제목을 입력해주세요.')
                    } else if (editedData.content === "") {
                        alert('내용을 입력해주세요.') // 나중에 내용 비어도 괜찮냐고 물어보는 confirm 띄우기
                        // if(confirm){
                        //     postDate.content="";
                        // }
                    } else if (editedData.image === "") {
                        alert('사진이 없습니다.')
                    } else {
                        this.props.onSubmit(editedData);
                        alert('Edited');
                    }
                }.bind(this)}>
                    <p>
                        제목 : <input type="text" name="title" placeholder="제목" defaultValue={initTitle}></input>
                    </p>
                    {/* <p>
                        작성자 : <input type="text" name="id" placeholder="작성자명" value={this.props.content.id}></input>

                        &nbsp; &nbsp; &nbsp; 비밀번호 : <input type="password" name="pw" placeholder="비밀번호" value={this.props.content.pw}></input>
                    </p> */}
                    <p>
                        <textarea style={{ width: '500px', height: '200px' }}
                            name="content" placeholder="내용을 입력해주세요" defaultValue={initTextarea}></textarea>
                    </p>
                    <p>
                        <input type="submit" value="Edit"></input>
                    </p>
                    <p>사진 미리보기</p>
                    <div id="image_container">{imageSpace}</div>
                    <div id="single_map" style={{ width: '100%', height: '400px' }}>{mapSpace}</div>
                </form>
            </div>
        );
    }
}

export default EditContent;