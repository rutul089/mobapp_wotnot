import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import SettingScreenComponent from '../component/SettingScreenComponent';

export default class SettingScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onNotificationClick = this.onNotificationClick.bind(this);
  }

  onLogoutClick = () => {};

  onNotificationClick = () => {};

  render() {
    return (
      <>
        <SettingScreenComponent
          accountDropdownValue={'Active'}
          languageDropdownValue={'English'}
          onLogoutClick={this.onLogoutClick}
          onNotificationClick={this.onNotificationClick}
        />
      </>
    );
  }
}
