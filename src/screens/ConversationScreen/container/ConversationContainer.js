import React, {Component} from 'react';
import {Alert, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {CONVERSATION} from '../../../constants/global';
import {strings} from '../../../locales/i18n';
import {goBack, navigate} from '../../../navigator/NavigationUtils';
import ConversationComponent from '../component/ConversationComponent';

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
    };
    this.onPressInfo = this.onPressInfo.bind(this);
    this.onPressMore = this.onPressMore.bind(this);
    this.onChangeAssignee = this.onChangeAssignee.bind(this);
    this.onCloseConversation = this.onCloseConversation.bind(this);
    this.moreInfoModalRef = React.createRef();
    this.scrollViewRef = React.createRef();
    this.listRef = React.createRef();
    this.attachmentBottomSheetRef = React.createRef();
  }

  componentDidMount = () => {
    this.setState({conversationJoined: true});
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  };
  onPressMore = () => {
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
    this.closeMoreInfoModal();
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

  render() {
    const {
      teamMateData,
      teamData,
      route: {
        params: {itemData},
      },
    } = this.props;
    console.log('itemData', JSON.stringify(itemData));
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
          joinConversationPress={() => {
            this.setState(prev => ({...prev, conversationJoined: true}));
          }}
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
          teamMateData={teamMateData}
          teamData={teamData}
          itemData={itemData}
        />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {
    teamData: state.accountReducer?.teamData?.teams,
    teamMateData: state.accountReducer?.teamMateData?.users,
  };
};
export default connect(
  mapStateToProps,
  mapActionCreators,
)(ConversationContainer);
