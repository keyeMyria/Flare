import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { BGC, tintColor } from '../index/colors';



export default class HiddenPanel extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.dislike}>
          {/* <Icon name='thumbs-down' size={30} color='red'/> */}
          <Text style={{color:'blue'}}> NOT </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.like}>
          {/* <Icon name='thumbs-up' size={30} color='#2ecc71'/> */}
          <Text style={{color:'red'}}> HOT </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    height: 64,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  dislike: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: 'blue'
    // backgroundColor:'blue'
  },
  like: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: 'red'
  }
});
