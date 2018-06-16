import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CompetitionBanner from './../../images/CompetitionBanner.jpg';

export default class CompetitionItem extends Component {

  state = {

  }

  competitionPressed = (competition) => {
    console.log('competition', competition);
    this.props.navigation.navigate('CompetitionDetails', { competition });
  };

  render() {

    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={() => this.competitionPressed(this.props.competition)}
        >
        <View style={styles.container1}>
          <ImageBackground
            style={{
              // Center background image, fill
              flex:1,
              backgroundColor:this.props.image,
              justifyContent:'center',
              alignItems:'center',
            }}
            resizeMethod='scale'
            resizeMode='cover'
            // ### TO DO ###
            // source={this.props.image}
            source={CompetitionBanner}
            blurRadius={5}
            >
            <Text style={styles.name}>
              {this.props.name.toUpperCase()}
            </Text>
          </ImageBackground>


        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    margin:6,
    width: Dimensions.get('window').width/2 - 14,
    height: Dimensions.get('window').width/4 - 14,
    // backgroundColor:'#95a5a6',
    // borderColor:'#1bbc9b',
    borderWidth:3,
    // borderRadius:40,

  },
  container1:{
    flex:1,
    justifyContent:'space-between',
    alignItems:'stretch',

    // backgroundColor:'red'
  },
  name:{
    color:'#cccccc',
    // backgroundColor:'red',
    justifyContent:'center',
    alignSelf:'center',
    // padding:4,
    fontSize:15,
    fontWeight:"500",
  },
  nameView:{
    flex:1
  },
  price:{
    color:'#cccccc',
    padding:8,
    fontWeight:"200",
  },
  priceView:{
    alignItems:'flex-end',
    // backgroundColor:'green'

  },
})
