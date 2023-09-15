import React, {useEffect, useState} from 'react';
import Text from '../Text';
import {splitTimeStamp, tickerUpdate} from '../../util/TicketUpdate/index';
import theme from '../../util/theme';


const timeStampStyle = {
  lineHeight: 12,
  marginTop: 5,
  marginRight: 2,
  fontSize: 11,
};

const Ticker = props => {
  const {currentTime, msgCount, readMsgCount} = props;
  const [time, setTime] = useState(() =>
    currentTime === 'now' ? tickerUpdate('0') : currentTime,
  );
  let timeCopy = null;
  let tickerInterval = null;

  const updateTime = val => {
    timeCopy = val;
    setTime(val);
  };

  useEffect(() => {
    // tikcer will be only work with hours and minutes not update for days,week and so forth...
    if (msgCount !== readMsgCount) {
      if (
        currentTime === 'now' ||
        splitTimeStamp(currentTime) === 'h' ||
        splitTimeStamp(currentTime) === 'm'
      ) {
        tickerInterval = setInterval(() => {
          let newVal = tickerUpdate(timeCopy ? timeCopy : currentTime);
          updateTime(newVal);
        }, 60000);
      }
      return () => {
        clearInterval(tickerInterval);
        tickerInterval = null;
      };
    }
  }, [msgCount]);

  return (
    <Text type={'caption12'} style={{color: theme.colors.brandColor.silver}}>
      {time}
    </Text>
  );
};

export default Ticker;
