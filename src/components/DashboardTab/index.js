import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import images from '../../assets/images';
import {CONVERSATION} from '../../constants/global';
import {strings} from '../../locales/i18n';
import {fetchConversationSummary} from '../../store/actions';
import {hp, wp} from '../../util/helper';
import colors from '../../util/theme/colors';
import {styles as fontStyle} from '../Text/style';
import ConversationList from './ConversationList';

const Tab = createMaterialTopTabNavigator();

const DashboardTab = ({isSearchView}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({tabData: [], searchQuery: ''});

  useEffect(() => {
    _getConversationSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getConversationSummary = () => {
    dispatch(
      fetchConversationSummary(CONVERSATION.USER_ID, {
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
        FailureCallback: error => {},
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

  return isSearchView ? (
    <View style={styles.searchViewContainer}>
      <View style={styles.searchBarContainer}>
        <TouchableWithoutFeedback>
          <Image
            source={images.ic_search}
            style={{height: hp(3), width: hp(3)}}
            tintColor={colors.brandColor.blue}
          />
        </TouchableWithoutFeedback>
        <TextInput
          style={[styles.textInputStyle, fontStyle.body1]}
          placeholder="Search here...."
          value={state.searchQuery}
          onChangeText={_text =>
            setState(prev => ({...prev, searchQuery: _text}))
          }
        />
      </View>
      <ConversationList
        searchQuery={state.searchQuery}
        isSearchView={isSearchView}
      />
    </View>
  ) : (
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
          <ActivityIndicator size={'large'} color={colors.brandColor.blue} />
        </View>
      )}
    </>
  );
};

export default DashboardTab;

const styles = StyleSheet.create({
  searchViewContainer: {flex: 1},
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: hp(1),
    padding: hp(1),
    borderRadius: hp(1),
    borderWidth: hp(0.1),
    gap: wp(3),
    borderColor: colors.typography.silver,
  },
  activityLoaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {flex: 1},
});
