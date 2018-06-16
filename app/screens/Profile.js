import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import {Divider} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';
import { BGC, tintColor } from '../index/colors';
import { onSignOut, getUid } from '../index/auth';
import {fetchUser} from '../index/server';
import * as firebase from 'firebase';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { colors } from '../index/colors';

type Props = {};
export default class Profile extends Component<Props> {

  state = {
    loading: false,
    userData: {
      first_name:'',
      last_name:'',
      displayName: '',
      profile_uri_480: '',
      followerCount: 0,
      postCount:0,
      wins: 0,
    },
  }

  componentWillMount(){
    this.getUserUID()
  }

  getUserUID(){
    this.setState({loading:true})
    getUid('uid')
    .then(uid => {
      fetchUser(uid)
      .then(userData => {
        this.setState({userData:userData[0]}, ()=> console.log('USER DATA',this.state.userData))
      })
      .then(()=>{
        this.setState({loading:false})
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="M Y   P R O F I L E" rightIcon='ios-settings-outline' leftIcon='blank' navigation={this.props.navigation}/>
        <View style={styles.bannerContainer}>
          {this.state.loading ? <Loading size={20} color={colors.fb}/> : <Image style={styles.profileImage}
            resizeMethod='scale'
            resizeMode='contain'
            source={{uri: this.state.userData.profile_uri_480}}
          />}
          <Text style={styles.name}>
            {this.state.userData.displayName}
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
            <Text style={styles.dataCellText}>{this.state.userData.postCount}</Text>
            <Text style={styles.dataCellText}>Posts</Text>
          </View>
          <Divider style={styles.verticalDivider}/>
          <View style={styles.dataCell}>
            {/* <MIcon name='people' size={30} color='gray'/> */}
            <Text style={styles.dataCellText}>{this.state.userData.followerCount}</Text>
            <Text style={styles.dataCellText}>Followers</Text>
          </View>
          <Divider style={styles.verticalDivider}/>
          <View style={styles.dataCell}>
            {/* <EIcon name='medal' size={30} color='gray'/> */}
            <Text style={styles.dataCellText}>{this.state.userData.wins}</Text>
            <Text style={styles.dataCellText}>Wins</Text>
          </View>
          <Divider style={styles.verticalDivider}/>
          <View style={styles.dataCell}>
            {/* <EIcon name='heart' size={30} color='gray'/> */}
            <Text style={styles.dataCellText}>{this.state.likes}</Text>
            <Text style={styles.dataCellText}>Total Likes</Text>
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
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: `${BGC}`,
  },
  bannerContainer: {
    flex:0.5,
    // backgroundColor:'blue',
    justifyContent:'center',
    alignItems:'center',
    padding: 5
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
    color:'gray'
  }

});
