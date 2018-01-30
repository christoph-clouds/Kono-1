import { provider, firebaseApp } from '../config/constants'

export function signIn() {
  if (!firebaseApp.auth().currentUser) {
    let user;
    console.log("signin in...")

    /*if(window.location.pathname == '/invitation.html'){
      eventId = sessionStorage.invitedEvent;

      var eventref = firebase.database().ref('events/' + eventId + '/guests/' + user.uid).set({
        name: user.displayName,
        drives: false,
        haspresent: false
      });
      console.log("adding new guest");
    }
    else{
        window.location = "events.html";
    }*/ 
      console.log("trying...");
      firebaseApp.auth().signInWithPopup(provider).then(function(result) {

      user = result.user;
      sessionStorage.curUser = user.uid;
      console.log(user.displayName + "logged in");

      /*if(window.location.pathname == '/invitation.html'){
        eventId = sessionStorage.invitedEvent;

        var eventref = firebaseApp.database().ref('events/' + eventId + '/guests/' + user.uid).set({
          name: user.displayName,
          drives: false,
          haspresent: false
        });
        console.log("adding new guest");
      }
      else{
          window.location = "events.html";
      }*/
      return user;

      });
    }
    else{
      console.log("already signed in...");
    }
}
