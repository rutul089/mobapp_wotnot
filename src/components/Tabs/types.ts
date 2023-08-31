import type { IBoxProps } from '@pentair-ui/mobile';
import type {
  StyleProp,
  ViewStyle,
  TextStyle,
  ScrollViewProps,
} from 'react-native';

export interface ITabsProps extends IBoxProps {
  /**
   * Tab data.
   */
  values: string[];
  /**
   * Identify value form data.
   */
  value?: string;
  /**
   * Callback function to handle specific tab data value.
   */
  onSelect?: (val: string) => void;
  /**
   * Non-selected item styling.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Selected tab background color.
   */
  highlightBackgroundColor?: string;
  /**
   * Color of highlighted item.
   */
  highlightTextColor?: string;
  /**
   * Color of inactive tabs background.
   */
  inactiveBackgroundColor?: string;
  /**
   * Color of inactive text.
   */
  inactiveTextColor?: string;
  /**
   * Text styling.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Tab styling.
   */
  tabStyle?: StyleProp<ViewStyle>;
  /**
   * If true, tabs converted into scrollable tabs.
   */
  isScrollableTabs?: boolean;
  /**
   * ScrollView props.
   */
  scrollViewProps?: ScrollViewProps;
  /**
   * If true, default tabs will be scrollable.
   */
  defaultTabAsScrollable?: boolean;
  /**
   * If true, default tabs will not be auto scrollable.
   */
  disableAutoScroll?: boolean;
  /**
   * If true, tabs wont change on click.
   */
  disableTabs?: boolean;
}
