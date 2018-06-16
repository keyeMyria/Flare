import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { BGC, tintColor } from '../index/colors';
import ImagePicker from 'react-native-image-crop-picker';
import Permissions from 'react-native-permissions';

type Props = {};
export default class Picker extends Component<Props> {

  state = {
    photoPermission: 'undetermined'
  }

  componentWillMount(){

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

  openPicker(){
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
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
    return (
      <View style={styles.container}>
        <View style={styles.imageHolder}>

        </View>
        <View style={styles.captionHolder}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${BGC}`,
  },
  imageHolder: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'blue'
  },
  captionHolder: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'green'
  }
});
