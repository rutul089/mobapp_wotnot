import React, {Component} from 'react';
import {navigate} from '../../../navigator/NavigationUtils';
import SplashScreenComponent from '../component/SplashScreenComponent';

export default class SplashScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      navigate('SignInScreen');
    }, 2200);
  }

  render() {
    return <SplashScreenComponent />;
  }
}
