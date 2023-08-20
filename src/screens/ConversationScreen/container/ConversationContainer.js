import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ConversationComponent from '../component/ConversationComponent';
import {strings} from '../../../locales/i18n';
import {goBack, navigate} from '../../../navigator/NavigationUtils';

export default class ConversationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPressInfo = this.onPressInfo.bind(this);
    this.onPressMore = this.onPressMore.bind(this);
    this.onChangeAssignee = this.onChangeAssignee.bind(this);
    this.onCloseConversation = this.onCloseConversation.bind(this);
    this.moreInfoModalRef = React.createRef();
  }

  onPressMore = () => {
    this.moreInfoModalRef?.current?.open();
  };
  onPressInfo = () => {
    navigate('UserDetailScreen');
  };

  onChangeAssignee = () => {
    this.closeMoreInfoModal();
  };

  onCloseConversation = () => {
    this.closeMoreInfoModal();
  };

  closeMoreInfoModal = () => {
    this.moreInfoModalRef?.current?.close();
  };

  onPressLeftContent = () => {
    goBack()
  }

  render() {
    return (
      <>
        <ConversationComponent
          joinConversation={strings('chat.join_conversation_message')}
          joinConversationBtn={strings('button.join_conversation')}
          onPressMore={this.onPressMore}
          onPressInfo={this.onPressInfo}
          moreInfoModalRef={this.moreInfoModalRef}
          onChangeAssignee={this.onChangeAssignee}
          onCloseConversation={this.onCloseConversation}
          onPressLeftContent={this.onPressLeftContent}
        />
      </>
    );
  }
}
