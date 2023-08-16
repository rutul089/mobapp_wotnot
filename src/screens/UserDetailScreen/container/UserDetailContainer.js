import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {goBack} from '../../../navigator/NavigationUtils';
import UserDetailComponent from '../component/UserDetailComponent';

export default class UserDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chipList: [
        {
          id: 1,
          label: 'Marketing',
        },
        {
          id: 1,
          label: 'Marketing',
        },
        {
          id: 1,
          label: 'Credit issue',
        },
        {
          id: 1,
          label: 'Marketing 1',
        },
        {
          id: 1,
          label: 'Credit Issue 1',
        },
        {
          id: 1,
          label: 'Apple',
        },
        {
          id: 1,
          label: 'Orange',
        },
      ],
      showLabelModal: false,
    };
    this.onPressLeftContent = this.onPressLeftContent.bind(this);
    this.allLabelModalRef = React.createRef();
  }

  componentDidMount() {}

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
    newArray.push({label: item?.label});
    this.setState(
      {
        chipList: newArray,
      },
      () => this.allLabelModalRef?.current?.close(),
    );
  };

  render() {
    let state = this.state;
    return (
      <>
        <UserDetailComponent
          onPressLeftContent={this.onPressLeftContent}
          data={{
            name: 'Andrew Valentina Raz',
            email: 'Andrew@example.com',
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
        />
      </>
    );
  }
}
