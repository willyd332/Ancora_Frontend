import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Card, Text, Button} from '@ui-kitten/components';
import {BACKEND_URL} from 'react-native-dotenv';

const StudyIndex = ({info, handleAdd, handlePress, checkStudy}) => {
  const renderItemHeader = (headerProps, item) => {
    return (
      <View {...headerProps}>
        <Text category="h6">{item.BriefTitle}</Text>
      </View>
    );
  };
  const renderItemFooter = (footerProps, item) => (
    <Text {...footerProps} category="h6">
      {item.OverallStatus}
    </Text>
  );

  const handleDelete = async () => {
    const body = await JSON.stringify({
      user_id: 36,
      studyid: info.item.NCTId[0],
    });
    await fetch(`${BACKEND_URL}/trial/delete`, {
      method: 'POST',
      body,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };

  return (
    <View style={styles.item}>
      <ImageBackground
        style={styles.imgBackground}
        source={require('./pageBackground.jpg')}>
        <Card
          style={styles.card}
          status="basic"
          header={(headerProps) => renderItemHeader(headerProps, info.item)}
          footer={(footerProps) => renderItemFooter(footerProps, info.item)}
          onPress={() => handlePress(info)}>
          <Text style={styles.bodyText}>{info.item.BriefSummary}</Text>
        </Card>
        <Button
          status="danger"
          onPress={() => {
            handleDelete();
          }}>
          Delete
        </Button>
      </ImageBackground>
    </View>
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
    borderWidth: 0,
    padding: 10,
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
