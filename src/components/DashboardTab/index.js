import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { err } from 'react-native-svg/lib/typescript/xml';
import {useDispatch, useSelector} from 'react-redux';
import {CONVERSATION} from '../../constants/global';
import {strings} from '../../locales/i18n';
import {fetchConversationSummary} from '../../store/actions';
import { handleFailureCallback } from '../../util/apiHelper';
import colors from '../../util/theme/colors';
import ConversationList from './ConversationList';

const Tab = createMaterialTopTabNavigator();

const DashboardTab = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    tabData: [
      {
        id: 0,
        statusId: '1',
        conversationType: 'you',
        title: strings('tab.you'),
        count: 0,
      },
      {
        id: 1,
        statusId: '1',
        conversationType: 'assigned',
        title: strings('tab.assigned'),
        count: 0,
      },
      {
        id: 2,
        statusId: '1',
        conversationType: 'unassigned',
        title: strings('tab.unassigned'),
        count: 0,
      },
      {
        id: 3,
        statusId: '2',
        conversationType: 'closed',
        title: strings('tab.closed'),
        count: 0,
      },
    ],
    searchQuery: '',
  });
  const userPreference = useSelector(state => state.detail?.userPreference);
  useEffect(() => {
    _getConversationSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getConversationSummary = () => {
    dispatch(
      fetchConversationSummary(userPreference?.logged_in_user_id, {
        SuccessCallback: response => {
          const defaultTabJson = [
            {
              id: 0,
              statusId: '1',
              conversationType: 'you',
              title: strings('tab.you'),
              count: response?.open_status?.you ?? 0,
            },
            {
              id: 1,
              statusId: '1',
              conversationType: 'assigned',
              title: strings('tab.assigned'),
              count: response?.open_status?.assigned ?? 0,
            },
            {
              id: 2,
              statusId: '1',
              conversationType: 'unassigned',
              title: strings('tab.unassigned'),
              count: response?.open_status?.unassigned ?? 0,
            },
            {
              id: 3,
              statusId: '2',
              conversationType: 'closed',
              title: strings('tab.closed'),
              count: response?.open_status?.closed ?? 0,
            },
          ];
          setState(prev => ({...prev, tabData: defaultTabJson}));
        },
        FailureCallback: error => {
          handleFailureCallback(error,true,true)
          // console.log('FailureCallback------------', JSON.stringify(error));
        },
      }),
    );
  };

  const TabScreen = useMemo(() => {
    return state?.tabData?.map(_it => (
      <Tab.Screen
        key={_it.id + _it.title}
        name={`(${_it.count}) ${_it.title}`}
        children={() => (
          <ConversationList
            tabData={_it}
            totalCount={(type, count) => {
              setState(prev => ({
                ...prev,
                tabData: prev.tabData.map(item => {
                  if (item.type === type) {
                    item.count = count;
                  }
                  return item;
                }),
              }));
            }}
          />
        )}
      />
    ));
  }, [state]);

  return (
    <>
      {state?.tabData?.length > 0 ? (
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarStyle: {backgroundColor: colors.card.background},
          }}
          sceneContainerStyle={{backgroundColor: colors.white}}>
          {TabScreen}
        </Tab.Navigator>
      ) : (
        <View style={styles.activityLoaderContainer}>
          {/* <ActivityIndicator size={'large'} color={colors.brandColor.blue} /> */}
        </View>
      )}
    </>
  );
};

export default DashboardTab;

const styles = StyleSheet.create({
  activityLoaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {flex: 1},
});
