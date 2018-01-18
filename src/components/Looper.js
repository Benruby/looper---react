/**
 * Looper is a stateful compenent.
 * Holds and propagates down the Play all, sync stop
 * functionalities. 
 */

 import React from 'react';
 import { Button } from './Button';
 import { ButtonLabels } from '../common/ButtonLabels';
 import { TracksList } from './TracksList';
 import '../styles/looper.css';
 import '../styles/common.css';

 export class Looper extends React.Component {

 	constructor(props) {
 		super(props);
 		this.playAll = this.playAll.bind(this);
 		this.stopAll = this.stopAll.bind(this);
 		this.state = {
 			playAll: false,
 			playButtonName: ButtonLabels.PLAY,
 			sync: false,
 			stopAll: false
 		}
 		this.sync = this.sync.bind(this);
 	}

	/**
	 * sets the ap state so all tracks are playing
	 * simultaneously.
	 * @return {[type]} [description]
	 */
	 playAll(){
	 	this.setState({
	 		playAll: !this.state.playAll,
	 		stopAll: false,
	 		playButtonName: this.state.playButtonName === ButtonLabels.PLAY ?
	 		ButtonLabels.PAUSE : ButtonLabels.PLAY
	 	});
	 }

	/**
	 * Stops all tracks from playing, also resets
	 * the position bar and the presented bpm.
	 * @return {[type]} [description]
	 */
	 stopAll(){
	 	this.setState({
	 		playAll: false,
	 		stopAll: true,
	 		playButtonName: ButtonLabels.PLAY,
	 		sync: false
	 	});
	 	this.list.resetBpmToAllTracks();
	 }

	/**
	 * the method synchronizes the bpm (only visually),
	 * reorders the track list and play all songs.
	 * under sync, all tracks loop.
	 * @return {[type]} [description]
	 */
	 sync(){
	 	this.setState({
	 		playAll: !this.state.playAll,
	 		sync: !this.state.sync,
	 		stopAll: false
	 	});
	 	this.playAll();
	 	this.list.findMaxBpm();
	 }

	 render() {
	 	return(
	 		<div>
				<h2>Looper</h2>
	 			<div className="looper-main element-border">
	 				<div className='all-buttons'>
	 					<Button sync={this.sync}
	 						name={ButtonLabels.SYNC}/>
	 					<Button playAll={this.playAll}
	 						name={this.state.playButtonName}/>
	 					<Button stopAll={this.stopAll}
	 						name={ButtonLabels.STOP}/>
	 				</div>
	 			<div className='tracks-section'>
	 			<TracksList 
	 				playAll={this.state.playAll}
	 				stopAll={this.state.stopAll}
	 				ref={(list) => { this.list = list }}
	 				tracks={this.props.data}
			 		removeTrack={this.props.removeTrack}
	 				sync={this.state.sync}/>
	 				</div>
	 			</div>
	 		</div>
	 		);
	 }
	}