import React from 'react';
import '../styles/button.css';

export class Button extends React.Component {
	
	constructor(props){
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(){
		(this.props.name == "Sync" ? this.props.sync() : this.props.playAll());
	}

	render() {
		return (

			<a onClick={this.onClick} className="control-button">{this.props.name}</a>

			);
	}
}