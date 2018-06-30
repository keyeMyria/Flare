import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import { BGC, tintColor } from '../index/colors';
import { SearchBar, Overlay } from 'react-native-elements';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Trending extends Component<Props> {

  state = {
    text:'',
  }

  search(text) {
    this.setState({text : text})
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar
          style={styles.input}
          clearIcon={this.state.text ? {color: 'gold'} : {color: 'transparent'}}
          onChangeText={(text) => this.search(text)}
          value={this.state.text}
          onClear={(text) => this.search(text)}
          placeholder='Search for a prompt' />
        <View style={styles.bodyContainer}>

        </View>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
    backgroundColor:`${tintColor}`
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: `${BGC}`,
  },
  bodyContainer:{
    flex:1,
    // backgroundColor:'red'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#cccccc',
    marginBottom: 5,
  },

});
