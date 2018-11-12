// (c) 2018
// Hreidar Olafur Arnarsson, hreidara14@ru.is
// Maciej Sierzputowski, maciej15@ru.is

import React from 'react';
import {
  StyleSheet, Button, Text, View, Image,
} from 'react-native';

import Homescreen from './HomeScreen';
import Workscreen from './WorkScreen';

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
  text: {
    // color: 'white',
    fontSize: 24,
  },
  avatarImg: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 75,
  },
  imgStyle: {
    backgroundColor: '#fff',
    borderRadius: 75,
    marginBottom: 10,
  },
  nameSpace: {
    flexDirection: 'row',
  },
  screenContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  buttonStyle: {
    borderRadius: 100,
  },
});

export default class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
    headerTitleStyle: { flex: 1, textAlign: 'center', alignSelf: 'center' },
    headerRight: <View />,
  };

  constructor(props) {
    super(props);
    this.state = {
      onHomeScreen: true,
    };
  }

  render() {
    const { onHomeScreen } = this.state;
    const { navigation } = this.props;
    const {
      name, avatar, home, work,
    } = navigation.state.params;
    const pic = { uri: avatar };
    return (
      <View style={styles.appContainer}>
        <View style={styles.imgStyle}>
          <Image style={styles.avatarImg} source={pic} />
        </View>

        <View style={styles.nameSpace}>
          <Text style={styles.text}>
            {name.first_name}
            {' '}
            {name.last_name}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonStyle}
            title={onHomeScreen ? 'Show work info' : 'Show home info'}
            onPress={() => this.setState({ onHomeScreen: !onHomeScreen })}
          />
        </View>

        <View style={styles.screenContainer}>
          {onHomeScreen ? <Homescreen homeInfo={home} /> : <Workscreen workInfo={work} />}
        </View>
      </View>
    );
  }
}
