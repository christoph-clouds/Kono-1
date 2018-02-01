import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import { signIn } from '../../helpers/auth'
import './Login.css';
import { Redirect } from 'react-router-dom'
import logo from '../../images/Logo.png'
import background from '../../images/backgroundLogin.png'


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.Login = this.Login.bind(this)
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
    return (
        <div>
            <div className="backgroundimage">
                <img src={background} alt="background" className="palmimage"></img>
                <div className="pagecontent">
                    <div className="absoluteElements">
                        <img src={logo} alt="kono" className="logo"></img>
                        <button onClick={this.Login} className="submitbutton startscreenbutton">
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}