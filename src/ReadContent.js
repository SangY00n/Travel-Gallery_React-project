import React, { Component } from 'react';
import sample from './image/sample.jpg';


class ReadContent extends Component {

    checkUser(cUserId, cUserPw) {
        return (cUserId === this.props.user.userId && cUserPw === this.props.user.userPw) ? true : false;
    }

    render() {
        var _contents = this.props.contents;
        var viewContent = null;

        var URL = window.URL || window.wedkitURL; //

        var imageSpace = "";

        var imgURL = null;

        var curColor = 'lightcoral';

        viewContent = _contents.map(function (element) {
            if (element.image != null) {

                imgURL = URL.createObjectURL(element.image); //createObjectURL은 parameter로 blob만 받는다, element.image는 blob

                imageSpace = <img src={imgURL} alt="게시물 이미지" width="150" />
            } else {
                // imageSpace="**이미지가 없는 게시물입니다.**"
                imageSpace = <img src={sample} alt="오설록 사진" width="150" />
            }


            switch (element.num % 2) {
                case 1:
                    curColor = '#e8e7e3';
                    break;
                default:
                    curColor = '#cbd3bd';
            }

            return (
                <div id="posting" key={element.num} style={{ backgroundColor: curColor, cursor: 'pointer' }}
                    onClick={function (e) {
                        e.preventDefault();
                        this.props.onClickOne(element);
                    }.bind(this)}>
                    <div>
                        <div style={{ display: 'flex', alignContent: 'center' }}>
                            <div style={{ flex: 3, padding: '20px' }}>
                                <div align="left">#{element.num}</div>
                                <div align="right">{element.id}</div>
                                <div align="left" style={{ fontSize: "24px" }}>{element.title}</div>
                                <div align="right">작성일 : {element.posted_date}</div>
                                <span style={{ float: "right" }}>
                                    <button className="buttons" onClick={function (e) {
                                        e.preventDefault();
                                        if (this.props.user === null) {
                                            alert("로그인 후 이용해주세요.");
                                            this.props.onSetLogin();
                                        } else {
                                            if (this.checkUser(element.id, element.pw)) {
                                                this.props.onEdit(element);
                                            } else {
                                                alert("다른 사용자가 작성한 게시물입니다.")
                                            }
                                        }

                                    }.bind(this)}>수정</button>
                                    <button className="buttons" onClick={function (e) {
                                        e.preventDefault();
                                        if (this.props.user === null) {
                                            alert("로그인 후 이용해주세요.");
                                            this.props.onSetLogin();
                                        } else {
                                            if (this.checkUser(element.id, element.pw)) {
                                                var checkDelete = window.confirm("정말 삭제하시겠습니까?");
                                                if (checkDelete) {
                                                    this.props.onDelete(element);
                                                    alert(element.num + "번 게시물이 삭제되었습니다.");
                                                }
                                            } else {
                                                alert("다른 사용자가 작성한 게시물입니다.")
                                            }
                                        }
                                    }.bind(this)}>삭제</button>
                                </span>
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {imageSpace}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }.bind(this)
        );



        return (
            <div id="postingContainer">
                {viewContent}
            </div>
        );
    }
}

export default ReadContent;