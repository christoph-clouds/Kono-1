import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import { signIn } from '../../helpers/auth'
import './Invitation.css';
import { Redirect } from 'react-router-dom'
import background from '../../images/backgroundLogin.png'
import logo from '../../images/Logo.png'


export default class Invitation extends Component {
  constructor(props) {
    super(props)
    this.Login = this.Login.bind(this)
    this.addToEventList = this.addToEventList.bind(this)
  }

  Login(){
    if(!firebaseApp.auth().currentUser){
      signIn()
    }
    else{
      console.log("already logged in ready to add event");
    }
  }

  addToEventList(){
    console.log(firebaseApp.auth().currentUser);
    if(firebaseApp.auth().currentUser){
      let currentUser = sessionStorage.curUser;

      let currentEvent = this.props.match.params.eventid;
      let ref = firebaseApp.database().ref('events/' + currentEvent + '/');
      let host;

      ref.on('value', (snapshot) => {
          host = snapshot.val().host;
          console.log("the host: " + host);
      });

      if(currentUser !=  host){
            console.log("adding new guest to :" + currentEvent);
            console.log("adding new guest id: " + currentUser);

        var eventRef = firebaseApp.database().ref('events/' + currentEvent + '/guests/' + currentUser).set({
            name: firebaseApp.auth().currentUser.displayName,
            profileImg: firebaseApp.auth().currentUser.photoURL,
            drives: "n",
            hasgift: "n",
            hasbed: "n",
            host: "n"
          });
          console.log("adding new guest");
          this.props.history.push('./')
      }
      else{
        console.log("cant be host and guest at the same time");
      }
    }
    else{
      console.log("user need to login first");
    }
   
  }

  render () {
    return (
        <div className="backgroundimage">
            <img src={background} alt="background" className="palmimage"></img>
            <div className="pagecontent">
                <div className="absoluteElements">
                    <h1 className="title noBackground">Aloha</h1>
                    <div className="logoutmessage">
                        <h2 className="subheading noBackground">my dude</h2>
                        <h1 className="heading noBackground">an Event</h1>
                    </div>
                    <button onClick={this.Login} className="submitbutton">
                        Sign In with Google
                    </button>
                    <button onClick={this.addToEventList} className="submitbutton">
                        Add Event to Your Event list
                    </button>
                </div>
            </div>
        </div>
    )
  }
}