import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * Component for rating movie, representing with stars.
 * 
 * @function
 * @param {number} value rating value
 */
const MovieRating = ({value = 0}) => {
	return (
		<Tooltip title={`Rating ${value*10}%`}>
			<a><Rating name="read-only" value={value/2} readOnly /></a>
		</Tooltip>
	)
};

export default MovieRating;