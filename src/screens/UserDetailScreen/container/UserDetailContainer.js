import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {goBack} from '../../../navigator/NavigationUtils';
import {
  fetchLabel,
  fetchUserPreference,
  fetchQualifications,
  saveLabel,
  deleteLabel,
} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import UserDetailComponent from '../component/UserDetailComponent';
import _, {orderBy} from 'lodash';
import {showToast} from '../../../util/helper';
import {
  STATIC_USER_ID,
  static_conversation_key,
} from '../../../constants/storage';

class UserDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chipList: [],
      showLabelModal: false,
      labels: [],
    };
    this.onPressLeftContent = this.onPressLeftContent.bind(this);
    this.allLabelModalRef = React.createRef();
  }

  componentDidMount() {
    this.callFetchUserPreference();
    this.callFetchLabel();
    this.callFetchQualifications();
  }

  onPressLeftContent = () => {
    goBack();
  };

  removeLabel = (item, index) => {
    // const newArray = [...this.state.chipList];
    // newArray.splice(index, 1);
    // this.setState({
    //   chipList: newArray,
    // });
    this.deleteLabel(item?.id, index);
  };

  addLabelPress = () => {
    this.allLabelModalRef?.current?.open();
  };

  onLabelPress = (item, index) => {
    const newArray = [...this.state.labels];
    if (this.checkForDuplicateValue(newArray, item?.name)) {
      this.allLabelModalRef?.current?.close();
      showToast('Same Labels Exists');
      return;
    }
    newArray.push(item);
    let param = {
      labels: [
        {
          name: item?.name,
          id: item?.id,
        },
      ],
    };
    this.setState(
      {
        labels: newArray,
      },
      () => {
        this.allLabelModalRef?.current?.close();
        this.saveLabel(param);
      },
    );
  };

  callFetchLabel = () => {
    this.props.fetchLabel(STATIC_USER_ID, {
      SuccessCallback: res => {
        // console.log('SuccessCallback', JSON.stringify(res));
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
        // console.log('SuccessCallback', JSON.stringify(res));
      },
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  callFetchQualifications = () => {
    this.props.fetchQualifications(static_conversation_key, {
      SuccessCallback: res => {
        // console.log('SuccessCallback', JSON.stringify(res));
      },
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  saveLabel = param => {
    this.props.saveLabel(static_conversation_key, param, {
      SuccessCallback: res => {
        // console.log('SuccessCallback', JSON.stringify(res));
        // const newArray = [...this.state.labels];
        // newArray.push(item);
        // this.setState({
        //   labels: newArray
        // })
      },
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  deleteLabel = (label_id, index) => {
    this.props.deleteLabel(static_conversation_key, label_id, {
      SuccessCallback: res => {
        const newArray = [...this.state.labels];
        newArray.splice(index, 1);
        this.setState({
          labels: newArray,
        });
        // console.log('SuccessCallback', JSON.stringify(res));
        // const newArray = [...this.state.labels];
        // newArray.push(item);
        // this.setState({
        //   labels: newArray
        // })
      },
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  render() {
    let state = this.state;
    let {userPreference, labelData, qualifications} = this.props;
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
          chipList={state.labels}
          removeLabel={(item, index) => this.removeLabel(item, index)}
          addLabelPress={this.addLabelPress}
          showLabelModal={state.showLabelModal}
          allLabelModalRef={this.allLabelModalRef}
          onLabelPress={(item, index) => this.onLabelPress(item, index)}
          labelData={labelData}
          qualifications={qualifications}
        />
      </>
    );
  }
}

const mapActionCreators = {
  fetchLabel,
  fetchUserPreference,
  fetchQualifications,
  saveLabel,
  deleteLabel,
};
const mapStateToProps = state => {
  // console.log("qualifications ------",JSON.stringify(state.qualifications?.qualifications?.qualifications))
  return {
    isLoading: state.global.loading,
    labelData: state.detail?.labelData,
    userPreference: state.detail?.userPreference,
    qualifications: state.qualifications?.qualifications?.qualifications,
  };
};
export default connect(mapStateToProps, mapActionCreators)(UserDetailContainer);
