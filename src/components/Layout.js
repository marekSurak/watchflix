import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Layout component with basic styles.
 * 
 * @function
 * @param {object} props.children
 */
const Layout = ({children}) => {
	const useStyles = makeStyles({
		content: {
			padding: '2rem 4rem',
			color: '#fafafa',
			backgroundColor: '#212121',
		}
	})

	const classes = useStyles();
	
	return (
		<div className={classes.content}>
			{children}
		</div>
	)
};

export default Layout;