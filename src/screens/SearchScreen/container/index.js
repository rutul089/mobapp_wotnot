import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {
  fetchConversationBySearch,
  fetchTeammateData,
} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
// import React, {useState} from 'react';
import SearchComponent from '../component';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_words: '',
      conversationData: [],
      isLoading: false,
      search_after: '',
      conversation_count: 0,
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.rightIconClick = this.rightIconClick.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
    this.loadMoreData = this.loadMoreData.bind(this);
  }

  componentDidMount() {
    this.callFetchTeammateData();
  }

  onChangeText = text => {
    this.setState({
      search_words: text,
    });
  };

  rightIconClick = () => {
    this.setState(
      {
        search_words: '',
      },
      () => {
        this.setLoading(true), this.onSubmitEditing(false);
      },
    );
  };

  onSubmitEditing = () => {
    this.calConversationAPI(false);
  };

  calConversationAPI = (isLoadMore = false) => {
    let offset = isLoadMore
      ? this.state.search_after
        ? `&search_after=${this.state.search_after}`
        : ''
      : '';
    this.setLoading(isLoadMore ? false : true);
    let url = `status_ids=1,2&is_order_by_asc=false&limit=25&offset=1&assignee_ids=${this.fetchAssignId()}&${
      this.state.search_words ? `search_words=${this.state.search_words}` : ''
    }${offset}`;

    this.props.fetchConversationBySearch(
      this.props?.userPreference?.account_id,
      url,
      {
        SuccessCallback: res => {
          if (res?.ok) {
            console.log('12312123',JSON.stringify(res))
            this.setState({
              // conversationData: res?.conversations,
              conversation_count: res?.total_conversations,
              conversationData:
                 offset
                  ? [...this.state.conversationData, ...res?.conversations]
                  : res?.conversations,
              search_after: res?.search_after,
            });
            this.setLoading(false);
          }
        },
        FailureCallback: res => {
          this.setLoading(false);
          handleFailureCallback(res, true, true);
        },
      },
    );
  };

  callFetchTeammateData = () => {
    this.setLoading(true);
    let param = {qualify_bot_user: true};

    this.props.fetchTeammateData(
      this.props?.userPreference?.account_id,
      param,
      {
        SuccessCallback: res => {
          this.calConversationAPI(false);
        },
        FailureCallback: res => {
          this.setLoading(false);
          handleFailureCallback(res);
        },
      },
    );
  };

  fetchAssignId = () => {
    let assignee_ids = [0];
    this.props?.teamMateData?.forEach(element => {
      assignee_ids.push(element.id);
    });
    return assignee_ids?.toString();
  };

  setLoading = value => {
    this.setState({
      isLoading: value,
      moreLoading: false,
    });
  };

  loadMoreData = distanceFromEnd => {
    if (
      !distanceFromEnd >= 1 ||
      this.state.conversation_count === this.state.conversationData?.length
    ) {
      return;
    }
    this.setState(
      {
        moreLoading: true,
      },
      () => this.calConversationAPI(true),
    );
  };

  render() {
    let state = this.state;

    return (
      <>
        <SearchComponent
          onChangeText={this.onChangeText}
          searchValue={state.search_words}
          rightIconClick={this.rightIconClick}
          onSubmitEditing={this.onSubmitEditing}
          conversationData={state.conversationData}
          isLoading={state?.isLoading}
          // isLoading={
          //   this.state.isRefreshing || this.state.moreLoading
          //     ? false
          //     : this.props.isLoading || this.state.isLoading
          // }
          isMoreLoading={this.state.moreLoading}
          onEndReach={this.loadMoreData}
        />
      </>
    );
  }
}

const mapActionCreators = {fetchConversationBySearch, fetchTeammateData};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
    userPreference: state.detail?.userPreference,
    teamMateData: state.accountReducer?.teamMateData?.users,
  };
};
export default connect(mapStateToProps, mapActionCreators)(SearchContainer);

// const SearchContainer = () => {
//   const [state, setState] = useState({
//     searchQuery: '',
//   });
//   return (
//     <SearchComponent
//       searchQuery={state.searchQuery}
//       updateSearchQuery={setState}
//     />
//   );
// };

// export default SearchContainer;
