import React from 'react';
import MovieCard from './MovieCard';

/**
 * Represent group of movies characteristic 
 * by category in one line.
 * 
 * @function
 * @param {string} title title of group
 * @param {array>} movies array of movies to render
 */
const MoviesGroup = ({title = '', movies = []}) => {
	return (
		<div>
			<h2>{title}</h2>
			<div>
				{movies.map(movie => <MovieCard data={movie} key={movie.id}/>)}
			</div>
		</div>
	)
};

export default MoviesGroup;