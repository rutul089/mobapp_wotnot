import React, {Component} from 'react';
import {View, Text} from 'react-native';
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
} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import {getAssigneeId} from '../../../util/helper';

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
    };
    this.onSelectTab = this.onSelectTab.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.setLoader(true);
    this.callSummary();
    this.callFetchTeamData();
    this.callFetchTeammateData();
    this.callFetchConversation(CONVERSATION.YOU, false, true);
  }

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
          this.setState({
            conversations: offset
              ? [...this.state.conversations, ...res?.conversations]
              : res?.conversations,
            search_after: res?.search_after,
          });
          this.setLoader(false);
          if (statusId == 2) {
            this.props.setClosedConversationCount(res?.total_conversations);
          }
        },
        FailureCallback: res => {
          this.setLoader(false);
          handleFailureCallback(res, true, true);
        },
      },
      isLoading,
    );
  };

  onSelectTab = tab => {
    this.setState(
      {
        currentTab: tab,
        isLoading: true,
        conversations: [],
      },
      () => {
        setTimeout(() => {
          this.setLoader(true);
          this.callFetchConversation(tab, false, true);
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

  render() {
    return (
      <>
        <ChatScreenComponent
          onSelectTab={this.onSelectTab}
          currentTab={this.state.currentTab}
          conversations={this.state.conversations}
          isLoading={
            this.state.isRefreshing
              ? false
              : this.props.isLoading || this.state.isLoading
          }
          isRefreshing={this.state.isRefreshing}
          onRefresh={this.onRefresh}
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
};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
    conversation_summary: state.conversationReducer.conversation_summary,
    userPreference: state.detail?.userPreference,
    teamMateData: state.accountReducer?.teamMateData?.users,
  };
};
export default connect(mapStateToProps, mapActionCreators)(TestChatScreen);
