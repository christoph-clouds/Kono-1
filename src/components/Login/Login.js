import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import { signIn } from '../../helpers/auth'
import './Login.css';
import logo from '../../images/Logo.png'
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
    return (
        <div>
            <div>
                <div className="palmimage">
                    <div className="centeredElements">
                        <img src={logo} alt="kono" className="konologo"></img>
                        <img src={login} alt="login" className="loginbutton" onClick={this.Login}></img>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}