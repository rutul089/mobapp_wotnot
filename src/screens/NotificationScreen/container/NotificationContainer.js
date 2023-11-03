import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import NotificationComponent from '../component/NotificationComponent';
import {
  notificationPreference,
  setNotificationPreference,
} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import {goBack} from '../../../navigator/NavigationUtils';

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isHumanHandover: false,
      isNewMessageReceived: false,
      isPlayNotification: false,
      isLoading: true,
      soundList: [],
      selectedSoundId: -1,
      selectedSoundValue: null,
    };
    this.humanHandoverClick = this.humanHandoverClick.bind(this);
    this.newMessageReceivedClick = this.newMessageReceivedClick.bind(this);
    this.playNotificationSoundClick =
      this.playNotificationSoundClick.bind(this);
  }

  componentDidMount() {
    this.callNotificationPreference();
  }

  onSwitchToggle = () => {
    this.setState(
      {
        isActive: !this.state.isActive,
      },
      () => {
        this.callSetNotificationPreference(this.state.isActive);
      },
    );
  };

  humanHandoverClick = () => {
    this.setState(
      {
        isHumanHandover: !this.state.isHumanHandover,
      },
      () => this.callSetNotificationPreference(),
    );
  };

  newMessageReceivedClick = () => {
    this.setState(
      {
        isNewMessageReceived: !this.state.isNewMessageReceived,
      },
      () => this.callSetNotificationPreference(),
    );
  };

  playNotificationSoundClick = () => {
    this.setState(
      {
        isPlayNotification: !this.state.isPlayNotification,
      },
      () => {
        this.callSetNotificationPreference();
      },
    );
  };

  callNotificationPreference = () => {
    this.props.notificationPreference({
      SuccessCallback: res => {
        if (res?.ok) {
          this.setState({
            isActive: res?.is_enable_notification,
            isHumanHandover: res?.notification_configuration?.is_human_handover,
            isNewMessageReceived:
              res?.notification_configuration?.is_new_open_message,
            isPlayNotification: res?.notification_configuration?.sound_name,
            isLoading: false,
            soundList: this.createLink(res?.sound),
            selectedSoundValue: res?.notification_configuration?.sound_name,
          });
        }
      },
      FailureCallback: res => {
        this.setState({isLoading: false});
        handleFailureCallback(res, false, false);
      },
    });
  };

  callSetNotificationPreference = isAllOff => {
    let param = {
      is_enable_notification: this.state.isActive,
      notification_configuration: {
        is_human_handover: this.state.isHumanHandover,
        is_new_open_message: this.state.isNewMessageReceived,
        sound: !this.state.isPlayNotification
          ? null
          : this.state.selectedSoundValue,
      },
    };

    this.props.setNotificationPreference(param, {
      SuccessCallback: res => {},
      FailureCallback: res => {
        handleFailureCallback(res, false, false);
      },
    });
  };

  onPressLeftContent = () => {
    goBack();
  };

  selectNotificationSound = id => {
    this.setState(
      {
        selectedSoundId: id,
        selectedSoundValue: this.state.soundList?.[id]?.value,
      },
      () => this.callSetNotificationPreference(),
    );
  };

  createLink = value => {
    let soundList = [];
    let id = 0;
    for (const property in value) {
      soundList.push({
        id: id,
        label: property,
        value: property,
        link: value[property],
      });
      id = id + 1;
      // console.log(`${property}: ${value[property]}`);
    }
    return soundList;
  };

  FindIndex = (array, key, matchKey) => {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i][key] === matchKey) {
        index = i;
        return index;
      }
    }
    return index;
  };

  render() {
    return (
      <>
        <NotificationComponent
          state={this.state}
          onSwitchToggle={this.onSwitchToggle}
          newMessageReceivedClick={this.newMessageReceivedClick}
          humanHandoverClick={this.humanHandoverClick}
          playNotificationSoundClick={this.playNotificationSoundClick}
          onPressLeftContent={this.onPressLeftContent}
          soundList={this.state.soundList}
          selectNotificationSound={this.selectNotificationSound}
          selectedSound={this.FindIndex(
            this.state.soundList,
            'label',
            this.state.selectedSoundValue,
          )}
        />
      </>
    );
  }
}

const mapActionCreators = {
  notificationPreference,
  setNotificationPreference,
};
const mapStateToProps = state => {
  return {
    isInternetConnected: state.global.isInternetConnected,
    isLoading: state.global.loading,
    notification_pref: state.settings?.notification_pref,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(NotificationContainer);

// {
//   "is_enable_notification": true,
//   "notification_configuration": {
//     "is_human_handover": true,
//     "is_new_open_message": true,
//     "sound": null
//   }
// }{
//   "is_enable_notification": true,
//   "notification_configuration": {
//     "is_human_handover": true,
//     "is_new_open_message": true,
//     "sound": "Hollow"
//   }
// }
