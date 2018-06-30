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
  Dimensions,
  ScrollView,
  Animated,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
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
import ProfilePost from '../components/ProfilePost';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';
import {fetchUserPosts} from '../index/server';

type Props = {};
export default class Profile extends Component<Props> {

  state = {
    opacity: new Animated.Value(0),
    loading: false,
    refreshing: false,
    sortIndex: null,
    profile_uri_loading: false,
    profile_uri_error: false,
    posts_loading:false,
    largeProfileURI: '',
    friendsList: null,
    nickname: 'Nickname',
    posts: null,
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

  onProfilePicLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
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

  getUserPhotos(uid) {
    this.setState({posts_loading:true})
    fetchUserPosts(uid)
    .then(posts => {
      this.setState({posts, post_count:posts.length, posts_loading: false}, ()=>console.log('POSTS',this.state.posts))
    })
  }

  refreshPosts() {
    getUid('uid')
    .then(uid => {
      this.getUserPhotos(uid)
    })
    .catch(error => {
      console.log(error);
    })
  }

  sortPressed(index){
    // Update state
    if (index == this.state.sortIndex) {
      this.setState({sortIndex: null})
    } else {
      this.setState({sortIndex: index})
    }
    // Sort accordingly
    if (index == 0) {
      // sort by wins
    } else if (index == 1) {

    } else {

    }
  }

  render() {

    const B = (props) => <Text style={{fontSize: 12, fontWeight: '800', color:'black'}}>{props.children}</Text>

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header title="M Y   P R O F I L E" rightIcon='ios-settings-outline' leftIcon='blank' navigation={this.props.navigation}/>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.getUserPhotos(this.state.userData.uid)}
              />
            }
            contentContainerStyle={styles.scrollContainer}>
            <View style={styles.bannerContainer}>
              {/* Show loading or image */}
              {this.state.profile_uri_loading && !this.state.profile_uri_error
                ? <Loading size={20} color={colors.fb}/> : <Animated.Image
                  onLoad={this.onProfilePicLoad} style={[styles.profileImage, {opacity:this.state.opacity}]}
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
              <Text style={styles.nickname}>
                {this.state.nickname}
              </Text>
              <Text style={[styles.dataCellText, {paddingTop:8}]}>
                <B>300</B> FOLLOWERS <B>•</B> <B>71</B> FOLLOWING
              </Text>
            </View>

            {/* Horizontal Divider */}
            {/* <Divider style={styles.horizDivider} /> */}

            {/* Horizontal stat data bar */}
            <View style={styles.statContainer}>
              <View style={styles.dataCell}>
                {/* <FAIcon name='picture-o' size={30} color='gray'/> */}
                <Text style={styles.dataCellNumber}>{this.state.post_count}</Text>
                <Text style={styles.dataCellText}>POSTS</Text>
              </View>
              {/* <Divider style={styles.verticalDivider}/> */}
              <View style={styles.dataCell}>
                {/* <EIcon name='medal' size={30} color='gray'/> */}
                <Text style={styles.dataCellNumber}>{this.state.userData.wins}</Text>
                <Text style={styles.dataCellText}>WINS</Text>
              </View>
              {/* <Divider style={styles.verticalDivider}/> */}
              <View style={styles.dataCell}>
                {/* <MIcon name='people' size={30} color='gray'/> */}
                <Text style={styles.dataCellNumber}>{this.state.userData.follower_count}</Text>
                <Text style={styles.dataCellText}>AVG 5</Text>
              </View>

              {/* <Divider style={styles.verticalDivider}/> */}
              <View style={styles.dataCell}>
                {/* <EIcon name='heart' size={30} color='gray'/> */}
                <Text style={styles.dataCellNumber}>{this.state.likes}</Text>
                <Text style={styles.dataCellText}>TOTAL LIKES</Text>
              </View>

            </View>
            <Divider style={styles.horizDivider} />
            <View style={styles.horizSortContainer}>
              <Text style={{fontSize:10, color:'gray', paddingLeft:4}}>
                P O S T S
              </Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => this.sortPressed(0)}>
                  <FAIcon name='search' size={15} color={this.state.sortIndex == 0 ? 'gold' : 'gray'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.sortPressed(1)}>
                  <EIcon name='medal' size={15} color={this.state.sortIndex == 1 ? 'gold' : 'gray'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.sortPressed(2)}>
                  <EIcon name='heart' size={15} color={this.state.sortIndex == 2 ? 'gold' : 'gray'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.sortPressed(3)}>
                  <FAIcon name='calendar' size={15} color={this.state.sortIndex == 3 ? 'gold' : 'gray'}/>
                </TouchableOpacity>

              </View>
            </View>
            <View style={styles.bodyContainer}>
              {this.state.post_count == 0 && <Text style={styles.dataCellText}>
                You have no photos
              </Text>}
              {/* Posts Scroll Container with Posts */}
              {this.state.post_count > 0 && !this.state.posts_loading &&  <View style={styles.postContainer}>
                {this.state.posts.map((post) => (
                  <ProfilePost
                    post={post}
                    navigation={this.props.navigation}
                  />
                ))}
                {this.state.posts.map((post) => (
                  <ProfilePost
                    post={post}
                    navigation={this.props.navigation}
                  />
                ))}
                {this.state.posts.map((post) => (
                  <ProfilePost
                    post={post}
                    navigation={this.props.navigation}
                  />
                ))}
              </View>}
              {this.state.posts_loading && <Loading size={20} color={colors.fb}/>}
            </View>
          </ScrollView>
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
  bannerContainer: {
    flex:0.5,
    justifyContent:'center',
    alignItems:'center',
    padding: 5,
    // paddingBottom: 20
  },
  statContainer:{
    // flex: 0.25,
    height: 60,
    flexDirection: 'row',
    // backgroundColor: 'green',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal: 24
  },
  bodyContainer: {
    flex:1,
    // height:'100%',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor: 'green'
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
    paddingTop:5,
    // paddingBottom:10,
  },
  nickname:{
    fontSize: 12,
    // paddingTop:5,
    fontStyle:'italic'
  },
  followerContainer:{
    fontSize: 12,
    paddingTop:4,
  },
  verticalDivider:{
    backgroundColor:'gray',
    alignSelf:'center',
    height: '45%',
    flex:0.005
  },
  horizDivider:{
    backgroundColor:colors.grayLighter,
  },
  dataCell: {
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  dataCellText:{
    color:'gray',
    fontSize:10,
    alignSelf:'center',
  },
  dataCellNumber:{
    // color:'gray',
    fontWeight:"700"
  },
  scrollContainer:{
    flex:1,
    backgroundColor: `${BGC}`,
  },
  postContainer:{
    flex:1,
    justifyContent:'flex-start',
    flexDirection:'row',
    flexWrap:'wrap',
    // backgroundColor:'red'
    // padding:2,
  },
  horizSortContainer:{
    // flex:1,
    height:30,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:4,
  },
  iconContainer:{
    // flex:1,
    width:150,
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal: 10,
    // backgroundColor:'red'
  }
});
