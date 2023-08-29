import React, {Component} from 'react';
import {
  navigate,
  navigateAndSimpleReset,
} from '../../../navigator/NavigationUtils';
import SplashScreenComponent from '../component/SplashScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {IS_LOGIN} from '../../../constants/storage';

export default class SplashScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    var isLogin = await AsyncStorage.getItem(IS_LOGIN);
    setTimeout(() => {
      if (isLogin !== null && JSON.parse(isLogin)) {
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
