import React from 'react';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BACKEND_URL} from 'react-native-dotenv';

// Components
import {List} from '@ui-kitten/components';
import StudyItem from './StudyItem';

const StudyIndex = ({navigation}) => {
  const rawStudyData = navigation.getParam('studyData');

  const studyData = rawStudyData.StudyFieldsResponse.StudyFields;

  const handlePress = (info) => {
    const url = `https://clinicaltrials.gov/ct2/show/${info.item.NCTId[0]}`;
    // Linking.openURL(url);
    navigation.navigate('Web', {
      url,
    });
  };

  const handleAdd = async (data) => {
    const disabled = await checkStudy(data);

    if (!disabled) {
      const body = await JSON.stringify({
        user_id: await AsyncStorage.getItem('userId'),
        studyid: data.item.NCTId[0],
      });
      await fetch(`${BACKEND_URL}/trial/add`, {
        method: 'POST',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
    }
  };

  const checkStudy = async (data) => {
    const body = await JSON.stringify({
      user_id: await AsyncStorage.getItem('userId'),
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
      <StudyItem
        checkStudy={checkStudy}
        handleAdd={handleAdd}
        handlePress={handlePress}
        info={info}
      />
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
    backgroundColor: 'black',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'black',
  },
  card: {
    backgroundColor: 'transparent',
  },
  item: {
    marginVertical: 20,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  bodyText: {
    maxHeight: 200,
    fontWeight: '600',
  },
});

export default StudyIndex;

// https://clinicaltrials.gov/ct2/show/${NCTId[0]}
