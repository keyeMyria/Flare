import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import * as Animatable from 'react-native-animatable'
import { View, Animated, Easing } from 'react-native'


type Props = {};
export default class Loading extends Component<Props> {

  state = {
    spinValue: new Animated.Value(0)
  }

  componentDidMount(){
        this.spin();
    };

  spin = () => {
      this.state.spinValue.setValue(0);
      Animated.timing(
          this.state.spinValue,
          {
              toValue: 1,
              duration: 1000,
              easing: Easing.linear,
          }
      ).start(() => this.spin());
  };


  render() {
    const rotate = this.state.spinValue.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']});
    return (
      <Animated.View style={{transform: [{rotate}], padding: 5}}>
        <Icon name="loading" size={this.props.size} color={this.props.color}/>
      </Animated.View>
    )
  }
}
