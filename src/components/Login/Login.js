import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import { signIn } from '../../helpers/auth'
import './Login.css';
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.Login = this.Login.bind(this)
    this.state = {
        fireRedirectEvents: false,
        fireRedirectLogin: false
      }
  }

  Login(){
    if(!firebaseApp.auth().currentUser){
      signIn()
      this.props.history.push('../events')
    }
    else{
            this.props.history.push('../events')

    }
  }

  render () {
    const { from } = this.props.location.state || '/'
    const { fireRedirectEvents } = this.state
    return (
        <div>
          <h1>Login</h1>
          <button onClick={this.Login}>
            Sign In with Google 
          </button>
          {fireRedirectEvents && (
              <Redirect to={from || '/events'}/>
          )}
        </div> 
    )
  }
}