import React, { Component } from 'react'
import { ref, firebaseApp } from '../../config/constants'
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
	      eventsHosted: [],
	      eventsGuest: []
	    }
	}

    componentDidMount = (events) => {
    	const currentUser = sessionStorage.curUser;

		ref.on('value', (snapshot) => {
		    let events = snapshot.val();
		    let newStateHost = [];
		    for (let event in events) {
		    	if(events[event].host === currentUser){
		    		newStateHost.push({
				        id: 	event,
				        title: 	events[event].title,
				        date: 	events[event].date,
				        host: 	events[event].host
			    	});
			    	this.setState({
					   eventsHosted: newStateHost
					});
			    }
			    else{	
		    		console.log("inside else");
		    		let guestListRef = firebaseApp.database().ref('events/' + event + '/guests/');
		    		guestListRef.on('value', (snapshot) => {
	  					
	  					let guests = snapshot.val();
					    //let newStateGuests = [];
						for (let guest in guests) {
							//console.log(guest);
		    				if(guest === currentUser){
		    					console.log("inside if");

						    	this.setState({
									eventsGuest: [...this.state.eventsGuest, {id: event, title: events[event].title, date: events[event].date, host: events[event].host}]								});
		    				}
		    			}
		    		});
					    	
			    }	
			}
		});

		//iterate through events
		/*ref.on('value', (snapshot) => {
		  	snapshot.forEach((childSnapshot) =>{
			    var childKeyEvent = childSnapshot.key;
			    var childDataEventTitle = childSnapshot.val().title;
			    var childDataEventDate = childSnapshot.val().date;

			    let guestListRef = firebaseApp.database().ref('events/' + childKeyEvent + '/guests/');

			    //iterate thorugh guests in event
			    guestListRef.on('value', (snapshot) => {
		  			snapshot.forEach((childSnapshot) => {
		  			let eventsGuest = [];
		  			var childKey = childSnapshot.key;
			    	var childData = childSnapshot.val();

			    	console.log(childKey+ "    event: "+ childKeyEvent + "   "+ childDataEventTitle + "   "+ childDataEventDate);
			    	console.log("user brah: "+ currentUser);
				    	if(childKey == currentUser){
				    		console.log("ich kam rein");
				    		eventsGuest.push({
				    			id: 	childKeyEvent,
				        		title: 	childDataEventTitle,
				        		date: 	childDataEventDate
					    	});
					    	console.log(eventsGuest[0].id);
				    	}
				    	var arrayvar = this.state.eventsGuest.slice()
						arrayvar.push(eventsGuest)
						this.setState({ eventsGuest: arrayvar })
		  			});
		  		});
		  	});
		});*/
	}
  	
	render () {
		/*const list = this.state.eventsGuest.map((item, i) => {
		      return <li key={i}>{item}</li>
		    });
		       console.log(this.state);*/
	    return (
			<section className="display-item pagecontent">
		 		<div className="eventsHosted">
		 			<h1 className="heading listtitle"> Events As Host </h1>
				    <ul className="eventsList">
				      {this.state.eventsHosted.map((item) => {
					        return (
								<Link className="No-Link" to={`/events/${item.id}`} key={item.id}>
						          	<li className="listentry" id={item.id} >
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
		  		<div className="eventsGuest">
		 			<h1 className="heading listtitle"> Events As Guest </h1>
				    <ul className="eventsList">
				    	{this.state.eventsGuest.map((item) => {
					        return (
								<Link className="No-Link" to={`/events/${item.id}`} key={item.id}>
						          	<li className="listentry" id={item.id} >
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