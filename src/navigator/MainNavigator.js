import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../assets/images';
import {styles as textStyle} from '../components/Text/style';
import {strings} from '../locales/i18n';
import {DashboardScreen, SettingScreen} from '../screens';
import theme from '../util/theme';

const Tab = createBottomTabNavigator();

function renderIcon(image, focused) {
  return (
    <Image
      resizeMode={'contain'}
      source={image}
      style={{
        tintColor: focused ? theme.colors.brandColor.blue : theme.colors.black,
        height: theme.sizes.icons.sm,
        width: theme.sizes.icons.sm,
      }}
    />
  );
}

const MainNavigator = ({badgeValue}) => {
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Chat') {
              iconName = images.ic_chat;
            } else if (route.name === 'Settings') {
              iconName = images.ic_settings;
            }
            return renderIcon(iconName, focused);
          },
          tabBarActiveTintColor: theme.colors.brandColor.blue,
          tabBarInactiveTintColor: theme.colors.black,
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: textStyle.body2NoColor,
          tabBarStyle: {
            backgroundColor: theme.colors.brandColor.FAFAFA,
          },
          headerShown: false,
        })}>
        <Tab.Screen
          name={strings('tab.chat')}
          component={DashboardScreen}
          options={
            {
              // tabBarIconStyle: {display: 'none'},
              // tabBarLabelPosition: 'beside-icon',
              // tabBarIcon: ({focused}) => renderIcon(images.ic_send, focused),
            }
          }
        />
        <Tab.Screen
          name={strings('tab.setting')}
          component={SettingScreen}
          options={
            {
              // tabBarIconStyle: {display: 'none'},
              // tabBarLabelPosition: 'beside-icon',
              // tabBarIcon: ({focused}) => (
              //   <View>{renderIcon(images.ic_chat, focused)}</View>
              // ),
            }
          }
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainNavigator;
