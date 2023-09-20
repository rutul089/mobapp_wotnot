import React, {useState, useEffect} from 'react';

import {Text} from '../../../../../components';
import {
  splitTimeStamp,
  tickerUpdate,
} from '../../../../../util/TicketUpdate/index';

const ChatItemTicker = props => {
  const {time, ...otherProps} = props;
  const [tickerTime, setTickerTime] = useState(time);
  let timeCopy = null;
  let tickerInterval = null;

  const updateTime = val => {
    timeCopy = val;
    setTickerTime(val);
  };

  useEffect(() => {
    if (
      tickerTime === '0' ||
      tickerTime === 'now' ||
      splitTimeStamp(tickerTime) === 'h' ||
      splitTimeStamp(tickerTime) === 'm'
    ) {
      tickerInterval = setInterval(() => {
        let newVal = tickerUpdate(timeCopy ? timeCopy : time);
        updateTime(newVal);
      }, 60000);
    }
    return () => {
      clearInterval(tickerInterval);
      tickerInterval = null;
    };
  }, []);

  return <Text type={'caption12'} {...otherProps}>{tickerTime}</Text>;
};

export default ChatItemTicker;
