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
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.rightIconClick = this.rightIconClick.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
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
      () => this.onSubmitEditing(),
    );
  };

  onSubmitEditing = () => {
    this.setLoading(true);
    let url = `status_ids=1,2&is_order_by_asc=false&limit=25&offset=1&assignee_ids=${this.fetchAssignId()}&${
      this.state.search_words ? `search_words=${this.state.search_words}` : ''
    }`;

    this.props.fetchConversationBySearch(
      this.props?.userPreference?.account_id,
      url,
      {
        SuccessCallback: res => {
          if (res?.ok) {
            this.setState({
              conversationData: res?.conversations,
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
          this.onSubmitEditing();
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
    });
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
