import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import { signIn } from '../../helpers/auth'
import './Invitation.css';
//import { Redirect } from 'react-router-dom'
import login from '../../images/google login.png'



export default class Invitation extends Component {
  constructor(props) {
    super(props)
    this.addToEventList = this.addToEventList.bind(this)
    this.login = this.login.bind(this);

    this.state = {
      isLogggedIn: false,
      title: 'an Event'
    }
  }

  componentDidMount(props) {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLogggedIn: true
        });
      }
      else{
        this.setState({
          isLogggedIn: false
        });
        signIn()
      }
    });
  }

  addToEventList(){
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
      let currentEvent = this.props.match.params.eventid;
      let ref = firebaseApp.database().ref('events/' + currentEvent);

      let host;

      ref.on('value', (snapshot) => {
          host = snapshot.val().host;
          
          if(user.uid !== host && host != null){
            firebaseApp.database().ref('events/' + currentEvent + '/guests/' + user.uid).set({
                name: user.displayName,
                profileImg: user.photoURL,
                drives: false,
                hasgift: false,
                hasbed: false
              });
              this.props.history.push('./')
          }
          else{
            console.log("either host undefinied or, host tries to be guest");
          }
        });
      }
      else{
        console.log("user need to login first");
      } 
    });
  }

  login(){
    signIn();
  }

  render () {
    return (
        <div>
            <div className="centeredElements">
                <h1 className="title noBackground">Aloha</h1>
                <h2 className="subheading noBackground logoutmessage">You have been invited to {this.state.title}</h2>
                {!this.state.isLogggedIn &&
                  <img src={login} alt="login" className="loginbutton" onClick={this.login}></img>
                }
                {this.state.isLogggedIn &&
                  <button onClick={this.addToEventList} className="submitbutton startscreenbutton">
                      Add Event to Your Event list
                  </button>
                }
            </div>
        </div>
    )
  }
}