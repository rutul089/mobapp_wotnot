import React, {Dimensions} from 'react-native';
import {Circle, Svg} from 'react-native-svg';

const {width, height} = Dimensions.get('screen');
const Circle_Length = 5;
const Radius = Circle_Length / (2 * Math.PI);

const ActivityIndicator = () => {
  return (
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Svg style={{height: 30, width: 30, backgroundColor: 'yellow'}}>
      {/* <Circle
          cx={width / 2}
          cy={height / 2}
          r={Radius}
          stroke="#404258"
          fill="#fff"
          strokeWidth={35}
        /> */}
      <Circle
        viewBox="0 0 40 40"
        cx={30}
        cy={30}
        r={Radius}
        fill="#82CD47"
        strokeDasharray={Circle_Length}
        strokeLinecap="round"
      />
    </Svg>
    // </View>
  );
};

export default ActivityIndicator;
