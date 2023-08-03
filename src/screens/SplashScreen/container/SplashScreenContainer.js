import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SplashScreenComponent from '../component/SplashScreenComponent';
import {navigate} from '../../../navigator/NavigationUtils';

export default class SplashScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      navigate('SignInScreen')
    }, 2200);
  }

  render() {
    return <SplashScreenComponent />;
  }
}
