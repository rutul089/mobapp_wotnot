import React, {Component} from 'react';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import {goBack} from '../../../navigator/NavigationUtils';
import HelpDeskComponent from '../component/HelpDeskComponent';
import {strings} from '../../../locales/i18n';
import images from '../../../assets/images';

class HelpDeskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helpDeskList: [
        {
          id: 1,
          tittle: strings('help_disk.read_help'),
          image: images.ic_help_desk.ic_help_articles,
          url: 'https://help.wotnot.io/',
        },
        {
          id: 2,
          tittle: strings('help_disk.create_ticket'),
          image: images.ic_help_desk.ic_create_ticket,
          url: 'https://wotnot.atlassian.net/servicedesk/customer/portal/3/group/-1',
        },
        {
          id: 4,
          tittle: strings('help_disk.watch_tutorial'),
          image: images.ic_help_desk.ic_watch_tutorial,
          url: 'https://www.youtube.com/channel/UCFW0Woi3Ft-6fqZZeUHpkOg/videos',
        },
        {
          id: 3,
          tittle: strings('help_disk.request_feature'),
          image: images.ic_help_desk.ic_request_feature,
          url: 'https://product.wotnot.io/',
        },

        {
          id: 5,
          tittle: strings('help_disk.product_road_map'),
          image: images.ic_help_desk.ic_roadmap,
          url: 'https://product.wotnot.io/roadmap',
        },
        {
          id: 6,
          tittle: strings('help_disk.what_new'),
          image: images.ic_help_desk.ic_new,
          url: 'https://product.wotnot.io/changelog',
        },
      ],
    };
    this.onPressLeftContent = this.onPressLeftContent.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
  }

  onPressLeftContent = () => {
    goBack();
  };

  onItemClick = item => {
    Linking.openURL(item?.url);
  };

  render() {
    let state = this.state;
    return (
      <>
        <HelpDeskComponent
          onPressLeftContent={this.onPressLeftContent}
          state={state}
          helpDeskList={state?.helpDeskList}
          onItemClick={this.onItemClick}
        />
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
export default connect(mapStateToProps, mapActionCreators)(HelpDeskContainer);
