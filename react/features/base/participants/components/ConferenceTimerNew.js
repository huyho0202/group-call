// @flow

import React, { Component } from 'react';

// import { renderConferenceTimer } from '../';
import { getConferenceTimestamp } from '../../../base/conference/functions';
import { getLocalizedDurationFormatter } from '../../../base/i18n';
// import { connect } from '../../../base/redux';
import { connect } from '../../../base/redux';

import { Text } from 'react-native';

class ConferenceTimer extends Component<Props, State> {
    constructor(props: Props) {
      super(props)

      this.state = {
        timerValue: 0,
        timerStr: ''
      }
    }

    
    componentDidMount() {
      this._startTimer();
    }

    componentWillUnmount() {
      this._stopTimer();
    }

    secondToTime(second) {
      if (second && !isNaN(second)) {
        let sec_num = parseInt(second, 10)
        let hours = Math.floor(sec_num / 3600)
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60)
        let seconds = sec_num - (hours * 3600) - (minutes * 60)

        if (hours < 10) { hours = '0' + hours }
        if (minutes < 10) { minutes = '0' + minutes }
        if (seconds < 10) { seconds = '0' + seconds }
        if (second < 3600) {
          return minutes + ':' + seconds;
        } else {
          return hours + ':' + minutes + ':' + seconds
        }
      } else {
        return '00:00'
      }
    }
    
    render() {
      const { timerValue, timerStr } = this.state;
      const { textStyle, _startTimestamp } = this.props;

      if (!_startTimestamp) {
        return null;
      }

      return <Text numberOfLines = { 1 } style = { textStyle }>
        { timerStr }
      </Text>
    }
   
    _startTimer() {
      let timerValue = this.state.timerValue
      if (!this._interval) {
        this._interval = setInterval(() => {
          timerValue += 1
          if (this.props._startTimestamp) {
            let timenow = Math.floor(Date.now() / 1000)
            let timestart = Math.floor(this.props._startTimestamp / 1000)
            let strTimerValue = this.secondToTime((timenow - timestart) + 1)
            this.setState({
              timerStr: strTimerValue
            })
          }
        }, 1000)
      }
    }

    _stopTimer() {
      if (this._interval) {
        clearInterval(this._interval);
      }

      this.setState({
        timerValue: 0,
        timerStr: ''
      });
    }
}


export function _mapStateToProps(state: Object) {
  return {
    _startTimestamp: getConferenceTimestamp(state)
  };
}


const ConferenceTimerNew = connect(
  _mapStateToProps
)(ConferenceTimer)

export default ConferenceTimerNew
