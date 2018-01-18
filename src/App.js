/**
 * main component.
 * Renders the Looper section and the inventory section.
 */
import React, { Component } from 'react';
import { Looper } from './components/Looper';
import { Inventory } from './components/Inventory';
import { data } from './data/data';
import logo from './logo.svg';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTracks: [],
			inventory: []
		}
		this.addToSelected = this.addToSelected.bind(this);
		this.removeFromSelected = this.removeFromSelected.bind(this);
	}

	//mounting the data to state, will probably use "DidMount"
	//lifecycle event if I where to fetch the data from DB.
	componentWillMount() {
		this.setState({inventory: data});
		this.setState({selectedTracks: [data.pop()]})
	}

	/**
	 * functionality of adding and removing from list is buggy.
	 * the followig methods need more work. 
	 * @param {[type]} itemId [description]
	 */
	addToSelected(itemId) {
		const selectedItem = this.state.inventory.find((item) => {
			return item.id == itemId;
		});

		this.state.selectedTracks.push(selectedItem);
		this.setState({selectedTracks: this.state.selectedTracks});
		this.removeFromInventory(selectedItem);
	}

	removeFromSelected(e) {
		const itemId = e.currentTarget.dataset.trackId;
		
		const item = this.state.selectedTracks.find((item) => {
			return item.id === +itemId;
		});

		this.state.selectedTracks = this.state.selectedTracks.filter((item) => {
			return item.id !== +itemId;
		});

		this.setState({
			selectedTracks: this.state.selectedTracks
		});

		this.addToInventory(item);
	}

	removeFromInventory(removedItem) {
		const newInventory = this.state.inventory.filter((item) => {
			return item !== removedItem;
		});
		this.setState({inventory: newInventory});
	}

	addToInventory(item){
		this.state.inventory.push(item);
		this.setState({inventory: this.state.inventory});
	}

	render() {
		return (
			<div className="container">
				<Looper 
					data={this.state.selectedTracks}
					removeTrack={this.removeFromSelected}/>
				<Inventory 
					inventory={this.state.inventory}
					addToSelected={this.addToSelected}/>
				</div>
			);
	}
}

export default App;
