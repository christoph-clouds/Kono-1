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
	      	items: []
	    }
  	}

  	componentDidMount() {
    	const currentUser = firebaseApp.auth().currentUser;
    	let currentEvent = this.props.match.params.eventid;
    	let inventoryRef = firebaseApp.database().ref('events/' + currentEvent + '/inventory/');

		inventoryRef.on('value', (snapshot) => {
		    let inventory = snapshot.val();
		    let InventoryList = [];
		    for (let item in inventory) {
		    	console.log( item +"   "+inventory[item].type +"   "+inventory[item].amount +"   "+inventory[item].price+"   "+ inventory[item].buyer);
		    	if(inventory[item]){
		    		InventoryList.push({
				        id: 	item.id,
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
	}


	render () {
		
		return (
			

			<div className="back">
				<ul className="eventsList">
				      {this.state.items.map((item) => {
				        return (
				          	<li className="listentry" id={item.type} >
				          		<div className="rightalignedList">
                                  	<p>{item.amount}</p>
                                  	<h3 className="listheading">{item.type}</h3>
                              	</div>
					        </li>
				        )
				      })}
				    </ul>
		      	<Link to={`/events/${this.props.match.params.eventid}`} >
				    Back
			   	</Link>
		    </div>
		);
	}
}