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
} from 'react-native';
const { ImagePickerManager } = NativeModules;
import {Divider, SocialIcon} from 'react-native-elements';
import { BGC, tintColor } from '../index/colors';
import { NavigationActions } from 'react-navigation';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import Permissions from 'react-native-permissions';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import * as firebase from 'firebase';
import {uploadPost} from '../index/server';


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
    loading: false,
    imagePath: null,
    imageHeight: null,
    imageWidth: null,
    title: '',
    caption: '',
    facebookShare: false,
    photoPermission: 'undetermined',
    // photoURL:'https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?cs=srgb&dl=landscape-nature-sky-236047.jpg&fm=jpg',
  }
  // this.openPicker = this.openPicker.bind(this)


  componentWillMount(){
    alert(firebase.auth().currentUser.uid)
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
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          imagePath: response.uri,
          imageHeight: response.height,
          imageWidth: response.width,
        });
      }
    })
  }

  // openPicker(){
  //   ImagePicker.openPicker({
  //     // width: window.width,
  //     // height: window.width,
  //     width: window.width,
  //     height: window.width,
  //     cropping: true,
  //     mediaType: 'photo'
  //   }).then(image => {
  //     this.setState({image}, ()=> console.log('IMAGESTATE',this.state.image))
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }

  postImage(){
    if (!this.state.imagePath) {
      alert("Select a Picture first!")
      return
    }
    var uid = null
    uid = firebase.auth().currentUser.uid;
    console.log('uid',uid);
    if (!uid) {
      alert("Log in first")
      return
    }
    firestore = firebase.firestore()
    settings = {timestampsInSnapshots: true};
    firestore.settings(settings)
    var timestamp = Date.now()
    this.setState({ loading: true })
    uploadImage(this.state.imagePath, uid, timestamp)
        .then(url => {
          var postData = {}
          postData['imageURL'] = url
          postData['title'] = this.state.title
          postData['caption'] = this.state.caption
          postData['timestamp'] = timestamp
          postData['likes'] = 0
          postData['comments'] = []
          postData['userID'] = uid
          console.log('postData', postData);
          // ADD COMPETITION UID
          // postData['targetID'] = this.props.targetID

          // const usersRef = firestore.collection('users')
          // const userRef = usersRef.doc(`${uid}`)
          // const postsRef = userRef.collection('posts')
          // const timeRef = postsRef.doc(timestamp)
          firestore.collection('users')
          .doc(`${uid}`)
          .collection('posts')
          .doc(`${timestamp}`)
          .set(postData)
          .then(()=> {
            console.log('success post to db');
            alert('Success bro')
          })
          .catch((error) => {
            console.log('error posting', error);
            alert(error)
          })
          // this.setState({ uploadURL: url })
        })
        .catch(error => {
          console.log('returning error', error);
          alert(error.message_)
        })
  }

  // postImage(){
  //   if (!this.state.image) {
  //     alert("Select a Picture first!")
  //     return
  //   }
  //   var uid = null
  //   uid = firebase.auth().currentUser.uid;
  //   console.log('uid',uid);
  //   if (!uid) {
  //     alert("Log in first")
  //     return
  //   }
  //
  //   // TO DO
  //   if (this.state.facebookShare) {
  //     // Share to facebook using ShareKit from FBSDK
  //   }
  //
  //   firestore = firebase.firestore()
  //   settings = {timestampsInSnapshots: true};
  //   firestore.settings(settings)
  //
  //   this.setState({ loading: true })
  //   const Blob = RNFetchBlob.polyfill.Blob
  //   const fs = RNFetchBlob.fs
  //   window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  //   window.Blob = Blob
  //
  //   const metadata = {
  //     contentType: 'image/jpeg',
  //   };
  //
  //   var imagePath = this.state.image.sourceURL
  //   imagePath = Platform.OS === 'ios' ? imagePath.replace('file://','') : imagePath
  //   console.log('imagePath', imagePath);
  //   let uploadBlob = null
  //   const imageRef = firebase.storage().ref('images').child(`${uid}`)
  //   let mime = 'image/jpg'
  //   fs.readFile(imagePath, 'base64')
  //     .then((data) => {
  //       console.log('line 122, data:', data);
  //       //console.log(data);
  //       return Blob.build(data, { type: `${mime};BASE64` })
  //   })
  //   .then((blob) => {
  //     console.log('line 126, blob:', blob);
  //       uploadBlob = blob
  //       return imageRef.put(blob, { contentType: mime })
  //     })
  //     .then(() => {
  //       alert('Posted')
  //       console.log('132');
  //       uploadBlob.close()
  //       return imageRef.getDownloadURL()
  //     })
  //     .then((url) => {
  //       alert('Success!')
  //       console.log('line 136, url:', url);
  //       let postData = {}
  //       // ADD COMPETITION UID
  //       postData['imageUri'] = url
  //       postData['title'] = this.state.title
  //       postData['caption'] = this.state.caption
  //       postData['timestamp'] = Date.now()
  //       firestore.collection('users')
  //       .doc(`${uid}`)
  //       .set({
  //         ['posts']: {
  //           postData
  //         }},
  //         { merge: true }
  //       )
  //       .catch((error) => {
  //         alert(error)
  //       })
  //
  //       firestore.collection('competitions')
  //       .doc('competitionID1')
  //       .set({
  //         ['uniquePostID1']: {
  //           postData,
  //           uid: uid
  //         }},
  //         { merge: true }
  //       )
  //       .then(() => {
  //         this.setState({loading:false})
  //       })
  //       .catch((error) => {
  //         alert(error)
  //       })
  //
  //     })
  //     .catch((error) => {
  //       this.setState({loading:false})
  //       console.log(error)
  //     })
  // }

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
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <Header title="Postin Something Cool? Doubt it..." leftIcon='ios-arrow-back' navigation={this.props.navigation}/>
          <View style={styles.imageHolder}>
            <TouchableOpacity onPress={this.openPicker.bind(this)}>
              {!this.state.imagePath && <View style={styles.defaultPic}>
                <Icon name='picture' size={35} color='#34495e'/>
              </View>}
              {this.state.imagePath && <Image
                source={{uri: this.state.imagePath}}
                style={styles.image}
                // resizeMode='cover'
                resizeMode='contain'
              />}
            </TouchableOpacity>
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
                returnKeyType="done"
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
    // backgroundColor: 'black',
    // marginTop: 10,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // paddingHorizontal: 20
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
  }
});
