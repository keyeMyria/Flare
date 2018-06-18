import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CompetitionBanner from './../../images/CompetitionBanner.jpg';
import {colors} from '../index/colors';

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
            <Image style={styles.image} source={require(`../../images/Memes.png`)}/>
            <Text style={styles.name}>
              {/* {this.props.name.toUpperCase()} */}
              {this.props.type ? this.props.type.toUpperCase() : this.props.type}
            </Text>


        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    // margin:6,
    width: Dimensions.get('window').width/3,
    height: Dimensions.get('window').width/3,
    // backgroundColor:'#95a5a6',
    borderColor:'grey',
    borderWidth:0.5,
    borderRadius:5,

  },
  container1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red'
  },
  name:{
    color:colors.grayDark,
    // backgroundColor:'red',
    // justifyContent:'center',
    // alignSelf:'center',
    padding:4,
    fontSize:12,
    fontWeight:"500",
  },
  image: {
    height:30,
    width:30,
    // tintColor:'red'
  }
})
