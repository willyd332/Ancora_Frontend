import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';

// Components
import SearchForm from './SearchForm';

export default class HomeView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Layout style={styles.layout}>
        <SearchForm navigation={this.props.navigation} />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
