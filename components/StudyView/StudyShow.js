import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import {BACKEND_URL} from 'react-native-dotenv';

const StudyShow = ({navigation}) => {
  const studyData = navigation.getParam('showData');

  const {
    BriefTitle,
    BriefSummary,
    Condition,
    EligibilityCriteria,
    OfficialTitle,
    NCTId,
  } = studyData;

  console.log(BriefTitle);
  console.log(BriefSummary);
  console.log(Condition);
  console.log(EligibilityCriteria);
  console.log(OfficialTitle);
  console.log(NCTId);

  console.log('********************************************************');
  console.log(JSON.stringify(studyData, 0, 2));
  console.log('********************************************************');

  return (
    <ScrollView>
      <Text className={styles.basicText} category="h2">
        {OfficialTitle}
      </Text>
      <Text className={styles.basicText} category="h6">
        {BriefTitle}
      </Text>
      <Text className={styles.basicText} category="p1">
        {BriefSummary}
      </Text>
      <Text className={styles.basicText} category="p1">
        {Condition}
      </Text>
      <Text className={styles.basicText} category="p1">
        {EligibilityCriteria}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  basicText: {
    color: 'black',
  },
});

export default StudyShow;

// https://clinicaltrials.gov/ct2/show/${NCTId[0]}
