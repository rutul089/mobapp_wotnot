import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import images from '../../../assets/images';
import styles from '../Style';
import {FlexContainer, Header, Text, Button} from '../../../components';
import theme from '../../../util/theme';
import Spacing from '../../../components/Spacing';

const ConversationComponent = ({
  joinConversation,
  joinConversationBtn,
  joinConversationPress,
  onPressMore,
  onPressInfo
}) => {
  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <Header
        isLeftIconHidden={false}
        centerElement={'userInput'}
        onPressMore={onPressMore}
        onPressInfo={onPressInfo}
      />
      <View style={styles.container}>
        <Text>Thies is test</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Text type={'caption12'} style={{width: '96%'}} textAlign={'center'}>
          {joinConversation}
        </Text>
        <Spacing />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnStyle}
          onPress={joinConversationPress}>
          <Text type={'button2'} color={'white'}>
            {joinConversationBtn}
          </Text>
        </TouchableOpacity>
      </View>
    </FlexContainer>
  );
};

export default ConversationComponent;
