import React, { Component } from 'react'
import { ref } from '../../config/constants'
import './Events.css';
import Arrow from '../../images/icons/arrowright.png'
import {
  	Link
} from 'react-router-dom'


export default class Events extends Component {
	constructor() {
	    super();
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
  	
	render () {
	    return (
			<section className="display-item pagecontent">
		 		<div className="eventsHosted">
		 			<h1 className="heading listtitle"> Events As Host </h1>
				    <ul className="eventsList">
				      {this.state.items.map((item) => {
				        return (
						<Link className="No-Link" to={`/events/${item.id}`} >
				          	<li className="listentry" key={item.id} id={item.id} >
				          		<div className="rightalignedList">
                                  	<p>{item.date}</p>
                                  	<h3 className="listheading">{item.title}</h3>
                              	</div>
					            <img src={Arrow} className="forwardArrow" alt="arrow icon"></img>
					        </li>
				        </Link>
				        )
				      })}
				    </ul>
		  		</div>
		  		
			</section> 
    	); 
	}
}