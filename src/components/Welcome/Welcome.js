import React, { Component } from 'react'
import '../Login/Login.css';
import './Welcome.css'
import { Link} from 'react-router-dom'


export default class Login extends Component {
  render () {
    return (
        <div>
            <div>
                <div>
                    <div className="centeredElements">
                      <h1 className="aloha">Aloha</h1>
                      <Link className="submitbutton startscreenbutton alohabutton" to={"../events"} >
                        My Events
                      </Link>
                      <Link className="submitbutton startscreenbutton alohabutton" to={"../create-event"} >
                        Create Event
                      </Link>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}