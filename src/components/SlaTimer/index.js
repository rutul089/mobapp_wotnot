import React, {useEffect, useState} from 'react';
import Text from '../Text';
import {splitTimeStamp, tickerUpdate} from '../../util/TicketUpdate/index';
import theme from '../../util/theme';
import Countdown from 'react-countdown';
import {View, Image} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import images from '../../assets/images';

const timeStampStyle = {
  lineHeight: 12,
  marginTop: 5,
  marginRight: 2,
  fontSize: 11,
};

const SlaTimer = props => {
  const {comparisonTime, slaDurationInMs} = props;

  const [timeDiffrence, setTimeDifference] = useState(
    Date.now() + (slaDurationInMs - (Date.now() - comparisonTime)),
  );

//   console.log('timeDiffrence', Date.now());
//   console.log('slaDurationInMs', slaDurationInMs);
//   console.log('comparisonTime', comparisonTime);

  useEffect(() => {
    // formula to get remaining time
    !props.shouldNotUpdate
      ? setTimeDifference(
          Date.now() + (slaDurationInMs - (Date.now() - comparisonTime)),
        )
      : null;
  }, [comparisonTime]);

  const getPercent = time => {
    return 100 - Math.floor((time * 100) / slaDurationInMs);
  };

  return (
    <>
      <Countdown
        date={timeDiffrence}
        key={timeDiffrence}
        intervalDelay={0}
        precision={0}
        renderer={({hours, minutes, seconds, ...props}) => {
          let percent = getPercent(props.total);
          percent = percent > 95 ? 95 : percent;
          let color = percent > 75 ? 'red' : '#13BE66';
          return (
            <>
              {props.total > 5 ? (
                <AnimatedCircularProgress
                  size={theme.normalize(13)}
                  width={theme.normalize(6)}
                  fill={100}
                  tintColor="white"
                  backgroundColor={color}
                  padding={0}
                  duration={slaDurationInMs}
                  prefill={percent > 95 ? 95 : percent}
                  style={{transform: [{rotate: '270deg'}]}}
                />
              ) : (
                <Image
                  source={images.is_sla_err}
                  style={{
                    height: theme.normalize(13),
                    width: theme.normalize(13),
                  }}
                />
              )}
            </>
          );
        }}
      />
    </>
  );
};

export default SlaTimer;
