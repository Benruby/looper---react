import React from 'react';
import '../styles/track.css';
import FaPlay from 'react-icons/lib/fa/play';
import FaTrash from 'react-icons/lib/fa/trash';
import FaVol from 'react-icons/lib/fa/volume-up';
import FaPause from 'react-icons/lib/fa/pause';
import { Track } from '../components/Track'

export class TracksContainer extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			playing: false,
			duration: null,
			loop: false,
			playAll: false
		};
		this.stopAudio = this.stopAudio.bind(this);
		this.playAudio = this.playAudio.bind(this);
		this.handlePlay = this.handlePlay.bind(this);
	}


	stopAudio(){
		this.track.audio.pause();
		this.setState({ playing: false });
	}

	playAudio(){
		this.track.audio.loop = this.state.loop;
		this.track.audio.play();
		this.setState({ playing: true });
	}

	handlePlay(e) {
		if (!this.track.audio.paused) { 
			this.state.loop = false;
			this.stopAudio();
		} else {
			this.playAudio();
		}
	}

	componentWillReceiveProps(nextProps: Props) {
		this.state.loop = nextProps.playAll;
		(nextProps.playAll) ? this.playAudio() : this.stopAudio();
	}

	componentDidMount() {
		this.track.slider.value = 0;
		this.track.volumeSlider.value = 0.5;
		this.currentTimeInterval = null;

		if(this.props.playAll) {
			this.setState({playAll: true});
		}

		if(this.state.playAll) {
			this.handlePlay;
		}
		
		// Get duration of the song and set it as max slider value
		this.track.audio.onloadedmetadata = function() {
			this.setState({duration: this.track.audio.duration});
		}.bind(this);
		
		// Sync slider position with song current time
		this.track.audio.onplay = () => {
			this.currentTimeInterval = setInterval( () => {
				this.track.slider.value = this.track.audio.currentTime;
			}, 500);
		};
		
		this.track.audio.onpause = () => {
			clearInterval(this.currentTimeInterval);
		};

		this.track.audio.onended = () => {
			clearInterval(this.currentTimeInterval);		
			this.track.audio.currentTime = 0;
			this.track.slider.value = 0;
			if (this.state.loop) {
				this.audio.play();
			} else {
				this.track.audio.pause(); 
				this.setState({ playing: false });
			}
		};
		
		// Seek functionality
		this.track.slider.onchange = (e) => {
			clearInterval(this.currentTimeInterval);
			this.track.audio.currentTime = e.target.value;
		};

		// Volume functionality
		this.track.volumeSlider.onchange = (e) => {
			this.track.audio.volume = e.target.value;
		};

		
	}


	render() {
		const track = this.props.track;
		const playing = this.state.playing;
		const duration = this.state.duration;
		return (
			<div>
				<Track 
				duration={duration} 
				playing={playing} 
				track={track}
				handlePlay={this.handlePlay} 
				ref={(track) => { this.track = track }}/>
			</div>
		);
	}
}