import React, { useState, useEffect } from 'react';

import { getTrendingList, getListByGenre } from "../helpers/Fetch";
import { settings } from '../config/settings';
import MoviesGroup from '../components/MoviesGroup';
import Layout from '../components/Layout';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Landing page.
 * Represent page with list of all movies. 
 * 
 * @function
 */

const List = () => {
	const [ trendingTV, setTrendingTV ] = useState([]) // trending TV series
	const [ trendingMovie, setTrendingMovie ] = useState([]) //trending movies

	const [ familyMovie, setFamilyMovie ] = useState([]) //trending family movies
	const [ documentMovie, setDocumentMovie ] = useState([]) //trending documentary movies
	
	useEffect(() => {
		const { TYPE_TV, TYPE_MOVIE, TIME_DAY, DOCUMENTARY_ID, FAMILY_ID } = settings.api.params;

		getTrendingList({ mediaType: TYPE_TV, timeWindow: TIME_DAY }, (data) => setTrendingTV(data))
		getTrendingList({ mediaType: TYPE_MOVIE, timeWindow: TIME_DAY }, (data) => setTrendingMovie(data))

		getListByGenre({ genreId: FAMILY_ID }, (data) => setFamilyMovie(data))
		getListByGenre({ genreId: DOCUMENTARY_ID }, (data) => setDocumentMovie(data))

	}, []);

	const useStyles = makeStyles({
		title: {
			fontSize: '3rem',
			'&:first-letter': {
				color: '#b2102f'
			}
		}
	})

	const classes = useStyles();

	return (
		<Layout>
			<h1 className={classes.title}>Watchflix</h1>

			<MoviesGroup title='Popular TV movies' movies={trendingMovie}/>
			<MoviesGroup title='Popular TV series' movies={trendingTV}/>
			<MoviesGroup title='Family' movies={familyMovie}/>
			<MoviesGroup title='Documentary' movies={documentMovie}/>
		</Layout>
	)
};

export default List;