import React, { Component } from 'react'
import { ref, firebaseApp } from '../../config/constants'
import './Guests.css'
import { Link } from 'react-router-dom'

export default class Guests extends Component {

	constructor(props) {
    	super(props)

    	this.state = {
	      	currentItem: '',
	      	username: '',
	      	guests: [],
	      	drives: '',
	      	hasbed: '',
	      	hasgift: ''
	    }
	    this.baseState = this.state;
    	this.handleChange = this.handleChange.bind(this);
	    this.changeProps = this.changeProps.bind(this);
	    this.removeGuest = this.removeGuest.bind(this);
  	}

  	componentDidMount() {
    	const currentUser = firebaseApp.auth().currentUser;
    	let currentEvent = this.props.match.params.eventid;
    	let GuestListRef = firebaseApp.database().ref('events/' + currentEvent + '/guests/');

		GuestListRef.on('value', (snapshot) => {
		    let guests = snapshot.val();
		    let GuestList = [];
		    for (let prop in guests) {
		    	if(guests[prop]){
		    		GuestList.push({
		    			id: 		prop, 
				        name: 		guests[prop].name,
				        drives: 	guests[prop].drives,
				        hasbed: 	guests[prop].hasbed,
				        hasgift: 	guests[prop].hasgift,
			    	});
			    	this.setState({
						guests: GuestList
					});
			    }
			    
		    }
		   
		});
	}

	removeGuest(id){
		let currentEvent = this.props.match.params.eventid;
		let GuestListRef = firebaseApp.database().ref('events/' + currentEvent + '/guests/');
		
		console.log("about to delete guest: " + id);
		GuestListRef.child(id).remove();
	}

	changeProps(event){
		/*if(sessionStorage.curUser != "null"){
			event.preventDefault();
			let currentEvent = this.props.match.params.eventid;
			let InventoryListRef = firebaseApp.database().ref('events/' + currentEvent + '/inventory');
			var newItem = InventoryListRef.push();
			  	newItem.set({
			    	type: 	event.target.what.value,
					amount: event.target.amount.value,
					price: 	event.target.price.value,
					buyer:  sessionStorage.curUser
			  	});
		}*/
	}

	handleChange(event){
  		const name = event.target.name;
  		const value = event.target.value;
  		this.setState({
  			[name]: value
  		});
  	}

	render() {

		return (
			<div>
                <h1> Guest List </h1>
				<div className="Guests">
                    <div className="pagecontent">
                        <div>
                            <ul className="guestsList">
                                  {this.state.guests.map((prop) => {
                                    return (
                                        <li className="listentry">
                                            {prop.name}  drives: {prop.drives}<div onClick={ () => this.removeGuest(prop.id)}>X</div>
                                        </li>
                                    )
                                  })}
                            </ul>
                        </div>
                    </div>
                </div>
			   	<div className="back">
			   		<Link to={`/events/${this.props.match.params.eventid}`} >
						Back
					</Link>
		    	</div>
		    </div>
		);
	}
}