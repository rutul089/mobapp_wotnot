import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../util/theme/colors';
import Text from '../Text';
import OfflineNotice from '../OfflineNotice';

export const NoNetworkView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.networkErrorText}>
        Oops! Looks like you not connected with the network
      </Text>
    </View>
  );
};

const useDataConnection = () => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(
      handleConnectivityChange,
    );
    return () => removeNetInfoSubscription();
  }, []);

  const handleConnectivityChange = state => {
    let offline = state.isConnected ?? false;
    if (offline) {
      offline = state.isInternetReachable || true;
    }
    setOfflineStatus(!offline);
  };
  return isOffline;
};

export default useDataConnection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  networkErrorText: {color: colors.brandColor.blue},
});
