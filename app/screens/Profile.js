import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  AsyncStorage,
  Dimensions
} from 'react-native';
import {Divider} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import { BGC, tintColor, colors } from '../index/colors';
import { onSignOut, getUid } from '../index/auth';
import {fetchStatusHandler, fetchUser} from '../index/server';
import * as firebase from 'firebase';
import Header from '../components/Header';
import Loading from '../components/Loading';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';
import {fetchUserPosts} from '../index/server';

type Props = {};
export default class Profile extends Component<Props> {

  state = {
    loading: false,
    profile_uri_loading: false,
    profile_uri_error: false,
    posts_loading:false,
    largeProfileURI: '',
    friendsList: null,
    userData: {
      // first_name:'',
      // last_name:'',
      // display_name: '',
      // follower_count: 0,
      // post_count:0,
      // wins: 0,
    },
  }

  componentWillMount(){
    getUid('uid')
    .then(uid => {
      console.log('uid',uid);
      this.getUserData(uid)
      this.getLargeProfileURI()
      this.getUserPhotos(uid)
    })
    .catch(error => {
      console.log(error);
    })

  }

  getUserData(uid){
    this.setState({loading:true})
    fetchUser(uid)
    .then(userData => {

      this.setState({userData:userData[0]}, ()=> console.log('USER DATA',this.state.userData))
    })
    .then(()=>{
      this.setState({loading:false})
    })
  }

  getLargeProfileURI = async () => {
    this.setState({profile_uri_loading:true, profile_uri_error: false})
    var tokenData = await AccessToken.getCurrentAccessToken();
    var token = tokenData.accessToken.toString();
    // Graph request to get high quality profile picture
    var profile_uri_large = await fetch('https://graph.facebook.com/v2.5/me?fields=friends,picture.height(720)&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      // Friends list should be in json.friends.data of type <array of friends>
      console.log('json',json);
      // FIX ERROR HERE
      const err = json.error
      if (err) {
        this.setState({profile_uri_error: true})
        throw json.error.message
      } else {
        this.setState({
          profile_uri_error: false,
          largeProfileURI: json.picture.data.url,
          friendsList: json.friends.data,
        })
      }
    })
    .catch((error) => {
      console.log('Error fetching user profile',error)
    })
    this.setState({profile_uri_loading: false})
  }

  getUserPhotos(uid){
    this.setState({posts_loading:true})
    fetchUserPosts(uid)
    .then(posts => {
      this.setState({posts, post_count:posts.length}, ()=>console.log('POSTS',this.state.posts))
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="M Y   P R O F I L E" rightIcon='ios-settings-outline' leftIcon='blank' navigation={this.props.navigation}/>
        <View style={styles.bannerContainer}>
          {/* Show loading or image */}
          {this.state.profile_uri_loading && !this.state.profile_uri_error
            ? <Loading size={20} color={colors.fb}/> : <Image style={styles.profileImage}
            resizeMethod='scale'
            resizeMode='contain'
            source={{uri: this.state.largeProfileURI}}
          />}
          {/* Show error sign */}
          {this.state.profile_uri_error && <TouchableOpacity
            style={{justifyContent:'center', alignItems:'center', flex:1}}
            onPress={()=> this.getLargeProfileURI()}>
            <EIcon name='warning' size={30} color={colors.warning}/>
            <Text style={{fontSize:10, color:colors.gray}}>R E T R Y</Text>
          </TouchableOpacity>}
          <Text style={styles.name}>
            {this.state.userData.display_name}
          </Text>
          {/* <Text style={styles.bio}>
            {this.state.bio}
          </Text> */}
        </View>

        {/* Horizontal Divider */}
        {/* <Divider style={styles.horizDivider} /> */}

        {/* Horizontal data bar */}
        <View style={styles.profileContainer}>
          <View style={styles.dataCell}>
            {/* <FAIcon name='picture-o' size={30} color='gray'/> */}
            <Text style={styles.dataCellNumber}>{this.state.post_count}</Text>
            <Text style={styles.dataCellText}>POSTS</Text>
          </View>
          <Divider style={styles.verticalDivider}/>
          <View style={styles.dataCell}>
            {/* <MIcon name='people' size={30} color='gray'/> */}
            <Text style={styles.dataCellNumber}>{this.state.userData.follower_count}</Text>
            <Text style={styles.dataCellText}>FOLLOWERS</Text>
          </View>
          <Divider style={styles.verticalDivider}/>
          <View style={styles.dataCell}>
            {/* <EIcon name='medal' size={30} color='gray'/> */}
            <Text style={styles.dataCellNumber}>{this.state.userData.wins}</Text>
            <Text style={styles.dataCellText}>WINS</Text>
          </View>
          <Divider style={styles.verticalDivider}/>
          <View style={styles.dataCell}>
            {/* <EIcon name='heart' size={30} color='gray'/> */}
            <Text style={styles.dataCellNumber}>{this.state.likes}</Text>
            <Text style={styles.dataCellText}>TOTAL LIKES</Text>
          </View>

        </View>
        <Divider style={styles.horizDivider} />

        {/* Posts Scroll Container */}
        <View style={styles.bodyContainer}>
          <Text style={styles.dataCellText}>
            You have no photos
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: `${BGC}`,
  },
  bannerContainer: {
    flex:0.5,
    // backgroundColor:'blue',
    justifyContent:'center',
    alignItems:'center',
    padding: 5,
    // paddingBottom: 20
  },
  profileContainer:{
    // flex: 0.25,
    height: 60,
    flexDirection: 'row',
    // backgroundColor: 'green',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal: 24
  },
  bodyContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
    // backgroundColor: 'black'
  },
  seperator: {
    flex: 1,
    backgroundColor: 'red'
  },
  profileImage: {
    // backgroundColor: 'green',
    height: 100,
    width: 100,
    borderRadius: 50,
    // paddingBottom: 20
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    paddingTop:20,
    paddingBottom:10,
  },
  verticalDivider:{
    backgroundColor:'gray',
    alignSelf:'center',
    height: '45%',
    flex:0.005
  },
  horizDivider:{
    backgroundColor:'black',
  },
  dataCell: {
    justifyContent:'center',
    alignItems:'center'
  },
  dataCellText:{
    color:'gray',
    fontSize:10,
  },
  dataCellNumber:{
    // color:'gray',
    fontWeight:"700"
  }

});
