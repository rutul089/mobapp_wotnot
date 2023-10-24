import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../assets/images';
import theme from '../../util/theme';
import Input from '../Input';
import Text from '../Text';
import Modal from '../CustomModal/index';

const FullScreenModal = ({
  showModal,
  onHideModal,
  tittle,
  placeholder,
  onChangeText,
  searchValue,
  noDataPlaceholder,
  listData,
  lisItem,
  listRef,
}) => (
  <Modal
    animationType="slide"
    visible={showModal}
    onBackButtonPress={onHideModal}
    style={{backgroundColor: 'black', margin: 0}}
    statusBarTranslucent={false}>
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme.colors.brandColor.FAFAFA}}>
      <View style={{overflow: 'hidden', paddingBottom: 1}}>
        <View style={styles.assigneeHeader}>
          <TouchableOpacity activeOpacity={0.5} onPress={onHideModal}>
            <Image
              source={images.ic_cross}
              resizeMode="contain"
              style={styles.assigneeIcon}
            />
          </TouchableOpacity>
          {tittle && (
            <Text type={'body1'} textAlign={'center'} style={{flex: 1}}>
              {tittle}
            </Text>
          )}

          <View style={styles.assigneeIcon} />
        </View>
      </View>
      <Input
        containerStyle={{padding: 5, backgroundColor: 'white'}}
        computedLeftIcon={images.ic_search}
        isLeftIconElementVisible
        tintColor={theme.colors.brandColor.blue}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={searchValue}
        leftIconDisabled
        returnKeyType="done"
        // onSubmitEditing={onSubmitEditing && onSubmitEditing}
      />

      <FlatList
        stickyHeaderHiddenOnScroll={true}
        ListHeaderComponentStyle={{paddingVertical: theme.normalize(8)}}
        ref={listRef}
        contentContainerStyle={{backgroundColor: 'white', flexGrow: 1}}
        data={listData}
        renderItem={(item, index) => lisItem(item, index)}
        style={{}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text color={theme.colors.brandColor.silver}>
              {noDataPlaceholder}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  </Modal>
);

export default FullScreenModal;

const styles = StyleSheet.create({
  assigneeHeader: {
    backgroundColor: theme.colors.brandColor.FAFAFA,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    height: theme.sizes.spacing.xl3,
    paddingHorizontal: theme.sizes.spacing.ph,
    flexDirection: 'row',
    alignItems: 'center',
  },
  assigneeIcon: {
    height: theme.sizes.image.md,
    width: theme.sizes.image.md,
    tintColor: 'black',
  },
});
