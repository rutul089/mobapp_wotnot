import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {
  FlexContainer,
  Header,
  Spacing,
  SwitchToggle,
  Text,
  UserItem,
} from '../../../components';
import theme from '../../../util/theme';
import images from '../../../assets/images';
import {styles as textStyle} from '../../../components/Text/style';
import {Tab, TabView} from '@rneui/themed';
import YouTab from '../container/YouTab';

const ChatScreenComponent = ({
  currentTab,
  onSelectTab,
  tabValues,
  open_status,
}) => {
  const [index, setIndex] = React.useState(0);
  // const tabValues = ['You', 'Assigned', 'Unassigned', 'Closed'];
  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <Header
        isLeftIconHidden={true}
        rightIcon={
          <View style={{flexDirection: 'row'}}>
            <Spacing size="md" direction="x" />
            <TouchableOpacity style={{}}>
              <Image
                source={images.ic_search}
                style={{
                  height: theme.sizes.icons.lg,
                  width: theme.sizes.icons.lg,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <Tab
        value={currentTab}
        onChange={onSelectTab}
        indicatorStyle={{
          height: theme.normalize(2),
          backgroundColor: theme.colors.brandColor.blue,
        }}
        dense
        style={{
          backgroundColor: theme.colors.brandColor.FAFAFA,
        }}>
        <Tab.Item
          titleStyle={[
            textStyle?.body2,
            currentTab == 0 && {color: theme.colors.brandColor.blue},
          ]}>
          {`You\n(${open_status?.you})`}
        </Tab.Item>
        <Tab.Item
          titleStyle={[
            textStyle?.body2,
            currentTab == 1 && {color: theme.colors.brandColor.blue},
          ]}>
          {`Assigned\n(${open_status?.assigned})`}
        </Tab.Item>
        <Tab.Item
          titleStyle={[
            textStyle?.body2,
            currentTab == 2 && {color: theme.colors.brandColor.blue},
          ]}>
          {`Unassigned\n(${open_status?.unassigned})`}
        </Tab.Item>
        <Tab.Item
          titleStyle={[
            textStyle?.body2,
            {textAlign: 'center'},
            currentTab == 3 && {color: theme.colors.brandColor.blue},
          ]}>
          {'Closed\n(1k)'}
        </Tab.Item>
      </Tab>
      <TabView value={currentTab} onChange={onSelectTab} animationType="spring">
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <YouTab />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <Text h1>Cart</Text>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <Text h1>Closed</Text>
        </TabView.Item>
      </TabView>
    </FlexContainer>
  );
};

export default ChatScreenComponent;
