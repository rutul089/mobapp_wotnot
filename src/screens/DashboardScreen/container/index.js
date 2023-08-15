import {SafeAreaView} from 'react-native-safe-area-context';
import DashboardComponent from '../component';

const DashboardContainer = () => {
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <DashboardComponent data={{}} />
    </SafeAreaView>
  );
};
export default DashboardContainer;
