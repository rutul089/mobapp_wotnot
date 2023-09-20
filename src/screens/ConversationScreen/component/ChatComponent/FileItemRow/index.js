import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '../../../../../components';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {styles as chatBubbleStyle} from '../ChatStyle/chatBubbleStyle';

const FileItemRow = ({
  ext,
  fileName,
  onFileClick = () => {},
  tintColor = 'white',
  iconTintColor = 'white',
}) => (
  <TouchableOpacity
    style={{flexDirection: 'row'}}
    activeOpacity={0.7}
    onPress={onFileClick}>
    <IconAnt
      size={20}
      name={ext}
      color={iconTintColor}
      style={{paddingLeft: 5, padding: 10, paddingRight: 0}}
    />
    <Text type={'body2'} style={chatBubbleStyle.textStyle} color={tintColor}>
      {fileName}
    </Text>
  </TouchableOpacity>
);

export default FileItemRow;
