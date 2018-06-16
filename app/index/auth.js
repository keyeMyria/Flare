import * as firebase from 'firebase';

import { AsyncStorage } from "react-native";
// import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';

export const onSignIn = (uid) => AsyncStorage.setItem("uid", uid);

export const onSignOut = () => AsyncStorage.removeItem("uid");

export async function getUid (key) {
  return AsyncStorage.getItem(key)
}


export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("uid")
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};




// var utcSeconds = Date.now() returns unix time
// var d = new Date(utcSeconds) converts to standard local time
// var year = d.getYear() + 100 // returns year from 2000, hence the + 100
// var month = d.getMonth() + 1 // month is 0 indexed, hence the + 1
// var day = d.getDate()
//
//
//
//
//
