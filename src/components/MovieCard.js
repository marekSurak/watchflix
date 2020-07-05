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
		<a href={`/detail/${data.id}`}>
			<img src={`${settings.api.IMAGE_URI}${data.poster_path}`} alt='movie poster' />
			<span>{data.title || data.name}</span>
		</a>
	)
};

export default MovieCard;