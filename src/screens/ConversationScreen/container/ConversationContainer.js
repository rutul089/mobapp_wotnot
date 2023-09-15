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
} from '../../../store/actions';
import {showToast} from '../../../util/helper';
import moment from 'moment';

class ConversationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversationJoined: false,
      keyboardHeight: 0,
      inputHeight: 40,
      messageToSend: '',
      messageList: [
        {
          sent: true,
          message: 'Hello! Would you like to take a closer look at our offer?',
          timeStamp: '12:30',
        },
        {
          sent: false,
          message: 'Yes, please!',
          uri: 'https://i.pravatar.cc/512',
          timeStamp: '12:30',
        },
        {
          sent: true,
          message:
            'Great! In that case, could you provide your phone number or email address so that we can get in touch with you?',
          timeStamp: '12:30',
        },
        {
          sent: true,
          message: 'Hello! Would you like to take a closer look at our offer?',
          timeStamp: '12:30',
        },
        {
          sent: false,
          message: 'Yes, please!',
          uri: 'https://i.pravatar.cc/512',
          timeStamp: '12:30',
        },
        {
          sent: true,
          message:
            'Great! In that case, could you provide your phone number or email address so that we can get in touch with you?',
          timeStamp: '12:30',
        },
        {
          sent: true,
          message: 'Hello! Would you like to take a closer look at our offer?',
          timeStamp: '12:30',
        },
        {
          sent: false,
          message: 'Yes, please!',
          uri: 'https://i.pravatar.cc/512',
          timeStamp: '12:30',
        },
        {
          sent: true,
          message:
            'Great! In that case, could you provide your phone number or email address so that we can get in touch with you?',
          timeStamp: '12:30',
        },
      ],
      showChangeAssignee: false,
      isTeamSelected: false,
      isLoading: false,
      search_text: '',
      filterTeamData: [],
      filterTeamMateData: [],
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
  }

  componentDidMount = () => {
    this.setState({conversationJoined: true});
    this.callFetchTeamData();
    this.callFetchTeammateData();
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  };
  onPressMore = () => {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;

    if (itemData?.status_id == CONVERSATION.CLOSED_MESSAGE_TYPE) {
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
    this.callSetIncomingEvent(param, true, 'You closed this conversation',true);
  };
  closeMoreInfoModal = () => {
    this.moreInfoModalRef?.current?.close();
  };
  onPressLeftContent = () => {
    goBack();
  };
  _keyboardDidShow(e) {
    this.listRef.current?.scrollToEnd({animated: true});
    this.setState({keyboardHeight: e.endCoordinates.height});
  }
  _keyboardDidHide(e) {
    this.setState({keyboardHeight: 0});
  }
  updateMessageValue = message => {
    this.setState({messageToSend: message});
  };
  showMenuOptions = () => {
    this.attachmentBottomSheetRef?.current?.open();
  };
  onSendPress = () => {
    this.setState({
      messageList: [
        ...this.state.messageList,
        {
          sent: true,
          message: this.state.messageToSend,
          timeStamp: '12:30',
        },
      ],
    });
    this.listRef.current?.scrollToEnd({animated: true});
    //call api to send the message
  };
  onSavedReplyPress = () => {
    Alert.alert('TBD');
    this.attachmentBottomSheetRef?.current?.close();
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
    // --------teamData/name | teamMateData/display_name

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

    console.log('filterTemMateData', JSON.stringify(filterTeamMateData));
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
          conversationJoined={
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
          isLoading={this.state.isLoading}
          searchValue={this.state.search_text}
          onChangeText={this.onSearchText}
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
};
const mapStateToProps = state => {
  return {
    teamData: state.accountReducer?.teamData?.teams,
    teamMateData: state.accountReducer?.teamMateData?.users,
    userPreference: state.detail?.userPreference,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(ConversationContainer);
