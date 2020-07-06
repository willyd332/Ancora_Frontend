import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BACKEND_URL} from 'react-native-dotenv';

export default class SettingsView extends Component {
  render() {
    return <View style={styles.mainView}>Account View</View>;
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
