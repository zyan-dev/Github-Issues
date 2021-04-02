import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const Loader: React.FC<any> = ({props}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.6,
  },
});

export default Loader;
