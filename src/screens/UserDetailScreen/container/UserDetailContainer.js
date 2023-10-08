import _ from 'lodash';
import moment from 'moment';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {goBack} from '../../../navigator/NavigationUtils';
import {
  deleteLabel,
  fetchLabel,
  fetchQualifications,
  fetchUserPreference,
  saveLabel,
} from '../../../store/actions';
import {handleFailureCallback} from '../../../util/apiHelper';
import {getDayDifference, showToast} from '../../../util/helper';
import UserDetailComponent from '../component/UserDetailComponent';
class UserDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chipList: [],
      showLabelModal: false,
      labels: [],
      threadKey: '',
      isRefreshing: false,
      isLoading: true,
    };
    this.onPressLeftContent = this.onPressLeftContent.bind(this);
    this.allLabelModalRef = React.createRef();
  }

  componentDidMount() {
    const {
      route: {
        params: {itemData},
      },
    } = this.props;
    this.setState(
      {
        threadKey: itemData?.thread_key,
        labels: itemData?.labels,
      },
      () => {
        // this.callFetchUserPreference();
        this.callFetchLabel();
        this.callFetchQualifications();
      },
    );
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
        isLoading:false,
        isRefreshing:false
      },
      () => {
        this.allLabelModalRef?.current?.close();
        this.saveLabel(param);
      },
    );
  };

  callFetchLabel = () => {
    this.props.fetchLabel(this.props.userPreference?.account_id, {
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
        // console.log('SuccessCallback', JSON.stringify(res));
      },
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  callFetchQualifications = threadKey => {
    this.props.fetchQualifications(this.state.threadKey, {
      SuccessCallback: res => {
        this.setLoading(false);
        // console.log('SuccessCallback', JSON.stringify(res));
      },
      FailureCallback: res => {
        this.setLoading(false);
        handleFailureCallback(res);
      },
    });
  };

  saveLabel = param => {
    this.props.saveLabel(this.state.threadKey, param, {
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
    const newArray = [...this.state.labels];
    newArray.splice(index, 1);
    this.setState({
      labels: newArray,
    });
    this.props.deleteLabel(this.state.threadKey, label_id, {
      SuccessCallback: res => {},
      FailureCallback: res => {
        handleFailureCallback(res);
      },
    });
  };

  refreshQualificationData = () => {
    this.setState({isRefreshing: true}, () => {
      this.callFetchLabel();
      this.callFetchQualifications();
      this.setState({isRefreshing: false});
    });
  };

  setLoading = value => {
    this.setState({isLoading: value});
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
          refreshing={state?.isRefreshing}
          onRefresh={this.refreshQualificationData}
          isLoading={this.state.isLoading}
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
