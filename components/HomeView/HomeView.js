import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

export default class HomeView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <View style={styles.mainView} />;
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
  },

  searchBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },

  addConnection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    width: '60%',
    borderRadius: 10,
    margin: 10,
    marginLeft: '20%',
    padding: 10,
    shadowColor: 'skyblue',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },

  listView: {
    flex: 15,
  },
});
