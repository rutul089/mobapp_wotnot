import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ChatScreenComponent from '../component';
import {connect} from 'react-redux';
import {
  fetchConversationSummary,
  fetchConversation,
  setClosedConversationCount,
  fetchTeammateData,
  fetchTeamData,
} from '../../../store/actions';
import {CONVERSATION} from '../../../constants/global';
import {handleFailureCallback} from '../../../util/apiHelper';
import {navigate} from '../../../navigator/NavigationUtils';

class ChatScreenContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      tabValues: ['(10) You', '(0) Assigned', '(0) Unassigned', '(0) Closed'],
    };
    this.onSelectedTab = this.onSelectedTab.bind(this);
  }

  componentDidMount() {
    this.callSummary();
    this.callFetchConversation();
    this.callFetchTeamData();
    this.callFetchTeammateData();
  }

  onSelectTab = tab => {
    console.log('onSelectTab', tab);

    this.setState({
      currentTab: tab,
    });
  };

  callSummary = () => {
    this.props.fetchConversationSummary(
      this.props?.userPreference?.account_id,
      {
        SuccessCallback: res => {},
        FailureCallback: res => {
          handleFailureCallback(res, true, true);
        },
      },
    );
  };

  onSearchClick = () => {
    navigate('SearchScreen');
  };

  callFetchConversation = () => {
    let {userPreference, statusId} = this.props;
    this.props.fetchConversation(userPreference?.account_id, 2, 5, {
      SuccessCallback: res => {
        this.props.setClosedConversationCount(res?.total_conversations);
      },
      FailureCallback: res => {
        handleFailureCallback(res, true);
      },
    });
  };

  callFetchTeamData = () => {
    this.props.fetchTeamData(this.props?.userPreference?.account_id, 1, {
      SuccessCallback: res => {},
      FailureCallback: res => {
        handleFailureCallback(res, true);
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
          handleFailureCallback(res, true);
        },
      },
    );
  };

  onSelectedTab = e => {
    console.log('1213123123123123');
  };

  render() {
    const {conversation_summary} = this.props;

    return (
      <>
        <ChatScreenComponent
          onSelectTab={this.onSelectTab}
          tabValues={this.state.tabValues}
          currentTab={this.state.currentTab}
          open_status={conversation_summary?.open_status}
          onSearchClick={this.onSearchClick}
          navigation={this.props.navigation}
          onSelectedTab={(e) => {}}
          onTabPress={e => console.log('12313123')}
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
};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
    conversation_summary: state.conversationReducer.conversation_summary,
    userPreference: state.detail?.userPreference,
  };
};
export default connect(mapStateToProps, mapActionCreators)(ChatScreenContainer);
