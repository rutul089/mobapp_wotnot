import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import images from '../../../assets/images';
import {Header,FlexContainer} from '../../../components';
import DashboardTab from '../../../components/DashboardTab';
import {navigate} from '../../../navigator/NavigationUtils';
import theme from '../../../util/theme';


const DashboardComponent = () => {
  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <Header
        isLeftIconHidden
        rightIcon={
          <TouchableOpacity onPress={() => navigate('SearchScreen')}>
            <Image source={images.ic_search} style={{height: 20, width: 20}} />
          </TouchableOpacity>
        }
      />
      <DashboardTab />
    </FlexContainer>
  );
};
export default DashboardComponent;
