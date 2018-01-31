import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import { signIn, signOut } from '../../helpers/auth'
import './Logout.css';

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
        <div>
          <h1>You have been Logged Out</h1>
          <button onClick={this.Login}>
            Sign Back In with Google 
          </button>
        </div> 
    )
  }
}