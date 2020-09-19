import * as firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDGQY_fQmUCTIm_o_cnHu1mCmTSj2k3opM",
  authDomain: "devter-c734f.firebaseapp.com",
  databaseURL: "https://devter-c734f.firebaseio.com",
  projectId: "devter-c734f",
  storageBucket: "devter-c734f.appspot.com",
  messagingSenderId: "740111111556",
  appId: "1:740111111556:web:05ebbde7de6b1c517a79d1",
  measurementId: "G-P27PKX6RL2",
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
