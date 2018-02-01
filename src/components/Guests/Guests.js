import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import './Guests.css'
import { Link } from 'react-router-dom'
import backArrow from '../../images/icons/back.png'

export default class Guests extends Component {

	constructor(props) {
    	super(props)

    	this.state = {
	      	currentItem: '',
	      	username: '',
	      	guests: [],
	      	drives: '',
	      	hasbed: '',
	      	hasgift: '',
	      	invitationLink: '',
	      	hostMessage: "",
			isHost: false,
			editView: false,
			profileHostImg: '',
			profileHostName: ''
	    }
	    this.baseState = this.state;
    	this.handleChange = this.handleChange.bind(this);
    	this.editHostMessage = this.editHostMessage.bind(this);
		this.handleSubmitHostM = this.handleSubmitHostM.bind(this);
	    this.changeProps = this.changeProps.bind(this);
	    this.removeGuest = this.removeGuest.bind(this);
  	}

  	componentDidMount() {
    	const currentUser = firebaseApp.auth().currentUser;
    	let currentEvent = this.props.match.params.eventid;
    	let invitationLink = "localhost:3000/events/"+currentEvent+"/invitation";
    	this.setState({
			invitationLink: invitationLink
		});
    	let guestListRef = firebaseApp.database().ref('events/' + currentEvent + '/guests/');
    	let eventRef = firebaseApp.database().ref('events/' + currentEvent ); 
    	let hostSpecialRef = firebaseApp.database().ref('events/' + currentEvent + '/hostSpecial' ); 

		eventRef.on("value", (snapshot)=>{
			let hostMessage = snapshot.val().guestMessage;
			let host = snapshot.val().host;

			if(host === sessionStorage.curUser){
				this.setState({isHost: true});
			}
			this.setState({
				hostMessage: hostMessage
			});
		});	

		hostSpecialRef.on("value", (snapshot)=>{
			let name = snapshot.val().name;
			let profileImg = snapshot.val().profileImg;
			this.setState({
				profileHostName: name,
				profileHostImg :profileImg
			});
		});	

		guestListRef.on('value', (snapshot) => {
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
				        profileImg: guests[prop].profileImg,
				        host: 		guests[prop].host
			    	});
			    	this.setState({
						guests: GuestList
					});
			    }   
		    }
		});
	}

	removeGuest(id){
		let guests = this.state.guests;
		guests.splice(id, 1);
		this.setState({guests: guests });

		let currentEvent = this.props.match.params.eventid;
		let GuestListRef = firebaseApp.database().ref('events/' + currentEvent + '/guests/');
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

	handleSubmitHostM(event){
		if(sessionStorage.curUser !== "null"){
			event.preventDefault();
			let currentEvent = this.props.match.params.eventid;
			let eventRef = firebaseApp.database().ref('events/' + currentEvent);
		  	eventRef.update({
		    	guestMessage: event.target.hostMessage.value
		  	});
		}

        this.setState({
            editView: false
        });
	}

	handleChange(event){
  		const name = event.target.name;
  		const value = event.target.value;
  		this.setState({
  			[name]: value
  		});
  	}

  	editHostMessage(){
  		this.setState({editView: true});
	}

	render() {

		return (
			<div>
                <h1> Guest List </h1>
				<div className="Guests">
                    <div className="pagecontent">
	                    <div className="eventmenufooter">
							{(this.state.isHost && !this.state.editView) &&
		                    	<div>
			                    	<p className="heading">{this.state.hostMessage}</p>
			                    	<div className="edit" onClick={this.editHostMessage}> edit </div>
			                    	<div className="hostData">
			                    		<img className="profileImg" src={this.state.profileHostImg}/>
			                    		<p> {this.state.profileHostName} </p>
			                    	</div>
		                		</div>
		                	}
		                	{!this.state.isHost &&
			                	<p className="heading">{this.state.hostMessage}</p>
		                	}
		                	{this.state.editView &&
		                		<div>
		                			<form onSubmit={this.handleSubmitHostM}>
			                            <input name="hostMessage" className="formitem" value={this.state.hostMessage}
			                                   onChange={this.handleChange} type="text"
			                                   maxLength="70" required/>
			                            <button id="button" type="submit" className="submitbutton" value="Submit">Save</button>
		                        	</form>
		                		</div>
		                	}
						</div>
	                    <div>
	                        <ul className="guestsList">
	                              {this.state.guests.map((prop) => {
	                                return (
	                                    <li className="listentry" key={prop.id}>
	                                    	<img className="profileImg" src={prop.profileImg}/>
	                                        <h3>{prop.name} </h3> <h2>{prop.host}</h2>
	                                        <div className="guestProperties">
	                                        	<ul>
		                                            <li>drives: {prop.drives}</li>      
		                                            <li>has Bed: {prop.hasbed}</li> 
		                                            <li>has Gift: {prop.hasgift}</li>
	                                        	</ul>
	                                        </div>
	                                        {this.state.isHost &&
	                                        <div onClick={ () => this.removeGuest(prop.id)}>X</div>
	                                    	}
	                                    </li>
	                                )
	                              })}
	                        </ul>
	                    </div>
                    </div>
                </div>
                <div className="invitationLink">
                {this.state.invitationLink}
                </div>
				<Link className="back" to={`/events/${this.props.match.params.eventid}`} >
					<img src={backArrow} alt="back" className="backIcon"></img>
				</Link>
		    </div>
		);
	}
}