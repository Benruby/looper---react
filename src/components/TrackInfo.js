import React from 'react';

export class TrackInfo extends React.Component {
	render() {
		return (
				<div className="track-info">
					<div className="track track-owner">
						{this.props.owner}
					</div>
					<div className="track track-genre">
						{this.props.genre}
					</div>
					<div className="track track-bpm">
						<span>
							{this.props.bpmToShow}
						</span>
					</div>	
					<div className="track track-bpm">
						Duration: {this.props.duration}
					</div>	
				</div>
			);

	}
}
