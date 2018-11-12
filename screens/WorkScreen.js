// (c) 2018
// Hreidar Olafur Arnarsson, hreidara14@ru.is
// Maciej Sierzputowski, maciej15@ru.is

import React from 'react';
import {
  View, Text, Animated, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  infoContainer: {
    borderWidth: 0,
    borderColor: 'black',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    // backgroundColor: 'green',
    paddingLeft: 10,
    paddingRight: 10,
  },
  textContainer: {
    // backgroundColor: 'red',
  },
  text: {
    fontSize: 16,
  },
  textUnderline: {
    alignSelf: 'stretch',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default class Workscreen extends React.Component {
  constructor(props) {
    super(props);
    this.infoAnimation = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.infoAnimation, { duration: 500, toValue: 1 }).start();
  }

  render() {
    const { workInfo } = this.props;
    const length = workInfo.department.length + workInfo.job_title.length;
    return (
      <Animated.View
        style={[
          styles.infoContainer,
          {
            marginRight: this.infoAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 'center'],
            }),
          },
          { opacity: this.infoAnimation },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>{workInfo.address}</Text>
        </View>
        <View style={styles.textUnderline} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{workInfo.email}</Text>
        </View>
        <View style={styles.textUnderline} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{workInfo.phone_number}</Text>
        </View>
        <View style={styles.textUnderline} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{workInfo.company_name}</Text>
        </View>
        <View style={styles.textUnderline} />
        <View style={styles.textContainer}>
          <Text style={[styles.text, { alignSelf: 'center', textAlign: 'center' }]}>
            {workInfo.department}
            {length > 34 ? ',\n' : ', '}
            {workInfo.job_title}
          </Text>
        </View>
        <View style={styles.textUnderline} />
      </Animated.View>
    );
  }
}
