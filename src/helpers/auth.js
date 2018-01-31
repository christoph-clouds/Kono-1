import { provider, firebaseApp } from '../config/constants'

export function signIn() {
  if (!firebaseApp.auth().currentUser) {
    let user;
    console.log("signin in...")

    firebaseApp.auth().signInWithPopup(provider).then(function(result) {

      user = result.user;
      sessionStorage.curUser = user.uid;
      console.log(user.displayName + "logged in");

      return user;

    });
  }
  else{
    console.log("already signed in...");
  }
}

export function signOut() {
  firebaseApp.auth().signOut().then(function(){}).catch(function(error) {
    console.log("signing out...");
    var errorMessage = error.message;
  });
  sessionStorage.curUser = null;
  console.log("logged out");
}