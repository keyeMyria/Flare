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
        <Header title={competition.name}
          leftIcon='ios-arrow-back'
          navigation={this.props.navigation}
        />
        <View style={styles.body}>
          <TouchableOpacity style={styles.postContent} onPress={()=>this.postContentPressed()}>
            <View>

            </View>
          </TouchableOpacity>

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
  }


});
