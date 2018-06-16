import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { SocialIcon, Divider } from 'react-native-elements';
import FbLoginBtn from '../components/FbLoginBtn';
import { NavigationActions } from 'react-navigation';
import Loginform from '../components/LoginForm';
import Register from './Register';
import * as firebase from 'firebase';
import 'firebase/firestore';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';
import { onSignIn } from '../index/auth';
import {fetchUser, createUser, loginUser} from '../index/server';

export default class Login extends Component {

  state={
    loading:false,
  }


  fbAuth = async () => {
    try {
      this.setState({loading:true});
      var result = await LoginManager.logInWithReadPermissions(['public_profile','email','user_friends']);
      if (!result.isCancelled){
        var tokenData = await AccessToken.getCurrentAccessToken();
        var token = tokenData.accessToken.toString();
        console.log('token', token);
        // Graph request to get high quality profile picture
        var profile_uri_480 = await fetch('https://graph.facebook.com/v2.5/me?fields=id,name,picture.height(480)&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
          // Friends list should be in json.friends.data of type <array of friends>
          console.log('json',json);
          return json.picture.data.url
        })
        .catch(() => {
          reject('ERROR GETTING DATA FROM FACEBOOK')
        })
        // FB Login
        var credential = firebase.auth.FacebookAuthProvider.credential(token);
        var user = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        console.log("user", user);
        var timestamp = Date.now()
        var body = {
          uid: user.user.uid,
          first_name: user.additionalUserInfo.profile.first_name,
          last_name: user.additionalUserInfo.profile.last_name,
          displayName: user.user.displayName,
          email: user.additionalUserInfo.profile.email,
          profile_uri: user.user.photoURL,
          profile_uri_480: profile_uri_480,
          creationTime: timestamp, // unix time easier to handle/sort
        }
        console.log('body', body);
        // Check if user exists first, reg is lenth of response
        var reg = await fetchUser(user.user.uid)
        console.log("REG", reg);
        if (reg.length == 0){
          // Create user
          try {
            await createUser(body)
            this.setState({loading:false});
            this.props.navigation.navigate("SignedIn")
          } catch (error) {
            console.log("ERR", error);
            alert(error)
            this.setState({loading:false});
          }
        } else {
          // Login user, insert to login table
          var bodyLogin = {
            uid: user.user.uid,
            lastSignInTime: timestamp
          }
          try {
            await loginUser(bodyLogin)
            this.setState({loading:false});
            this.props.navigation.navigate("SignedIn")
          } catch (error) {
            alert(error)
            this.setState({loading:false});
          }
        }
      } else {
        // User cancelled fb login
        this.setState({loading:false});
      }
    } catch (error) {
      // FB login error
      console.log("ERRRR", error);
      this.setState({loading:false});
      alert(error)
    }
  }


  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar barStyle="light-content"
        /> */}

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
             />
          <Text style={styles.title}>
            boozt
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Loginform
            navigation={this.props.navigation}
          />
        </View>
        {!this.state.loading && <TouchableOpacity onPress={() => this.fbAuth()}>
          <FbLoginBtn loading={false}/>
        </TouchableOpacity>}
        {this.state.loading && <TouchableOpacity onPress={() => this.fbAuth()}>
          <FbLoginBtn loading={true}/>
        </TouchableOpacity>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#2c3e50',
  },
  formContainer:{
    // paddingVertical:200
  },
  logoContainer:{
    alignItems:'center',
    flexGrow:1,
    justifyContent:'center',
  },
  logo:{
    width:150,
    height:150,
  },
  title: {
    // flex:1,
    color:'white',
    marginTop:10,
    justifyContent:'center',
    opacity:1
  },
  divider:{
    backgroundColor:'red',
    alignSelf:'center',
    width: '80%',
  }

});
