import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, Layout, Card, Divider} from '@ui-kitten/components';
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

  const Header = ({props}) => (
    <Text {...props} style={styles.headerText} category="h6">
      {OfficialTitle}
    </Text>
  );

  const Footer = ({props}) => (
    <Text {...props} style={styles.footerContainer} category="p1">
      {EligibilityCriteria}
    </Text>
  );

  return (
    <Layout>
      <ScrollView>
        <Card style={styles.card} header={Header} footer={Footer}>
          <Text style={styles.basicText} category="p1">
            {Condition}
          </Text>

          <Text style={styles.basicText} category="p1">
            {BriefSummary}
          </Text>
        </Card>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  card: {
    flex: 1,
    margin: 2,
    padding: 20,
  },
  basicText: {
    margin: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerText: {
    padding: 10,
  },
});

export default StudyShow;

// https://clinicaltrials.gov/ct2/show/${NCTId[0]}
