import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import { BGC, tintColor } from '../index/colors';
import Header from '../components/Header';
import { isSignedIn } from '../index/auth';
import {colors} from '../index/colors';
import {Divider} from 'react-native-elements';
import {getActiveCompetitions} from '../index/server';
import ActiveCompetitionCell from '../components/ActiveCompetitionCell';

type Props = {};
export default class CompetitionDetails extends Component<Props> {

  state = {
    competitions: null
  }


  componentWillMount(){
    comp = this.props.navigation.state.params.competition
    getActiveCompetitions(comp.type)
    .then(competitions => {
      this.setState({competitions}, ()=> console.log('state.competitions',this.state.competitions))
    })
  }


  _renderItem = ({item}) => (
    <ActiveCompetitionCell
      competition={item}
      navigation={this.props.navigation}
    />
  );
  renderSeparator(){
    return(
      <View
        style={{height:30}}
      />
    )
  }

  render() {
    const {competition} = this.props.navigation.state.params;

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header title={competition.type}
            leftIcon='ios-arrow-back'
            rightIcon='ios-add'
            navigation={this.props.navigation}
            caps={true}
            type={competition.type}
          />
          <View style={styles.body}>
            {/* <TouchableOpacity style={styles.postContent} onPress={()=>this.postContentPressed()}>
              <View>

              </View>
            </TouchableOpacity> */}
            <FlatList
              data={this.state.competitions}
              renderItem={this._renderItem}
              extraData={this.state}
              keyExtractor={item => item.title}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent= {
                <Text>
                  Active Competitions
                </Text>
              }
            />
            <Divider style={styles.divider}/>
            <View style={styles.middleTab}>
              <Text style={{color:colors.grayDarker, fontWeight:"700"}}>
                M O S T   R E C E N T   W I N N E R S
              </Text>
              <View style={styles.middleTabIcon}>
              </View>
            </View>
            <View style={styles.detailsContainer}>

            </View>
          </View>
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
