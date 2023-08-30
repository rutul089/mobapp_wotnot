import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import images from '../../../assets/images';
import {Header} from '../../../components';
import DashboardTab from '../../../components/DashboardTab';
import {navigate} from '../../../navigator/NavigationUtils';

const DashboardComponent = () => {
  return (
    <>
      <Header
        isLeftIconHidden
        rightIcon={
          <TouchableOpacity onPress={() => navigate('SearchScreen')}>
            <Image source={images.ic_search} style={{height: 20, width: 20}} />
          </TouchableOpacity>
        }
      />
      <DashboardTab />
    </>
  );
};
export default DashboardComponent;
