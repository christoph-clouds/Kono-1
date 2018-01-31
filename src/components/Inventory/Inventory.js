import React, { Component } from 'react'
import { ref, firebaseApp } from '../../config/constants'
import './Inventory.css'
import { Link } from 'react-router-dom'
import bottle from '../../images/icons/bottle.png'

export default class Inventory extends Component {

	constructor(props) {
    	super(props)

    	this.state = {
	      	currentItem: '',
	      	username: '',
	      	items: [],
	      	itemsUser: [],
	      	boozeStatus: '',
	      	wishes: [],
	      	amount: '',
	      	what: '',
	      	price: '',
	      	wish: '',
            standardView: true,
            formView: false,
            listView: true,
            wishView: false
	    }
	    this.baseState = this.state;
    	this.handleChange = this.handleChange.bind(this);
	    this.deleteItem = this.deleteItem.bind(this);
	    this.deleteWish = this.deleteWish.bind(this);
	    this.addToWishlist = this.addToWishlist.bind(this);
	    this.addToInventory = this.addToInventory.bind(this);
	    this.changeInventoryView = this.changeInventoryView.bind(this);
	    this.changeListView = this.changeListView.bind(this);
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
			var newItem = InventoryListRef.push();
			  	newItem.set({
			    	type: 	event.target.what.value,
					amount: event.target.amount.value,
					price: 	event.target.price.value,
					buyer:  sessionStorage.curUser
			  	});
		}

        this.setState({
            standardView: !(this.state.standardView),
            formView: !(this.state.formView)
        });
	}

	handleChange(event){
  		const name = event.target.name;
  		const value = event.target.value;
  		this.setState({
  			[name]: value
  		});
  	}

	addToWishlist(event){
		if(sessionStorage.curUser != "null"){
			event.preventDefault();
			let currentEvent = this.props.match.params.eventid;
			let wishListRef = firebaseApp.database().ref('events/' + currentEvent + '/wishlist');
			var newWish = wishListRef.push();
			  	newWish.set({
			    	wish: event.target.wish.value
			  	});
		}

        this.setState({
            listView: !(this.state.listView),
            wishView: !(this.state.wishView)
        })
	}

    changeInventoryView(){
        this.setState({
            standardView: !(this.state.standardView),
            formView: !(this.state.formView)
        });
    }

    changeListView(){
        this.setState({
            listView: !(this.state.listView),
            wishView: !(this.state.wishView)
        })
    }

	render() {
		const { boozeStatus } = this.state

		return (
			<div>
                <h1 className="title"> Inventory </h1>
				<div className="Inventory">
                    <div className="pagecontent">
                        {this.state.standardView &&
                        <div className="boozeStatus">
                            <img src={bottle} alt="bottle" className="milkbottle"></img>
                            <div className="boozelist">
                                <h2 className="subheading"> Booze Status: {this.state.boozeStatus} </h2>
                                <ul className="eventsList">
                                    {this.state.items.map((item) => {
                                        return (
                                            <li className="inventoryentry">
                                                {item.amount} {item.type}
                                                <div id={item.id} onClick={() => this.deleteItem(item.id)}>X</div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <button id="addItemButton" className="submitbutton" onClick={this.changeInventoryView}>+ Add Drink</button>
                            </div>
                        </div>
                        }
                        {this.state.formView &&
                        <div className="itemform">
                            <form id="addToInventoryForm" className="addToInventory" onSubmit={this.addToInventory}>
                                <h2 className="subheading"> Add To Inventory </h2>
                                <div className="formentry">
                                    <input name="amount" className="formitem" value={this.state.amount} onChange={this.handleChange} type="number" min="1" max="500" required/> bottle(s)
                                </div>
                                <div className="formentry">
                                    <input name="what" className="formitem" value={this.state.what} onChange={this.handleChange} type="text" maxLength="15" placeholder="type of drink" required/> drink
                                </div>
                                <div className="formentry">
                                    <input name="price" className="formitem" value={this.state.price} onChange={this.handleChange} type="number" min="0" max="10000"/> bucks
                                </div>
                                <div>
                                    <button id="button" type="submit" className="submitbutton" value="Submit">+ Add Drink</button>
                                </div>
                            </form>
                        </div>
                        }
                    </div>
			   	</div>
			   	<div className="pagecontent">
                    {this.state.listView &&
                    <div>
                        <h1 className="subheading"> Wishlist </h1>
                        <ul className="wishlist">
                            {this.state.wishes.map((wish) => {
                                return (
                                    <li className="listentry">
                                        {wish.wish}
                                        <div onClick={() => this.deleteWish(wish.id)}>X</div>
                                    </li>
                                )
                            })}
                        </ul>
                        <button className="submitbutton" onClick={this.changeListView} >Make a Wish</button>
                    </div>
                    }
                    {this.state.wishView &&
                    <div className="addToWishlist">
                        <h2 className="subheading"> Add To Wishlist </h2>
                        <form onSubmit={this.addToWishlist}>
                            <input name="wish" className="formitem" value={this.state.wish}
                                   onChange={this.handleChange} type="text" placeholder="Pineapple Please?!"
                                   maxLength="20" required/>
                            <button id="button" type="submit" className="submitbutton" value="Submit">+ Add</button>
                        </form>
                    </div>
                    }
                    <div className="back">
                        <Link to={`/events/${this.props.match.params.eventid}`} >
                            Back
                        </Link>
                    </div>
			   	</div>
		    </div>
		);
	}
}