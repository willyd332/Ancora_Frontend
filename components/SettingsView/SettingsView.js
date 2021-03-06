import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BACKEND_URL} from 'react-native-dotenv';

export default class SettingsView extends Component {
  logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`);
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('userId');
      this.props.navigation.navigate('AuthView');
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <View style={styles.mainView}>
        <Button title="LOGOUT" onPress={this.logout}>
          {' '}
          LOGOUT{' '}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#23408e',
  },
});
