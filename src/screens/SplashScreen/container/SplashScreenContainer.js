import React, {Component} from 'react';
import {
  navigate,
  navigateAndSimpleReset,
} from '../../../navigator/NavigationUtils';
import SplashScreenComponent from '../component/SplashScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {LOCAL_STORAGE} from '../../../constants/storage';
import {setUserPreference} from '../../../store/actions';
import {connect} from 'react-redux';
import API, {Headers} from '../../../apiService';

class SplashScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    var isLogin = await AsyncStorage.getItem(LOCAL_STORAGE.IS_LOGIN);
    var userPreference = await AsyncStorage.getItem(
      LOCAL_STORAGE.USER_PREFERENCE,
    );
    this.props.setUserPreference(JSON.parse(userPreference));
    let sessionID = JSON.parse(userPreference)?.session_id;
    setTimeout(() => {
      if (isLogin !== null && JSON.parse(isLogin)) {
        // API.getInstance().setHeader(Headers.COOKIE, sessionID);
        navigateAndSimpleReset('MainNavigator');
        return;
      }
      navigateAndSimpleReset('SignInScreen');
    }, 2200);
  }

  render() {
    return <SplashScreenComponent />;
  }
}

const mapActionCreators = {setUserPreference};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.global.isInternetConnected,
    isLoading: state.global.loading,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(SplashScreenContainer);
