import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {strings} from '../../locales/i18n';
import {hp, wp} from '../../util/helper';
import colors from '../../util/theme/colors';
import ChatItem from '../ChatItem';

const Tab = createMaterialTopTabNavigator();

const renderItem = () => {
  return (
    <ChatItem
      name={'Sagar Shah'}
      email={
        'Bot, Ahmedabad, India Bot, Ahmedabad, India Bot, Ahmedabad, India'
      }
      uri={'https://i.pravatar.cc/512'}
      subTittle={'Bot: Great! in that case could you p...'}
      onPress={() => {}}
    />
  );
};

const ChatListView = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
      renderItem={renderItem}
      style={{paddingHorizontal: wp(4), paddingVertical: hp(2)}}
    />
  );
};

const DashboardTab = ({data}) => {
  const [state, setState] = useState([
    {id: 0, title: strings('tab.you'), value: 10},
    {id: 1, title: strings('tab.assigned'), value: 10},
    {id: 2, title: strings('tab.unassigned'), value: 999},
    {id: 3, title: strings('tab.closed'), value: 999},
  ]);

  useEffect(() => {
    setState(prev => [...prev]);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarStyle: {backgroundColor: colors.card.background},
      }}
      sceneContainerStyle={{backgroundColor: colors.white}}>
      {state.map(_it => (
        <Tab.Screen
          key={_it.id + _it.title}
          name={`(${_it.value}) ${_it.title}`}
          component={() => <ChatListView />}
        />
      ))}
    </Tab.Navigator>
  );
};
export default DashboardTab;
