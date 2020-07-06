import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import VideoPlayer from '../components/VideoPlayer';
import Layout from "../components/Layout";
import MovieRating from "../components/MovieRating";
import { getMovieDetail } from "../helpers/Fetch";
import { settings } from '../config/settings';
import defaultPhoto from '../img/placeholder-image.png'

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ArrowBack from '@material-ui/icons/ArrowBackIosOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

/**
 * Page of movie detail
 * 
 * @function
 */
const Detail = () => {
	const [ movieData, setMovieData ] = useState({});
	const [ playVideo, setVideoPlay ] = useState(false);

	let { id } = useParams();

	useEffect(() => {
		getMovieDetail({ movieId: id }, (data) => setMovieData(data))
	}, [id]);

	const useStyles = makeStyles(_getStyles())
	
	const classes = useStyles();

	const { 
		original_title: originalTitle = '',
		tagline = '',
		overview = '',
		poster_path: posterPath = '',
		original_language: originalLanguage = '',
		release_date: releaseDate = '',
		genres = [],
		vote_average: voteAvereage = ''
	} = movieData;

	const imageUrl = posterPath ? `${settings.api.IMAGE_URI}${posterPath}` : defaultPhoto;

	return (
		<Layout>
			<div className={classes.wrapper}>
				<div className={classes.col}>
					{_renderBasicInfo(originalTitle, tagline, overview, classes)}

					<Divider className={classes.divider} variant="middle" />
					<MovieRating value={voteAvereage} />

					<ul className={classes.metadata}>
						<li>
							<span className={classes.secondaryText}>Language: </span>
							{originalLanguage}
						</li>
						<li>
							<span className={classes.secondaryText}>Release date: </span>
							{_renderReleaseDate(releaseDate)}
						</li>
						<li>
							<span className={classes.secondaryText}>Genres: </span>
							{_renderGenres(genres)}
						</li>
					</ul>

					{_renderVideoPlayButton(classes, setVideoPlay)}
				</div>
				<div className={classes.col}>
					{_renderBreadCrumbs(classes)}
					{_renderMoviePoster(classes, imageUrl)}
				</div>
			</div>
			{playVideo && _renderVideoPlayer(classes, () => setVideoPlay(false))}
		</Layout>
	)
};

	/**
	 * Render list of movie genres.
	 * 
	 * @function
	 * @private
	 * @param {array} genres 
	 */
	const _renderGenres = (genres = []) => {
		return genres.map((genre, index) => {
			const isLast = index === genres.length - 1;

			return (
				<span key={genre.id}>{genre.name}{isLast ? '' : ', '}</span>
			)}
		)
	};

	/**
	 * Render date.
	 * 
	 * @function
	 * @private
	 * @param {object} date 
	 */
	const _renderReleaseDate = (date) => {
		return new Date(date).toLocaleDateString()
	}

	/**
	 * Render basic info movie.
	 * 
	 * @function
	 * @private
	 * @param {string} title 
	 * @param {string} subtitle 
	 * @param {string} desc 
	 * @param {object} classes 
	 */
	const _renderBasicInfo = (title = '', subtitle = '', desc = '', classes = {}) => {
		return (
			<>
				<h1>{title}</h1>
				<h4 className={classes.secondaryText}>{subtitle}</h4>
				<span>{desc}</span>
			</>
		)
	}

	/**
	 * Render link back to homepage.
	 * 
	 * @function
	 * @private
	 * @param {object} classes 
	 */
	const _renderBreadCrumbs = (classes = {}) => {
		return (
			<div className={classes.breadCrumbs}>
				<Link to="/" className={classes.link}>
					<ArrowBack fontSize="small" className={classes.breadCrumbIcon}/>
					Back to list
				</Link>
			</div>
		)
	};

	/**
	 * Render popup with video player.
	 * 
	 * @function
	 * @private
	 * @param {object} classes 
	 * @param {function} onClose 
	 */
	const _renderVideoPlayer = (classes = {}, onClose = () => {}) => {
		return (
			<div className={classes.videoWrapper} onClick={() => onClose()}>
				<Button className={classes.videoButton} onClick={() => onClose()} title='close player'>
					<CloseIcon className={classes.videoIcon}/>
				</Button>
				<div className={classes.videoContent} onClick={(e) => e.stopPropagation()}>
					<VideoPlayer className={classes.video}/>
				</div>
			</div>
		)
	};

	/**
	 * Render video play button.
	 * 
	 * @function
	 * @private
	 * @param {object} classes 
	 * @param {function} setVideoPlay 
	 */
	const _renderVideoPlayButton = (classes = {}, setVideoPlay = () => {}) => {
		return (
			<Button
				className={classes.videoPlay}
				variant="contained"
				color="secondary"
				onClick={() => setVideoPlay(true)} 
				startIcon={<PlayArrowIcon />}
			>
				Play video
			</Button>
		)
	};

	/**
	 * Render movie poster.
	 * 
	 * @function
	 * @private
	 * @param {object} classes 
	 * @param {string} imageUrl 
	 */
	const _renderMoviePoster = (classes = {}, imageUrl) => {
		return (
			<img 
				className={classes.poster}
				src={imageUrl} 
				alt='movie poster'
			/>
		)
	};

	/**
	 * Return styles for detail.
	 */
	const _getStyles = () => {
		return {
			wrapper: {
				display: 'flex',
				justifyContent: 'space-evenly',
				height: '100vh'
			},
			col: {
				width: '40%',
				verticalAlign: 'top',
				lineHeight: '1.25'
			},
			link: {
				color: 'inherit',
				fontSize: '1rem',
				'&:hover': {
					color: '#fafafa7a'
				}
			},
			divider: {
				backgroundColor: '#fff',
				width: '70%',
				margin: '3rem auto'
			},
			metadata: {
				margin: '0',
				padding: '1rem'
			},
			secondaryText: {
				color: '#fafafa7a'
			},
			breadCrumbs: {
				display: 'block',
				marginBottom: '2rem'
			},
			breadCrumbIcon: {
				verticalAlign: 'top'
			},
			poster: {
				height: '20rem'
			},
			videoWrapper: {
				zIndex: '1',
				position: 'fixed',
				overflow: 'hidden',
				top: '0',
				left: '0',
				height: '100%',
				width: '100%',
				textAlign: 'center',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(0, 0, 0, 0.95)'
			},
			videoContent: {
				zIndex: '10',
				display: 'flex',
				height: '90%',
				width: '90%',
			},
			video: {},
			videoButton: {
				position: 'fixed',
				top: '2rem',
				right: '1rem'
			},
			videoIcon: {
				width: '2rem',
				height: '2rem',
				color: '#fafafa'
			},
			videoPlay: {
				backgroundColor: '#b2102f',
				'&:hover': {
					backgroundColor: '#920b25',
				},
				marginTop: '1rem'
			}
		}
	}

export default Detail;