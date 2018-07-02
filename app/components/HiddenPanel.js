import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { BGC, tintColor } from '../index/colors';



export default class HiddenPanel extends Component<Props> {
  render() {



    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.dislike} onPress={() => this.props.vote('dislike')}>
          <Icon name='chevron-down' size={30} color='red'/>
          {/* <Text style={{color:'blue'}}> NOT </Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.share} onPress={() => this.props.vote('share')}>
          <Icon name='share' size={30} color='lightblue'/>
          {/* <Text style={{color:'red'}}> HOT </Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.like} onPress={() => this.props.vote('like')}>
          <Icon name='chevron-up' size={30} color='#2ecc71'/>
          {/* <Text style={{color:'red'}}> HOT </Text> */}
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
    borderBottomWidth: 1,
    borderColor: 'red'
    // backgroundColor:'blue'
  },
  share: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightblue'
  },
  like: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'blue'
    borderBottomWidth: 1,
    borderColor: '#2ecc71'
  }
});
