import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BGC, tintColor } from '../index/colors';
import { NavigationActions } from 'react-navigation';
import FBSDK, {AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import * as firebase from 'firebase';
import 'firebase/firestore';
// import firebase from 'react-native-firebase';

export default class Header extends Component<Props> {

  createPost(){
    // this.props.navigation.navigate('Picker')
  }

  goBack(){
    this.props.navigation.dispatch(NavigationActions.back())
  }

  doNothing(){

  }

  settingsPressed(){
    this.props.navigation.navigate('Settings');
  }

  getFriendsList(){
    var userID = firebase.auth().currentUser.uid
    console.log('userID', userID);
    fetch("http://localhost:3000/user_exists/"+userID, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log('respData', responseData);
      // this.setState({newData: responseData})
    })
    .catch((err) => {
      console.log(err);
    })
  }

  graphReq(){

  }


  testFirebase(){
    // var firestore = firebase.firestore()
    // settings = {timestampsInSnapshots: true};
    // firestore.settings(settings)
    var postData = {
      name: 'John',
      email:'John@xyz.com',
      age: 18
    }

    firebase.firestore().collection('users')
    .doc('userID')
    .set(postData)
    .then(()=>{
      alert('Success')
    })
    .catch((error) => {
      console.log(error);
      alert(error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.horizContainer}> */}
        {this.props.leftIcon == 'blank' && <TouchableOpacity onPress={() => this.doNothing()}>
          <Icon name='menu' size={30} color='transparent'/>
        </TouchableOpacity>}
        {(this.props.leftIcon == 'ios-arrow-back' || this.props.leftIcon == 'ios-close') && <TouchableOpacity onPress={() => this.goBack()}>
          <Icon name={this.props.leftIcon} size={30} color={`${BGC}`}/>
        </TouchableOpacity>}
        {this.props.leftIcon == 'ios-search' && <TouchableOpacity onPress={() => this.getFriendsList()}>
          <Icon name='menu' size={30} color='white'/>
        </TouchableOpacity>}
        <Text style={styles.title}>
          {this.props.title}
        </Text>
        {this.props.rightIcon == 'blank' && <TouchableOpacity onPress={() => this.doNothing()}>
          <Icon name='menu' size={30} color='transparent'/>
        </TouchableOpacity>}
        {this.props.rightIcon == 'ios-settings-outline' && <TouchableOpacity onPress={() => this.settingsPressed()}>
          <Icon name={this.props.rightIcon} size={30} color={`${BGC}`}/>
        </TouchableOpacity>}
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flexDirection:'row',
    height: 40,
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor: `${tintColor}`,
    // paddingTop: 30,
    paddingHorizontal:16,
  },
  horizContainer: {
    // flex: 1,
    height: 64,
    flexDirection: 'row',
    alignItems: 'stretch',
    // justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    color: `${BGC}`
  }

});
