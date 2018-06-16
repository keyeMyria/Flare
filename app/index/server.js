import { onSignIn } from './auth'; // Adds async storage key

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
