import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SettingScreenComponent from '../component/SettingScreenComponent';

export default class SettingScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <SettingScreenComponent />
      </>
    );
  }
}
