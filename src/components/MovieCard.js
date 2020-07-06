import React from 'react';
import { settings } from '../config/settings';
import { makeStyles } from '@material-ui/core/styles';
import defaultPhoto from '../img/placeholder-image.png'

/**
 * Represent car of movie.
 * 
 * @function
 * @param {object} data data of movie
 */
const MovieCard = ({data = {}}) => {
	const useStyles = makeStyles(_getStyles())
	const classes = useStyles();

	const imageUrl = data.poster_path ? `${settings.api.IMAGE_URI}${data.poster_path}` : defaultPhoto

	return (
		<div className={classes.wrapper}>
			<a className={classes.card} href={`/detail/${data.id}`}>
				<img className={classes.poster} src={imageUrl} alt='movie poster'/>
				<div className={classes.titleWrap}>
					{data.title || data.name}
				</div>
			</a>
		</div>
	)
};

/**
 * Return styles for component.
 * 
 * @function
 * @private
 */
const _getStyles = () => {
	return {
		wrapper: {
			width: '12.5%',
			height: '15rem',
			padding: '.25rem',
			textAlign: 'center',
			position: 'relative',
			overflow: 'hidden'
		},
		poster: {
			height: '100%'
		},
		titleWrap: {
			position: 'absolute',
			width: '9.75rem',
			height: '2rem',
			bottom: '0.25rem',
			backgroundColor: 'rgba(0,0,0,0.75)',
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			padding: '.25rem',
			lineHeight: '1.5'
		},
		card: {
			textDecoration: 'none',
			color: 'inherit',
			display: 'block',
			height: '100%',
			overflow: 'hidden'
		}
	}
}

export default MovieCard;