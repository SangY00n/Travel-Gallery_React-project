import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        }
    }

    componentDidMount() {
        this.timerId = setInterval(this.setCurTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    setCurTime = () => {
        this.setState({
            date: new Date(),
        })
    }

    render() {
        var curTime = this.state.date.toLocaleTimeString();
        return (
            <div>
                {curTime}
            </div>
        );
    }

}

export default Clock;