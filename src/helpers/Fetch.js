import { settings } from '../config/settings';

/**
 * Helper for fetching data from API.
 */

const { BASE_URI, API_KEY } = settings.api;
const { SORT_POPULAR } = settings.api.params;

/**
 * Get list of latest popular movies.
 * 
 * @function
 * @param {object} options request option
 * @param {object} callback callback function
 */
const getTrendingList = (options = {}, callback = () => {}) => {
	const { mediaType = '', timeWindow = ''} = options

	fetch(`${BASE_URI}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`)
		.then(response => response.json())
		.then(data => callback(data.results))
}

/**
 * Get list of movies with specific genre.
 * 
 * @function
 * @param {object} options request option
 * @param {object} callback callback function
 */
const getListByGenre = (options = {}, callback = () => {}) => {
	const { genreId = '' } = options

	fetch(`${BASE_URI}/discover/movie/?api_key=${API_KEY}&sort_by=${SORT_POPULAR}&with_genres=${genreId}`)
		.then(response => response.json())
		.then(data => callback(data.results))
}

/**
 * Get data for movie detail.
 * 
 * @function
 * @param {object} options request options
 * @param {object} callback callback function
 */
const getMovieDetail = (options = {}, callback = () => {}) => {
	const { movieId = '' } = options

	fetch(`${BASE_URI}/movie/${movieId}?api_key=${API_KEY}`)
		.then(response => response.json())
		.then(data => callback(data))
}

export { getTrendingList, getListByGenre, getMovieDetail };