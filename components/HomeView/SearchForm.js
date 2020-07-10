import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {
  Text,
  IndexPath,
  Icon,
  Select,
  SelectItem,
  Input,
  Autocomplete,
  AutocompleteItem,
  Button,
} from '@ui-kitten/components';

// Components

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

// import conditions from './conditions.js';

const vw = Dimensions.get('window').width;

// Functions
import queryApi from './queryApi';

const filter = (item, query) => {
  return item.toLowerCase().includes(query.toLowerCase());
};

const SearchForm = () => {
  const [conditionInput, setConditionInput] = useState('');
  const [conditionData, setConditionData] = useState(studyStatuses);
  const [statusIndex, setStatusIndex] = useState(new IndexPath(0));
  const [typeIndex, setTypeIndex] = useState(new IndexPath(0));
  const [sexInput, setSexInput] = useState('');
  const [minAgeInput, setMinAgeInput] = useState(0);
  const [maxAgeInput, setMaxAgeInput] = useState(100);
  const [healthyInput, setHealthyInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');

  const createSelectItems = (items) => {
    return items.map((item) => {
      return <SelectItem title={item} key={item} />;
    });
  };

  const onSelect = (index) => {
    setConditionInput(studyStatuses[index]);
  };

  const onChangeText = (e) => {
    setConditionInput(e);
    setConditionData(studyStatuses.filter((item) => filter(item, e)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item} />
  );

  const handleSubmit = () => {
    const key = keywordsInput;
    const stat = studyStatuses[statusIndex - 1];
    const typ = studyTypes[typeIndex - 1];
    const result = queryApi(conditionInput, stat, typ, key, 1, 10);
    console.log(result);
  };

  const handleKeyword = (e) => {
    setKeywordsInput(e);
  };

  return (
    <>
      <View style={styles.row}>
        <Text category="h2">Study Query</Text>
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

        <Select
          style={styles.input2}
          placeholder="Type"
          selectedIndex={typeIndex}
          onSelect={(index) => setTypeIndex(index)}
          value={studyTypes[typeIndex.row]}>
          {createSelectItems(studyTypes)}
        </Select>
      </View>

      <View style={styles.row}>
        <Input
          value={keywordsInput}
          onChangeText={handleKeyword}
          placeholder="Keywords"
        />
      </View>

      <View style={styles.row}>
        <Text category="h3">Form Input</Text>
      </View>

      <View style={styles.row}>
        <Text category="h3">Form Input</Text>
      </View>

      <Button
        style={styles.submitButton}
        appearance="outline"
        status="primary"
        onPress={handleSubmit}
        title="Submit">
        Submit Form
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  input: {
    width: vw * 0.8,
  },
  input2: {
    width: vw * 0.45,
    margin: '1%',
  },
});

export default SearchForm;
