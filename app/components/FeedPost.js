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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BGC, tintColor } from '../index/colors';
import HiddenPanel from './HiddenPanel';

const window = Dimensions.get('window');

export default class FeedPost extends Component<Props> {

  state = {
    opacity: new Animated.Value(0),
    width: 0,
    height: 0,
    visible: false,
    animDone: false,
    bumped: true,
    // image:'https://facebook.github.io/react-native/docs/assets/favicon.png'
  }

  componentWillMount(){
    console.log('POST',this.props.post);
  }

  onSensitiveLoad = () => {
    var that = this;
    Animated.sequence([
      Animated.timing(this.state.opacity, {toValue: 1, duration: 50, useNativeDriver: true}),
      Animated.timing(this.state.opacity, {toValue: 0, duration: 50, useNativeDriver: true}),
      Animated.timing(this.state.opacity, {toValue: 1, duration: 50, useNativeDriver: true})
    ]).start(() => that.setState({animDone: true}));
  }

  updateVote = async (vote) => {
    this.setState({visible: true}, () => this.onSensitiveLoad())

    // Add user_id to set of voted people under post_id
    // alert(vote)
  }

  _onLayout(event) {
        const containerWidth = event.nativeEvent.layout.width;

        if (this.props.ratio) {
            this.setState({
                width: containerWidth,
                height: containerWidth * this.props.ratio
            });
        } else {
            Image.getSize(this.props.post.post_url, (width, height) => {
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
    const {post} = this.props;
    const B = (props) => <Text style={{fontSize: 12, fontWeight: '800', color:'black'}}>{props.children}</Text>
    return (
      <View style={styles.container}>


        <View style={styles.bodyContainer} onLayout={this._onLayout.bind(this)}>
          {/* <View style={styles.content}> */}
          {/* Category, bumped by who OPTIONAL, options */}
          <View style={styles.topHorizContainer}>
            <View style={styles.leftHoriz}>
              <Text style={{fontSize:10, color:'gray'}}>
                CATEGORY {post.competition_id}
              </Text>
              {this.state.bumped && <Text style={{paddingLeft:8, fontSize:10, color:'red'}}>
                BUMPED BY <B>First</B> <B>Last</B>
              </Text>}
            </View>
            <View style={styles.rightHoriz}>
              <TouchableOpacity onPress={()=>this.toggleOptions()}>
                <Icon name='dots-vertical' size={20} color='gray'/>
              </TouchableOpacity>
            </View>
          </View>

          <Image
            style={{ flex:1,
              width: this.state.width,
                      height: this.state.height,
            justifyContent:'center',
            alignSelf:'center'}}
            resizeMethod='scale'
            resizeMode='contain'
            source={{uri:post.post_url}}
          />
          {/* ADD IMAGE OR VIDEO HERE */}

          {/* Post details: title, caption, time posted */}
          <View style={styles.detailsContainer}>
            <Text style={{padding: 8, paddingTop: 12, paddingBottom:4, fontWeight: "800", fontSize: 14}}>
              {post.title}
            </Text>
            <Text style={{paddingHorizontal: 8, paddingBottom:4, fontSize: 12}}>
              {post.caption}
            </Text>
            <Text style={{position:'absolute', alignSelf: 'flex-end',
            padding:8}}>
            <Text style={styles.time}>
              {post.date_created} hr{post.date_created > 1 && s}
            </Text>
          </Text>
          </View>
          {/* Users details */}
          <View style={styles.sensitiveContainer}>
            {!this.state.visible && <HiddenPanel vote={(vote) => this.updateVote(vote)}/>}
            {this.state.visible &&
              <Animated.View style={[styles.horizContainer, this.state.animDone && {borderColor:'lightgreen'}, {opacity:this.state.opacity}]}
                >
                <View style={styles.leftHoriz}>
                  <View style={styles.avatar}>

                  </View>
                  <View style={styles.headerContainer}>
                    <Text style={styles.name}>
                      {post.name}
                    </Text>
                    <Text style={styles.time}>
                      {post.date_created} hrs
                    </Text>
                  </View>
                </View>
                <View style={styles.rightHoriz}>
                  {/* <TouchableOpacity onPress={()=>this.toggleOptions()}>
                    <Icon name='dots-vertical' size={20} color='gray'/>
                  </TouchableOpacity> */}
                </View>
              </Animated.View>
            }

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    margin: 10,
    // paddingBottom:20,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'black'
    // backgroundColor:'blue',
  },
  topHorizContainer:{
    flexDirection: 'row',
    height: 30,
    justifyContent: 'space-between',
    alignItems:'center',
    // paddingLeft: 8
  },
  horizContainer:{
    flexDirection: 'row',
    height:60,
    // flex:1,
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 4,
    // backgroundColor:'green'
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
  sensitiveContainer: {
    height: 40
  },
  detailsContainer:{
    flex:1,
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
