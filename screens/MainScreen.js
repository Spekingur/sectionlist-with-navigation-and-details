// (c) 2018
// Hreidar Olafur Arnarsson, hreidara14@ru.is
// Maciej Sierzputowski, maciej15@ru.is

import React from 'react';
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
// import { Constants } from 'expo';

// import DetailScreen from './DetailScreen';

import data from '../ass2data'; // the data we are working with

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    // padding: 16,
  },
  concertContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 16,
  },
  infoContainer: {
    paddingLeft: 8,
    justifyContent: 'space-around',
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontFamily: 'space-mono',
  },
  list: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'gainsboro',
    paddingLeft: 10,
  },
  item: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'silver',
    marginBottom: 2,
  },
  itemText: {
    fontSize: 20,
    paddingLeft: 12,
    marginTop: 1,
    marginBottom: 1,
  },
});

// First sort
// Then create a dictionary and push the whole object to its relevant place
const sortedDict = data
  .sort((a, b) => a.name.first_name.localeCompare(b.name.first_name))
  .reduce((dict, obj) => {
    const firstLetter = obj.name.first_name.charAt(0);
    const dicted = dict;
    if (!dicted[firstLetter]) {
      dicted[firstLetter] = [];
    }
    dicted[firstLetter].push(obj);
    return dicted;
  }, []);

// Finally structure the data in a way that sectionlist wants
const sectArr = Object.keys(sortedDict).map(letterkey => ({
  title: letterkey,
  data: sortedDict[letterkey],
}));

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Contacts',
    headerTitleStyle: { flex: 1, textAlign: 'center', alignSelf: 'center' },
  };

  onPress = (item) => {
    const { navigation } = this.props;
    navigation.navigate('Details', item);
  };

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          style={styles.list}
          ListEmptyComponent={
            <ActivityIndicator size="large" style={{ justifyContent: 'center' }} />
          }
          ListFooterComponent={() => (
            <ActivityIndicator size="small" style={{ justifyContent: 'center' }} />
          )}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.item} key={index} onPress={() => this.onPress(item)}>
              <Text style={styles.itemText}>{item.name.first_name}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          sections={sectArr}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}
