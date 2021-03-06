import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Card, Text, Button} from '@ui-kitten/components';

const StudyIndex = ({info, handleAdd, handlePress, checkStudy}) => {
  const [disabled, setDisabled] = useState(false);

  const renderItemHeader = (headerProps, item) => {
    return (
      <View {...headerProps} style={styles.noBorder}>
        <Text category="h6">{item.BriefTitle}</Text>
      </View>
    );
  };
  const renderItemFooter = (footerProps, item) => (
    <Text {...footerProps} category="h6" style={styles.noBorder}>
      {item.OverallStatus}
    </Text>
  );

  useEffect(() => {
    checkStudy(info).then((res) => {
      setDisabled(res);
    });
  }, [info, checkStudy]);

  return (
    <View style={styles.item}>
      <ImageBackground
        style={styles.imgBackground}
        source={require('./pageBackground.jpg')}
        resizeMode="cover">
        <Card
          style={styles.card}
          status="basic"
          header={(headerProps) => renderItemHeader(headerProps, info.item)}
          footer={(footerProps) => renderItemFooter(footerProps, info.item)}
          onPress={() => handlePress(info)}>
          <Text style={styles.bodyText}>{info.item.BriefSummary}</Text>
        </Card>
        <Button
          disabled={disabled}
          onPress={() => {
            handleAdd(info).then(() => {
              checkStudy(info).then((res) => {
                setDisabled(res);
              });
            });
          }}>
          add
        </Button>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    padding: 10,
    borderWidth: 0,
  },
  item: {
    marginVertical: 20,
    backgroundColor: 'black',
    padding: 10,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  bodyText: {
    maxHeight: 200,
    fontWeight: '600',
    borderWidth: 0,
  },
  noBorder: {
    padding: 10,
  },
});

export default StudyIndex;

// https://clinicaltrials.gov/ct2/show/${NCTId[0]}
