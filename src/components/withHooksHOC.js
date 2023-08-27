import React from 'react';
import useDataConnection, {NoNetworkView} from './DataConnection';

export const withHooksHOC = Component => {
  return props => {
    const isOffline = useDataConnection();
    return isOffline ? <NoNetworkView /> : <Component {...props} />;
  };
};
