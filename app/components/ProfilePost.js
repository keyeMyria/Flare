import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import { BGC, tintColor } from '../index/colors';
import HiddenPanel from './HiddenPanel';


export default class ProfilePost extends Component<Props> {

  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  postPressed(post){
    alert(post.post_id)
  }

  render() {
    const { post } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> this.postPressed(post)}>
          <Animated.Image
            onLoad={this.onLoad}
            style={[styles.profileImage, {opacity:this.state.opacity}]}
            resizeMethod='scale'
            resizeMode='cover'
            source={{uri: post.post_url}}
          />
          {post.type == 'video' && <Icon style={styles.icon} name='play' size={20} color='red'/>}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    margin:1,
  },
  profileImage: {
    width: Dimensions.get('window').width/4-2,
    height: Dimensions.get('window').width/4-2,
    borderRadius: 5,
  },
  icon:{
    position: 'absolute',
    margin: 4

  }
});
