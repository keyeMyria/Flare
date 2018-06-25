import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BGC, tintColor } from '../index/colors';
import HiddenPanel from './HiddenPanel';

const window = Dimensions.get('window');

export default class FeedPost extends Component<Props> {

  state = {
    width: 0,
    height: 0
    // image:'https://facebook.github.io/react-native/docs/assets/favicon.png'
  }

  componentWillMount(){

  }

  _onLayout(event) {
        const containerWidth = event.nativeEvent.layout.width;

        if (this.props.ratio) {
            this.setState({
                width: containerWidth,
                height: containerWidth * this.props.ratio
            });
        } else {
            Image.getSize(this.props.image, (width, height) => {
                this.setState({
                    width: containerWidth,
                    height: containerWidth * height / width
                });
            });
        }
    }

    toggleOptions(){
      alert('Options')
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.horizContainer}>
          <View style={styles.leftHoriz}>
            <View style={styles.avatar}>

            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.name}>
                {this.props.name}
              </Text>
              <Text style={styles.time}>
                {this.props.time} hrs
              </Text>
            </View>
          </View>
          <View style={styles.rightHoriz}>
            <TouchableOpacity onPress={()=>this.toggleOptions()}>
              <Icon name='dots-vertical' size={20} color='gray'/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bodyContainer} onLayout={this._onLayout.bind(this)}>
          {/* <View style={styles.content}> */}
            <Image
              style={{width: this.state.width,
                        height: this.state.height,
              justifyContent:'center',
              alignSelf:'center'}}
              resizeMethod='scale'
              resizeMode='contain'
              source={{uri:this.props.image}}
            />
            {/* ADD IMAGE OR VIDEO HERE */}
          {/* </View> */}
          <View style={styles.detailsContainer}>
            <HiddenPanel />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor:'blue',
  },
  horizContainer:{
    flexDirection: 'row',
    height:60,
    justifyContent: 'space-between',
    // alignItems:'center'
  },
  leftHoriz: {
    flex:1,
    // backgroundColor: 'blue',
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightHoriz:{
    width:30,
    height:30,
    justifyContent:'center',
    alignSelf:'center',
    // backgroundColor:'black'
  },
  avatarContainer:{
    flex: 1,
    // backgroundColor:'blue',
    alignItems: 'center'
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    // marginVertical: 16,
    // marginLeft: 16,
  },
  bodyContainer:{
    flex: 1,
    // height: 300,
    // backgroundColor: 'green'
  },
  name: {
    // flex:1,
    fontWeight: "700"
  },
  time: {
    fontWeight: "100",
    fontStyle: 'italic'
  },
  // content: {
  //   // flex:4,
  //   height: this.state.height ? this.state.height : 400,
  //   width: this.state.width ? this.state.width : 400,
  //   justifyContent:'center',
  //   alignSelf:'center',
  //   resizeMode: 'contain'
  //   // backgroundColor: 'purple',
  //
  // },
  detailsContainer: {
    height: 40
  },
  headerContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingTop:16,
    paddingBottom: 16,
    justifyContent: 'center',
    // backgroundColor:'green'
  }
});
