import React, {
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../../../assets/images';
import {Header} from '../../../components';
import ConversationList from '../../../components/DashboardTab/ConversationList';
import {goBack} from '../../../navigator/NavigationUtils';
import {hp} from '../../../util/helper';
import colors from '../../../util/theme/colors';
import styles from '../Style';

const SearchComponent = ({searchQuery, updateSearchQuery}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.searchViewContainer}>
        <Header
          isRightIconHidden
          leftIcon={
            <TouchableOpacity onPress={() => goBack()}>
              <Image source={images.ic_back} style={{height: 20, width: 20}} />
            </TouchableOpacity>
          }
        />
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
      </View>
    </SafeAreaView>
  );
};
export default SearchComponent;
