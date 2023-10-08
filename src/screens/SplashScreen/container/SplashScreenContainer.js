import React, {Component} from 'react';
import {
  navigate,
  navigateAndSimpleReset,
} from '../../../navigator/NavigationUtils';
import SplashScreenComponent from '../component/SplashScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {LOCAL_STORAGE} from '../../../constants/storage';
import {setUserPreference, fetchUserPreference} from '../../../store/actions';
import {connect} from 'react-redux';
import API, {Headers} from '../../../apiService';
import {
  getItemFromStorage,
  setItemToStorage,
} from '../../../util/DeviceStorageOperations';

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
    if (isLogin !== null && JSON.parse(isLogin)) {
      this.callFetchUserPreference();
      // navigateAndSimpleReset('MainNavigator');
    } else {
      setTimeout(() => {
        // if (isLogin !== null && JSON.parse(isLogin)) {
        //   navigateAndSimpleReset('MainNavigator');
        //   return;
        // }
        navigateAndSimpleReset('SignInScreen');
      }, 2500);
    }
  }

  callFetchUserPreference = async () => {
    this.props.fetchUserPreference(null, {
      SuccessCallback: res => {
        console.log("------->callFetchUserPreference",JSON.stringify(res))
        setItemToStorage(LOCAL_STORAGE?.USER_PREFERENCE,res);
        navigateAndSimpleReset('MainNavigator');
      },
      FailureCallback: res => {
        navigateAndSimpleReset('MainNavigator');
      },
    });
  };

  render() {
    return <SplashScreenComponent />;
  }
}

const mapActionCreators = {setUserPreference, fetchUserPreference};
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
