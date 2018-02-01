import React, { Component } from 'react'
import { firebaseApp } from '../../config/constants'
import './Inventory.css'
import { Link } from 'react-router-dom'
import bottle from '../../images/icons/bottle.png'
import backArrow from '../../images/icons/back.png'
import pin from '../../images/icons/pin2.png'

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
		let items = this.state.items;
		items.splice(id, 1);
		this.setState({items: items });

		let currentEvent = this.props.match.params.eventid;
		let InventoryListRef = firebaseApp.database().ref('events/' + currentEvent + '/inventory');
		InventoryListRef.child(id).remove();
	}

	

	deleteWish(id){
		let wishes = this.state.wishes;
		wishes.splice(id, 1);
		this.setState({wishes: wishes });
		
		let currentEvent = this.props.match.params.eventid;
		let wishListRef = firebaseApp.database().ref('events/' + currentEvent + '/wishlist');
		wishListRef.child(id).remove();
	}

	addToInventory(event){
		if(sessionStorage.curUser !== "null"){
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
		if(sessionStorage.curUser !== "null"){
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
                                            	<li className="inventoryentry" key={item.id}>
                                                	{item.amount} {item.type} <div id={item.id} onClick={ () => this.deleteItem(item.id)}>X</div>
                                            	</li>
                                        	)
                                    })}
                                </ul>
                                <button className="openInventoryFormButton" id="addItemButton" onClick={this.changeInventoryView}>+ Add Drink</button>
                            </div>
                        </div>
                        }
                        {this.state.formView &&
                            <div className="itemform">
                                <form id="addToInventoryForm" className="addToInventory" onSubmit={this.addToInventory}>
                                    <div className="closeItemForm formentry">
                                        <h2 className="subheading"> Add To Inventory </h2>
                                        <div className="closeFormX" onClick={this.changeInventoryView}></div>
                                    </div>
                                    <div className="formentry">
                                        <input name="amount" className="formitem" value={this.state.amount} onChange={this.handleChange} type="number" min="1" max="500" required/>
                                        <div className="formlabel">bottle(s)</div>
                                        <div className="selectstyle">
                                            <select name="what" className="dropdown" value={this.state.what} onChange={this.handleChange} type="text" required>
                                                <option>beer</option>
                                                <option>wine</option>
                                                <option>vodka</option>
                                                <option>whiskey</option>
                                                <option>rum</option>
                                                <option>other liquor</option>
                                                <option>juce</option>
                                                <option>softdrink</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="formentry">
                                        <input name="price" className="formitem" value={this.state.price} onChange={this.handleChange} type="number" min="0" max="10000"/>
                                        <div className="formlabel">bucks</div>
                                    </div>
                                    <button className="addToInventoryButton" id="button" type="submit" value="Submit">+ Add Drink</button>
                                </form>
                            </div>
                        }
                    </div>
			   	</div>
			   	<div className="pagecontent">
                    {this.state.listView &&
                    <div className="noteList">
                        <h1 className="subheading"> Notes </h1>
                        <ul className="wishlist">
                            {this.state.wishes.map((wish) => {
                                return (
                                    <li key={wish.id} className="wishlistitem">
                                        <div className="centerpin">
                                            <img src={pin} alt="pin" className="pin" ></img>
                                        </div>
                                        <div className="note">
                                            <div className="noteEntry">{wish.wish}</div>
                                            <div className="deleteEntryX" onClick={() => this.deleteWish(wish.id)}></div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        <button className="submitbutton" onClick={this.changeListView} >Add a Note</button>
                    </div>
                    }
                    {this.state.wishView &&
                    <div className="noteList">
                        <div className="closeWishForm">
                            <h2 className="subheading"> Add Note</h2>
                            <div className="closeFormX" onClick={this.changeListView}></div>
                        </div>
                        <form onSubmit={this.addToWishlist} className="noteList">
                            <input name="wish" className="formitem" value={this.state.wish}
                                   onChange={this.handleChange} type="text" placeholder="Pineapple Please?!"
                                   maxLength="40" required/>
                            <button id="button" type="submit" className="submitbutton" value="Submit">+ Add</button>
                        </form>
                    </div>
                    }
                    <Link className="back" to={`/events/${this.props.match.params.eventid}`} >
                        <img src={backArrow} alt="back" className="backIcon"></img>
                    </Link>
			   	</div>
		    </div>
		);
	}
}