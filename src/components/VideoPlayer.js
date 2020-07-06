import React, { useEffect } from 'react';
import ShakaPlayer from 'shaka-player';

/**
 * Component for video player.
 * 
 * @function
 * @param {object} props 
 */
const VideoPlayer = (props) => {
	const videoPlayerElm = React.createRef();

	useEffect(() => {
		const videoPlayer = videoPlayerElm.current;
		const shaka = new ShakaPlayer.Player(videoPlayer)

		shaka.load('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
	}, [videoPlayerElm])

	return (
		<video width='100%' ref={videoPlayerElm} controls autoPlay className={props.className}/>
	)
};

export default VideoPlayer;