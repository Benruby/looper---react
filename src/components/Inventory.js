import React from 'react';
import { TrackInfo } from './TrackInfo';
import '../styles/inventory.css';

export class Inventory extends React.Component {

	constructor(props) {
		super(props);
		this.handleItemSelection = this.handleItemSelection.bind(this);
	}

	handleItemSelection(e) {
		const itemId = e.currentTarget.dataset.id
		this.props.addToSelected(itemId);
		e.preventDefault();
	}

	render() {

		let inventory = this.props.inventory.map((item, index) => {
			return (
				<li 
				key={index}
				className="cursor-pointer inventory-item"
				onClick={this.handleItemSelection}
				data-id={item.id}>
				<TrackInfo
				owner={item.owner}
				genre={item.genre}
				bpmToShow={item.bpm}
				duration={item.duration}
				/>
				</li>
				);
		});

		return (
			<div>
			<h2>Tracks Inventory:</h2>
			<div className="inventory-nain element-border">
			<ul className="padding-0 no-margin no-list-style">
			{inventory}
			</ul>
			</div>
			</div>
			);
	};

}