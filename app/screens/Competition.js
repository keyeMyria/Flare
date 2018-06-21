import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ScrollView
} from 'react-native';

import * as firebase from 'firebase';
import { BGC, tintColor } from '../index/colors';
import resolveAssetSource from 'resolveAssetSource';
import CompetitionBanner from './../../images/CompetitionBanner.jpg';
import CompetitionItem from '../components/CompetitionItem';
import {getCompetitionCategories} from '../index/server';
import {colors} from '../index/colors';
import {Divider} from 'react-native-elements';
import {CompetitionCategories} from '../index/data'

const window = Dimensions.get('window');
type Props = {};
export default class Competition extends Component<Props> {

  state = {
    categories: [],
    popCompList: [
      {name:'Memes', image:'red'},
      {name:'Fortnite', image:'blue'},
      {name:'Your Idiot Friends', image:'green'},
      {name:'Trump', image:'orange'},
    ],
    otherCompList: [
      {name:'Art', image:'red'},
      {name:'Nature/Environment', image:'blue'},
      {name:'Fooood', image:'green'},
      {name:'Sports', image:'orange'},
      {name:'Animals', image:'orange'},
    ],
    totalList: [
      {name:'Memes', image:'red'},
      {name:'Fortnite', image:'blue'},
      {name:'Your Idiot Friends', image:'green'},
      {name:'Trump', image:'orange'},
      {name:'Art', image:'red'},
      {name:'Nature/Environment', image:'blue'},
      {name:'Fooood', image:'green'},
      {name:'Sports', image:'orange'},
      {name:'Animals', image:'orange'},
    ]
  }

  componentWillMount(){
    // getCompetitionCategories()
    // .then(res => {
    //   this.setState({categories:res}, () => console.log('categories',this.state.categories))
    // })
    this.setState({categories:CompetitionCategories})
  }





  _onLayout(event) {
        const containerWidth = event.nativeEvent.layout.width;

        if (this.props.ratio) {
            this.setState({
                bannerWidth: containerWidth,
                bannerHeight: containerWidth * this.props.ratio
            });
        } else {
            Image.getSize(this.state.bannerURL, (width, height) => {
                this.setState({
                    bannerWidth: containerWidth,
                    bannerHeight: containerWidth * height / width
                });
            });
        }
    }

    _renderItem = ({item}) => (
      <CompetitionItem
        name={item.name}
        // image={item.image}
        // ratio={0.5} // To customize aspect ratio of picture

      />
    );


  render() {
    return (
      <View style={styles.container} >
        <Image
          style={{width: window.width,
                    height: window.width * resolveAssetSource(CompetitionBanner).height/resolveAssetSource(CompetitionBanner).width,
          justifyContent:'center',
          alignSelf:'center'
        }}
          resizeMethod='scale'
          resizeMode='contain'
          source={CompetitionBanner}
        />
        <Divider style={styles.divider}/>
        <View style={styles.middleTab}>
          <Text style={{color:colors.grayDarker, fontWeight:"700"}}>
            B R O W S E   B Y   C A T E G O R Y
          </Text>
          <View style={styles.middleTabIcon}>
          </View>
        </View>

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.competitionsContainer}>
            {this.state.categories.map((item) => (
              <CompetitionItem
                competition={item}
                type={item.type}
                // image={item.image}
                navigation={this.props.navigation}
                // ratio={0.5} // To customize aspect ratio of picture

              />
            ))}
          </View>
          {/* <FlatList
            data={this.state.totalList}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={item => item.name}
            // ItemSeparatorComponent={this.renderSeparator}
          /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: `${BGC}`,
  },
  bannerImage:{
    flex: 1,

  },
  scrollContainer:{
    flex:1,
    // backgroundColor:'#022761',
  },
  competitionsContainer:{
    flex:1,
    // backgroundColor:'black',
    flexDirection:'row',
    flexWrap:'wrap',
  },
  middleTab: {
    height:50,
    // backgroundColor:'red',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:10
  },
  middleTabIcon:{
    backgroundColor:colors.grayDark,
    height:2,
    width:60,
    borderRadius:5
  },
  divider:{
    backgroundColor:colors.gray,
  },

});
