import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Header, Left, Right, Title} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {dySize} from '../utils/responsive';
import themes from '../utils/themes';

interface MyHeaderProps {
  title: string;
  hasLeft?: boolean;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  rightText?: string;
}

const MyHeader: React.FC<MyHeaderProps> = ({
  title,
  hasLeft = true,
  onPressLeft = () => {},
  onPressRight = () => {},
  rightText = '',
}) => {
  return (
    <Header style={styles.header}>
      <Left>
        {hasLeft && (
          <TouchableOpacity onPress={() => onPressLeft()}>
            <Icon name="ios-arrow-back" style={styles.backIcon} />
          </TouchableOpacity>
        )}
      </Left>
      <Title>
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Title>
      <Right>
        {rightText.length > 0 && (
          <TouchableOpacity>
            <Text style={styles.backIcon}>{'rightText'}</Text>
          </TouchableOpacity>
        )}
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: themes.color.black,
  },
  backIcon: {
    color: 'white',
    fontSize: dySize(30),
  },
  titleView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  title: {
    color: themes.color.white,
    fontSize: themes.fontSize.large,
  },
});

export default MyHeader;
