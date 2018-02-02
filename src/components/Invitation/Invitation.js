import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import { signIn } from '../../helpers/auth'
import './Invitation.css';
//import { Redirect } from 'react-router-dom'
import background from '../../images/backgroundLogin.png'
import login from '../../images/google login.png'



export default class Invitation extends Component {
  constructor(props) {
    super(props)
    this.Login = this.Login.bind(this)
    this.addToEventList = this.addToEventList.bind(this)

    this.state = {
      isLogggedIn: false
    }
  }

  Login(){
    if(!firebaseApp.auth().currentUser){
      signIn()
    }
    else{
      console.log("already logged in ready to add event");
    }
  }

  componentDidMount(props) {
    if(sessionStorage.curUser){
      this.setState({
        isLogggedIn: true
      })
    }
    else{
      this.setState({
        isLogggedIn: false
      })
    }
  }

  addToEventList(){
    if(sessionStorage.curUser != null && sessionStorage.curUser != "null"){
      let currentUser = sessionStorage.curUser;

      let currentEvent = this.props.match.params.eventid;
      let ref = firebaseApp.database().ref('events/' + currentEvent);
      let host;

      ref.on('value', (snapshot) => {
          host = snapshot.val().host;
          
          if(currentUser !== host && host != null){
            var eventRef = firebaseApp.database().ref('events/' + currentEvent + '/guests/' + currentUser).set({
                name: firebaseApp.auth().currentUser.displayName,
                profileImg: firebaseApp.auth().currentUser.photoURL,
                drives: "n",
                hasgift: "n",
                hasbed: "n",
                host: "n"
              });
              console.log("adding new guest" + currentUser);
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
                    {!this.state.isLogggedIn &&
                    <img src={login} alt="login" className="login" onClick={this.Login}></img>
                    }
                    {this.state.isLogggedIn &&
                    <button onClick={this.addToEventList} className="submitbutton">
                        Add Event to Your Event list
                    </button>
                    }
                </div>
            </div>
        </div>
    )
  }
}