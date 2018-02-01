import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import { signIn, signOut } from '../../helpers/auth'
import './Logout.css';
import background from '../../images/backgroundLogin.png'
import logo from '../../images/Logo.png'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.Login = this.Login.bind(this)
  }

  Login(){
    signIn()
    if(firebaseApp.auth().currentUser){
      this.props.history.push('../events')
    }
  }

  render () {
    signOut();
    return (
        <div className="backgroundimage">
            <img src={background} alt="background" className="palmimage"></img>
            <div className="pagecontent">
                <div className="absoluteElements">
                    <h1 className="subheading logoutmessage">You have been Logged Out</h1>
                    <button onClick={this.Login} className="submitbutton startscreenbutton">
                        Sign Back In with Google
                    </button>
                </div>
            </div>
        </div>
    )
  }
}