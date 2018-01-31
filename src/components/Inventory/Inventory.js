import React, { Component } from 'react'
import { ref, firebaseApp } from '../../config/constants'
import './Inventory.css'
import { Link } from 'react-router-dom'

export default class Inventory extends Component {

	constructor(props) {
    	super(props)

    	this.state = {
	      	currentItem: '',
	      	username: '',
	      	items: [],
	      	boozeStatus: '',
	      	wishes: [],
	      	amount: '',
	      	what: '',
	      	price: ''
	    }
	    this.baseState = this.state;
    	this.handleChange = this.handleChange.bind(this);
	    this.deleteItem = this.deleteItem.bind(this);
	    this.deleteWish = this.deleteWish.bind(this);
	    this.addWish = this.addWish.bind(this);
	    this.addToInventory = this.addToInventory.bind(this);
  	}

  	componentDidMount() {
    	const currentUser = firebaseApp.auth().currentUser;
    	let currentEvent = this.props.match.params.eventid;
    	let inventoryRef = firebaseApp.database().ref('events/' + currentEvent + '/inventory/');
    	let wishlistRef = firebaseApp.database().ref('events/' + currentEvent + '/wishlist/');

		inventoryRef.on('value', (snapshot) => {
		    let inventory = snapshot.val();
		    let InventoryList = [];
		    for (let item in inventory) {
		    	if(inventory[item]){
		    		InventoryList.push({
				        id: 	item,
				        type: 	inventory[item].type,
				        amount: inventory[item].amount,
				        price: 	inventory[item].price,
				        buyer: 	inventory[item].buyer
			    	});

			    	this.setState({
						items: InventoryList
					});
			    }
			    
		    }
		   
		});

		wishlistRef.on('value', (snapshot) => {
		    let wishes = snapshot.val();
		    let wishList = [];
		    for (let wish in wishes) {
		    	console.log( wish + ": " + wishes[wish].wish);
		    	if(wishes[wish]){
		    		wishList.push({
		    			id: wish,
		    			wish: wishes[wish].wish  
			    	});
			    	this.setState({
						wishes: wishList
					});
			    }
		    }
		});

		
		var boozeStatusRef = firebaseApp.database().ref('events/' + currentEvent + '/boozeStatus');
		boozeStatusRef.on('value', (snapshot)=>{
			var boozeStatus = snapshot.val();
			this.setState({boozeStatus: boozeStatus});
		});
	}

	deleteItem(id){
		let currentEvent = this.props.match.params.eventid;
		let InventoryListRef = firebaseApp.database().ref('events/' + currentEvent + '/inventory');
		InventoryListRef.child(id).remove();
	}

	deleteWish(id){
		let currentEvent = this.props.match.params.eventid;
		let wishListRef = firebaseApp.database().ref('events/' + currentEvent + '/wishlist');
		wishListRef.child(id).remove();
	}

	addToInventory(event){
		if(sessionStorage.curUser != "null"){
			event.preventDefault();
			let currentEvent = this.props.match.params.eventid;
			let InventoryListRef = firebaseApp.database().ref('events/' + currentEvent + '/inventory');
			console.log("adding to inventory");
			var newItem = InventoryListRef.push();
			  	newItem.set({
			    	type: 	event.target.what.value,
					amount: event.target.amount.value,
					price: 	event.target.price.value,
					buyer:  sessionStorage.curUser
			  	});
		}
	}

	handleChange(event){
  		const name = event.target.name;
  		const value = event.target.value;
  		this.setState({
  			[name]: value
  		});
  	}

	addWish(){
		let currentEvent = this.props.match.params.eventid;
		let wishListRef = firebaseApp.database().ref('events/' + currentEvent + '/wishlist');

		var newWish = wishListRef.push();
		  	newWish.set({
		    	wish: "myyyyyy new wish"
		  	});
	}

	render() {
		const { boozeStatus } = this.state

		return (
			<div className="back">
				<div className="Inventory">
					<h1> Inventory </h1>
					<h2> Booze Status: { this.state.boozeStatus } </h2>
					<ul className="eventsList">
					      {this.state.items.map((item) => {
					        return (
					          	<li className="listentry">
					          		{item.amount} {item.type} <div id={item.id} onClick={ () => this.deleteItem(item.id)}>X</div>
						        </li>
					        )
					      })}
					</ul>
					<div>
						<h2> Add To Inventory </h2>
						<form className="addToInventory" onSubmit={this.addToInventory} >
						<input name="amount" className="formelement" value={this.state.amount} onChange={this.handleChange} type="number" min="1" max="500" /> Bottle(s)
						<input name="what" className="formelement" value={this.state.what} onChange={this.handleChange} type="text" placeholder="Beer" />
						<input name="price" className="formelement" value={this.state.price} onChange={this.handleChange} type="number" min="0" max="10000" /> Bucks
						<button id="button" type="submit" className="submitbutton" value="Submit">+</button>
						</form>
					</div>
			   	</div>
			   	<div className="Wishlist">
					<h1> Wishlist </h1>
					<ul className="eventsList">
					      {this.state.wishes.map((wish) => {
					        return (
					          	<li className="listentry" >
					          		{wish.wish} <div onClick={ () => this.deleteWish(wish.id)}>X</div>
						        </li>
					        )
					      })}
					    </ul>
			      	<div onClick={this.addWish}>Make A Wish</div>
			   	</div>
			   	<Link to={`/events/${this.props.match.params.eventid}`} >
					    Back
				   	</Link>
		    </div>
		);
	}
}