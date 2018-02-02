import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import './Guests.css'
import { Link } from 'react-router-dom'
import backArrow from '../../images/icons/back.png'
import Clipboard from 'react-clipboard.js'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

export default class Guests extends Component {

	constructor(props) {
    	super(props)

    	this.state = {
	      	currentItem: '',
	      	username: '',
	      	guests: [],
	      	drives: false,
	      	hasbed: false,
	      	hasgift: false,
	      	invitationLink: '',
	      	hostMessage: "",
			isHost: false,
			editView: false,
			profileHostImg: '',
			profileHostName: '',
			editViewGuests: false,
			props: [false, true, false]
	    }
	    this.baseState = this.state;
    	this.handleChange = this.handleChange.bind(this);
    	this.editHostMessage = this.editHostMessage.bind(this);
		this.handleSubmitHostM = this.handleSubmitHostM.bind(this);
		this.handleSubmitGuests = this.handleSubmitGuests.bind(this);
	    this.changeProps = this.changeProps.bind(this);
	    this.removeGuest = this.removeGuest.bind(this);
	    this.switchToEditViewGuests = this.switchToEditViewGuests.bind(this);
	    this.exitEditViewGuests = this.exitEditViewGuests.bind(this);
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
					if(prop === sessionStorage.curUser){
						console.log("match guestlist and currentUser");
						this.setState({
							drives: 	guests[prop].drives,
							hasbed: 	guests[prop].hasbed,
				        	hasgift: 	guests[prop].hasgift,
						});
					}
			    }   
		    }
		});
	}

	switchToEditViewGuests(){
		this.setState({
			editViewGuests: true
		})
		console.log("edit Guest View");
	}

	exitEditViewGuests(){
		this.setState({
			editViewGuests: false
		})
		console.log("exit Guest View");
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

	handleSubmitGuests(event) {
		var user = firebaseApp.auth().currentUser;
		console.log(user);
		if (user != null) {
			event.preventDefault();
			let currentEvent = this.props.match.params.eventid;
			var updateGuest = firebaseApp.database().ref('events/' + currentEvent + '/guests/' + sessionStorage.curUser + '/');
			console.log(updateGuest)	
			updateGuest.update({
			    drives: event.target.drives.value,
			    hasbed: event.target.hasbed.value,
			    hasgift: event.target.hasgift.value
  			});	
  			this.exitEditViewGuests();
		}
		else{
			console.log("user null");
		}
  	}

	handleChange(event){
  		const name = event.target.name;
  		const value = event.target.value;
  		this.setState({
  			[name]: value
  		});
  	}


  	handleChangeGuests = (event) => {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
  	}

  	editHostMessage(){
  		this.setState({editView: true});
	}

	render() {

		return (
			<div className="pagecontent">
                <h1 className="title"> Guests</h1>
				<div className="Guests">
                    <div>
	                    <div>
							{(this.state.isHost && !this.state.editView) &&
		                    	<div className="hostPart">
									<div className="horizontallyAligned">
										<img className="profileImg marginright" src={this.state.profileHostImg} alt="profilepic"/>
										<h2 className="heading">{this.state.profileHostName}</h2>
									</div>
									<div className="horizontallyAligned">
										<p className="subheading marginright">"{this.state.hostMessage}"</p>
										<button className="submitbutton smallerpadding" onClick={this.editHostMessage}> edit </button>
									</div>
		                		</div>
		                	}
		                	{!this.state.isHost &&
							<div className="hostPart">
								<div className="horizontallyAligned">
									<img className="profileImg marginright" src={this.state.profileHostImg} alt="profilepic"/>
									<h2 className="heading">{this.state.profileHostName}</h2>
								</div>
								<p className="subheading">"{this.state.hostMessage}"</p>
							</div>
		                	}
		                	{this.state.editView &&
		                		<div>
		                			<form onSubmit={this.handleSubmitHostM}>
			                            <input name="hostMessage" className="formitem" value={this.state.hostMessage}
			                                   onChange={this.handleChange} type="text"
			                                   maxLength="70" required/>
			                            <button id="button" type="submit" className="submitbutton smallerpadding" value="Submit">Save</button>
		                        	</form>
		                		</div>
		                	}
						</div>
						{!this.state.isHost &&
                            <div className="editEntry"
							onClick={() => this.switchToEditViewGuests()}>edit</div>
                        }
                        {this.state.editViewGuests &&
                        	<div className="editViewForGuests">
                        		<h2> here you can change your properties </h2>
                        		<form onSubmit={this.handleSubmitGuests}>
                        			<CheckboxGroup
								        name="props"
								        onChange={this.handleChangeGuests}>
								 
								        <label>
								        	drives
								        	<input
									            name="drives"
									            type="checkbox"
									            ref="drives"
									            value={this.state.drives}
									            checked={this.state.drives}
									            onChange={this.handleChangeGuests} />
										</label>
								        <label>
								        	has Bed
								        	<input
									            name="hasbed"
									            type="checkbox"
									            ref="hasbed"
									            value={this.state.hasbed}
									            checked={this.state.hasbed}
									            onChange={this.handleChangeGuests} />
										</label>
										<label>
								        	has Gift
								        	<input
									            name="hasgift"
									            type="checkbox"
									            ref="hasgift"
									            value={this.state.hasgift}									          
									            checked={this.state.hasgift}
									            onChange={this.handleChangeGuests} />
										</label>
							      	</CheckboxGroup>


                        			<button id="button" type="submit" className="submitbutton smallerpadding" value="Submit" onClick={this.handleSubmitGuests} >Save Changes</button>
                        		</form>
                        	</div>
                        }
	                    <div>
	                        <ul>
	                            {this.state.guests.map((prop) => {
	                                return (
	                                    <li className="guestListEntry" key={prop.id}>
											<div className="guestInfo">
												<img className="profileImg" src={prop.profileImg} alt="profilepic"/>
												<div className="guestProperties">
													<h3 className="heading">{prop.name} </h3>
													<ul className="guestAttributeList">
														<li>drives: {prop.drives}</li>
														<li>has Bed: {prop.hasbed}</li>
														<li>has Gift: {prop.hasgift}</li>
													</ul>
												</div>
											</div>
                                            {this.state.isHost &&
											<div className="deleteEntryX"
												 onClick={() => this.removeGuest(prop.id)}></div>
                                            }
	                                    </li>
	                                )
	                            })}
	                        </ul>
	                    </div>
                    </div>

					<Clipboard className="submitbutton margintop" data-clipboard-text={this.state.invitationLink}>Copy Invitation Link</Clipboard>
                </div>
				<Link className="back" to={`/events/${this.props.match.params.eventid}`} >
					<img src={backArrow} alt="back" className="backIcon"></img>
				</Link>
		    </div>
		);
	}
}