import React, {useState} from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
const fetch = require('node-fetch');

// Components
import {View, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import {
  Text,
  IndexPath,
  Select,
  SelectItem,
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
} from '@ui-kitten/components';

// Vars
const studyStatuses = [
  'Any Status',
  'Not Yet Recruiting',
  'Recruiting',
  'Enrolling By Invitation',
  'Active––Not Recruiting',
  'Suspended',
  'Terminated',
  'Withdrawn',
];
const studyTypes = [
  'Any Type',
  'Interventional',
  'Observational',
  'Expanded Access',
];

const vw = Dimensions.get('window').width;

// Functions
import queryApi from './queryApi';

const SearchForm = (props) => {
  const [conditionInput, setConditionInput] = useState('');
  const [conditionData, setConditionData] = useState(['Heart Attack']);
  const [statusIndex, setStatusIndex] = useState(new IndexPath(0));
  const [typeIndex, setTypeIndex] = useState(new IndexPath(0));
  const [keywordsInput, setKeywordsInput] = useState('');

  const getAutoFill = async () => {
    if (conditionInput.length > 0) {
      const rowsRaw = await fetch(
        `http://localhost:9000/trial/conditions/${conditionInput}`,
      );
      const {data} = await rowsRaw.json();
      const conditions = [];
      data.forEach((condition) => {
        conditions.push(condition.condition);
      });
      await setConditionData(conditions);
      console.log(conditionData);
    }
  };

  const requestDataWithDebounce = AwesomeDebouncePromise(getAutoFill, 400);

  const createSelectItems = (items) => {
    return items.map((item) => {
      return <SelectItem style={styles.autoBox} title={item} key={item} />;
    });
  };

  const updateData = () => {
    requestDataWithDebounce();
  };

  const onSelect = (index) => {
    setConditionInput(conditionData[index]);
  };

  const onChangeText = async (e) => {
    setConditionInput(e);
    updateData();
  };

  const renderOption = (item, index) => (
    <AutocompleteItem style={styles.autoBox} key={index} title={item} />
  );

  const handleSubmit = async () => {
    const key = keywordsInput;
    const stat = studyStatuses[statusIndex - 1];
    const typ = studyTypes[typeIndex - 1];
    const result = await queryApi(conditionInput, stat, typ, key, 1, 10);
    props.navigation.navigate('Study', {
      studyData: result,
    });
  };

  const handleKeyword = (e) => {
    setKeywordsInput(e);
  };

  return (
    <>
      <ImageBackground
        source={require('./background.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.titleTextRow}>
          <Text style={styles.text} category="h2">
            Search Clinical Trials
          </Text>
        </View>

        <View style={styles.textRow}>
          <Text style={styles.text} appearance="hint">
            Hello! This is the Ancora Clinical Trials Search Form. Search
            through the government database of clinical trials
            (clinicaltrials.gov) in an easy and simple way.
          </Text>
        </View>

        <View style={styles.row}>
          <Autocomplete
            style={styles.input}
            placeholder="Condition"
            value={conditionInput}
            onSelect={onSelect}
            onChangeText={onChangeText}>
            {conditionData.map(renderOption)}
          </Autocomplete>
        </View>

        <View style={styles.row}>
          <Select
            style={styles.input2}
            placeholder="Status"
            selectedIndex={statusIndex}
            onSelect={(index) => setStatusIndex(index)}
            value={studyStatuses[statusIndex.row]}>
            {createSelectItems(studyStatuses)}
          </Select>
        </View>

        <View style={styles.row}>
          <Select
            style={styles.input2}
            placeholder="Type"
            selectedIndex={typeIndex}
            onSelect={(index) => setTypeIndex(index)}
            value={studyTypes[typeIndex.row]}>
            {createSelectItems(studyTypes)}
          </Select>
        </View>

        <View style={styles.rowKeyword}>
          <Input
            style={styles.inputKeyword}
            value={keywordsInput}
            multiline={true}
            textStyle={styles.keywordText}
            onChangeText={handleKeyword}
            placeholder="Keywords"
          />
        </View>

        <Button
          style={styles.submitButton}
          appearance="filled"
          status="primary"
          onPress={handleSubmit}
          title="Submit">
          Submit Form
        </Button>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginLeft: 10,
  },
  titleTextRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 20,
  },
  text: {
    color: 'black',
    borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    textAlign: 'justify',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 30,
    width: vw * 0.7,
  },
  rowKeyword: {
    marginTop: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  input: {
    width: vw * 0.9,
  },
  input2: {
    width: vw * 0.9,
  },
  inputKeyword: {
    width: vw * 0.6,
    height: '200%',
  },
  keywordText: {
    minHeight: 64,
  },
  submitButton: {
    width: vw * 0.6,
    marginLeft: 10,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  autoBox: {
    backgroundColor: 'lightblue',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});

export default SearchForm;
