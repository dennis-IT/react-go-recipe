import React from 'react';
import { makeStyles, IconButton, Link, Box, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: '#fce5be',
        [theme.breakpoints.down('xs')]: {
            padding: '0 1rem'
        },
        [theme.breakpoints.up('sm')]: {
            padding: '0 1.5rem'
        }
    },
    footerCredit: {
        color: '#676563',
        fontSize: '0.935rem'
    }
}
));

const BottomNav = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.footer} display='flex' alignItems='center' flexDirection='column'>
            <Box my={0.25}>
                <Link href='https://github.com/dennis-IT'>
                    <IconButton>
                        <GitHubIcon />
                    </IconButton>
                </Link>
                <Link href='https://www.linkedin.com/in/tadennis/'>
                    <IconButton>
                        <LinkedInIcon />
                    </IconButton>
                </Link>
                <Link href='https://www.facebook.com'>
                    <IconButton>
                        <FacebookIcon />
                    </IconButton>
                </Link>
            </Box>
            <Box my={0.25}>
                <Typography className={classes.footerCredit}>
                    Images created by <span><Link href='https://www.freepik.com/vectors/food'>Freepik</Link></span>, <span><Link href='https://www.freepik.com/pikisuperstar'>Pikisuperstar</Link></span>, <span><Link href='https://www.freepik.com/macrovector'>Macrovector</Link></span>
                </Typography>
            </Box>
            <Box my={0.25}>
                <Typography className={classes.footerCredit}>
                    Icons made by <span><Link href='http://www.freepik.com/'>Freepik</Link></span> from <span><Link href='https://www.flaticon.com/'>Flaticon</Link></span>
                </Typography>
            </Box>
            <Box my={0.25}>
                <Typography className={classes.footerCredit}>
                    Data source created by <span><Link href='https://spoonacular.com/food-api'>Spoonacular API</Link></span>
                </Typography>
            </Box>
            <Box my={0.25}>
                <Typography className={classes.footerCredit}>
                    &copy; 2020 Dennis Ta. All rights reserved.
                </Typography>
            </Box>
        </Box >
    );
};

export default BottomNav;
