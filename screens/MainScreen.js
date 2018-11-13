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
  TouchableHighlight,
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
    // marginBottom: 2,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: 'silver',
    // borderTopWidth: 2,
    borderBottomWidth: 1,
  },
  item: {
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'silver',
    // marginBottom: 2,
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 20,
    paddingLeft: 30,
    // paddingTop: 5,
    // paddingBottom: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  dotText: {
    fontSize: 20,
    paddingLeft: 15,
    color: 'silver',
    alignSelf: 'center',
  },
  sortButton: {
    borderBottomWidth: 1,
    borderBottomColor: 'dimgrey',
    backgroundColor: 'grey',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  sortText: {
    fontSize: 20,
    justifyContent: 'center',
    color: 'white',
    // alignSelf: 'center',
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
// (updated: this is now done in a function)
// const sectArr = Object.keys(sortedDict).map(letterkey => ({
//  title: letterkey,
//  data: sortedDict[letterkey],
// }));

// Sort by lastname
const lastnameArr = data
  .sort((a, b) => a.name.last_name.localeCompare(b.name.last_name))
  .reduce((dict, obj) => {
    const firstLetter = obj.name.last_name.charAt(0);
    const dicted = dict;
    if (!dicted[firstLetter]) {
      dicted[firstLetter] = [];
    }
    dicted[firstLetter].push(obj);
    return dicted;
  }, []);

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Contacts',
    headerTitleStyle: { flex: 1, textAlign: 'center', alignSelf: 'center' },
  };

  constructor(props) {
    super(props);
    this.state = {
      firstNameSort: true,
    };
  }

  onPress = (item) => {
    const { navigation } = this.props;
    navigation.navigate('Details', item);
  };

  readyData = (dict) => {
    const sectArr = Object.keys(dict).map(letterkey => ({
      title: letterkey,
      data: dict[letterkey],
    }));
    return sectArr;
  };

  render() {
    const { firstNameSort } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <TouchableHighlight
            style={styles.sortButton}
            onPress={() => this.setState({ firstNameSort: !firstNameSort })}
          >
            <Text style={styles.sortText}>
              {firstNameSort ? 'Sort by last name' : 'Sort by first name'}
            </Text>
          </TouchableHighlight>
        </View>
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
              <Text style={styles.dotText}>•</Text>
              <Text style={styles.itemText}>
                {firstNameSort
                  ? `${item.name.first_name} ${item.name.last_name}`
                  : `${item.name.last_name}, ${item.name.first_name}`}
              </Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          sections={firstNameSort ? this.readyData(sortedDict) : this.readyData(lastnameArr)}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}
