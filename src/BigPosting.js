import React, { Component } from 'react';
import sample from './image/sample.jpg';

class BigPosting extends Component {

    checkUser(cUserId, cUserPw) {
        return (cUserId === this.props.user.userId && cUserPw === this.props.user.userPw) ? true : false;
    }

    render() {
        var URL = window.URL || window.wedkitURL; //
        var imageSpace = "";
        var imgURL = null;

        var element = this.props.posting;

        if (element === null || element === undefined) {
            console.log(element);
            return (
                <div>

                </div>
            );
        } else {
            if (element.image != null) {

                imgURL = URL.createObjectURL(element.image); //createObjectURL은 parameter로 blob만 받는다, element.image는 blob

                imageSpace = <img src={imgURL} alt="게시물 이미지" width="400" />
            } else {
                // imageSpace="**이미지가 없는 게시물입니다.**"
                imageSpace = <img src={sample} alt="오설록 사진" width="400" />
            }
        }


        // var curColor = null;
        // switch (element.num % 2) {
        //     case 1:
        //         curColor = '#e8e7e3';
        //         break;
        //     default:
        //         curColor = '#cbd3bd';
        // }

        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ width: '400px', display: 'inline-block' }}>
                    <p align="left">#{element.num}</p>
                    <h2 align="left">{element.title}</h2>
                    <p align="right">{element.id} </p>
                    <p>{element.content}</p>
                    {imageSpace}
                    <p>작성일 : {element.posted_date}</p>
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
            </div>
        );

    }
}

export default BigPosting;