import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetail } from "../helpers/Fetch";
import { settings } from '../config/settings';

/**
 * Page of movie detail
 * 
 * @function
 */
const Detail = () => {
	const [ movieData, setMovieData ] = useState({});
	let { id } = useParams();

	useEffect(() => {
		getMovieDetail({ movieId: id }, (data) => setMovieData(data))
	}, [id]);

	const { 
		original_title: originalTitle = '',
		tagline = '',
		overview = '',
		poster_path: posterPath = '',
		imdb_id: imdbId = '',
		original_language: originalLanguage = '',
		release_date: releaseDate = '',
		genres = [],
		vote_average: voteAvereage = ''
	} = movieData;

	return (
		<>
			<h1>{originalTitle}</h1>
			<h3>{tagline}</h3>
			<a href='/'>Back to list</a>
			<span>{overview}</span>
			<img src={`${settings.api.IMAGE_URI}${posterPath}`} alt='movie poster'/>
			
			<a href={`https://www.imdb.com/title/${imdbId}`}>
				Imdb
			</a>
			<span>Language: {originalLanguage}</span>
			<span>Release date: {releaseDate}</span>
			<span>Genres:
				{genres.map(genre => <span>{genre.name}</span>)}
			</span>
			<span>Vote: {voteAvereage}</span>
		</>
	)
};

export default Detail;