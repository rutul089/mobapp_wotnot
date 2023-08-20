import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {goBack} from '../../../navigator/NavigationUtils';
import {fetchLabel, fetchUserPreference} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import UserDetailComponent from '../component/UserDetailComponent';
import _, {orderBy} from 'lodash';
import {showToast} from '../../../util/helper';

class UserDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chipList: [],
      showLabelModal: false,
    };
    this.onPressLeftContent = this.onPressLeftContent.bind(this);
    this.allLabelModalRef = React.createRef();
  }

  componentDidMount() {
    this.callFetchUserPreference()
    this.callFetchLabel();
  }

  onPressLeftContent = () => {
    goBack();
  };

  removeLabel = index => {
    const newArray = [...this.state.chipList];
    newArray.splice(index, 1);
    this.setState({
      chipList: newArray,
    });
  };

  addLabelPress = () => {
    this.allLabelModalRef?.current?.open();
  };

  onLabelPress = (item, index) => {
    const newArray = [...this.state.chipList];
    if (this.checkForDuplicateValue(newArray, item?.name)) {
      this.allLabelModalRef?.current?.close();
      showToast('Same Labels Exists');
      return;
    }
    newArray.push(item);
    this.setState(
      {
        chipList: newArray,
      },
      () => this.allLabelModalRef?.current?.close(),
    );
  };

  callFetchLabel = () => {
    this.props.fetchLabel('47896', {
      SuccessCallback: res => {
        console.log('SuccessCallback', JSON.stringify(res));
      },
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  checkForDuplicateValue = (arrayList, value) => {
    return _.some(arrayList, o => _.includes(value, o?.name));
  };

  callFetchUserPreference = () => {
    let param = {account_key: 'JJsqDeYRudZs101210993250gRK3gAQY'};
    this.props.fetchUserPreference(param, {
      SuccessCallback: res => {
        console.log('SuccessCallback', JSON.stringify(res));
      },
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  render() {
    let state = this.state;
    let {userPreference,labelData} = this.props
    return (
      <>
        <UserDetailComponent
          onPressLeftContent={this.onPressLeftContent}
          data={{
            name: userPreference?.logged_in_user_name,
            email: userPreference?.email,
            countrycode: 'IN',
            zipcode: '380001',
            phone: '+91 9876543210',
            url: 'http://app.wotnot.io/bo',
            city: 'Ahmedabad',
          }}
          chipList={state.chipList}
          removeLabel={index => this.removeLabel(index)}
          addLabelPress={this.addLabelPress}
          showLabelModal={state.showLabelModal}
          allLabelModalRef={this.allLabelModalRef}
          onLabelPress={(item, index) => this.onLabelPress(item, index)}
          labelData={labelData}
        />
      </>
    );
  }
}

const mapActionCreators = {fetchLabel, fetchUserPreference};
const mapStateToProps = state => {
  return {
    isLoading: state.global.loading,
    labelData: state.detail?.labelData,
    userPreference: state.detail?.userPreference,
  };
};
export default connect(mapStateToProps, mapActionCreators)(UserDetailContainer);
