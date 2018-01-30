import React, { Component } from 'react'
import { ref } from '../../config/constants'
import './Events.css';
import {
  	Redirect
} from 'react-router-dom'


export default class Events extends Component {
	constructor() {
	    super();
	    this.goToEvent = this.goToEvent.bind(this);
	    this.state = {
	      currentItem: '',
	      username: '',
	      items: []
	    }
	}

    componentDidMount() {
    	const currentUser = sessionStorage.curUser;

		ref.on('value', (snapshot) => {
		    let events = snapshot.val();
		    let newStateHost = [];
		    //let newStateGuests = [];
		    for (let event in events) {
		    	if(events[event].host === currentUser){
		    		newStateHost.push({
				        id: event,
				        title: 	events[event].title,
				        date: 	events[event].date,
				        host: 	events[event].host
			    	});

			    	this.setState({
					   items: newStateHost
					});
			    }
			    /*else{
			    	let refGuests = firebaseApp.database().ref('events/' + event + '/guests/name'); 
			    	if(refGuests === "Lukas"){
			    		newStateGuests.push({
					        id: 	event,
					        title: 	events[event].title,
					        date: 	events[event].date,
			    		});
			    	}
			    	this.setState({
					   items: newStateGuests
					});
			    }*/
		    }
		   
		});
	}

	goToEvent(eventid){
		console.log(eventid);
		sessionStorage.curEvent = eventid;
	}
  	
	render () {
		if (this.state.redirect) {
		   return <Redirect push to="/event" />;
		}
	    return (
			<section className="display-item">
		 		<div className="eventsHosted">
		 			<h1> Events As Host </h1>
				    <ul className="eventsList">
				      {this.state.items.map((item) => {
				        const handleClick = ()=> {
				        	this.setState({redirect: true});
				        	this.goToEvent(item.id);
				        };
				        return (

				          <li key={item.id} id={item.id} onClick={handleClick}>
				            <h3>{item.title}</h3>
				            <p>{item.date}</p>
				          </li>
				        )
				      })}
				    </ul>
		  		</div>
		  		<div className="eventsGuest">
		 			<h1> Events As Guest </h1>
				    <ul className="eventsList">
				      {this.state.items.map((item) => {
				      	const handleClick = ()=> {
				      		this.setState({redirect: true});
				        	this.goToEvent(item.id);
				        };
				        return (
				          <li key={item.id} id={item.id} onClick={handleClick}>
				            <h3>{item.title}</h3>
				            <p>{item.date}</p>
				          </li>
				        )
				      })}
				    </ul>
		  		</div>
			</section> 
    	); 
	}
}