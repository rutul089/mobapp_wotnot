import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, TextInput, View} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {CONVERSATION} from '../../constants/global';
import {strings} from '../../locales/i18n';
import {navigate} from '../../navigator/NavigationUtils';
import {fetchConversation, fetchConversationSummary} from '../../store/actions';
import {hp, wp} from '../../util/helper';
import colors from '../../util/theme/colors';
import ChatItem from '../ChatItem';
import Text from '../Text';

const Tab = createMaterialTopTabNavigator();

const USER_ID = '47734';

const renderItem = ({item}) => {
  return (
    <ChatItem
      key={item?.assignee?.id}
      name={item?.assignee?.name ?? 'Unknown'}
      email={item?.assignee?.email}
      uri={item?.assignee?.image_url ?? 'https://ipravatar.cc/512'}
      unreadCount={item?.unread_messages_count}
      lastMessageDay={'23d'}
      subTittle={'Bot: Great! in that case could you p...'}
      onPress={() => navigate('ConversationScreen')}
    />
  );
};

const EmptyListView = () => {
  return (
    <View style={{}}>
      <Text>No conversations yet!</Text>
    </View>
  );
};

const ChatListView = ({
  tabData,
  totalCount = () => {},
  isSearchView = false,
  searchQuery = '',
}) => {
  console.log('searchQuery-==-=-=-=-=-=-=-=-=-=-=-=->', searchQuery);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isRefreshing: false,
    conversationData: [],
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => _getConversationsAPI(), [tabData, searchQuery]);
  const _getConversationsAPI = () => {
    setState(prev => ({
      ...prev,
      isRefreshing: true,
    }));
    const fetchAllConversations = statusId => {
      dispatch(
        fetchConversation(CONVERSATION.USER_ID, statusId, CONVERSATION.LIMIT, {
          SuccessCallback: response => {
            if (isSearchView) {
              setState(prev => ({
                ...prev,
                isRefreshing: false,
                conversationData: response?.conversations.filter(user =>
                  searchQuery.length > 0
                    ? user?.assignee?.name
                        ?.trim()
                        ?.toLowerCase()
                        ?.includes(searchQuery?.trim()?.toLocaleLowerCase())
                    : true,
                ),
              }));
            } else {
              const sortedData = response?.conversations ?? [];
              switch (tabData.conversationType) {
                case 'you':
                  sortedData.filter(_it => _it.assignee?.id === '');
                  break;
                case 'assigned':
                  sortedData.filter(
                    _it => Object.entries(_it.assignee).length > 0,
                  );
                  break;
                case 'unassigned':
                  sortedData.filter(
                    _it => Object.entries(_it.assignee).length === 0,
                  );
                  break;
                default:
                  totalCount(tabData.conversationType, response?.conversations);
                  break;
              }
              setState(prev => ({
                ...prev,
                isRefreshing: false,
                conversationData: sortedData,
              }));
            }
          },
          FailureCallback: error => {
            console.log('Error: ' + error);
            setState(prev => ({
              ...prev,
              isRefreshing: false,
            }));
          },
        }),
      );
    };
    if (isSearchView) {
      (async () => {
        await Promise.all([
          fetchAllConversations('1'),
          fetchAllConversations('2'),
        ]).finally(() =>
          setState(prev => ({
            ...prev,
            isRefreshing: false,
          })),
        );
      })();
      return;
    } else {
      fetchAllConversations(tabData?.statusId);
    }
  };
  return (
    <FlatList
      data={state?.conversationData}
      renderItem={renderItem}
      style={{paddingHorizontal: wp(4), paddingVertical: hp(2)}}
      refreshControl={
        <RefreshControl
          refreshing={state.isRefreshing}
          onRefresh={_getConversationsAPI}
        />
      }
      // ListEmptyComponent={<EmptyListView />}
    />
  );
};

const DashboardTab = ({isSearchView}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({tabData: [], searchQuery: ''});

  useEffect(() => {
    _getConversationSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getConversationSummary = () => {
    dispatch(
      fetchConversationSummary(USER_ID, {
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
          <ChatListView
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
    <View style={{flex: 1}}>
      <TextInput
        value={state.searchQuery}
        onChangeText={_text =>
          setState(prev => ({...prev, searchQuery: _text}))
        }
      />
      <ChatListView
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
        <View>
          <Text>SOMETHING WENT WRONG</Text>
        </View>
      )}
    </>
  );
};

export default DashboardTab;
