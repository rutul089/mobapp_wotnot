import React, {PureComponent} from 'react';
import {View, Dimensions, StyleSheet, Image} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import theme from '../../util/theme';
import Button from '../Button';
import Modal from 'react-native-modal';
import images from '../../assets/images';
import Text from '../Text';
import Spacing from '../Spacing';

const {width} = Dimensions.get('window');

function MiniOfflineSign(isVisible) {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      animationInTiming={600}
      statusBarTranslucent>
      <View style={styles.modalContainer}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={images.ic_warning}
            resizeMode="contain"
            style={{
              height: theme.sizes.icons.xl11,
              width: theme.sizes.icons.xl11,
              tintColor: theme.colors.typography.error,
            }}
          />
          <Spacing />
          <Text type={'button1'} color={theme.colors.typography.error}>
            Oops!
          </Text>
          <Spacing />
          <Text textAlign={'center'} type={'body1'}>
            Looks like your device is not connected to the Internet.
          </Text>
          <Spacing />
        </View>
        <Button
          bg={theme.colors.brandColor.blue}
          buttonText={'Retry'}
          onPress={() => {}}
          style={{
            borderRadius: theme.sizes.radius.modalRadius,
          }}
        />
        <Spacing size='5' />
      </View>
    </Modal>
    // <View style={styles.offlineContainer}>
    //   <Text style={styles.offlineText}>No Internet Connection</Text>
    // </View>
  );
}

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true,
  };

  unsubscribe = null;
  callApi = false;
  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      const connect = state.isConnected;
      this.setState({isConnected: connect});
      if (connect === false) this.callApi = true;

      // this condition is to set prop to true only when internet is re-connect
      if (connect === true && this.callApi === true) {
        this.props.onNetInfo(true);
        this.callApi = false;
      } else {
        this.props.onNetInfo(false);
      }
    });
  }

  componentWillUnmount() {
    // Unsubscribe
    if (this.unsubscribe != null) this.unsubscribe();
  }

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign isVisible={!this.state.isConnected} />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    bottom: 0,
    zIndex: 500000,
  },
  offlineText: {color: '#fff', fontSize: 15},
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: theme.normalize(20),
    borderTopLeftRadius: theme.sizes.radius.modalRadius,
    borderTopRightRadius: theme.sizes.radius.modalRadius,
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  modalText: {
    marginTop: theme.normalize(14),
    textAlign: 'center',
    marginBottom: theme.normalize(10),
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default OfflineNotice;
