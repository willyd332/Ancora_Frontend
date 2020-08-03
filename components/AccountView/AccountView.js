import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {BACKEND_URL} from 'react-native-dotenv';

// Components
import {List} from '@ui-kitten/components';
import StudyItem from './StudyItem';

const AccountView = ({navigation}) => {
  const [data, setData] = useState([]);

  const getStudyData = async (ids) => {
    const fields =
      'BriefTitle,BriefSummary,Condition,EligibilityCriteria,OfficialTitle,NCTId,OverallStatus';
    let expression = ids.reduce((string, id) => {
      return `${string} OR ${id}`;
    });
    const url = `https://clinicaltrials.gov/api/query/study_fields?expr=AREA[NCTId](${expression})&fields=${fields}&fmt=json`;
    const urlResponseJSON = await fetch(url);
    const response = await urlResponseJSON.json();
    return response.StudyFieldsResponse.StudyFields;
  };

  const getUserStudies = async () => {
    const user_id = 36;
    const queryJSON = await fetch(`${BACKEND_URL}/trial/studies/${user_id}`);
    const query = await queryJSON.json();
    return await getStudyData(query.data);
  };

  useEffect(() => {
    getUserStudies().then((res) => {
      setData(res);
    });
  });

  const handlePress = (info) => {
    const url = `https://clinicaltrials.gov/ct2/show/${info.item.NCTId[0]}`;
    // Linking.openURL(url);
    navigation.navigate('Web', {
      url,
    });
  };

  const renderItem = (info) => {
    return <StudyItem handlePress={handlePress} info={info} />;
  };

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
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

export default AccountView;

// https://clinicaltrials.gov/ct2/show/${NCTId[0]}
