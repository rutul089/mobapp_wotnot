import React, {Component} from 'react';
import {Alert, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {CONVERSATION} from '../../../constants/global';
import {strings} from '../../../locales/i18n';
import {goBack, navigate} from '../../../navigator/NavigationUtils';
import {handleFailureCallback} from '../../../util/apiHelper';
import ConversationComponent from '../component/ConversationComponent';
import {
  fetchTeamData,
  fetchTeammateData,
  setTeammateData,
  setIncomingEvent,
  fetchConversationHistory,
  setConversationsHistory,
  fetchSavedReply,
} from '../../../store/actions';
import {
  CONVERSATION_STATUS_NAME,
  showToast,
  CONVERSATION_STATUS,
} from '../../../util/helper';
import moment from 'moment';
import {
  emitAgentTyping,
  registerMessageHandler,
  registerVisitorTypingHandler,
  registerAssigneeChangedHandler,
  registerStatusChangedHandler,
} from '../../../websocket';
import {getMessageFromEventPayload} from '../../../common/common';
import {isValidJSON, stringToObj} from '../../../util/JSONOperations';

class ConversationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationJoined: false,
      keyboardHeight: 0,
      inputHeight: 40,
      messageToSend: '',
      messageList: [],
      showChangeAssignee: false,
      isTeamSelected: false,
      isLoading: false,
      search_text: '',
      filterTeamData: [],
      filterTeamMateData: [],
      showSavedReply: false,
      filterSaveReplyData: [],
      search_text_save_reply: '',
      saveLoading: true,
      typingMsg: '',
      conversationStatus: 0,
      search_after: '',
    };
    this.onPressInfo = this.onPressInfo.bind(this);
    this.onPressMore = this.onPressMore.bind(this);
    this.onChangeAssignee = this.onChangeAssignee.bind(this);
    this.onCloseConversation = this.onCloseConversation.bind(this);
    this.moreInfoModalRef = React.createRef();
    this.scrollViewRef = React.createRef();
    this.listRef = React.createRef();
    this.attachmentBottomSheetRef = React.createRef();
    this.onTeamItemPress = this.onTeamItemPress.bind(this);
    this.onSaveReplyClick = this.onSaveReplyClick.bind(this);
  }

  componentDidMount = () => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    this.setState({
      conversationJoined: true,
      conversationStatus: itemData?.status_id,
    });
    this.props?.setConversationsHistory([]);
    this.callFetchTeamData();
    this.callFetchTeammateData();
    this.callFetchConversationHistory(true);
    this.props.navigation.addListener('focus', () => {
      registerMessageHandler(this.onMessageReceived);
      registerAssigneeChangedHandler(this.changeAssigneeHandler);
      registerStatusChangedHandler(this.changeConversationStatus);
      registerVisitorTypingHandler(e => console.log(e));
    });

    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  };

  onPressMore = () => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;

    if (this.state.conversationStatus == CONVERSATION.CLOSED_MESSAGE_TYPE) {
      // return;
    }
    this.moreInfoModalRef?.current?.open();
  };

  onPressInfo = () => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    navigate('UserDetailScreen', {itemData: itemData});
  };

  onChangeAssignee = () => {
    this.closeMoreInfoModal();
    setTimeout(() => {
      this.setState({showChangeAssignee: true}, () => {});
    }, 200);
  };

  onCloseConversation = () => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    this.closeMoreInfoModal();

    let param = {
      conversation_key: itemData?.thread_key,
      type: 'status',
      payload: {
        is_closed: true,
      },
      timestamp: moment().unix(),
    };
    this.setLoading(true);
    this.callSetIncomingEvent(
      param,
      true,
      'You closed this conversation',
      true,
    );
  };

  closeMoreInfoModal = () => {
    this.moreInfoModalRef?.current?.close();
  };

  onPressLeftContent = () => {
    goBack();
  };

  _keyboardDidShow(e) {
    // this.listRef.current?.scrollToEnd({animated: true});
    this.setState({keyboardHeight: e.endCoordinates.height});
  }

  _keyboardDidHide(e) {
    this.setState({keyboardHeight: 0});
  }

  updateMessageValue = message => {
    const {
      route: {
        params: {itemData},
      },
      userPreference,
    } = this.props;
    let payload = {
      conversation_key: itemData?.thread_key,
      bot_id: [itemData?.bot_id],
      account_id: [userPreference?.account_id],
      agent_id: userPreference?.logged_in_user_id,
      typing: 'ok',
      visitor_key: itemData?.visitor_key,
      sender: {
        name: userPreference.logged_in_user_name,
        image_url: userPreference.image_url
          ? userPreference.image_url.small
          : 'https://cdn.wotnot.io/static/img/navigation-panel/userProfile.svg',
        type: 'agent',
      },
    };
    if (message !== '' && message.trim() !== '') {
      emitAgentTyping(payload);
    }
    this.setState({messageToSend: message});
  };

  showMenuOptions = () => {
    this.attachmentBottomSheetRef?.current?.open();
  };

  onSendPress = () => {
    if (this.state.messageToSend === '' && inputText.trim() === '') {
      return;
    }
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    let payload = {
      conversation_key: itemData?.thread_key,
      type: 'message',
      payload: {
        message: {text: this.state.messageToSend, type: 'text'},
      },
    };
    this.callSetIncomingEvent(payload);
    this.setState({
      messageToSend: '',
    });
    // this.listRef.current?.scrollToEnd({animated: true});
  };

  onSavedReplyPress = () => {
    this.attachmentBottomSheetRef?.current?.close();
    this.setState({
      showSavedReply: true,
    });
    this._callSaveReply();
  };
  onCalendarPress = () => {
    Alert.alert('TBD');
    this.attachmentBottomSheetRef?.current?.close();
  };
  onAttachmentsPress = () => {
    Alert.alert('TBD');
    this.attachmentBottomSheetRef?.current?.close();
  };

  onChangeAssigneeModalClose = () => {
    this.setState({showChangeAssignee: false});
  };

  onTeamClick = () => {
    this.setState({isTeamSelected: true});
  };

  onTeamMateClick = () => {
    this.setState({isTeamSelected: false});
  };

  callFetchTeamData = () => {
    this.props.fetchTeamData(this.props?.userPreference?.account_id, 1, {
      SuccessCallback: res => {},
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  callFetchTeammateData = () => {
    let param = {
      order_by: 'user',
      order: 'asc',
      pagination: {limit: 20, offset: 1},
    };
    this.props.fetchTeammateData(
      this.props?.userPreference?.account_id,
      param,
      {
        SuccessCallback: res => {},
        FailureCallback: res => {
          handleFailureCallback(res);
        },
      },
    );
  };

  onTeamItemPress = item => {
    this.setState({showChangeAssignee: false});
    this.setLoading(true);
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    let param = {
      conversation_key: itemData?.thread_key,
      type: 'assignee',
      payload: {
        assignee: {
          to: {
            id: item?.id,
            type: this.state.isTeamSelected ? 'team' : 'team_member',
          },
        },
      },
    };
    this.callSetIncomingEvent(param);
  };

  callSetIncomingEvent = (
    param,
    isShowToast = false,
    message = '',
    isGoBack = false,
  ) => {
    this.props.setIncomingEvent(
      this.props?.userPreference?.logged_in_user_id,
      param,
      {
        SuccessCallback: res => {
          this.setLoading(false);
          if (res?.ok) {
            isGoBack ? goBack() : null;
            if (isShowToast) {
              showToast(message);
            }
          }
        },
        FailureCallback: res => {
          this.setLoading(false);
          handleFailureCallback(res, true, true);
        },
      },
    );
  };

  setLoading = value => {
    this.setState({isLoading: value});
  };

  onSearchText = searchText => {
    const {teamMateData, teamData} = this.props;

    this.setState({
      search_text: searchText,
    });

    if (!searchText || searchText === '') {
      this.setState({
        filterTeamMateData: [],
        filterTeamData: [],
      });
      return;
    }

    let _teamMateData = [
      {
        id: null,
        display_name: 'none',
      },
      ...teamMateData,
    ];

    let filterTeamData = teamData.filter(function (item) {
      return item?.name?.toLowerCase()?.includes(searchText?.toLowerCase());
    });

    let filterTeamMateData = _teamMateData.filter(function (item) {
      return item?.display_name
        ?.toLowerCase()
        .includes(searchText?.toLowerCase());
    });

    this.setState({
      filterTeamMateData: filterTeamMateData,
      filterTeamData: filterTeamData,
    });
  };

  joinConversationPress = () => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;

    let param = {
      conversation_key: itemData?.thread_key,
      type: 'assignee',
      payload: {
        assignee: {
          to: {
            id: this.props?.userPreference?.logged_in_user_id,
            type: 'team_member',
          },
        },
      },
    };

    this.setLoading(true);
    this.callSetIncomingEvent(
      param,
      true,
      'You assigned this conversation to yourself.',
    );
    this.setState(prev => ({...prev, conversationJoined: true}));
  };

  callFetchConversationHistory = (showLoader, isLoadMore = false) => {
    let offset = isLoadMore
      ? this.state.search_after
        ? `&search_after=${this.state.search_after?.toString()}`
        : ''
      : '';
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    this.props.fetchConversationHistory(
      itemData?.thread_key,
      `limit=35${offset}`,
      showLoader,
      {
        SuccessCallback: res => {
          if (res?.ok) {
            console.log("res?.search_after",res?.search_after)
            this.setState(
              {
                messageList: offset
                  ? [...this.state.messageList, ...res?.messages_list]
                  : res?.messages_list,
                search_after: res?.search_after,
                isLoadMore: false,
              },
              () =>
                this.onEmitReadMsg(
                  res?.messages_list,
                  this.state.conversationStatus,
                ),
            );
          }
        },
        FailureCallback: res => {
          handleFailureCallback(res, false);
        },
      },
    );
  };

  setJoinButton = () => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;

    if (this.state.conversationStatus === CONVERSATION.CLOSED_MESSAGE_TYPE) {
      return false;
    }

    return (
      itemData?.conversation_mode !== CONVERSATION.CONVERSATION_MODE ||
      (itemData?.assignee && itemData?.assignee?.user_type === 'bot') ||
      itemData?.assignee?.type_id === 2
    );
  };

  _callSaveReply = () => {
    this.props.fetchSavedReply(
      this.props?.userPreference?.account_id,
      0,
      50,
      false,
      {
        SuccessCallback: res => {
          this.setState({saveLoading: false});
        },
        FailureCallback: res => {
          this.setState({saveLoading: false});
          handleFailureCallback(res, false);
        },
      },
    );
  };

  onCloseSaveReply = () => {
    this.setState({
      showSavedReply: false,
    });
  };

  onSearchSaveReply = searchText => {
    this.setState({search_text_save_reply: searchText});
    let {save_reply_list} = this.props;

    if (!searchText || searchText === '') {
      this.setState({
        filterSaveReplyData: [],
      });
      return;
    }

    let filterSaveReply = save_reply_list.filter(
      item =>
        item?.reply?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
        item?.title?.toLowerCase()?.includes(searchText?.toLowerCase()),
    );

    console.log('filterSaveReply', JSON.stringify(filterSaveReply));

    this.setState({
      filterSaveReplyData: filterSaveReply,
    });
  };

  onSaveReplyClick = item => {
    this.setState((prevState, props) => ({
      messageToSend: prevState.messageToSend + item?.reply,
      showSavedReply: false,
    }));
  };

  onMessageReceived = msg => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    if (!(this.props.isLoading || this.state.isLoading) && msg) {
      if (itemData?.thread_key === msg?.conversation_key) {
        let convertedMessage = getMessageFromEventPayload(
          msg,
          this.props.messageHistory,
        );
        let newMsg;
        if (!convertedMessage) return;
        if (convertedMessage?.bot) {
          const assignee = itemData?.assignee
            ? itemData?.assignee
            : convertedMessage.bot;
          newMsg = {
            agent: {
              ...assignee,
              ...convertedMessage.bot,
              message: isValidJSON(convertedMessage.bot.message)
                ? stringToObj(convertedMessage.bot.message)
                : convertedMessage.bot.message,
            },

            timestamp: '0', // 0 is set so the ticker will be start from now and increament by 1,2,3 ... and forth
          };
        } else if (convertedMessage?.agent) {
          const assignee = itemData?.assignee
            ? itemData?.assignee
            : convertedMessage.agent;
          let text = convertedMessage.agent.message
            ? JSON.parse(convertedMessage.agent.message)['text']
            : '';
          let created_by = convertedMessage.assignee
            ? convertedMessage.assignee.id
            : null;
          let oldMessage = isValidJSON(convertedMessage.agent.message)
            ? stringToObj(convertedMessage.agent.message)
            : {};
          newMsg = {
            agent: {
              created_by: created_by,
              ...assignee,
              ...convertedMessage.agent,
              message: {
                ...oldMessage,
                text: text,
                type:
                  isValidJSON(convertedMessage.agent.message) &&
                  stringToObj(convertedMessage.agent.message).type
                    ? stringToObj(convertedMessage.agent.message).type
                    : 'text',
              },
            },
            timestamp: '0', // 0 is set so the ticker will be start from now and increament by 1,2,3 ... and forth
          };
        } else {
          let oldMessage = isValidJSON(convertedMessage.user.message)
            ? stringToObj(convertedMessage.user.message)
            : {};
          newMsg = {
            user: {
              ...oldMessage,
              message: {
                ...convertedMessage.user.message,
                text:
                  isValidJSON(convertedMessage.user.message) &&
                  stringToObj(convertedMessage.user.message).text
                    ? stringToObj(convertedMessage.user.message).text
                    : '',
                type:
                  isValidJSON(convertedMessage.user.message) &&
                  stringToObj(convertedMessage.user.message).type
                    ? stringToObj(convertedMessage.user.message).type
                    : 'text',
              },
            },
            timestamp: '0', // 0 is set so the ticker will be start from now and increament by 1,2,3 ... and forth
          };
        }

        this.setState({
          messageList: [newMsg, ...this.state.messageList],
        });
      }
    }
  };

  visitorTyping = data => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    if (!(this.props.isLoading || this.state.isLoading) && data) {
      if (itemData?.thread_key === typingMsg.conversation_key) {
        let newMsg = {
          ...data,
          type: 'typing',
          name: itemData?.title,
          key: Math.random(),
        };
        this.setState({
          typingMsg: newMsg,
        });
      }
    }
  };

  onEmitReadMsg = async (data, conversationStatusId) => {
    // if (
    //   (conversationStatusId === CONVERSATION_STATUS.OPEN ||
    //     route.params.conversationStatusId === CONVERSATION_STATUS.OPEN) &&
    //   (!route.params.unreadMessagesCount ||
    //     route.params.unreadMessagesCount > 0)
    // ) {
    //   let readMsgCounts = getChatMsgCountWithoutStatusMsg(data);
    //   // triggerMsgReadEvent(readMsgCounts);
    // }
  };

  changeAssigneeHandler = data => {
    console.log('changeAssigneeHandler------->', data);
  };

  changeConversationStatus = data => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    if (data && data?.conversation_key === itemData?.thread_key) {
      let newStatus =
        data?.event_payload?.status?.name === CONVERSATION_STATUS_NAME.CLOSED
          ? CONVERSATION_STATUS.CLOSED
          : CONVERSATION_STATUS.OPEN;
      this.setState(
        {
          conversationStatus: newStatus,
        },
        () => {
          setTimeout(() => {
            this.callFetchConversationHistory(false);
          }, 500);
        },
      );
    }
  };

  handleLoadMore = e => {
    console.log('e=======?', this.state.search_after + "123");
    // if (this.state.search_after?.length > 0) {
      this.setState({isLoadMore: true});
      this.callFetchConversationHistory(false, true);
      console.log('----<', this.state.search_after?.toString());
    // } 
    this.setState({isLoadMore: false});

  };

  render() {
    const {
      teamMateData,
      teamData,
      route: {
        params: {itemData},
      },
      userPreference,
      messageHistory,
      save_reply_list,
    } = this.props;
    let {
      filterTeamMateData,
      filterTeamData,
      search_text,
      search_text_save_reply,
      filterSaveReplyData,
    } = this.state;
    return (
      <>
        <ConversationComponent
          onPressMore={this.onPressMore}
          onPressInfo={this.onPressInfo}
          moreInfoModalRef={this.moreInfoModalRef}
          onChangeAssignee={this.onChangeAssignee}
          onCloseConversation={this.onCloseConversation}
          onPressLeftContent={this.onPressLeftContent}
          joinConversation={strings('chat.join_conversation_message')}
          joinConversationBtn={strings('button.join_conversation')}
          joinConversationPress={this.joinConversationPress}
          joinButton={
            itemData?.conversation_mode !== CONVERSATION.CONVERSATION_MODE
          }
          scrollViewRef={this.scrollViewRef}
          keyboardHeight={this.state.keyboardHeight}
          inputHeight={this.state.inputHeight}
          listRef={this.listRef}
          messageToSend={this.state.messageToSend}
          updateMessageValue={this.updateMessageValue}
          showMenuOptions={this.showMenuOptions}
          onSendPress={this.onSendPress}
          placeHolderMessage={strings('chat.send_a_message')}
          attachmentBottomSheetRef={this.attachmentBottomSheetRef}
          onSavedReplyPress={this.onSavedReplyPress}
          onCalendarPress={this.onCalendarPress}
          pnAttachmentsPress={this.onAttachmentsPress}
          messageList={this.state.messageList}
          showChangeAssignee={this.state.showChangeAssignee}
          onChangeAssigneeModalClose={this.onChangeAssigneeModalClose}
          onTeamClick={this.onTeamClick}
          onTeamMateClick={this.onTeamMateClick}
          isTeamSelected={this.state.isTeamSelected}
          teamMateData={
            search_text !== ''
              ? filterTeamMateData
              : [
                  {
                    id: null,
                    display_name: 'none',
                  },
                  ...teamMateData,
                ]
          }
          teamData={search_text !== '' ? filterTeamData : teamData}
          itemData={itemData}
          userID={userPreference?.logged_in_user_id}
          onTeamItemPress={this.onTeamItemPress}
          isLoading={this.props.isLoading || this.state.isLoading}
          searchValue={this.state.search_text}
          onChangeText={this.onSearchText}
          // messageHistory={messageHistory}
          messageHistory={this.state.messageList}
          users={this.props.conversationHistory?.users}
          isClosed={this.state.conversationStatus === 2}
          showSavedReply={this.state.showSavedReply}
          save_reply_list={
            search_text_save_reply !== ''
              ? filterSaveReplyData
              : save_reply_list
          }
          onCloseSaveReply={this.onCloseSaveReply}
          replyLoading={this.state.saveLoading}
          searchSaveReply={this.state.search_text_save_reply}
          onSearchSaveReply={this.onSearchSaveReply}
          onSaveReplyClick={this.onSaveReplyClick}
          userName={itemData?.title}
          conversationStatus={this.state?.conversationStatus}
          handleLoadMore={this.handleLoadMore}
          isLoadMore={this.state.isLoadMore}
        />
      </>
    );
  }
}

const mapActionCreators = {
  fetchTeamData,
  fetchTeammateData,
  setTeammateData,
  setIncomingEvent,
  fetchConversationHistory,
  setConversationsHistory,
  fetchSavedReply,
};
const mapStateToProps = state => {
  return {
    teamData: state.accountReducer?.teamData?.teams,
    teamMateData: state.accountReducer?.teamMateData?.users,
    userPreference: state.detail?.userPreference,
    messageHistory:
      state.conversationReducer?.conversationHistory?.messages_list,
    isLoading: state.global.loading,
    conversationHistory: state.conversationReducer?.conversationHistory,
    save_reply_list: state.accountReducer?.savedReply?.replies,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(ConversationContainer);
