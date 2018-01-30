import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import { signIn } from '../../helpers/auth'
import './Login.css';
import {
    withRouter
} from 'react-router-dom'


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

    return (
        <div>
          <h1>Login</h1>
          <button onClick={this.Login}>
            Sign In with Google 
          </button>
        </div> 
    )
  }
}