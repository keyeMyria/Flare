import React, { Component } from 'react';
import {
  Alert,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  NativeModules,
  ImageBackground
} from 'react-native';
const { ImagePickerManager } = NativeModules;
import {Divider, SocialIcon} from 'react-native-elements';
import { BGC, tintColor } from '../index/colors';
import { NavigationActions, StackActions } from 'react-navigation';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import Permissions from 'react-native-permissions';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import * as firebase from 'firebase';
import {uploadPost} from '../index/server';
import {getUid} from '../index/auth';
import Loading from '../components/Loading';


const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);




const uploadImage = (uri, uid, timestamp, mime = 'image/jpg') => {
  Blob = RNFetchBlob.polyfill.Blob
  fs = RNFetchBlob.fs
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob

  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    let uploadBlob = null
    const imageRef = firebase.storage().ref('images').child(`${uid}/${timestamp}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {

        console.log('51',data);
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        console.log('55',blob);
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}




type Props = {};
export default class PostContent extends Component<Props> {
  state = {
    competition_id: null,
    uid: null, // uid, display_name,
    loading: false,
    imageLoading: false,
    imagePath: null,
    imageHeight: null,
    imageWidth: null,
    title: null,
    caption: null,
    type: 'image',
    facebookShare: false,
    photoPermission: 'undetermined',
    // photoURL:'https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?cs=srgb&dl=landscape-nature-sky-236047.jpg&fm=jpg',
  }
  // this.openPicker = this.openPicker.bind(this)


  componentWillMount(){
    getUid('uid')
    .then((uid) => {
      this.setState({ uid })
    })
    this.setState({ competition_id: this.props.navigation.state.params.competition.competition_id }, () => console.log('comp', this.state.competition_id));
  }

  // Check the status of a single permission
  componentDidMount() {
    Permissions.check('photo').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({photoPermission: response})

      if (response != 'authorized'){
        this._alertForPhotosPermission()
      }

    })
  }

  goBack(){
    this.props.navigation.dispatch(NavigationActions.back())
  }



  openPicker(){
    this.setState({imageLoading: true})
    const options = {
      title: 'Upload a Photo',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],

      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        this.setState({imageLoading: false})
        console.log('User cancelled image picker');
      } else if (response.error) {
        this.setState({imageLoading: false})
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        this.setState({imageLoading: false})
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          imageLoading: false,
          imagePath: response.uri,
          imageHeight: response.height,
          imageWidth: response.width,
        });
      }
    })
  }

  postImage = async () => {
    await this.resetToHome()
    return
    this.setState({loading:true})
    if (!this.state.imagePath) {
      alert("Select a Picture first!")
      return
    }

    if (!this.state.uid) {
      alert("Trying to load data. Please try again")
      return
    }
    var timestamp = Date.now()
    this.setState({ loading: true })
    var url = await uploadImage(this.state.imagePath, this.state.uid, timestamp)
    var postData = {}
    postData['post_url'] = url
    postData['title'] = this.state.title
    postData['caption'] = this.state.caption
    postData['date_created'] = timestamp
    postData['type'] = this.state.type
    postData['date_updated'] = timestamp
    postData['competition_id'] = this.state.competition_id
    postData['uid'] = this.state.uid
    console.log('postData', postData);
    try {
      await uploadPost(postData)
      this.setState({loading:false});
      this.resetToHome()
    } catch (error) {
      console.log("ERR", error);
      alert(error)
      this.setState({loading:false});
    }
  }

  resetToHome(){
    return this.props
               .navigation
               .dispatch(StackActions.popToTop(
                 {
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Home'})
                    ]
                  }));
  }

  _requestPermission = () => {
    Permissions.request('photo').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response })
    })
  }

  _alertForPhotosPermission() {
    Alert.alert(
      'Can we access your photos?',
      'well so you can access your photos...',
      [
        {
          text: 'No way',
          onPress: () => console.log('Permission denied'),
          style: 'cancel',
        },
        this.state.photoPermission == 'undetermined'
          ? { text: 'OK', onPress: this._requestPermission }
          : { text: 'Open Settings', onPress: Permissions.openSettings },
      ],
    )
  }

  render() {
    const {competition} = this.props.navigation.state.params;
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <Header title="Postin Something Cool? Doubt it..." leftIcon='ios-arrow-back' navigation={this.props.navigation}/>
          <View style={styles.imageHolder}>
            {this.state.imageLoading && <Loading size={20} color='#34495e'/>}
            {!this.state.imageLoading && <TouchableOpacity onPress={this.openPicker.bind(this)}>
              {!this.state.imagePath && <View style={styles.defaultPic}>
                <Icon name='picture' size={35} color='#34495e'/>
              </View>}
              {this.state.imagePath && <Image
                source={{uri: this.state.imagePath}}
                style={styles.image}
                // resizeMode='cover'
                resizeMode='contain'
              />}
            </TouchableOpacity>}
          </View>
          <View style={styles.captionContainer}>
            <View style={styles.captionHolder}>
              <TextInput
                style={styles.title}
                placeholder="T I T L E"
                placeholderTextColor="#34495e"
                clearButtonMode="while-editing"
                returnKeyType="next"
                onSubmitEditing={() => this.title.focus()}
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
              />
              <Divider style={styles.divider}/>
              <TextInput
                onContentSizeChange={() => {}}

                style={styles.caption}
                placeholder="C A P T I O N"
                placeholderTextColor="#34495e"
                returnKeyType="next"
                multiline = {true}
                numberOfLines = {4}
                maxLength={250}
                ref={(input) => this.title = input}
                onChangeText={(caption) => this.setState({caption})}
                value={this.state.caption}
              />
            </View>
            <View style={styles.fbShare}>
              <Text style={[styles.fbText, this.state.facebookShare && {fontWeight:"800"}]}>
                S H A R E   O N   F A C E B O O K
              </Text>
              <SocialIcon
                // button
                light = {!this.state.facebookShare}
                style={styles.fbButton}
                onPress={() => this.setState({facebookShare: !this.state.facebookShare})}
                type='facebook'
              />
            </View>
            <View style={{flex:0.5}}>

            </View>
            <View style={styles.submitContainer}>
              <TouchableOpacity style={styles.cancelBtn} onPress={()=>this.goBack()}>
                <Text style={styles.cancel}>
                  C A N C E L
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={()=>this.postImage()}>
                <Text style={styles.submit}>
                  S H A R E
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.loading &&
            <ImageBackground source={{}}
              style={styles.blurOverlay} blurRadius={10}>
              <Loading size={20} color='red'/>
            </ImageBackground>
          }
        </View>
      </DismissKeyboard>
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
  imageHolder: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor: 'blue'
  },
  defaultPic: {
    // height: 40,
    // width: 40,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor: 'green'
  },
  captionContainer: {
    flex:2,
    // justifyContent:'center',
    // alignItems:'center',
    // backgroundColor: 'green'
  },
  captionHolder:{
    flex:0.4,
    // marginTop: 20,
    marginHorizontal: 20,
    padding: 8,
    // height:300,
    borderColor:'#34495e',
    borderWidth:1,
    borderRadius:5
  },
  image:{
    flex:1,
    height: 300,
    width: 300,
    margin: 8,
    // backgroundColor:'red'
  },
  divider: {
    // flex: 1,
    backgroundColor: '#34495e'
  },
  title: {
    padding: 8,
    color: '#34495e'
  },
  caption: {
    padding: 8,
    marginBottom: 16,
    color: '#34495e'
  },
  fbShare: {
    flexDirection: 'row',
    height: 30,
    // backgroundColor: '#34495e',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  fbText:{
    color: '#34495e',
    paddingLeft: 8
  },
  fbButton: {
    height: 30,
    width: 30,
    borderRadius: 0
  },
  submitContainer: {
    // flex:1,
    // paddingTop:10,
    flexDirection: 'row',
    height: 30,
  },
  cancelBtn: {
    flex:1,
    // backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
  },
  submitBtn: {
    flex:1,
    // backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
  },
  cancel:{
    justifyContent:'center',
    color:'red'
  },
  submit:{
    justifyContent:'center',
    color:'#34495e'
  },
  blurOverlay:{
    position: 'absolute',
    height:'100%',
    width:'100%',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode:'cover',
    backgroundColor: '#2f364099'
  }
});
