import React, {useState, useEffect} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {Button} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import {BACKEND_URL} from 'react-native-dotenv';

// Components
import {List} from '@ui-kitten/components';
import StudyItem from './StudyItem';

const AccountView = ({navigation}) => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const getStudyData = async (ids) => {
    const fields =
      'BriefTitle,BriefSummary,Condition,EligibilityCriteria,OfficialTitle,NCTId,OverallStatus';

    if (ids.length > 0) {
      let expression = ids.reduce((string, id) => {
        return `${string} OR ${id}`;
      });
      const url = `https://clinicaltrials.gov/api/query/study_fields?expr=AREA[NCTId](${expression})&fields=${fields}&fmt=json`;
      const urlResponseJSON = await fetch(url);
      const response = await urlResponseJSON.json();
      return response.StudyFieldsResponse.StudyFields;
    }
    return [];
  };

  useEffect(() => {
    const getUserStudies = async () => {
      const user_id = await AsyncStorage.getItem('userId');
      const queryJSON = await fetch(`${BACKEND_URL}/trial/studies/${user_id}`);
      const query = await queryJSON.json();
      return await getStudyData(query.data);
    };
    getUserStudies().then((res) => {
      setData(res);
    });
  }, [deleted]);

  const handlePress = (info) => {
    const url = `https://clinicaltrials.gov/ct2/show/${info.item.NCTId[0]}`;
    // Linking.openURL(url);
    navigation.navigate('Web', {
      url,
    });
  };

  const renderItem = (info) => {
    return (
      <StudyItem
        deleted={deleted}
        setDeleted={setDeleted}
        handlePress={handlePress}
        info={info}
      />
    );
  };

  return (
    <>
      <ImageBackground
        style={styles.imgBackground}
        source={require('./doctorTxt.png')}
        resizeMode="contain">
        <Button
          status="success"
          onPress={() => {
            setDeleted(!deleted);
          }}>
          Refresh Studies
        </Button>
        <List
          style={data.length ? styles.container : styles.hidden}
          contentContainerStyle={styles.contentContainer}
          data={data}
          renderItem={renderItem}
        />
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  container: {
    backgroundColor: 'black',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'black',
  },
  card: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  item: {
    marginVertical: 20,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'black',
  },
  bodyText: {
    maxHeight: 200,
    fontWeight: '600',
  },
  hidden: {
    display: 'none',
  },
});

export default AccountView;

// https://clinicaltrials.gov/ct2/show/${NCTId[0]}
