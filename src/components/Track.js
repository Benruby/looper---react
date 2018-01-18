/**
 * Track is a stateless component.
 * It handles the rendering of the track in the list.
 * The components also handles the click interactions of the track
 * and initiating the methods in the TrackContainer.
 */

import React from 'react';
import '../styles/track.css';
import FaPlay from 'react-icons/lib/fa/play';
import FaTrash from 'react-icons/lib/fa/trash';
import FaVol from 'react-icons/lib/fa/volume-up';
import FaPause from 'react-icons/lib/fa/pause';


export class Track extends React.Component {
	
	constructor(props){
		super(props);
		this.handlePlay = this.handlePlay.bind(this);
		this.getOriginalBpm = this.getOriginalBpm.bind(this);
	}

	/**
	 * handle the Play/Pause single track button.
	 * @return {[type]} [description]
	 */
	handlePlay(){
		this.props.handlePlay();
	}

	/**
	 * handle the click on the original bpm in order
	 * to set the track to it's original bpm. 
	 * only viaul effect.
	 * @return {[type]} [description]
	 */
	getOriginalBpm() {
		this.props.getOriginalBpm();
	}

	render() {

		/**
		 * select the rendering of Play or Pause
		 * icon in the track play button. determines by the 
		 * state of the TrackContainer (playing or not).
		 * @type {[type]}
		 */
		let buttonState = (this.props.playing) ?
			<FaPause className="play-icon padding-0" /> :
				<FaPlay className="play-icon padding-0" />;

		/**
		 * select what bpm to show. The synched one or the original.
		 * determined by the state of the TrackContainer.
		 * @type {[type]}
		 */
		let bpmToShow = (this.props.synchedBpm !== null) ?
			<span>	
				BPM:<strike className="original-bpm cursor-pointer">
						<span onClick={this.getOriginalBpm}>
							{this.props.track.bpm}
						</span>
					</strike>
						/ {this.props.synchedBpm}
			</span> :
			<span> BPM: {this.props.track.bpm}
			</span> ;

		return (
			<div className="track-main">
				<audio className="audio" ref={(audio) => { this.audio = audio }}>
					<source src={this.props.track.url}></source>
				</audio>
				<a className="track-play cursor-pointer" onClick={this.handlePlay}>
					{buttonState}
				</a>
				<div className="track-info">
					<div className="track track-owner">
						{this.props.track.owner}
					</div>
					<div className="track track-genre">
						{this.props.track.genre}
					</div>
					<div className="track track-bpm">
						<span>
							{bpmToShow}
						</span>
					</div>	
					<div className="track track-bpm">
						Duration: {this.props.track.duration}
					</div>	
				</div>
				<div className="track-actions">
					<div className="row-actions">
						<input  ref={(volumeSlider) => { this.volumeSlider = volumeSlider }} className="vol-bar" type="range" min="0" max="1" step="0.1"></input>
							<FaTrash className="trash-icon" />
					</div>
					<div className="row-actions">
						<FaVol className="vol-icon" />
							<input ref={(slider) => { this.slider = slider }}  className="track-bar" type="range" step="any" min="0" max={this.props.duration} />
					</div>
				</div>
			</div>
			);
	}
}