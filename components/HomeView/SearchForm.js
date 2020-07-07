import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

// Components

export default class SearchForm extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={styles.searchView}>
        <Text>This Will Be A Search Form</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
});
