import React, { Component } from 'react'
import { signIn } from '../../helpers/auth'
import './Login.css';

export default class Login extends Component {


  render () {
    return (
        <div>
          <h1>Login</h1>
          <button onClick={signIn}>
            Sign In with Google 
          </button>
        </div> 
    )
  }
}