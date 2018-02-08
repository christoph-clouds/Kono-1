import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import { signIn, signOut } from '../../helpers/auth'
import './Logout.css';
import login from '../../images/google login.png'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.Login = this.Login.bind(this)
  }

  Login(props){
    if(!sessionStorage.curUser){
      signIn()
      
      firebaseApp.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.history.push('./welcome')
        }
      });
      
    }
    else{
      this.props.history.push('../welcome')
    }
  }

  render () {
    signOut();
    return (
        <div>
            <div>
                <div className="centeredElements">
                    <h1 className="subheading logoutmessage">You have been Logged Out</h1>
                    <img src={login} alt="login" className="loginbutton" onClick={this.Login}></img>
                </div>
            </div>
        </div>
    )
  }
}