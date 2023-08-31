import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ChatScreenComponent from '../component';
import {connect} from 'react-redux';
import {fetchConversationSummary} from '../../../store/actions';
import {CONVERSATION} from '../../../constants/global';
import {handleFailureCallback} from '../../../util/apiHelper';

class ChatScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
    };
    this.tabValues = [
      '(10) You',
      '(999) Assigned',
      '(10) Unassigned',
      '(2) Closed',
    ];
  }

  componentDidMount() {
    this.callSummary();
  }

  onSelectTab = tab => {
    this.setState({
      currentTab: tab,
    });
  };

  callSummary = () => {
    this.props.fetchConversationSummary('48200', {
      SuccessCallback: res => {},
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  render() {
    const {conversation_summary} = this.props
    console.log('conversation_summary',JSON.stringify(conversation_summary))
    return (
      <>
        <ChatScreenComponent
          onSelectTab={this.onSelectTab}
          tabValues={this.tabValues}
          currentTab={this.state.currentTab}
          open_status={conversation_summary?.open_status}
        />
      </>
    );
  }
}

const mapActionCreators = {
  fetchConversationSummary,
};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
    conversation_summary:state.conversationReducer.conversation_summary
  };
};
export default connect(mapStateToProps, mapActionCreators)(ChatScreenContainer);
