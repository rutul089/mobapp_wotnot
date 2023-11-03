import React, {Component} from 'react';
import {Alert, Keyboard, AppState,BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {CONVERSATION} from '../../../constants/global';
import {strings} from '../../../locales/i18n';
import {
  goBack,
  navigate,
  navigateAndSimpleReset,
} from '../../../navigator/NavigationUtils';
import {handleFailureCallback} from '../../../util/apiHelper';
import ConversationComponent from '../component/ConversationComponent';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {
  fetchTeamData,
  fetchTeammateData,
  setTeammateData,
  setIncomingEvent,
  fetchConversationHistory,
  setConversationsHistory,
  fetchSavedReply,
  uploadFileAttachment,
  saveReply,
  fetchSavedReplySearch,
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
  reconnect,
  emitAgentJoin,
  initSocket,
} from '../../../websocket';
import {getMessageFromEventPayload} from '../../../common/common';
import {isValidJSON, stringToObj} from '../../../util/JSONOperations';
import * as ImagePicker from 'react-native-image-picker';
import {
  requestDocument,
  openImagePicker,
  requestFileOption,
} from '../../../util/MediaHelper';
import {getChatMsgCountWithoutStatusMsg} from '../../../util/ChatHistoryHelper';
import axios from 'axios';
import {Text, View} from 'native-base';

let options = {
  mediaType: 'photo',
  quality: 1.0,
  storageOptions: {
    skipBackup: true,
  },
  json: true,
};

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
      isLoading: true,
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
      isJoinButtonVisible: false,
      readMessageCount: 0,
      mediaData: null,
      mediaDataUrl: '',
      hideLoader: false,
      appState: AppState.currentState,
      from: 0,
      total_replies: 0,
      saveReplyLoadMore: false,
      savedReplyList: [],
      isSearching: false,
      userData: {},
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
    this.appStateRef = null;
    this.replyInputRef = React.createRef();
    this.timer = null;
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount = () => {
    const {
      route: {
        params: {itemData, fromNotification},
      },
    } = this.props;

    this.setState({
      conversationJoined: true,
      conversationStatus: itemData?.status_id ?? 1,
      // isJoinButtonVisible:
      //   itemData?.conversation_mode !== CONVERSATION.CONVERSATION_MODE,
    });
    this.registerAppStateEvent();
    this.props?.setConversationsHistory([]);
    this.callFetchTeamData();
    this.callFetchTeammateData();
    this.callFetchConversationHistory(true, false);
    this.setIsJoinButton();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.registerListener();
    });
    this._callSaveReply();
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  };

  componentWillUnmount = () => {
    this.props.saveReply([]);
    this._unsubscribe();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
    const {
      route: {
        params: {itemData, fromNotification},
      },
      userPreference,
    } = this.props;
    if (fromNotification) {
      navigateAndSimpleReset('MainNavigator');
      return;
    }
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
    if (
      this.state.messageToSend === '' &&
      this.state.messageToSend?.trim() === ''
    ) {
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
    setTimeout(() => {
      this.setState({
        showSavedReply: true,
      });
    }, 200);

    this._callSaveReply();
  };
  onCalendarPress = () => {
    Alert.alert('TBD');
    this.attachmentBottomSheetRef?.current?.close();
  };
  onAttachmentsPress = async () => {
    setTimeout(async () => {
      requestFileOption(async (response, type) => {
        this.setState(
          {
            mediaData: response,
          },
          () => {
            this.attachmentBottomSheetRef?.current?.close(),
              this.uploadMedia(response);
          },
        );
      });
      // requestDocument(async (response, type) => {
      //   this.setState(
      //     {
      //       mediaData: response,
      //     },
      //     () => this.uploadMedia(response),
      //   );
      // });
    }, 200);
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
        handleFailureCallback(res, false, true, false);
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
          handleFailureCallback(res, false, true, false);
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
          handleFailureCallback(res, true, true, false);
        },
      },
    );
  };

  setLoading = value => {
    this.setState({isLoading: value, isLoadMore: false});
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
    this.setState(
      {
        isJoinButtonVisible: false,
      },
      () => {
        setTimeout(() => {
          this.replyInputRef?.current?.focus();
        }, 550);
      },
    );
    this.setLoading(true);
    this.callSetIncomingEvent(param, false, '');
    this.setState(prev => ({...prev, conversationJoined: true}));
  };

  callFetchConversationHistory = (showLoader, isLoadMore = false) => {
    this.setLoading(true);
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
      `limit=35`,
      showLoader,
      {
        SuccessCallback: res => {
          if (res?.ok) {
            this.setState(
              {
                messageList: offset
                  ? [...this.state.messageList, ...res?.messages_list]
                  : res?.messages_list,
                search_after: res?.search_after,
                isLoadMore: false,
                userData: res?.users,
              },
              async () => {
                this.onEmitReadMsg(res?.messages_list);
              },
            );
          }
          this.setLoading(false);
        },
        FailureCallback: res => {
          this.setLoading(false);
          handleFailureCallback(res, false, true, false);
        },
      },
    );
  };

  callFetchConversationHistorySearchAfter = isLoadMore => {
    let offset = isLoadMore
      ? this.state.search_after && this.state.search_after.length > 0
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
      false,
      {
        SuccessCallback: res => {
          if (res?.ok) {
            this.setState(
              {
                messageList: offset
                  ? [...this.state.messageList, ...res?.messages_list]
                  : res?.messages_list,
                search_after: res?.search_after,
                isLoadMore: false,
                userData: res?.users,
              },
              () => this.onEmitReadMsg(res?.messages_list),
            );
          }
          this.setLoading(false);
        },
        FailureCallback: res => {
          this.setLoading(false);
          handleFailureCallback(res, false, true, false);
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

  _callSaveReply = (query = '') => {
    this.props.fetchSavedReply(
      this.props?.userPreference?.account_id,
      this.state.from,
      10,
      false,
      query,
      {
        SuccessCallback: res => {
          // let listData = this.props.save_reply_list;
          this.setState({
            saveLoading: false,
            total_replies: res?.total_replies,
            saveReplyLoadMore: false,
            savedReplyList: [...this.state.savedReplyList, ...res?.replies],
          });
          // this.props.saveReply([...this.state.savedReplyList, ...res?.replies]);
        },
        FailureCallback: res => {
          this.setState({saveLoading: false, saveReplyLoadMore: false});
          handleFailureCallback(res, false, true, false);
        },
      },
    );
  };

  _callSaveReplySearch = (query = '') => {
    this.props.fetchSavedReplySearch(
      this.props?.userPreference?.account_id,
      false,
      query,
      {
        SuccessCallback: res => {
          // let listData = this.props.save_reply_list;
          this.setState({
            saveLoading: false,
            total_replies: res?.total_replies,
            saveReplyLoadMore: false,
            savedReplyList: res?.replies,
          });
          // this.props.saveReply([...this.state.savedReplyList, ...res?.replies]);
        },
        FailureCallback: res => {
          this.setState({saveLoading: false, saveReplyLoadMore: false});
          handleFailureCallback(res, false, true, false);
        },
      },
    );
  };

  onCloseSaveReply = () => {
    this.setState({
      showSavedReply: false,
      from: 0,
    });
    this.props.saveReply([]);
  };

  handleChange = searchText => {
    clearTimeout(this.timer);
    this.setState({search_text_save_reply: searchText, saveLoading: true});
    this.timer = setTimeout(this.triggerChange, 500);
  };

  triggerChange = () => {
    this._callSaveReplySearch(this.state.search_text_save_reply);
  };

  onSearchSaveReply = searchText => {
    this.handleChange(searchText);
    return;
    this.setState({search_text_save_reply: searchText});
    setTimeout(() => {
      console.log('------');
    }, 500);
    return;
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
        this.callReadMessageEvent(Number(this.state.readMessageCount) + 1);
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
          // console.log(
          //   '------messageList',
          //   JSON.stringify(this.state.messageList),
          // );
          setTimeout(() => {
            this.callFetchConversationHistory(false, false);
          }, 1500);
        },
      );
    }
  };

  handleLoadMore = e => {
    if (!e?.distanceFromEnd >= 1) {
      return;
    }
    // if (this.state.search_after?.length > 0) {
    this.setState({isLoadMore: true, hideLoader: true});
    this.callFetchConversationHistorySearchAfter(true);
    setTimeout(() => {
      this.setState({
        hideLoader: false,
      });
    }, 1000);
    // }
    this.setState({isLoadMore: false});
  };

  assigneeChange = msgAssigneeChange => {
    const {
      route: {
        params: {itemData},
      },
      userPreference,
    } = this.props;
    if (msgAssigneeChange) {
      if (itemData?.thread_key === msgAssigneeChange.conversation_key) {
        msgAssigneeChange.event_payload.assigned.from.user_type === 'bot'
          ? this.props.navigation.setParams({
              assignee: msgAssigneeChange.event_payload.assigned.to,
            })
          : null;
        let assignedTo = msgAssigneeChange.event_payload.assigned.to;
        (assignedTo.user_type === 'user' || assignedTo.user_type === null) &&
        this.state.isJoinButtonVisible
          ? this.setState({isJoinButtonVisible: false})
          : null;
        let msgAssignee = {
          agent: {
            assigned: {
              timestamp: 'now',
              by: {created_by: msgAssigneeChange.event_payload.assigned.by.id},
              to: {created_by: msgAssigneeChange.event_payload.assigned.to.id},
            },
          },
        };
        this.setState({
          messageList: [msgAssignee, ...this.state.messageList],
        });
      }
    }
  };

  setIsJoinButton = () => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    if (itemData?.status_id !== CONVERSATION_STATUS.CLOSED) {
      if (
        itemData?.assignee &&
        itemData?.assignee?.name?.toLowerCase() === 'bot' &&
        itemData?.assignee?.type_id === 2
      ) {
        this.setState({
          isJoinButtonVisible: true,
        });
      } else {
        if (itemData?.conversation_mode === CONVERSATION.CONVERSATION_MODE) {
          this.setState({
            isJoinButtonVisible: true,
          });
        } else {
          setTimeout(() => {
            this.replyInputRef?.current?.focus();
          }, 500);
        }
      }
    }
  };
  onEmitReadMsg = data => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;

    if (
      itemData?.status_id === CONVERSATION_STATUS.OPEN &&
      itemData?.unread_messages_count > 0
    ) {
      let readMsgCounts = getChatMsgCountWithoutStatusMsg(data);
      this.callReadMessageEvent(readMsgCounts);
    }
  };

  callReadMessageEvent = msgCount => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    let payload = {
      conversation_key: itemData?.thread_key,
      type: 'message_read',
      payload: {
        read_messages_count: msgCount,
      },
    };
    this.callSetIncomingEvent(payload, false, '');
    this.setState({readMessageCount: msgCount});
  };

  uploadMedia = fileData => {
    return;
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    const {fs} = RNFetchBlob;
    var data = new FormData();
    data.append('file', fileData.uri);
    data.append('bot_lead_id', itemData?.bot_id);

    var config = {
      method: 'post',
      url: 'https://app.wotnot.io/v1/livechat-file-attachment',
      data: data,
      onUploadProgress: progress => {
        // console.log('0------', progress);
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
      });
    return;
    this.props.uploadFileAttachment(data, false, {
      SuccessCallback: res => {
        console.log('SuccessCallback', JSON.stringify(res));
      },
      FailureCallback: res => {
        console.log('FailureCallback', JSON.stringify(res));
        handleFailureCallback(res, false, false, false);
      },
    });
  };

  onMediaPreviewCancel = () => {
    this.setState({
      mediaDataUrl: '',
      mediaData: null,
    });
  };

  registerListener = () => {
    registerMessageHandler(this.onMessageReceived);
    registerStatusChangedHandler(this.changeConversationStatus);
    registerVisitorTypingHandler(e => console.log(e));
    registerAssigneeChangedHandler(this.assigneeChange);
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      initSocket();
      emitAgentJoin();
      this.registerListener();
      reconnect();
    } else {
    }
    this.setState({appState: nextAppState});
  };

  registerAppStateEvent(value) {
    this.appStateRef = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
    // this.appStateRef?.remove()
  }

  loadSaveReply = () => {
    if (this.state.total_replies <= this.state.savedReplyList?.length) {
      return;
    }
    this.setState(
      {
        from: this.state.from + 10,
        saveReplyLoadMore: true,
      },
      () => this._callSaveReply(),
    );
  };
  
  handleBackButtonClick() {
    this.onPressLeftContent()
    return true;
}

  render() {
    const {
      teamMateData,
      teamData,
      route: {
        params: {itemData},
      },
      userPreference,
    } = this.props;
    let {filterTeamMateData, filterTeamData, search_text} = this.state;
    let finalTeamMate =
      search_text !== ''
        ? filterTeamMateData
        : teamMateData
        ? [
            {
              id: null,
              display_name: 'none',
            },
            ...teamMateData,
          ]
        : [
            {
              id: null,
              display_name: 'none',
            },
          ];
    return (
      <>
        <ConversationComponent
          onPressMore={this.onPressMore}
          onPressInfo={this.onPressInfo}
          moreInfoModalRef={this.moreInfoModalRef}
          onChangeAssignee={this.onChangeAssignee}
          onCloseConversation={this.onCloseConversation}
          onPressLeftContent={this.onPressLeftContent}
          joinConversation={strings('chat.JOIN_CONVERSATION_TEXT')}
          joinConversationBtn={strings('button.JOIN_CONVERSATION_BUTTON_TEXT')}
          joinConversationPress={this.joinConversationPress}
          joinButton={this.state.isJoinButtonVisible}
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
          onAttachmentsPress={this.onAttachmentsPress}
          messageList={this.state.messageList}
          showChangeAssignee={this.state.showChangeAssignee}
          onChangeAssigneeModalClose={this.onChangeAssigneeModalClose}
          onTeamClick={this.onTeamClick}
          onTeamMateClick={this.onTeamMateClick}
          isTeamSelected={this.state.isTeamSelected}
          teamMateData={finalTeamMate}
          // teamMateData={
          //   search_text !== ''
          //     ? filterTeamMateData
          //     : [
          //         // {
          //         //   id: null,
          //         //   display_name: 'none',
          //         // },
          //         ...teamMateData,
          //       ]
          // }
          teamData={search_text !== '' ? filterTeamData : teamData}
          itemData={itemData}
          userID={userPreference?.logged_in_user_id}
          onTeamItemPress={this.onTeamItemPress}
          isLoading={this.state.isLoading && !this.state.hideLoader}
          searchValue={this.state.search_text}
          onChangeText={this.onSearchText}
          // messageHistory={messageHistory}
          messageHistory={this.state.messageList}
          // users={this.props.conversationHistory?.users}
          users={this.state.userData}
          isClosed={this.state.conversationStatus === 2}
          showSavedReply={this.state.showSavedReply}
          save_reply_list={this.state.savedReplyList}
          onCloseSaveReply={this.onCloseSaveReply}
          replyLoading={this.state.saveLoading}
          searchSaveReply={this.state.search_text_save_reply}
          onSearchSaveReply={this.onSearchSaveReply}
          onSaveReplyClick={this.onSaveReplyClick}
          userName={itemData?.title}
          conversationStatus={this.state?.conversationStatus}
          handleLoadMore={this.handleLoadMore}
          isLoadMore={this.state.isLoadMore}
          mediaData={this.state.mediaData}
          onMediaPreviewCancel={this.onMediaPreviewCancel}
          replyInputRef={this.replyInputRef}
          handleLoadMore1={this.loadSaveReply}
          saveReplyLoadMore={this.state.saveReplyLoadMore}
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
  uploadFileAttachment,
  saveReply,
  fetchSavedReplySearch,
};
const mapStateToProps = state => {
  return {
    teamData: state?.accountReducer?.teamData?.teams,
    teamMateData: state?.accountReducer?.teamMateData?.users,
    userPreference: state?.detail?.userPreference,
    messageHistory:
      state?.conversationReducer?.conversationHistory?.messages_list,
    isLoading: state?.global.loading,
    conversationHistory: state?.conversationReducer?.conversationHistory,
    save_reply_list: state?.accountReducer?.savedReply,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(ConversationContainer);
