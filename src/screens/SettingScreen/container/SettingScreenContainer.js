import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import {accountList, languageList} from '../../../constants/settings';
import SettingScreenComponent from '../component/SettingScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {IS_LOGIN} from '../../../constants/storage';
import {navigateAndSimpleReset} from '../../../navigator/NavigationUtils';

export default class SettingScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {
        name: 'Sagar Shah',
        email: 'sagar.shah@wotnot.io',
        uri: 'https://i.pravatar.cc/512',
      },
      isActive: false,
      accountStatus: accountList?.[0]?.label,
      selectedLanguage: 'English',
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onNotificationClick = this.onNotificationClick.bind(this);
    this.accountModalRef = React.createRef();
    this.languageModalRef = React.createRef();
  }

  onLogoutClick = async () => {
    await AsyncStorage.setItem(IS_LOGIN, 'false');
    navigateAndSimpleReset('SignInScreen');
  };

  onNotificationClick = () => {};

  onSwitchToggle = () => {
    this.setState({isActive: !this.state.isActive});
  };

  onPressAccountDropdown = () => {
    this.accountModalRef?.current?.open();
  };

  onAccountListPress = (item, index) => {
    this.setState(
      {
        accountStatus: item?.label,
      },
      () => {
        this.accountModalRef?.current?.close();
      },
    );
  };

  onPressLanguageDropdown = () => {
    this.languageModalRef?.current?.open();
  };

  onLanguageSelected = (item, index) => {
    //code
    this.setState(
      {
        selectedLanguage: item?.languageName,
      },
      () => {
        this.languageModalRef?.current?.close();
      },
    );
  };

  render() {
    let state = this.state;
    return (
      <>
        <SettingScreenComponent
          accountDropdownValue={state.accountStatus}
          languageDropdownValue={state.selectedLanguage}
          onLogoutClick={this.onLogoutClick}
          onNotificationClick={this.onNotificationClick}
          onSwitchToggle={this.onSwitchToggle}
          isActive={state.isActive}
          name={state.userProfile?.name}
          email={state.userProfile?.email}
          profilePhoto={state.userProfile?.uri}
          onPressAccountDropdown={this.onPressAccountDropdown}
          accountModalRef={this.accountModalRef}
          accountList={accountList}
          languageList={languageList}
          onAccountListPress={(item, index) =>
            this.onAccountListPress(item, index)
          }
          onPressLanguageDropdown={this.onPressLanguageDropdown}
          languageModalRef={this.languageModalRef}
          onLanguageSelected={(item, index) =>
            this.onLanguageSelected(item, index)
          }
        />
      </>
    );
  }
}
