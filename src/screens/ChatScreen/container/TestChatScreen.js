import React, {Component} from 'react';
import {View, AppState} from 'react-native';
import ChatScreenComponent from '../component/index';
import {CONVERSATION} from '../../../constants/global';
import {connect} from 'react-redux';
import {
  fetchConversationSummary,
  fetchConversation,
  setClosedConversationCount,
  fetchTeammateData,
  fetchTeamData,
  fetchConversationBySearch,
  setConversations,
  fetchAccounts,
  fetchUserList,
  setNotificationToken,
  fetchUserSetting,
} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import {getAssigneeId, getMiniFromTime} from '../../../util/helper';
import {navigate} from '../../../navigator/NavigationUtils';
import theme from '../../../util/theme';
import AsyncStorage from '@react-native-community/async-storage';
import {LOCAL_STORAGE} from '../../../constants/storage';
import {
  getAgentPayload,
  getMessageFromEventPayload,
} from '../../../common/common';
import {
  emitVisitorTyping,
  initSocket,
  registerConversationCreateHandler,
  registerVisitorTypingHandler,
  registerAssigneeChangedHandler,
  registerStatusChangedHandler,
  registerUserStatus,
  reconnect,
  registerMessageHandler,
  registerMessageRead,
} from '../../../websocket';
import {emitAgentJoin} from '../../../websocket';
import {
  assigneeChangeText,
  statusChangeText,
  addNewMessage,
} from '../../../util/ConversationListHelper';
import {findIndex} from '../../../util/JSONOperations';
import {
  getItemFromStorage,
  setItemToStorage,
} from '../../../util/DeviceStorageOperations';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  openSettings,
  checkNotifications,
} from 'react-native-permissions';
import moment from 'moment';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import messaging from '@react-native-firebase/messaging';

class TestChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: CONVERSATION.YOU,
      conversations: [],
      isLoading: false,
      search_after: '',
      isDisable: true,
      isRefreshing: false,
      typingData: null,
      appState: AppState.currentState,
      moreLoading: false,
      isSLAEnable: false,
      slaTime: 0,
    };
    this.onSelectTab = this.onSelectTab.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onConversationClick = this.onConversationClick.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.loadMoreData = this.loadMoreData.bind(this);
    this.appStateRef = null;
    this.subscribe = null;
  }

  async componentDidMount() {
    this.registerAppStateEvent();
    // this.callSummary();
    this.callFetchTeamData();
    this.callFetchTeammateData();
    this.requestPermission();
    if (!getItemFromStorage(LOCAL_STORAGE?.AGENT_ACCOUNT_LIST)) {
      this.cllFetchAccounts();
    }
    // this.callFetchConversation(this.state.currentTab, false, true);
    this.callFetchUserList();
    this.subscribe = this.props.navigation.addListener('focus', () => {
      this.subscribeListener();
    });
    this.props.navigation.addListener('blur', () => {
      this.appStateRef?.remove();
    });
    initSocket();
    emitAgentJoin();
    reconnect();
    // registerVisitorTypingHandler(this.visitorTypingStatus);
  }

  subscribeListener() {
    this.callFetchConversation(this.state.currentTab, false, false);
    this.callSummary();
    registerAssigneeChangedHandler(this.onAssigneeChange);
    registerConversationCreateHandler(this.onConvCreateReceived);
    registerStatusChangedHandler(this.msgStatusChange);
    registerMessageHandler(this.messageHandler);
    registerMessageRead(this.readMessage);
    this.registerAppStateEvent();
    this.callSettingsAPI();
  }

  callSummary = () => {
    this.props.fetchConversationSummary(
      this.props?.userPreference?.account_id,
      {
        SuccessCallback: res => {},
        FailureCallback: res => {
          handleFailureCallback(res, true, true, false);
        },
      },
    );
  };

  onSearchClick = () => {
    navigate('SearchScreen');
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
  callFetchConversation = (type, isLoadMore = false, isLoading = true) => {
    let {userPreference, isAssignee, isUnAssignee, isYou} = this.props;
    let offset = isLoadMore
      ? this.state.search_after
        ? `&search_after=${this.state.search_after}`
        : ''
      : '';
    let assignee = '';
    let statusId = type === CONVERSATION.CLOSE ? 2 : 1;
    switch (type) {
      case CONVERSATION.YOU:
        assignee = `&assignee_ids=${userPreference?.logged_in_user_id}`;
        break;
      case CONVERSATION.ASSIGNED:
        assignee = `assignee_ids=${getAssigneeId(this.props?.teamMateData)}`;
        break;
      case CONVERSATION.UNASSIGNED:
        assignee = `&assignee_ids=0`;
        break;
      case CONVERSATION.CLOSE:
      default:
        assignee = '';
        break;
    }

    let url = `status_ids=${statusId}&is_order_by_asc=false&limit=25&offset=1${assignee}${offset}`;
    this.props.fetchConversationBySearch(
      userPreference?.account_id,
      url,
      {
        SuccessCallback: res => {
          this.props.setConversations(
            offset
              ? [...this.props.conversations, ...res?.conversations]
              : res?.conversations,
          );
          this.setState({
            // conversations: offset
            //   ? [...this.state.conversations, ...res?.conversations]
            //   : res?.conversations,
            search_after: res?.search_after,
          });
          this.setLoader(false);
          if (statusId == 2) {
            this.props.setClosedConversationCount(res?.total_conversations);
          }
        },
        FailureCallback: res => {
          this.setLoader(false);
          handleFailureCallback(res, true, false);
        },
      },
      isLoading,
    );
  };

  onSelectTab = tab => {
    this.props.setConversations([]);
    this.setState(
      {
        currentTab: tab,
        isLoading: true,
        conversations: [],
      },
      () => {
        setTimeout(() => {
          this.callFetchConversation(tab, false, true);
          this.callSummary();
          this.callSettingsAPI();
        }, 500);
      },
    );
  };

  setLoader = value => {
    this.setState({isLoading: false, isRefreshing: false, moreLoading: false});
  };

  onRefresh = () => {
    this.setState(
      {
        isRefreshing: true,
      },
      () => {
        this.callFetchConversation(this.state.currentTab, false, false);
        this.callSummary();
      },
    );
  };

  onConversationClick = item => {
    navigate('ConversationScreen', {itemData: item, chatUserName: item?.title});
  };

  loadMoreData = distanceFromEnd => {
    if (!distanceFromEnd >= 1) {
      return;
    }
    this.setState(
      {
        moreLoading: true,
      },
      () => this.callFetchConversation(this.state.currentTab, true, false),
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

  onConvCreateReceived = data => {
    console.log('onConvCreateReceived------------>', JSON.stringify(data));
    let obj = data;
    // this.props.setConversations([obj,...this.props.conversations])
    // setTimeout(() => {
    //   this.callFetchConversation(this.state.currentTab, false, false);
    //   console.log('onConvCreateReceived------------>', 1);
    // }, 1500);
    // if (
    //  true
    // ) {
    //   console.log('onConvCreateReceived------------>', 2);
    //   this.props.setConversations([...data])
    //   // this.callFetchConversation(this.state.currentTab, false, false);
    // }
  };

  registerAppStateEvent(value) {
    this.appStateRef = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
    // this.appStateRef?.remove()
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // API call
      this.callFetchConversation(this.state.currentTab, false, false);
      this.subscribeListener();
      initSocket();
      emitAgentJoin();
      reconnect();
    } else {
    }
    this.setState({appState: nextAppState});
  };

  onAssigneeChange = payload => {
    let {userPreference} = this.props;

    if (
      !this.state.isLoading &&
      !this.state.isRefreshing &&
      !this.state.moreLoading &&
      payload
    ) {
      let changeAssigneeText = assigneeChangeText(
        payload,
        userPreference.logged_in_user_id,
      );
      let index = findIndex(
        this.props.conversations,
        'thread_key',
        payload?.conversation_key,
      );

      if (index !== -1) {
        let newData = [...this.props.conversations];
        let assigneeIndex = payload.event_payload.assigned.to.id
          ? findIndex(
              this.props.userList?.users,
              'user_id',
              payload.event_payload.assigned.to.id,
            )
          : -1;
        newData[index] = {
          ...newData[index],
          ...(payload.event_payload &&
            assigneeIndex !== -1 && {
              assignee: this.props.userList.users[assigneeIndex],
            }),
          assigneeChangeText: changeAssigneeText,
          assignee: payload.event_payload.assigned.to,
          conversation_mode: 'ConversationModeValueEnum.BOT',
        };
        this.props.setConversations(newData);
      } else {
      }
    }
  };

  msgStatusChange = payload => {
    let {userPreference} = this.props;
    if (
      !this.state.isLoading &&
      !this.state.isRefreshing &&
      !this.state.moreLoading &&
      payload
    ) {
      let changeStatusText = statusChangeText(
        payload,
        userPreference?.logged_in_user_id,
      );
      if (changeStatusText !== '') {
        let index = findIndex(
          this.props.conversations,
          'thread_key',
          payload.conversation_key,
        );
        if (index !== -1) {
          let newData = [...this.props.conversations];
          newData[index] = {
            ...newData[index],
            status_id:
              payload?.['event_payload']?.['status']?.['name'].toLowerCase() ===
              'closed'
                ? 2
                : 1,
            statusChangeText: changeStatusText,
          };
          this.props.setConversations(newData);
        } else {
        }
      }
    }
  };

  messageHandler = msg => {
    if (
      !this.state.isLoading &&
      !this.state.isRefreshing &&
      !this.state.moreLoading &&
      msg
    ) {
      // console.log('msg----->', msg);
      let convertedMessage = getMessageFromEventPayload(
        msg,
        this.props.conversations,
      );
      console.log('getMessageFromEventPayload', convertedMessage);
      if (convertedMessage && 'assignee' in convertedMessage) {
        !convertedMessage.assignee
          ? (convertedMessage['assignee'] = convertedMessage.agent)
          : null;
        if (convertedMessage.assignee) {
          if (convertedMessage && typeof convertedMessage === 'object') {
            if (
              convertedMessage.is_new_conversation ||
              findIndex(
                this.props.conversations,
                'thread_key',
                convertedMessage.conversation_key,
              ) === -1
            ) {
            }
          }
          let newObj = addNewMessage(
            convertedMessage,
            this.props.conversations,
            'conversationTitle',
          );
          // console.log("newObj?.newMsg",newObj?.newMsg)
          this.props.setConversations([
            newObj?.newMsg,
            ...newObj?.conversationData,
          ]);
        }
      } else {
        // this.callFetchConversation(this.state.currentTab, false, false);
        setTimeout(() => {
          this.callFetchConversation(this.state.currentTab, false, false);
          this.callSummary();
        }, 1600);
      }
    }
  };

  readMessage = readMsg => {
    if (
      !this.state.isLoading &&
      !this.state.isRefreshing &&
      !this.state.moreLoading &&
      readMsg
    ) {
      let {conversations} = this.props;
      let index = findIndex(
        conversations,
        'thread_key',
        readMsg.conversation_key,
      );
      if (index !== -1 && conversations[index].unread_messages_count > 0) {
        let newData = [...conversations];
        newData[index] = {
          ...newData[index],
          unread_messages_count: 0,
          timestamp: null,
        };
        this.props.setConversations(newData);
      }
    }
  };

  callSetNotificationToken = async () => {
    let pushToken = await AsyncStorage.getItem(
      LOCAL_STORAGE.NOTIFICATION_TOKEN,
      '',
    );
    let param = {
      token: pushToken,
    };
    this.props.setNotificationToken(param, false, {
      SuccessCallback: res => {
        console.log('SuccessCallback', res);
      },
      FailureCallback: res => {},
    });
  };

  requestPermission = async () => {
    const checkPermission = await this.checkNotificationPermission();
    const authStatus = await messaging().requestPermission();

    console.log('checkPermission', checkPermission);

    // checkNotifications().then(({status, settings}) => {
    //   console.log("sstatusta",status)
    //   if (status === RESULTS.GRANTED) {
    //     this.callSetNotificationToken();
    //   }
    // });

    if (checkPermission !== RESULTS.GRANTED) {
      const request = await this.requestNotificationPermission();
      console.log('request', request);
      if (request === RESULTS.GRANTED) {
        this.callSetNotificationToken();
      } else {
        checkNotifications().then(({status, settings}) => {
          console.log('sstatusta', status);
          if (status === RESULTS.GRANTED) {
            this.callSetNotificationToken();
          }
        });
      }
    } else if (checkPermission === RESULTS.GRANTED) {
      this.callSetNotificationToken();
    }
  };

  componentWillUnmount() {
    this.subscribe?.();
    this.registerAppStateEvent(true);
    this.appStateRef?.remove();
  }

  callSettingsAPI = () => {
    this.props.fetchUserSetting(this.props?.userPreference?.account_id, {
      SuccessCallback: res => {
        this.setState({
          isSLAEnable:
            res?.live_chat_configurations?.sla_settings?.is_enabled?.value,
          slaTime:
            res?.live_chat_configurations?.sla_settings?.countdown_timer?.value,
        });
      },
      FailureCallback: res => {},
    });
  };

  render() {
    return (
      <>
        <ChatScreenComponent
          onSelectTab={this.onSelectTab}
          currentTab={this.state.currentTab}
          conversations={this.props.conversations}
          isLoading={
            this.state.isRefreshing || this.state.moreLoading
              ? false
              : this.state.isLoading
          }
          isRefreshing={this.state.isRefreshing}
          onRefresh={this.onRefresh}
          onConversationClick={this.onConversationClick}
          onSearchClick={this.onSearchClick}
          onEndReach={this.loadMoreData}
          typingData={this.state.typingData}
          moreLoading={this.state.moreLoading}
          isSLAEnable={this.state.isSLAEnable}
          slaTime={this.state.slaTime}
          users={this.props.teamMateData}
        />
      </>
    );
  }

  requestNotificationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };

  checkNotificationPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };
}

const mapActionCreators = {
  fetchConversationSummary,
  fetchConversation,
  setClosedConversationCount,
  fetchTeamData,
  fetchTeammateData,
  fetchConversationBySearch,
  setConversations,
  fetchAccounts,
  fetchUserList,
  setNotificationToken,
  fetchUserSetting,
};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
    conversation_summary: state.conversationReducer.conversation_summary,
    conversations: state.conversationReducer.conversations,
    userPreference: state.detail?.userPreference,
    teamMateData: state.accountReducer?.teamMateData?.users,
    userList: state.accountReducer?.userList,
    userSetting: state?.settings?.userSetting,
  };
};
export default connect(mapStateToProps, mapActionCreators)(TestChatScreen);
