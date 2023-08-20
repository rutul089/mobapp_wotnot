
import React, {Component} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import {theme} from '../../util/theme';
// import {normalize, color} from '../Theme/theme';


class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.profileLoad,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.isLoading) {
      setTimeout(() => {
        return {
          isLoading: false,
        };
      }, 300);
    }
    return {
      isLoading: nextProps.isLoading,
    };
  }

  render() {
    const {loading = false} = this.props;
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}
        style={{zIndex: 1100}}
        onRequestClose={() => {}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <View style={styles.spinner}>
              <ActivityIndicator size="large" color={theme.colors.brandColor.blue} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    opacity: 0.8,
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  ImageConnected: {
    height: theme.normalize(35),
    width: theme.normalize(35),
  },
  spinner: {
    margin: theme.normalize(35),
  },
});

export default Loader;
