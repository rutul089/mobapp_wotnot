//  Lib
import React, {useMemo} from 'react';
import {Image, TouchableHighlight, Dimensions, View} from 'react-native';
import {alignEnd} from '~/assets/styles/_partials/_flex';
import {Text} from '../../../../../components';
import ChatMsgInfo from '../ChatMsgInfo';
import {getTimeStamp} from '../../../../../util/ConversationListHelper';
import {styles as chatBubbleStyle, styles} from '../ChatStyle/chatBubbleStyle';
import Carousel from 'react-native-snap-carousel';
import {Card, CardItem} from 'native-base';
import images from '../../../../../assets/images';
import {
  DEFAULT_IMG,
  VALIDATION_REGEX as REGEX_PATTERNS,
} from '../../../../../util/helper';
import theme from '../../../../../util/theme';

function ChatCardView(props) {
  const {chatItem, slides, onToggleImageModal, pos} = props;

  const renderItem = ({item, index}) => (
    <View
      key={`${index}`}
      style={[
        styles.bubbleContainerVisitor,
        {
          //   flex: 1,
          width: '100%',
          alignItems: 'flex-end',
          borderRadius: 10,
          borderTopRightRadius: 2,
          borderTopLeftRadius: 10,
          padding: 10,
        },
      ]}>
      {item.image ? (
        <TouchableHighlight
          style={{flex: 0, width: '100%'}}
          onPress={() =>
            onToggleImageModal(item.image ? item.image : DEFAULT_IMG)
          }>
          <Image
            defaultSource={images.fallback_image}
            source={{uri: item.image ? item.image : DEFAULT_IMG}}
            resizeMode="cover"
            style={{width: '100%', height: 190, borderRadius: 10}}
          />
        </TouchableHighlight>
      ) : null}

      {item.options && item.options.length ? (
        <>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              marginTop: theme.normalize(item.image ? 5 : 0),
              borderRadius: theme.normalize(10),
              padding: theme.normalize(10),
            }}>
            <Text>{item.title.replace(REGEX_PATTERNS.HTML_TAGS, '')}</Text>
            <Text type={'body2'}>
              {item.subtitle.replace(REGEX_PATTERNS.HTML_TAGS, '')}
            </Text>
            <View
              style={{
                flexWrap: 'wrap',
                alignContent: 'flex-end',
                width: '100%',
                flexDirection: 'row',
                flex: 1,
                marginTop: theme.normalize(8),
              }}>
              {item.options.map((btn, index) => (
                <View
                  key={`${index}`}
                  style={{
                    marginVertical: theme.normalize(5),
                    marginRight: theme.normalize(5),
                    borderWidth: 1,
                    flex: 1,
                    borderRadius: theme.normalize(19),
                    borderColor: theme.colors.clear_blue,
                    alignItems: 'center',
                  }}>
                  <Text
                    type={'caption12'}
                    style={{
                      paddingLeft: theme.normalize(8),
                      paddingTop: theme.normalize(8),
                      paddingBottom: theme.normalize(8),
                      paddingRight: theme.normalize(8),
                    }}>
                    {btn.text}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </>
      ) : null}
    </View>
  );

  return useMemo(
    () => (
      <View style={chatBubbleStyle.bubbleWrapper}>
        <Carousel
          data={slides}
          renderItem={renderItem}
          sliderWidth={
            slides.length > 1 ? Math.round(Dimensions.get('window').width) : 250
          }
          itemWidth={Math.round(Dimensions.get('window').width) - 150}
          layout={'default'}
        />

        <ChatMsgInfo
          timeStampRight
          time={getTimeStamp(chatItem.agent.timestamp).timestamp}
          userData={chatItem}
        />
      </View>
    ),
    [chatItem, pos],
  );
}

export default ChatCardView;
