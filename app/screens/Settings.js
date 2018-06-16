import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { BGC, tintColor } from '../index/colors';
import { onSignOut } from '../index/auth';
import * as firebase from 'firebase';
// import mysql from 'mysql';
// var mysql = require('mysql');


const project = 'Flare';
const instance = 'instance1';
const database = 'Test';

type Props = {};
export default class Settings extends Component<Props> {



  logout(){
    firebase.auth().signOut()
    .then(()=> {
      console.log('signOut');
      onSignOut()
      .then(()=> this.switchNavigators())
    })
  }

  switchNavigators(){
    this.props.navigation.navigate("SignedOut")
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.fetchGoogle()} style={styles.fetchBtn}>
          <Text>
            Fetch Google MYSQL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.logout()} style={styles.logoutBtn}>

        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: `${BGC}`,
  },
  logoutBtn: {
    // flex:1,
    height: 45,
    backgroundColor:'black'
  },
  fetchBtn:{
    height: 45,
    borderColor:'blue',
    borderWidth:2,
    justifyContent:'center',
    alignItems:'center'

  }
});
