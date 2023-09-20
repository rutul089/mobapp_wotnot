import React from 'react';
import {
  Modal,
  Image,
  View,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from '../../util/theme';

function ImageViewer(props) {
  const {modalShow, onRequestClose, modalImg} = props;
  return (
    <Modal
      visible={modalShow}
      transparent
      onRequestClose={() => onRequestClose && onRequestClose()}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.9)',
          }}>
          <TouchableHighlight
            onPress={() => onRequestClose && onRequestClose()}
            style={{
              position: 'absolute',
              right: theme.sizes.spacing.ph,
              top: theme.sizes.spacing.ph,
              zIndex: 9,
            }}>
            <Icon size={26} color={'white'} name="close" />
          </TouchableHighlight>
          <Image
            source={typeof modalImg !== 'string' ? modalImg : {uri: modalImg}}
            visible={true}
            resizeMode="contain"
            style={{width: '100%', height: '85%'}}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default ImageViewer;
