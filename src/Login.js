import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <form onSubmit={function (e) {
                    e.preventDefault();
                    var userData = {
                        userId: e.target.id.value,
                        userPw: e.target.pw.value,
                    }

                    if (userData.userId === "") {
                        alert('아이디를 입력해주세요.')
                    } else if (userData.userPw === "") {
                        alert('비밀번호를 입력해주세요.')
                    } else {
                        this.props.onLogin(userData);
                    }
                }.bind(this)}>
                    <div>
                        <p>
                            ID <input type="text" name="id" placeholder="아이디"></input>
                        </p>
                        <p>
                            비밀번호 <input type="password" name="pw" placeholder="비밀번호"></input>
                        </p>
                    </div>
                    <div>
                        <input type="submit" value="로그인"></input>
                    </div>

                </form>
            </div>
        );
    }
}

export default Login;