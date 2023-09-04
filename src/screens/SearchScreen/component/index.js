import React, {
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../../../assets/images';
import {Header, FlexContainer, Input, Spacing} from '../../../components';
import ConversationList from '../../../components/DashboardTab/ConversationList';
import {goBack} from '../../../navigator/NavigationUtils';
import {hp} from '../../../util/helper';
import theme from '../../../util/theme';
import styles from '../Style';

const SearchComponent = ({
  searchQuery,
  updateSearchQuery,
  onPressLeftContent,
}) => {
  return (
    <FlexContainer statusBarColor={theme.colors.brandColor.FAFAFA}>
      <Header isRightIconHidden onPressLeftContent={() => goBack()} />
      <Spacing />
      <Input
        containerStyle={{paddingHorizontal: theme.sizes.spacing.ph}}
        computedLeftIcon={images.ic_search}
        isLeftIconElementVisible
        tintColor={theme.colors.brandColor.blue}
      />
      {/* <View style={styles.searchViewContainer}>
        <Header isRightIconHidden onPressLeftContent={() => goBack()} />
        <View style={styles.searchViewInnerContainer}>
          <View style={styles.searchBarContainer}>
            <TouchableWithoutFeedback>
              <Image
                source={images.ic_search}
                style={{height: hp(3), width: hp(3)}}
                tintColor={colors.brandColor.blue}
              />
            </TouchableWithoutFeedback>
            <TextInput
              style={[styles.textInputStyle]}
              placeholder="Search here...."
              value={searchQuery}
              onChangeText={_text =>
                updateSearchQuery(prev => ({...prev, searchQuery: _text}))
              }
            />
          </View>
          <ConversationList searchQuery={searchQuery} isSearchView={true} />
        </View>
      </View> */}
    </FlexContainer>
  );
};
export default SearchComponent;
