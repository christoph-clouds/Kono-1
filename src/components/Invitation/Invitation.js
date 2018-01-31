import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import { signIn } from '../../helpers/auth'
import './Invitation.css';
import { Redirect } from 'react-router-dom'
import background from '../../images/backgroundLogin.jpg'
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
    let currentUser = sessionStorage.curUser;
    if(firebaseApp.auth().currentUser){
      let currentEvent = this.props.match.params.eventid;
              console.log("adding new guest to :" + currentEvent);
              console.log("adding new guest id :" + currentUser);

      var eventRef = firebaseApp.database().ref('events/' + currentEvent + '/guests/' + currentUser).set({
          name: firebaseApp.auth().currentUser.displayName,
          profileImg: firebaseApp.auth().currentUser.photoURL,
          drives: "n",
          hasgift: "n",
          hasbed: "n"
        });
        console.log("adding new guest");
        this.props.history.push('./')
    }
    else{
      console.log("no user logged in")
    }
  }

  render () {
    return (
        <div className="backgroundimage">
            <img src={background} alt="background picture" className="palmimage"></img>
            
            <h1>Welcome To Kono</h1>

            <h2>You have been invited to</h2><h1>an Event</h1>
              <div>
                    <button onClick={this.addToEventList} className="submitbutton">
                      Add Event to Your Event list
                    </button>
              </div>

            <div className="pagecontent">
                <div className="absoluteElements">
                    <img src={logo} alt="kono logo" className="logo"></img>
                    <button onClick={this.Login} className="submitbutton">
                        Sign In with Google
                    </button>
                </div>
            </div>
        </div>
    )
  }
}