import React from 'react';
import {StyleSheet, Image, Platform} from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { BGC, tintColor } from './colors';
import Home from '../screens/Home';
import PostContent from '../screens/PostContent';
import Leaderboard from '../screens/Leaderboard';
import Competition from '../screens/Competition';
import CompetitionDetails from '../screens/CompetitionDetails';
import CreateCompetition from '../screens/CreateCompetition';
import Activity from '../screens/Activity';
import Trending from '../screens/Trending';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Logout from '../screens/Logout';


export const CompetitionStack = createStackNavigator({
  Competition: {
    screen: Competition,
  },
  CompetitionDetails: {
    screen: CompetitionDetails,
  },
  PostContent: {
    screen: PostContent,
  },
  // confirmscreen
}, {
  // mode:'modal',
  headerMode:'none',
})

export const OuterCompetitionStack = createStackNavigator({
  Competition: {
    screen: CompetitionStack,
  },
  CreateCompetition: {
    screen: CreateCompetition,
  }
}, {
  mode:'modal',
  headerMode:'none',
})


export const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
  }
}, {
  mode:'modal',
  headerMode:'none',
})

export const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile
  },
  Settings: {
    screen: Settings
  }
}, {
  // mode:'modal',
  headerMode:'none',
})

const tabType = Platform.OS == 'ios' ? createBottomTabNavigator : createMaterialTopTabNavigator
export const TabNav = tabType({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused}) => (
        focused
        ? <Icon name="ios-square" size={30} color={`${tintColor}`}/>
        : <Icon name="ios-square-outline" size={30} />
      )
    }
  },
  Trending: {
    screen: Trending,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused}) => (
        focused
        ? <Icon name="ios-bonfire" size={30} color={`${tintColor}`}/>
        : <Icon name="ios-bonfire-outline" size={30} />
      )
    }
  },
  Competition: {
    screen: OuterCompetitionStack,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused}) => (
        focused
        ? <Icon name="ios-trophy" size={30} color={`${tintColor}`}/>
        : <Icon name="ios-trophy-outline" size={30} />
      )
      // tabBarIcon: ({focused}) => (
      //   focused
      //   ? <Icon name="ios-ribbon" size={30} color={'red'}/>
      //   : <Icon name="ios-ribbon-outline" size={30} />
      // )
    }
  },
  Activity: {
    screen: Activity,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused}) => (
        focused
        ? <Icon name="ios-notifications" size={30} color={`${tintColor}`}/>
        : <Icon name="ios-notifications-outline" size={30} />
      )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused}) => (
        focused
        ? <Icon name="ios-happy" size={30} color={`${tintColor}`}/>
        : <Icon name="ios-happy-outline" size={30} />
      )
    }
  },
}, {
  // mode: 'modal',
  headerMode: 'none',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    showLabel: false,
    activeBackgroundColor:`${BGC}`,
    inactiveBackgroundColor:`${BGC}`

  }
})

export const LoginRegisterStack = createDrawerNavigator({
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
}, {
  headerMode: 'none',
  mode:'modal',
});


export const Root = (signedIn = false) => {

  return createSwitchNavigator({
    SignedIn: {
      screen: TabNav,
    },
    SignedOut: {
      screen: LoginRegisterStack
    }

  }, {
    initialRouteName: signedIn ? "SignedIn" : "SignedOut"
  });
}
