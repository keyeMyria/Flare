import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  FlatList,
  RefreshControl
} from 'react-native';
import {List} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import { BGC, tintColor } from '../index/colors';
import {impData} from '../index/data';
// import { NavigationActions } from 'react-navigation';
import Header from './../components/Header';
import FeedPost from './../components/FeedPost';
import * as firebase from 'firebase';


type Props = {};
export default class Home extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      refreshing: false
    }
  }

  componentWillMount(){

    this.refreshFeed()
  }



  renderSeparator(){
    return(
      <View
        style={{height:30}}
      />
    )
  }

  refreshFeed() {
    this.setState({refreshing: true})
    this.setState({data: impData, refreshing: false}, ()=> console.log(this.state.data))
  }

  // renderHeader(){
  //   return(
  //     <Header navigation={this.props.navigation}/>
  //   )
  // }

  getImageDims(image){
    console.log('IMAGE SIZE',Image.getSize(image, (width, height)));
    return Image.getSize(image, (width, height))
  }

  _renderItem = ({item}) => (
    // res = this.getImageDims(item.image)
    // var width = res.width
    // var height = res.height
    <FeedPost
      post={item}
      // ratio={0.5} // To customize aspect ratio of picture

    />
  );

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* <Header navigation={this.props.navigation}/> */}
          <Header
            title='F L A R E'
            navigation={this.props.navigation}
            leftIcon='ios-search'
            rightIcon='blank'
          />
          {/* <List> */}
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.refreshFeed()}
              />}
            data={this.state.data}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={item => item.name}
            ItemSeparatorComponent={this.renderSeparator}
          />
          {/* </List> */}
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
    justifyContent:'center',
    // alignItems: 'center',
    backgroundColor: `${BGC}`,
  },
  scrollContainer:{
    flex:1,
    // backgroundColor:'black'
  },
  body: {
    flex:1,
    justifyContent: 'center',
  },

});
