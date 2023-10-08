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
} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import {getAssigneeId} from '../../../util/helper';
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
    };
    this.onSelectTab = this.onSelectTab.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onConversationClick = this.onConversationClick.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.loadMoreData = this.loadMoreData.bind(this);
    this.appStateRef = null;
  }

  async componentDidMount() {
    this.registerAppStateEvent();
    this.callSummary();
    this.callFetchTeamData();
    this.callFetchTeammateData();
    this.callSetNotificationToken();
    if (!getItemFromStorage(LOCAL_STORAGE?.AGENT_ACCOUNT_LIST)) {
      this.cllFetchAccounts();
    }
    this.callFetchConversation(this.state.currentTab, false, true);
    this.callFetchUserList();
    this.props.navigation.addListener('focus', () => {
      this.callFetchConversation(this.state.currentTab, false, false);
      registerAssigneeChangedHandler(this.onAssigneeChange);
      registerConversationCreateHandler(this.onConvCreateReceived);
      registerStatusChangedHandler(this.msgStatusChange);
      registerMessageHandler(this.messageHandler);
      registerMessageRead(this.readMessage);
    });
    initSocket();
    emitAgentJoin();
    reconnect();
    // registerVisitorTypingHandler(this.visitorTypingStatus);
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

  // callFetchConversation = () => {
  //   let {userPreference, statusId} = this.props;
  //   this.props.fetchConversation(userPreference?.account_id, 2, 5, {
  //     SuccessCallback: res => {
  //       this.props.setClosedConversationCount(res?.total_conversations);
  //     },
  //     FailureCallback: res => {
  //       handleFailureCallback(res, true);
  //     },
  //   });
  // };

  callFetchTeamData = () => {
    this.props.fetchTeamData(this.props?.userPreference?.account_id, 1, {
      SuccessCallback: res => {},
      FailureCallback: res => {
        handleFailureCallback(res, true, true, false);
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
    console.log('distanceFromEnd', distanceFromEnd);
    // if (!distanceFromEnd >= 1) {
    //   return;
    // }
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
    if (
      !this.state.isLoading &&
      !this.state.isRefreshing &&
      !this.state.moreLoading &&
      data
    ) {
      // this.callFetchConversation(this.state.currentTab, false, false);
    }
    // alert(data)
    // this.setTimeout(() => {
    // this.callFetchConversation(this.state.currentTab, false, false);
    // });
  };

  registerAppStateEvent() {
    this.appStateRef = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // API call
      console.log('nextAppState---------1', nextAppState);
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
    let {userPreference} = this.props;
    if (
      !this.state.isLoading &&
      !this.state.isRefreshing &&
      !this.state.moreLoading &&
      msg
    ) {
      let convertedMessage = getMessageFromEventPayload(
        msg,
        this.props.conversations,
      );
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
          this.props.setConversations([
            newObj?.newMsg,
            ...newObj?.conversationData,
          ]);
        }
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
      FailureCallback: res => {
        console.log('FailureCallback', res);
      },
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
              : this.props.isLoading || this.state.isLoading
          }
          isRefreshing={this.state.isRefreshing}
          onRefresh={this.onRefresh}
          onConversationClick={this.onConversationClick}
          onSearchClick={this.onSearchClick}
          onEndReach={this.loadMoreData}
          typingData={this.state.typingData}
        />
      </>
    );
  }
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
};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
    conversation_summary: state.conversationReducer.conversation_summary,
    conversations: state.conversationReducer.conversations,
    userPreference: state.detail?.userPreference,
    teamMateData: state.accountReducer?.teamMateData?.users,
    userList: state.accountReducer?.userList,
  };
};
export default connect(mapStateToProps, mapActionCreators)(TestChatScreen);
