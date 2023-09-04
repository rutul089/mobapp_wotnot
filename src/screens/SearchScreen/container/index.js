import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
// import React, {useState} from 'react';
import SearchComponent from '../component';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <SearchComponent />
      </>
    );
  }
}

const mapActionCreators = {};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
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
