import {Header, Tabs} from '../../../components';
import {View, TouchableOpacity} from 'react-native';

const DashboardComponent = ({data}) => {
  return (
    <>
      <Header
        isLeftIconHidden
        isRightIconHidden
        // rightIcon={
        //   <TouchableOpacity>
        //     <View style={{height: 20, width: 20, backgroundColor: 'red'}} />
        //   </TouchableOpacity>
        // }
      />
      <Tabs data={data} />
    </>
  );
};
export default DashboardComponent;
