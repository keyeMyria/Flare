import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';
import { onSignIn } from '../index/auth';
import {createCompetition} from '../index/server';

export default class CreateCompetitionForm extends Component {

  state={
    loading:false,
    title:'',
    caption:null,
    sponsor:null,
    type:'',
    image_url:null,
    start_time: 0,
    end_time: 0,
    media_type: 'all'
  }

  componentWillMount(){
    console.log(this.props.type);
  }

  createCompetition = async () => {
    var body = {
      title:this.state.title,
      caption:this.state.caption,
      sponsor:this.state.sponsor,
      type:this.props.type,
      image_url:this.state.image_url,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      media_type: this.state.media_type
    }
    this.setState({loading:true})
    console.log('body', body);
    try {
      await createCompetition(body)
      console.log('DONE');
      this.setState({loading:false});
      this.props.navigation.dispatch(NavigationActions.back())
    } catch (error) {
      console.log("ERR", error);
      alert(error)
      this.setState({loading:false});
    }
  }

  switchNavigators(){
    this.props.navigation.navigate("SignedIn")
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          {this.state.loading ?
            <View style={styles.actInd}>
              <ActivityIndicator size='large' color='#f92222'/>
            </View>
            :
            <View style={styles.mainContainer}>
              {/* <View style={styles.horizContainer}> */}
              <TextInput
                style={styles.input}
                placeholder="Title*"
                placeholderTextColor="#7f8c8d"
                returnKeyType="next"
                keyboardType='email-address'
                autoCorrect={false}
                onChangeText={(title) => this.setState({title})}
                onSubmitEditing={() => this.captionInput.focus()}
              />
              <TextInput
                style={styles.input}
                placeholder="Caption"
                placeholderTextColor="#7f8c8d"
                autoCorrect={false}
                returnKeyType="next"
                onChangeText={(caption) => this.setState({caption})}
                ref={(caption) => this.captionInput = caption}
                onSubmitEditing={() => this.sponsorInput.focus()}
              />
              {/* </View> */}
              <TextInput
                style={styles.input}
                placeholder="Sponsor"
                placeholderTextColor="#7f8c8d"
                returnKeyType="next"
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(sponsor) => this.setState({sponsor})}
                ref={(sponsor) => this.sponsorInput = sponsor}
                onSubmitEditing={() => this.typeInput.focus()}
              />
              <TextInput
                style={styles.input}
                placeholder="Type* [image, video, all]"
                placeholderTextColor="#7f8c8d"
                returnKeyType="next"
                onChangeText={(type) => this.setState({type})}
                ref={(type) => this.typeInput = type}
                onSubmitEditing={() => this.image_uriInput.focus()}
              />
              <TextInput
                style={styles.input}
                placeholder="Image URI"
                placeholderTextColor="#7f8c8d"
                returnKeyType="next"
                onChangeText={(image_uri) => this.setState({image_uri})}
                ref={(image_uri) => this.start_timeInput = image_uri}
              />
              <TextInput
                style={styles.input}
                placeholder="Start Time*"
                placeholderTextColor="#7f8c8d"
                returnKeyType="next"
                onChangeText={(start_time) => this.setState({start_time})}
                ref={(start_time) => this.start_timeInput = start_time}
                onSubmitEditing={() => this.end_timeInput.focus()}
              />
              <TextInput
                style={styles.input}
                placeholder="End Time*"
                placeholderTextColor="#7f8c8d"
                returnKeyType="next"
                onChangeText={(end_time) => this.setState({end_time})}
                ref={(end_time) => this.is_activeInput = end_time}
              />
              <TouchableOpacity style={styles.loginContainer}
                onPress={() => this.createCompetition()}>
                <Text style={styles.loginText}>
                  Create Competition
                </Text>
              </TouchableOpacity>

            </View>
          }
        {/* </TouchableWithoutFeedback> */}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:30,
    alignSelf:'stretch',
    justifyContent:'center',

  },
  mainContainer:{
    paddingBottom:150,
    marginBottom:10

  },
  inputContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'stretch'
  },
  nameInput:{
    flex:1,
    height:34,
    backgroundColor:'#34495e',
    marginBottom:20,
    color:'white', //input text color
    fontFamily:'Helvetica Neue',
    fontSize:14,
    fontWeight:"300",
    opacity:1,
    paddingHorizontal:10,
    // borderRadius:10,
    borderColor:'#ef4836',
    borderWidth:1,
    marginBottom:10,

  },
  input:{
    height:34,
    backgroundColor:'#34495e',
    marginBottom:20,
    color:'white', //input text color
    fontFamily:'Helvetica Neue',
    fontSize:14,
    fontWeight:"300",
    opacity:1,
    paddingHorizontal:10,
    // borderRadius:10,
    borderColor:'#ef4836',
    borderWidth:1,
    marginBottom:10,

  },
  loginContainer:{
    backgroundColor:'#ef4836',
    paddingVertical:10,
    paddingHorizontal:10,
    borderColor:'black',
    marginTop:10

  },
  loginText:{
    textAlign:'center',
    color:'white',
    fontWeight:'600',
  },
  fpText:{
    paddingVertical:10,
    paddingHorizontal:10,
    color:'white',
    fontWeight:'100',
    opacity:0.6,
    textAlign:'center'
  },

  fbText:{
    color:'white',
    fontWeight:'700',
  },
  optionsContainer:{
    // flex:1,
    flexDirection:'row',
    justifyContent:'center',
  },
  horizContainer:{
    // flex:1,

    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  actInd:{
    // flex:1,
    paddingBottom:'80%',
    justifyContent:'center',
    alignSelf:'center'
  }




})
