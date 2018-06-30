/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';
import { isSignedIn } from './app/index/auth';
import {Root} from './app/index/router';
import {BGC, tintColor} from './app/index/colors';



var config = {
    apiKey: 'AIzaSyBJhioVtFvPa9q_A0llcNGEUkZpftHlkmA',
    authDomain: "flare-77ed0.firebaseapp.com",
    databaseURL: "https://flare-77ed0.firebaseio.com",
    projectId: "flare-77ed0",
    storageBucket: "flare-77ed0.appspot.com",
    messagingSenderId: "111768309137"
  };
const app = firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots:true})
firebase.firestore.setLogLevel('debug')

type Props = {};
export default class App extends Component<Props> {

  state = {
    signedIn: false,
    checkedSignedIn: false
  }

  componentWillMount(){
    this.checkedSignedIn()
  }

  checkedSignedIn(){
    isSignedIn()
    .then((res)=> {
      console.log('res', res);
      this.setState({signedIn: res, checkedSignedIn: true})
    })
    .catch(() => alert("An Error Occurred"))


  }

  render() {

    if (!this.state.checkedSignedIn){
      return null;
    }

    const Layout = Root(this.state.signedIn)
    return (
      <Layout/>
    );
  }
}


console.disableYellowBox = true;
