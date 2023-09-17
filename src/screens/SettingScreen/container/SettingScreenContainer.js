import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import {accountList, languageList} from '../../../constants/settings';
import SettingScreenComponent from '../component/SettingScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {LOCAL_STORAGE, removeItemFromStorage} from '../../../constants/storage';
import {
  navigateAndSimpleReset,
  navigate,
} from '../../../navigator/NavigationUtils';
import {connect} from 'react-redux';
import {
  userLogout,
  fetchAccounts,
  fetchUserPreference,
  changeAccount,
  clearAllData,
  setProfileEvents,
} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import {changeUserStatus, reconnect, registerUserStatus} from '../../../websocket';
import { getAgentPayload } from '../../../common/common';

class SettingScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {},
      isActive: false,
      accountStatus: accountList?.[0]?.label,
      selectedLanguage: 'English',
      isOpen: false,
      isLoading: false,
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onNotificationClick = this.onNotificationClick.bind(this);
    this.onHelpDeskClick = this.onHelpDeskClick.bind(this);
    this.accountModalRef = React.createRef();
    this.languageModalRef = React.createRef();
    this.logoutRef = React.createRef();
  }

  async componentDidMount() {
    let {userPreference} = this.props;
    // let agentpayload = await getAgentPayload();
    // console.log("-------<",JSON.stringify(agentpayload))
    // reconnect()
    // this.setState({
    //   isActive: userPreference?.status_id === 1,
    // });
    this.props.navigation.addListener('focus', () => {
      this.cllFetchAccounts();
      this.callFetchUserPreference();
      registerUserStatus(this.getUserStatus);
    });
  }

  getUserStatus = status => {
    console.log('------->',status)
    this.setState(
      {
        isActive: status?.user_status === 'online' ? true : false,
      },
      () => {
        // this.callFetchUserPreference(false);
      },
    );
    console.log(
      'status>>>>>>',
      status?.user_status === 'online' ? true : false,
    );
  };

  onLogoutClick = async () => {
    this.setState({isOpen: true});
  };

  onNotificationClick = () => {};

  onSwitchToggle = () => {
    this.setState({isActive: !this.state.isActive}, () => {
      this.callSetProfileEvents(this.state.isActive);
    });
  };

  onPressAccountDropdown = () => {
    this.accountModalRef?.current?.open();
  };

  onAccountListPress = (item, index) => {
    this.accountModalRef?.current?.close();
    this.setLoader(true);
    this.callChangeAccount(item?.key);
    // this.setState(
    //   {
    //     accountStatus: item?.label,
    //   },
    //   () => {
    //     this.accountModalRef?.current?.close();
    //   },
    // );
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

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  logoutButtonPress = () => {
    this.onClose();
    this.props.userLogout({
      SuccessCallback: async res => {
        Object.keys(LOCAL_STORAGE).map(key =>
          removeItemFromStorage(LOCAL_STORAGE[key]),
        );
        // await AsyncStorage.setItem(LOCAL_STORAGE.IS_LOGIN, 'false');
        // await AsyncStorage.setItem(
        //   LOCAL_STORAGE.USER_PREFERENCE,
        //   JSON.stringify({}),
        // );
        navigateAndSimpleReset('SignInScreen');
      },
      FailureCallback: res => {
        Object.keys(LOCAL_STORAGE).map(key =>
          removeItemFromStorage(LOCAL_STORAGE[key]),
        );
        navigateAndSimpleReset('SignInScreen');
        console.log('1111111111111', JSON.stringify(res));
      },
    });
  };

  cllFetchAccounts = () => {
    this.props.fetchAccounts({
      SuccessCallback: res => {},
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  callFetchUserPreference = (isReset = false) => {
    this.props.fetchUserPreference(null, {
      SuccessCallback: res => {
        // this.setState({
        //   isActive: res?.status_id === 1,
        // });
        AsyncStorage.setItem(
          LOCAL_STORAGE?.USER_PREFERENCE,
          JSON.stringify(res),
        );
        isReset ? this.changeProfile() : null;
      },
      FailureCallback: res => {
        handleFailureCallback(res, true, true);
      },
    });
  };

  callChangeAccount = account_key => {
    this.setLoader(true);
    let param = {
      account_key: account_key,
    };
    this.props.changeAccount(param, {
      SuccessCallback: res => {
        this.callFetchUserPreference(true);
      },
      FailureCallback: res => {
        this.setLoader(false);
        handleFailureCallback(res);
      },
    });
    this.accountModalRef?.current?.close();
  };

  setLoader = value => {
    this.setState({isLoading: value});
  };

  onHelpDeskClick = () => {
    navigate('HelpDeskScreen');
  };

  changeProfile = () => {
    setTimeout(() => {
      this.props.clearAllData();
      this.callFetchUserPreference(false);
      this.setLoader(false);
      navigateAndSimpleReset('SplashScreen');
    }, 1200);
  };

  callSetProfileEvents = value => {
    let payload = {
      user_type: 'agent',
      user_status: value ? 'online' : 'away',
    };
    let param = {
      type: 'user_status',
      payload: payload,
    };
    this.props.setProfileEvents(
      this.props?.userPreference?.logged_in_user_id,
      param,
      {
        SuccessCallback: res => {},
        FailureCallback: res => {},
      },
    );
    payload['user_id'] = this.props?.userPreference?.logged_in_user_id;
    changeUserStatus(payload);
  };

  render() {
    let state = this.state;
    const {userPreference, accounts} = this.props;
    return (
      <>
        <SettingScreenComponent
          accountDropdownValue={userPreference?.account_name}
          languageDropdownValue={state.selectedLanguage}
          onLogoutClick={this.onLogoutClick}
          onNotificationClick={this.onNotificationClick}
          onSwitchToggle={this.onSwitchToggle}
          isActive={state.isActive}
          name={userPreference?.logged_in_user_name}
          email={userPreference?.email}
          profilePhoto={userPreference?.image_url?.small}
          onPressAccountDropdown={this.onPressAccountDropdown}
          accountModalRef={this.accountModalRef}
          accountList={accounts}
          languageList={languageList}
          onAccountListPress={(item, index) =>
            this.onAccountListPress(item, index)
          }
          onPressLanguageDropdown={this.onPressLanguageDropdown}
          languageModalRef={this.languageModalRef}
          onLanguageSelected={(item, index) =>
            this.onLanguageSelected(item, index)
          }
          cancelRef={this.logoutRef}
          isOpen={state.isOpen}
          onClose={this.onClose}
          logoutButtonPress={this.logoutButtonPress}
          account_id={userPreference?.account_id}
          isLoading={state.isLoading}
          onHelpDeskClick={this.onHelpDeskClick}
        />
      </>
    );
  }
}

const mapActionCreators = {
  userLogout,
  fetchAccounts,
  fetchUserPreference,
  changeAccount,
  clearAllData,
  setProfileEvents,
};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.global.isInternetConnected,
    isLoading: state.global.loading,
    userPreference: state.detail?.userPreference,
    accounts: state.settings?.accounts?.account_info,
    
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(SettingScreenContainer);
