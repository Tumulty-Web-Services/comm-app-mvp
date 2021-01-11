/*
Documentation

this class returns the current hours minutes and AM / PM for a timezone
can be expanded on to offer different types of time it renders

*/

import React from 'react';
import moment from 'moment';

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        time: this.getTime()
      };
    }
    componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.intervalID);
    }
    tick() {
      this.setState({
        time: this.getTime()
      });
    }
    getTime() {
        return moment().format('h:mm A');
    }
    render() {
      return (
        this.state.time
      );
    }
  }

export default Clock;