import React from 'react';
import MovieCard from './MovieCard';
import { makeStyles } from '@material-ui/core/styles';
import { settings } from '../config/settings';
import Skeleton from '@material-ui/lab/Skeleton';

/**
 * Represent group of movies characteristic 
 * by category on one line.
 * 
 * @function
 * @param {string} title title of group
 * @param {array>} movies array of movies to render
 */
const MoviesGroup = ({title = '', movies = []}) => {
	const useStyles = makeStyles({
		list: {
			display: 'flex',
			justifyContent: 'space-between',
			marginBottom: '4rem'
		},
		placeholder: {
			backgroundColor: '#fafafa7a'
		}
	})

	const classes = useStyles();

	/**
	 * display only first X movies, 8 right now
	 */
	const firstX = movies.slice(0, settings.LIST_LIMIT)
	const dataDownloaded = movies.length > 0

	return (
		<div className={classes.wrapper}>
			<h2>{title}</h2>
			<div className={classes.list}>
				{dataDownloaded ? firstX.map(movie => <MovieCard data={movie} key={movie.id}/>)
				: _renderPlaceholders(classes)}
			</div>
		</div>
	)
};

/**
 * Render placeholders.
 * 
 * @function
 * @private
 * @param {object} classes
 */
const _renderPlaceholders = (classes = {}) => {
	/**
	 * Array of placeholders
	 */
	return [...new Array(8)].map((elm, idx) => { 
		return <Skeleton
			className={classes.placeholder}
			key={idx} 
			variant="rect" 
			width={150} 
			height={220} 
			animation="wave"
		/>
	});
}

export default MoviesGroup;