import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ConversationComponent from '../component/ConversationComponent';
import {strings} from '../../../locales/i18n';
import { navigate } from '../../../navigator/NavigationUtils';

export default class ConversationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPressInfo = this.onPressInfo.bind(this);
    this.onPressMore = this.onPressMore.bind(this);
  }

  onPressMore = () => {
    navigate('UserDetailScreen')
  }
  onPressInfo = () => {
    navigate('UserDetailScreen')
  }

  render() {
    return (
      <>
        <ConversationComponent
          joinConversation={strings('chat.join_conversation_message')}
          joinConversationBtn={strings('button.join_conversation')}
          onPressMore={this.onPressMore}
          onPressInfo={this.onPressInfo}
        />
      </>
    );
  }
}
