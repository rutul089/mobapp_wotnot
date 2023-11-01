import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const getSystemVersion = () => DeviceInfo.getSystemVersion();
const getBuildNumber = () => DeviceInfo.getBuildNumber();
const getApplicationName = () => DeviceInfo.getApplicationName();
const getVersion = () => DeviceInfo.getVersion();
const getDeviceId = () => DeviceInfo.getDeviceId();
const getOsName = () => Platform.OS;
const getDeviceName = () => DeviceInfo.getDevice();
const getManufacturer = () => DeviceInfo.getBrand();
// const getMaxMemory = () => DeviceInfo.getTotalDiskCapacity();
const getDeviceCountry = () => DeviceInfo.getDeviceCountry();
const getModel = () => DeviceInfo.getModel();
const getFreeDiskStorage = () => DeviceInfo.getFreeDiskStorage();
const getTotalDiskCapacity = () => DeviceInfo.getTotalDiskCapacity();
const getTotalMemory = () => DeviceInfo.getTotalMemory();
const getUsedMemory = () => DeviceInfo.getUsedMemory();

module.exports = {
  getSystemVersion,
  getBuildNumber,
  getApplicationName,
  getVersion,
  getDeviceId,
  getOsName,
  getDeviceName,
  getManufacturer,
  // getMaxMemory,
  getDeviceCountry,
  getModel,
  getFreeDiskStorage,
  getTotalDiskCapacity,
  getTotalMemory,
  getUsedMemory,
};