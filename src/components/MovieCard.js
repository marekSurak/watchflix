import React from 'react';
import { settings } from '../config/settings';

/**
 * Represent car of movie.
 * 
 * @function
 * @param {object} data data of movie
 */
const MovieCard = ({data = {}}) => {
	//TODO: chceck if movie has a image
	return (
		<>
			<img src={`${settings.api.IMAGE_URI}${data.poster_path}`} alt='movie poster' />
			<span>{data.title || data.name}</span>
		</>
	)
};

export default MovieCard;