import * as React from 'react';
import { Animated, StyleSheet, TouchableOpacity ,View} from 'react-native';
import type { ITabsProps } from './types';
import { Box, Text } from 'native-base';
import theme from '../../util/theme';
import TabsHOC from './TabsHOC';
// import Text from '../Text/index';

const Tabs = ({
  values,
  value,
  onSelect = () => null,
  style,
  highlightBackgroundColor,
  highlightTextColor,
  inactiveBackgroundColor,
  inactiveTextColor,
  textStyle = {},
  tabStyle = {},
  isScrollableTabs = false,
  scrollViewProps,
  defaultTabAsScrollable = false,
  disableAutoScroll = false,
  disableTabs = false,
  ...rest
}: ITabsProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const boxWidth = React.useRef(8.5 * values[0]?.length);
  const [borderBoxWidth, setBorderBoxWidth] = React.useState(boxWidth?.current);

  const selectedPanelLeft = React.useRef(new Animated.Value(0));

  const widthSize =
    defaultTabAsScrollable || isScrollableTabs
      ? 8.5 * values[0]?.length
      : 100 / values?.length;

  const interpolatedValuesInput = values?.map((_, i) => {
    return defaultTabAsScrollable || isScrollableTabs
      ? boxWidth.current * i
      : widthSize * i;
  });

  const interpolatedValuesOutput = values?.map((_, i) => {
    return boxWidth.current * i;
  });

  const interpolatedValuesOutputNonScrollable = values?.map((_, i) => {
    return `${widthSize * i}%`;
  });

  React.useEffect(() => {
    boxWidth.current = 8.5 * values[selectedIndex]?.length + 10;
    const left =
      defaultTabAsScrollable || isScrollableTabs
        ? values
            ?.filter((_, i) => i < selectedIndex)
            .reduce((a, b) => a + (b?.length * 8.5 + 10), 0)
        : widthSize * selectedIndex;
    Animated.timing(selectedPanelLeft.current, {
      toValue: left,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [
    selectedPanelLeft,
    selectedIndex,
    values,
    widthSize,
    defaultTabAsScrollable,
    isScrollableTabs,
  ]);

  React.useEffect(() => {
    const newIndex = values?.findIndex((v) => v === value);
    (defaultTabAsScrollable || isScrollableTabs) &&
      setBorderBoxWidth(8.5 * values[newIndex < 0 ? 0 : newIndex]?.length + 10);
    !disableAutoScroll && setSelectedIndex(newIndex < 0 ? 0 : newIndex);
  }, [
    values,
    value,
    selectedIndex,
    defaultTabAsScrollable,
    isScrollableTabs,
    disableAutoScroll,
  ]);

  const labelStyle = StyleSheet.flatten([
    defaultTabAsScrollable || isScrollableTabs
      ? styles.baseButton
      : { paddingHorizontal: 8 },
    highlightTextColor && {
      color: highlightTextColor,
    },
    inactiveTextColor && {
      color: inactiveTextColor,
    },
  ]);

  const getTextStyle = (index: number) => {
    if (index === selectedIndex) {
      return StyleSheet.flatten([
        { color: theme.colors.pentair.darkBlue },
        highlightTextColor && {
          color: highlightTextColor,
        },
        textStyle,
      ]);
    } else {
      return StyleSheet.flatten([
        { color: theme.colors.pentair.blue },
        inactiveTextColor && {
          color: inactiveTextColor,
        },
        textStyle,
      ]);
    }
  };

  return (
    <TabsHOC
      defaultTabAsScrollable={defaultTabAsScrollable}
      isScrollableTabs={isScrollableTabs}
      scrollViewProps={scrollViewProps}
    >
      <View
        // height={45}
        // padding={5}
        backgroundColor={
          inactiveBackgroundColor ?? isScrollableTabs
            ? 'transparent'
            : theme.colors.card.background
        }
        style={[styles.scrollableTabWidth, style]}
        accessible
        accessibilityRole="radiogroup"
        {...rest}
      >
        <Box flex={1}>
          <Animated.View
            style={[
              isScrollableTabs && {
                borderColor: theme.colors.pentair.brightBlue,
              },
              isScrollableTabs
                ? styles.scrollableBlueMaskContainer
                : styles.blueMaskContainer,
              {
                backgroundColor: highlightBackgroundColor ?? theme.colors.white,
                width:
                  isScrollableTabs || defaultTabAsScrollable
                    ? borderBoxWidth
                    : `${widthSize}%`,
                left: selectedPanelLeft.current.interpolate({
                  inputRange: interpolatedValuesInput,
                  outputRange:
                    defaultTabAsScrollable || isScrollableTabs
                      ? interpolatedValuesOutput
                      : interpolatedValuesOutputNonScrollable,
                }),
              },
              tabStyle,
            ]}
          />
          <Box
            flex={1}
            flexDirection="row"
            flexWrap="nowrap"
            justifyContent="space-around"
            alignItems="center"
            //zIndex={0}
          >
            {values?.map((tab, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                onPress={() => {
                  if (disableTabs) {
                    return;
                  }
                  setSelectedIndex(i);
                  onSelect(values[i]);
                }}
                style={[
                  styles.baseButton,
                  isScrollableTabs || defaultTabAsScrollable
                    ? {}
                    : styles.baseButtonFlexStyle,
                  (isScrollableTabs || defaultTabAsScrollable) && {
                    width: 8.5 * tab?.length + 10,
                  },
                ]}
              >
                <Text
                  style={
                    ((isScrollableTabs || defaultTabAsScrollable) &&
                      styles.textStyle,
                    labelStyle as any,
                    getTextStyle(i) as any)
                  }
                  numberOfLines={1}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </Box>
        </Box>
      </View>
    </TabsHOC>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  blueMaskContainer: {
    position: 'absolute',
    backgroundColor: theme.colors.white,
    borderRadius: 2,
    height: '100%',
    //zIndex: 2,
    borderWidth: 0.5,
    borderColor: theme.colors.card.shadow,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 5,
    elevation: 5,
  },
  scrollableBlueMaskContainer: {
    position: 'absolute',
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    height: '100%',
    //zIndex: 2,
    borderWidth: 1,
    borderColor: theme.colors.pentair.brightBlue,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 1 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 6,
  },
  baseButton: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    elevation: 10,
  },
  baseButtonText: {
    paddingHorizontal: 8.5,
  },
  textStyle: {
    marginHorizontal: 5,
    textAlign: 'center',
  },
  scrollableTabWidth: { width: '100%' ,height:45},
  baseButtonFlexStyle: { flex: 1 },
});
