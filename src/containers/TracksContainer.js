/**
 * Track container is a stateful component.
 * it hold the logic for the Track component.
 */
import React from 'react';
import { Track } from '../components/Track'

export class TracksContainer extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			playing: false,
			duration: null,
			loop: false,
			playAll: false,
			synchedBpm: null
		};
		this.stopAudio = this.stopAudio.bind(this);
		this.pauseAudio = this.pauseAudio.bind(this);
		this.playAudio = this.playAudio.bind(this);
		this.handlePlay = this.handlePlay.bind(this);
		this.getOriginalBpm = this.getOriginalBpm.bind(this);
	}

	/**
	 * the method pauses a single track.
	 * @return {[type]} [description]
	 */
	pauseAudio(){
		this.track.audio.pause();
		this.setState({ playing: false });
	}

	/**
	 * the method stops a single track, resets it's bar
	 * and position.
	 * @return {[type]} [description]
	 */
	stopAudio(){
		this.track.audio.pause();
		this.track.slider.value = 0;
		this.track.audio.currentTime = 0;
		this.setState({
			playing: false,
			loop: false,
			synchedBpm: null
		});
	}

	/**
	 * the method plays a single track,
	 * also sets it to loop if state is in loop mode.
	 * @return {[type]} [description]
	 */
	playAudio(){
		this.track.audio.loop = this.state.loop;
		this.track.audio.play();
		this.setState({ playing: true });
	}

	/**
	 * handles the click on the track's play/pause
	 * button. The method prevents a track from looping
	 * if played alone after "play all".
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	handlePlay(e) {
		if (!this.track.audio.paused) { 
			this.state.loop = false;
			this.pauseAudio();
		} else {
			this.playAudio();
		}
	}
	//the method removes the synched bpm from view
	//and presents the original bpm.
	getOriginalBpm() {
		this.setState({synchedBpm: null});
	}

	/**
	 * lifecycle event that handles the scenario
	 * of track state change while playing. For example:
	 * if track is already playing and "sync" is clicked, the 
	 * track will continue playing and sync altogether.
 	 * @param  {[type]} nextProps: Props         [description]
	 * @return {[type]}            [description]
	 */
	componentWillReceiveProps(nextProps: Props) {
		this.state.loop = nextProps.playAll;
		(nextProps.playAll) ? this.playAudio() : this.pauseAudio();
		(nextProps.stopAll) ? this.stopAudio() : null;
		(nextProps.synchedBpm) ? this.setState({synchedBpm: nextProps.synchedBpm}) : null;
	}

	componentDidMount() {
		this.track.slider.value = 0;
		this.track.volumeSlider.value = 0.5;
		this.currentTimeInterval = null;

		if(this.props.playAll) {
			this.setState({
				playAll: true});
		}

		if(this.props.stopAll) {
			this.setState({
				synchedBpm: null});
		}

		if(this.state.playAll) {
			this.handlePlay;
		}
		
		//set the duration of the track in the state.
		//the idea is to set the track bar according to it.
		this.track.audio.onloadedmetadata = function() {
			this.setState({duration: this.track.audio.duration});
		}.bind(this);
		
		//Set the track bar location equal to track position in time.
		this.track.audio.onplay = () => {
			this.currentTimeInterval = setInterval( () => {
				this.track.slider.value = this.track.audio.currentTime;
			}, 500);
		};
		
		//when pausing, stop updating the trackbat position.
		this.track.audio.onpause = () => {
			clearInterval(this.currentTimeInterval);
		};

		//when track ends - reset track ber and track position in time.
		//Check if looping, if so, rerun the track.
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
		
		// Change the track position in time according to slider position
		// if changed.
		this.track.slider.onchange = (e) => {
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
		const synchedBpm = this.state.synchedBpm;
		return (
			<div>
				<Track 
				duration={duration} 
				playing={playing} 
				track={track}
				synchedBpm={synchedBpm}
				handlePlay={this.handlePlay}
				getOriginalBpm={this.getOriginalBpm} 
				stopAudio={this.stopAudio}
				removeTrack={this.props.removeTrack}
				ref={(track) => { this.track = track }}/>
			</div>
			);
	}
}