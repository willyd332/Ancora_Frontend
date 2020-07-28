import React, {Component} from 'react';
import {View, StyleSheet, WebView, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BACKEND_URL} from 'react-native-dotenv';
import {Card, List, Text, Button} from '@ui-kitten/components';

const StudyIndex = ({navigation}) => {
  const rawStudyData = navigation.getParam('studyData');

  const studyData = rawStudyData.StudyFieldsResponse.StudyFields;

  const handlePress = (info) => {
    const url = `https://clinicaltrials.gov/ct2/show/${info.item.NCTId[0]}`;
    Linking.openURL(url);
    navigation.navigate('StudyShow', {
      showData: studyData[info.index],
    });
  };

  const renderItemHeader = (headerProps, item) => {
    return (
      <View {...headerProps}>
        <Text category="h6">{item.BriefTitle}</Text>
      </View>
    );
  };
  const renderItemFooter = (footerProps, item) => (
    <Text {...footerProps}>{item.OverallStatus}</Text>
  );

  const handleAdd = async (data) => {
    const disabled = await checkStudy(data);

    if (!disabled) {
      const body = await JSON.stringify({
        user_id: 36,
        studyid: data.item.NCTId[0],
      });
      const queryJSON = await fetch(`${BACKEND_URL}/trial/add`, {
        method: 'POST',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const query = await queryJSON.json();
    }
  };

  const checkStudy = async (data) => {
    const body = await JSON.stringify({
      user_id: 36,
      studyid: data.item.NCTId[0],
    });

    const queryJSON = await fetch(`${BACKEND_URL}/trial/check`, {
      method: 'POST',
      body,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const query = await queryJSON.json();

    return query.data;
  };

  const renderItem = (info) => {
    return (
      <>
        <Card
          style={styles.item}
          status="basic"
          header={(headerProps) => renderItemHeader(headerProps, info.item)}
          footer={(footerProps) => renderItemFooter(footerProps, info.item)}
          onPress={() => handlePress(info)}>
          <Text>{info.item.BriefSummary}</Text>
        </Card>
        <Button onPress={() => handleAdd(info)}>add</Button>
      </>
    );
  };

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={studyData}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
});

export default StudyIndex;

// https://clinicaltrials.gov/ct2/show/${NCTId[0]}
