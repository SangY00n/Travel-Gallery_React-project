import React, { Component } from 'react';
import './App.css';
import PostContent from './PostContent';
import ReadContent from './ReadContent';
import backButton from './image/backButton.png';
import postButton from './image/postButton.png';
import MapReadContent from './MapReadContent';
import EditContent from './EditContent';
import Clock from './Clock';
import Login from './Login';
import BigPosting from './BigPosting';

// import sample from './image/sample.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read', // read or post
      readMode: 'board', // board or map
      contents: [
        { key: 1, title: '오설록에서', content: '이곳은 오설록입니다.', image: null, id: '상윤', posted_date: '2021.07.31 오후 7:29:54', pw: '1234', num: 1, lat: 33.30627777777778, lng: 126.28868888888888 },
      ],
      curNum: 2,
      dataToEdit: null,
      user: null,
      bigPosting: null,
      bigColor: '#e8e7e3',
    }
  }

  userHandler() {

    var curUser = null;


    const style = {
      "display": "flex",
      "align-items": "flex-start",
      "justify-content": "flex-end"
    };

    const IdStyle = {
      "display": "flex",
      "align-items": "center",
      "justify-content": "center"
    };

    if (this.state.user === null) {
      curUser = <button className="login" onClick={function () {
        this.setState({
          mode: 'login',
        })
      }.bind(this)}>로그인</button>
    } else {
      curUser =
        <div style={style}>
          <div style={IdStyle} id="userName">ID: {this.state.user.userId}</div>
          <button className="login" onClick={function () {
            this.setState({
              user: null,
            })
          }.bind(this)}>로그아웃</button>
        </div>
    }

    return curUser;
  }

  modeHandler() {
    var curMode = null;
    if (this.state.mode === 'read') {
      if (this.state.readMode === 'board') {
        curMode =
          <div className="container">
            <div className="items" id="bigPosting" style={{ backgroundColor: this.state.bigColor }}>
              <BigPosting posting={this.state.bigPosting} user={this.state.user}
                onSetLogin={function () {
                  this.setState({
                    mode: 'login',
                  })
                }.bind(this)}
                onEdit={function (dataToEdit) {
                  this.setState({
                    mode: 'edit',
                    dataToEdit: dataToEdit,
                  })
                }.bind(this)}
                onDelete={function (dataToDelete) {
                  var _contents = [...this.state.contents]
                  var deletedIndex = (this.state.curNum) - 1 - dataToDelete.num;
                  _contents.splice(deletedIndex, 1);
                  _contents.map(function (element, index) {
                    element.num = this.state.curNum - 2 - index;
                    element.key = this.state.curNum - 2 - index;
                  }.bind(this))

                  if (this.state.bigPosting.num === dataToDelete.num) {
                    this.setState({
                      mode: 'read',
                      contents: _contents,
                      curNum: this.state.curNum - 1,
                      bigPosting: null,
                    })
                  } else {
                    this.setState({
                      mode: 'read',
                      contents: _contents,
                      curNum: this.state.curNum - 1,
                    })
                  }
                }.bind(this)}></BigPosting>
            </div>
            <div className="items" id="postings">
              <ReadContent user={this.state.user} contents={this.state.contents}
                onSetLogin={function () {
                  this.setState({
                    mode: 'login',
                  })
                }.bind(this)}
                onClickOne={function (dataToBig) {
                  var curColor = null;
                  switch (dataToBig.num % 2) {
                    case 1:
                      curColor = '#e8e7e3';
                      break;
                    default:
                      curColor = '#cbd3bd';
                  }
                  this.setState({
                    bigPosting: dataToBig,
                    bigColor: curColor,
                  })
                }.bind(this)}
                onEdit={function (dataToEdit) {
                  this.setState({
                    mode: 'edit',
                    dataToEdit: dataToEdit,
                  })
                }.bind(this)}
                onDelete={function (dataToDelete) {
                  var _contents = [...this.state.contents]
                  var deletedIndex = (this.state.curNum) - 1 - dataToDelete.num;
                  _contents.splice(deletedIndex, 1);
                  _contents.map(function (element, index) {
                    element.num = this.state.curNum - 2 - index;
                    element.key = this.state.curNum - 2 - index;
                  }.bind(this))

                  if (this.state.bigPosting.num === dataToDelete.num) {
                    this.setState({
                      mode: 'read',
                      contents: _contents,
                      curNum: this.state.curNum - 1,
                      bigPosting: null,
                    })
                  } else {
                    this.setState({
                      mode: 'read',
                      contents: _contents,
                      curNum: this.state.curNum - 1,
                    })
                  }
                }.bind(this)}></ReadContent>
            </div>
          </div>
      } else if (this.state.readMode === 'map') {
        curMode = <MapReadContent contents={this.state.contents} lat={33.30627777777778} lng={126.28868888888888} zoom={10}></MapReadContent>
      }
    } else if (this.state.mode === 'post') {
      curMode = <PostContent user={this.state.user} onSubmit={function (postData) {
        var _contents = [{
          key: this.state.curNum,
          title: postData.title,
          content: postData.content,
          image: postData.image,
          id: postData.id,
          posted_date: postData.posted_date,
          pw: postData.pw,
          num: this.state.curNum,
          lat: postData.lat,
          lng: postData.lng,
        }, ...this.state.contents]
        var nextNum = this.state.curNum + 1;
        this.setState({
          mode: 'read',
          contents: _contents,
          curNum: nextNum,
        })
      }.bind(this)}></PostContent>
    } else if (this.state.mode === 'edit') {
      curMode = <EditContent content={this.state.dataToEdit} onSubmit={function (editedData) {
        var _contents = [...this.state.contents]
        _contents[(this.state.curNum) - 1 - editedData.num] = editedData;
        this.setState({
          mode: 'read',
          contents: _contents,
        })

        if (this.state.bigPosting.num === editedData.num) {
          this.setState({
            bigPosting: editedData,
          })
        }
      }.bind(this)}></EditContent>
    } else if (this.state.mode === 'login') {
      curMode = <Login onLogin={function (userData) {
        this.setState({
          mode: 'read',
          user: userData,
        })
      }.bind(this)}></Login>
    }
    return curMode;
  }

  render() {
    var buttonImg = "버튼이미지";
    var selectSpace = null;
    if (this.state.mode === 'read') {
      buttonImg = <img src={postButton} alt="post버튼" width="30" />
      selectSpace =
        <select defaultValue="Board"
          name="selectReadMode"
          id="selectReadMode"
          onChange={function (e) {
            e.preventDefault();
            if (e.target.value === "Board") {
              this.setState({
                readMode: "board",
              })
            } else if (e.target.value === "Map") {
              this.setState({
                readMode: "map",
              })
            }
            console.log(e.target.value);
          }.bind(this)}>
          <option value="Board">게시물</option>
          <option value="Map">지도</option>
        </select>
    } else if (this.state.mode === 'post' || this.state.mode === 'edit' || this.state.mode === 'login') {
      buttonImg = <img src={backButton} alt="back버튼" width="30" />
      selectSpace = null;
    }

    if (this.state.contents[0] !== null && this.state.bigPosting === null) {
      this.setState({
        bigPosting: this.state.contents[0],
      })
    }




    return (
      <div className="App">
        <div style={{ padding: '10px' }}>
          <Clock></Clock>
        </div>
        <h1 style={{ backgroundColor: '#cbd3bd', padding: '10px', margin: 0 }}>Gallery</h1>
        <div align='right' style={{ paddingRight: '20px', paddingTop: '10px' }}>{this.userHandler()}</div>
        <div>
          <button id="postButton" onClick={function (e) {
            e.preventDefault();
            if (this.state.mode === 'read') {
              if (this.state.user === null) {
                alert("로그인 후 이용해주세요.");
                this.setState({
                  mode: 'login'
                })
              } else {
                this.setState({
                  mode: 'post'
                });
              }
            } else {
              this.setState({
                mode: 'read'
              });
            }
          }.bind(this)}>{buttonImg}</button>
        </div>
        <div align='right' style={{ paddingRight: '20px', paddingBottom: '10px' }}>
          {selectSpace}
        </div>
        {this.modeHandler()}
      </div>
    );
  }
}

export default App;
