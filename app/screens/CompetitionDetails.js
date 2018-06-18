import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { BGC, tintColor } from '../index/colors';
import Header from '../components/Header';
import { isSignedIn } from '../index/auth';
import * as firebase from 'firebase';
import {colors} from '../index/colors';
import {Divider} from 'react-native-elements';

type Props = {};
export default class CompetitionDetails extends Component<Props> {

  componentDidMount(){
    // this.checkedSignedIn()
    // alert(firebase.auth().currentUser.uid)
  }

  checkedSignedIn(){
    var res = isSignedIn()
    console.log('res', res);
    this.setState({signedIn: res, checkedSignedIn: true})
  }

  postContentPressed(){
    this.props.navigation.navigate('PostContent')
  }

  render() {
    const {competition} = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Header title={competition.type}
          leftIcon='ios-arrow-back'
          rightIcon='blank'
          navigation={this.props.navigation}
          caps={true}
        />
        <View style={styles.body}>
          <TouchableOpacity style={styles.postContent} onPress={()=>this.postContentPressed()}>
            <View>

            </View>
          </TouchableOpacity>
          <Divider style={styles.divider}/>
          <View style={styles.middleTab}>
            <Text style={{color:colors.grayDarker, fontWeight:"700"}}>
              H O T   F L A R I N G   C O N T E N T
            </Text>
            <View style={styles.middleTabIcon}>
            </View>
          </View>
          <View style={styles.detailsContainer}>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: `${BGC}`,
  },
  body: {
    flex: 1,
    // backgroundColor: 'black'
  },
  postContent: {
    flex:1,
    backgroundColor: 'blue'
  },
  detailsContainer: {
    flex:1,
    backgroundColor: 'black'
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
