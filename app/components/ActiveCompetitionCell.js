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

export default class ActiveCompetitionCell extends Component {

  state = {

  }

  competitionPressed = (competition) => {
    console.log('passing', competition);
    this.props.navigation.navigate('PostContent', {competition})
  };

  render() {
    const {competition} = this.props;
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={() => this.competitionPressed(competition)}
        >
        <View style={styles.container1}>
          <Text style={styles.name}>
            {competition.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
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

})
