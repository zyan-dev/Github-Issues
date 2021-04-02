import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {dySize} from '../utils/responsive';
import themes from '../utils/themes';

interface ButtonProps {
  title: string;
  btnColor?: string;
  height?: number;
  width?: number;
  textStyle?: any;
  onPress: any;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  width = dySize(345),
  height = dySize(40),
  textStyle = {},
  onPress,
  testID = '',
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      style={{
        backgroundColor: themes.color.blue,
        height,
        width,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}>
      <Text style={[styles.button, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    color: 'white',
    fontSize: dySize(16),
  },
});

export default Button;
