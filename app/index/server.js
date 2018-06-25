import { onSignIn, getUid } from './auth'; // Adds async storage key
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';

export async function fetchStatusHandler(response) {
  if (response.status === 200) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
}


// Get user from users table
export async function fetchUser (uid) {
  return fetch("http://localhost:3000/user/"+uid, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    console.log('fetch user successful');
    // Data is len of 0 is null, 1 if existing
    return responseData
  })
  .catch((err) => {
    console.log('Error fetching user');
    throw(err);
  })
}

// Get users posts
export async function fetchUserPosts (uid) {
  return fetch("http://localhost:3000/fetch_user_posts/"+uid, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    console.log('fetch user posts successful');
    // Data is len of 0 is null, 1 if existing
    return responseData
  })
  .catch((err) => {
    console.log('Error fetching users posts');
    throw(err);
  })
}

export async function createUser (body) {
  return fetch("http://localhost:3000/user_create", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(() => {
    console.log('Create user success');
    onSignIn(body.uid).then(() => {
      return
    })
  })
  .catch((error) => {
    console.log('Error creating user');
    throw(error)
  })
}


export async function loginUser (body) {
  return fetch("http://localhost:3000/user_login", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(() => {
    console.log('Login user successful');
    onSignIn(body.uid).then(() => {
      return
    })
  })
  .catch((error) => {
    throw(error)
  })
}


// Get competition categories
export async function getCompetitionCategories () {
  return fetch("http://localhost:3000/competition_categories/", {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    console.log('fetch categories successful');
    // Data is len of 0 is null, 1 if existing
    return responseData
  })
  .catch((err) => {
    console.log("Error getting categories");
    throw(err);
  })
}

// Create competition
export async function createCompetition (body) {
  return fetch("http://localhost:3000/create_competition", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(() => {
    console.log('Upload post successful');
    return
  })
  .catch((error) => {
    throw(error)
  })
}


// Fetch active competitions
export async function getActiveCompetitions (category) {
  return fetch(`http://localhost:3000/fetch_active_competitions/${category}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    console.log('fetch active competitions successful');
    // Data is len of 0 is null, 1 if existing
    return responseData
  })
  .catch((error) => {
    throw(error)
  })
}

// Upload post
export async function uploadPost (body) {
  return fetch("http://localhost:3000/upload_post", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(() => {
    console.log('Upload post successful');
    return
  })
  .catch((error) => {
    throw(error)
  })
}
