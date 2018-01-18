/**
 * Button -  stateless component.
 * triggers the click for the play/sync/stop actions.
 * actual methods are in the parent component.
 */

 import React from 'react';
 import { ButtonLabels } from '../common/ButtonLabels';
 import '../styles/button.css';

 export class Button extends React.Component {

 	constructor(props){
 		super(props);
 		this.onClick = this.onClick.bind(this);
 	}

 	/**
 	 * check which button was clicked and call
 	 * required method in the parent component.
 	 * @return {[type]} [description]
 	 */
 	onClick(){
 		switch(this.props.name) { 
 			case ButtonLabels.SYNC: { 
 				this.props.sync();
 				break; 
 			} 
 			case ButtonLabels.STOP: { 
 				this.props.stopAll();
 				break; 
 			} 
 			default: { 
 				this.props.playAll()
 				break; 
 			}
 		}
 	}

 	render() {
 		return (
 			<a onClick={this.onClick} className="control-button cursor-pointer">{this.props.name}</a>
 			);
 	}
 }