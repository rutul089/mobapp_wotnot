import {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import images from '../../../assets/images';
import {Header} from '../../../components';
import DashboardTab from '../../../components/DashboardTab';

const DashboardComponent = ({data}) => {
  const [state, setState] = useState({
    isSearchView: false,
  });

  return (
    <>
      <Header
        isLeftIconHidden
        rightIcon={
          <TouchableOpacity
            onPress={() =>
              setState(prev => ({
                ...prev,
                isSearchView: !prev.isSearchView,
              }))
            }>
            <Image source={images.ic_search} style={{height: 20, width: 20}} />
          </TouchableOpacity>
        }
      />
      <DashboardTab isSearchView={state.isSearchView} />
    </>
  );
};
export default DashboardComponent;
