import { Dimensions } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').width;
export const dySize = (size: number) => Math.round(size * screenWidth) / 375;
