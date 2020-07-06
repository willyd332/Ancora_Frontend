import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BACKEND_URL} from 'react-native-dotenv';

export default class SettingsView extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Text>Account View</Text>
      </View>
    );
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
