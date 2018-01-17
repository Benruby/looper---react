import React from 'react';
import { Button } from './Button';
import { TracksList } from './TracksList'
import { data } from '../data/data';
import '../styles/looper.css';

export class Looper extends React.Component {
	
	constructor(props) {
		super(props);
		this.playAll = this.playAll.bind(this);
		this.state = {
			playAll: false,
			playButtonName: "Play",
			sync: false
		}
		this.sync = this.sync.bind(this);
	}

	playAll(){
		this.setState({
			playAll: !this.state.playAll,
			playButtonName: this.state.playButtonName === "Play" ? "PAUSE" : "Play"
		});
	}

	sync(){
		this.setState({sync: true});
	}

	render() {
		return(

			<div className="looper-main">
			<div className='all-buttons'>
			<Button sync={this.sync}
			 name="Sync"/>
			<Button playAll={this.playAll}
			 name={this.state.playButtonName}/>
			</div>
			<div className='tracks-section'>

			<TracksList playAll={this.state.playAll}
			 ref={(list) => { this.list = list }}
			  tracks={data}
			  sync={this.state.sync}/>

			</div>
			</div>

			);
	}
}