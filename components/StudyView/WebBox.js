/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {WebView} from 'react-native-webview';

const MyWeb = ({navigation}) => {
  const url = navigation.getParam('url');
  return <WebView source={{uri: url}} style={{marginTop: 20}} />;
};

export default MyWeb;
