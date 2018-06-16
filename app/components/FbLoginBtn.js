import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BGC, tintColor } from '../index/colors';
import {SocialIcon} from 'react-native-elements';
import Loading from './Loading';
import { colors } from '../index/colors';

export default class FbLoginBtn extends Component<Props> {

  componentDidMount(){
    console.log('loading',this.props.loading);
  }

  render() {
    const {loading} = this.props.loading
    return (
      <View style={styles.container}>

        {!this.props.loading && <SocialIcon type='facebook' light raised={false}/>}
        {this.props.loading && <Loading size={20} color={colors.fb}/>}
        <Text style={styles.title}>
          Continue with Facebook
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    // flex:1,
    flexDirection:'row',
    height: 40,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: `white`,
    marginHorizontal: 30,
    marginBottom: 30,
    // paddingHorizontal:16,
  },
  horizContainer: {
    // flex: 1,
    height: 64,
    flexDirection: 'row',
    alignItems: 'stretch',
    // justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    fontWeight:"700",
    color: `#3B5998`
  }

});
