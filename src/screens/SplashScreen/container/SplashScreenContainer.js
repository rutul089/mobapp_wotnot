import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LOCAL_STORAGE} from '../../../constants/storage';
import {setLocale} from '../../../locales/i18n';
import {
  navigate,
  navigateAndSimpleReset,
} from '../../../navigator/NavigationUtils';
import {
  fetchAccounts,
  fetchTeamData,
  fetchTeammateData,
  fetchUserList,
  fetchUserPreference,
  setUserPreference,
} from '../../../store/actions';
import {
  getItemFromStorage,
  setItemToStorage,
} from '../../../util/DeviceStorageOperations';
import {handleFailureCallback} from '../../../util/apiHelper';
import {emitAgentJoin, initSocket, reconnect} from '../../../websocket';
import SplashScreenComponent from '../component/SplashScreenComponent';

class SplashScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotification: false,
      notificationType: null,
    };
  }

  async componentDidMount() {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          this.setState({
            isNotification: true,
            notificationType: remoteMessage?.data,
          });
        }
      });
    setTimeout(() => {
      this.setupLocalStorage();
    }, 1000);
  }

  setupLocalStorage = async () => {
    var isLogin = await AsyncStorage.getItem(LOCAL_STORAGE.IS_LOGIN);
    var userPreference = await AsyncStorage.getItem(
      LOCAL_STORAGE.USER_PREFERENCE,
    );
    this.props.setUserPreference(JSON.parse(userPreference));
    if (isLogin !== null && JSON.parse(isLogin) && !this.state.isNotification) {
      this.callFetchUserPreference(false);
    } else if (
      isLogin !== null &&
      JSON.parse(isLogin) &&
      this.state.isNotification
    ) {
      let click_action = this.state.notificationType?.click_action;
      // urlRedirect(
      //   this.state.notificationType?.click_action,
      //   this.state.notificationType?.title,
      // );
      this.callFetchUserPreference(false);
      this.setState({
        isNotification: false,
      });

      console.log('setNotificationType', this.state.notificationType);
    } else {
      navigateAndSimpleReset('SignInScreen');
    }
    this.setState({
      isNotification: false,
    })
  };

  callFetchUserPreference = async (fromNotification, data) => {
    this.props.fetchUserPreference(null, {
      SuccessCallback: res => {
        setItemToStorage(LOCAL_STORAGE?.USER_PREFERENCE, res);
        setLocale(res?.language?.code);
        if (fromNotification) {
          this.callNotificationData();
          return;
        }
        navigateAndSimpleReset('MainNavigator');
      },
      FailureCallback: res => {
        navigateAndSimpleReset('MainNavigator');
      },
    });
  };

  callNotificationData = () => {
    this.callFetchTeamData();
    this.callFetchTeammateData();
    if (!getItemFromStorage(LOCAL_STORAGE?.AGENT_ACCOUNT_LIST)) {
      this.cllFetchAccounts();
    }
    this.callFetchUserList();
    initSocket();
    emitAgentJoin();
    reconnect();
  };

  callFetchTeamData = () => {
    this.props.fetchTeamData(this.props?.userPreference?.account_id, 1, {
      SuccessCallback: res => {},
      FailureCallback: res => {
        handleFailureCallback(res, false, true, false);
      },
    });
  };

  callFetchUserList = () => {
    this.props.fetchUserList(this.props?.userPreference?.account_id, {
      SuccessCallback: res => {
        setItemToStorage(LOCAL_STORAGE.USER_LIST, res);
      },
      FailureCallback: res => {
        handleFailureCallback(res, true, true, false);
      },
    });
  };

  callFetchTeammateData = () => {
    let param = {qualify_bot_user: true};
    this.props.fetchTeammateData(
      this.props?.userPreference?.account_id,
      param,
      {
        SuccessCallback: res => {},
        FailureCallback: res => {
          handleFailureCallback(res, true, true, false);
        },
      },
    );
  };

  cllFetchAccounts = () => {
    this.props.fetchAccounts({
      SuccessCallback: res => {
        AsyncStorage.setItem(
          LOCAL_STORAGE?.AGENT_ACCOUNT_LIST,
          JSON.stringify(res?.account_info),
        );
      },
      FailureCallback: res => {
        handleFailureCallback(res, false, false, false);
      },
    });
  };

  render() {
    return <SplashScreenComponent />;
  }
}

const mapActionCreators = {
  setUserPreference,
  fetchUserPreference,
  fetchTeamData,
  fetchTeammateData,
  fetchAccounts,
  fetchUserList,
};
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
