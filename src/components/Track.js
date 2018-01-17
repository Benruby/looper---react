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
	}

	handlePlay(){
		this.props.handlePlay();
	}

	render() {

		let buttonState = (this.props.playing == true) ?
		<FaPause className="play-icon" /> :
		<FaPlay className="play-icon" />;

		return (
			<div className="track-main">
			<audio className="audio" ref={(audio) => { this.audio = audio }}>
			<source src={this.props.track.url}></source>
			</audio>
			<a className="track-play" onClick={this.handlePlay}>
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
			BPM: {this.props.track.bpm}
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