import React from 'react';
import { TracksContainer } from '../containers/TracksContainer'
import '../styles/tracks-list.css';

export class TracksList extends React.Component {

	constructor(props){
		super(props);
		this.playAll = this.playAll.bind(this);
		this.sortListByDuration = this.sortListByDuration.bind(this);
		this.state = {tracksList: this.props.tracks}
	}

	playAll() {
		this.singleTrack.handlePlay();
	}

	sortListByDuration(){
		const sortedList = this.state.tracksList.sort((a, b) => {
			return b.duration - a.duration;
		});
		this.setState({tracksList: sortedList});

	}

	componentWillReceiveProps(nextProps: Props) {
		(nextProps.sync) ? this.sortListByDuration() : null;
	}

	render() {
		
		let tracksList = this.state.tracksList.map((track, index) => {
			return <li key={index}><TracksContainer 
			ref={(track) => { this.singleTrack = track }} 
			track={track} 
			index={index} 
			playAll={this.props.playAll}/></li>;
		});	

		return(

			<div className="tracks-list-wrapper">
			<ul className="tracks-list">{tracksList}</ul>	
			</div>

			);
	}
}