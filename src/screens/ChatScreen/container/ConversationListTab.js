import React, {Component} from 'react';
import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchConversation,
  setClosedConversationCount,
  fetchConversationBySearch,
  fetchTeammateData,
  fetchConversationSummary,
} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import {CONVERSATION} from '../../../constants/global';
import {ChatItem} from '../../../components';
import {getAssigneeId, getDayDifference} from '../../../util/helper';
import {navigate} from '../../../navigator/NavigationUtils';
import theme from '../../../util/theme';
import {Text} from '../../../components';
import { strings } from '../../../locales/i18n';

class ConversationListTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      isLoading: false,
      isRefreshing: false,
      latCurrentTan: props?.currentTab,
      search_after: '',
      moreLoading: false,
    };
    this.loadMoreData = this.loadMoreData.bind(this);
  }

  componentDidMount() {
    this.setLoader(true);
    this.props.navigation.addListener('focus', () => {
      this.callFetchTeammateData();
      this.callFetchConversation(false);
    });
  }

  callFetchConversation = (isLoadMore = false) => {
    let offset = isLoadMore
      ? this.state.search_after
        ? `&search_after=${this.state.search_after}`
        : ''
      : '';
    this.setLoader(false);
    let {userPreference, statusId, isAssignee, isUnAssignee, isYou} =
      this.props;

    let assignee = isYou
      ? `&assignee_ids=${userPreference?.logged_in_user_id}`
      : isUnAssignee
      ? `&assignee_ids=0`
      : isAssignee
      ? `assignee_ids=${getAssigneeId(this.props?.teamMateData)}`
      : '';
    let url = `status_ids=${statusId}&is_order_by_asc=false&limit=25&offset=1${assignee}${offset}`;
    this.props.fetchConversationBySearch(userPreference?.account_id, url, {
      SuccessCallback: res => {
        this.setState({
          conversations: offset
            ? [...this.state.conversations, ...res?.conversations]
            : res?.conversations,
          search_after: res?.search_after,
        });
        if (statusId == 2) {
          this.props.setClosedConversationCount(res?.total_conversations);
        }
        this.setLoader(false);
      },
      FailureCallback: res => {
        this.setLoader(false);
        handleFailureCallback(res, true, true);
      },
    });
  };

  setLoader = value => {
    this.setState({isLoading: value, isRefreshing: false, moreLoading: false});
  };

  onRefresh = () => {
    this.setState({isRefreshing: true}, () => {
      this.callFetchConversation(false);
      this.callFetchConversationSummary();
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
          handleFailureCallback(res);
        },
      },
    );
  };

  callFetchConversationSummary = () => {
    this.props.fetchConversationSummary(this.props.userPreference?.account_id, {
      SuccessCallback: response => {},
      FailureCallback: error => {},
    });
  };

  componentDidUpdate(prevState, nextSate) {
    if (prevState?.currentTab != this.props.currentTab) {
      this.onRefresh();
    }
  }

  loadMoreData = () => {
    this.setState({
      moreLoading: true,
    });
    this.callFetchConversation(true);

    // this.setLoader(true);
  };

  renderFooter = () => {
    const {moreLoading} = this.state;
    return moreLoading ? (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color={theme.colors.brandColor.blue} />
      </View>
    ) : (
      <></>
    );
  };

  render() {
    let {conversations} = this.state;
    let finalConversations = this.props.isAssignee
      ? conversations.filter(
          _it => Object.entries(_it?.assignee ?? '').length > 0,
        )
      : conversations;
    return (
      <View style={{flex: 1}}>
        {this.state.isLoading ? (
          <ActivityIndicator
            size="large"
            color={theme.colors.brandColor.blue}
            style={{alignSelf: 'center', flex: 1}}
          />
        ) : (
          <FlatList
            data={finalConversations}
            renderItem={({item, index}) => (
              <ChatItem
                key={item?.assignee?.id}
                name={item?.title + ' ' + index ?? ''}
                email={`${
                  item?.assignee?.name ? item?.assignee?.name + ' | ' : ''
                }${item?.city_name},${item?.country_name}`}
                uri={item?.assignee?.image_url}
                isOnline={
                  item?.visitor_status === CONVERSATION.USER_STATUS.ONLINE
                }
                unreadCount={item?.unread_messages_count}
                lastMessageDay={getDayDifference(item?.last_message_at)}
                subTittle={`${item?.message} `}
                onPress={() => {
                  navigate('ConversationScreen', {itemData: item});
                }}
                item={item}
                isClosedMode={item?.status_id === 2}
              />
            )}
            keyExtractor={(_it, index) => `${_it?.thread_key} ${index}`}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={() => this.onRefresh()}
                colors={[theme.colors.brandColor.blue]}
              />
            }
            contentContainerStyle={{
              flexGrow: 1,
              padding: theme.sizes.spacing.ph,
            }}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text color={theme.colors.brandColor.silver}>
                {strings('No conversation found')}
                </Text>
              </View>
            }
            onEndReached={({distanceFromEnd}) => {
              if (distanceFromEnd >= 1) {
                this.loadMoreData();
              }
            }}
            onEndReachedThreshold={0.7}
            ListFooterComponent={this.renderFooter}
          />
        )}
      </View>
    );
  }
}

const mapActionCreators = {
  fetchConversation,
  setClosedConversationCount,
  fetchConversationBySearch,
  fetchTeammateData,
  fetchConversationSummary,
};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
    userPreference: state.detail?.userPreference,
    teamMateData: state.accountReducer?.teamMateData?.users,
    conversation_summary:
      state.conversationReducer?.conversation_summary?.open_status,
  };
};
export default connect(mapStateToProps, mapActionCreators)(ConversationListTab);
