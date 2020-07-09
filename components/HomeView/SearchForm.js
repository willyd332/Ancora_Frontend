import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
  IndexPath,
  Icon,
  Select,
  SelectItem,
  Input,
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

const SearchForm = () => {
  const [conditionInput, setConditionInput] = useState('');
  const [statusInput, setStatusInput] = useState('Any Status');
  const [statusIndex, setStatusIndex] = useState(new IndexPath(0));
  const [typeInput, setTypeInput] = useState('Any Type');
  const [typeIndex, setTypeIndex] = useState(new IndexPath(0));
  const [sexInput, setSexInput] = useState('');
  const [minAgeInput, setMinAgeInput] = useState('');
  const [maxAgeInput, setMaxAgeInput] = useState('');
  const [healthyInput, setHealthyInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');

  const handleCondition = (e) => {
    setConditionInput(e);
  };

  const createSelectItems = (items) => {
    return items.map((item) => {
      return <SelectItem title={item} key={item} />;
    });
  };

  return (
    <>
      <View style={styles.row}>
        <Text category="h2">Study Query</Text>
      </View>

      <View style={styles.row}>
        <Input
          style={styles.input}
          placeholder="Condition"
          value={conditionInput}
          onChangeText={(e) => {
            handleCondition(e);
          }}
        />
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
        <Text category="h3">Form Input</Text>
      </View>

      <View style={styles.row}>
        <Text category="h3">Form Input</Text>
      </View>

      <View style={styles.row}>
        <Text category="h3">Form Input</Text>
      </View>
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
    width: '100%',
  },
  input2: {
    width: '48%',
    margin: '1%',
  },
});

export default SearchForm;
