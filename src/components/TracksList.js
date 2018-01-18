/**
 * Trackslist is a stateful component.
 * the component hold the list and generates 
 * the list in the view using the Track component.
 *
 * the component contains the functionality that is List ralted
 * and not single track related.
 */

 import React from 'react';
 import { TracksContainer } from '../containers/TracksContainer'
 import '../styles/tracks-list.css';

 export class TracksList extends React.Component {

 	constructor(props){
 		super(props);
 		this.sortListByDuration = this.sortListByDuration.bind(this);
 		this.resetBpmToAllTracks = this.resetBpmToAllTracks.bind(this);
 		this.state = {
 			tracksList: this.props.tracks,
 			synchedBpm: null,
 			originalList: this.props.tracks
 		}
 	}

	/**
	 * the method resets the bpm to the track list.
	 * @return {[type]} [description]
	 */
	 resetBpmToAllTracks(){
	 	this.setState({synchedBpm: null})
	 }

	/**
	 * the method sorts the list by track duration.
	 * the method updates the list in the state of the component.
	 * @return {[type]} [description]
	 */
	 sortListByDuration(){
	 	const sortedList = this.state.tracksList.sort((a, b) => {
	 		return b.duration - a.duration;
	 	});
	 	this.setState({tracksList: sortedList});
	 }

	 /**
	  * the method sets the state to the required
	  * syched heighest bpm 
	  * @param {[type]} maxBpm [description]
	  */
	 setSynchedBpmToList(maxBpm) {
	 	this.setState({synchedBpm: maxBpm});
	 }

	 /**
	  * method finds the highest bpm from the tracks
	  * list.
	  * @return {[type]} [description]
	  */
	 findMaxBpm() {
	 	const maxBpm = Math.max(...this.state.tracksList.map((track) => {
	 		return track.bpm;
	 	}));
	 	this.setSynchedBpmToList(maxBpm);
	 }

	 componentWillReceiveProps(nextProps: Props) {
	 	//if sync is clicked, sort the list.
	 	(nextProps.sync) ? this.sortListByDuration() : null;
	 }

	 render() {

	 	/**
	 	 * creates the <li> elements for creating the list.
	 	 */
	 	let tracksList = this.state.tracksList.map((track, index) => {
	 		return <li key={index}><TracksContainer 
	 		ref={(track) => { this.singleTrack = track }} 
	 		track={track} 
	 		playAll={this.props.playAll}
	 		stopAll={this.props.stopAll}
	 		sync={this.props.sync}
	 		removeTrack={this.props.removeTrack}
	 		synchedBpm={this.state.synchedBpm}/></li>;
	 	});	

	 	return(
	 		<div className="tracks-list-wrapper">
	 			<ul className="tracks-list padding-0 no-list-style">{tracksList}</ul>	
	 		</div>
	 		);
	 }
	}