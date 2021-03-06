import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, CardHeader, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

const RecipeCard = (props) => {
    const useStyles = makeStyles(theme => ({
        root: {
            [theme.breakpoints.down('xl')]: {
                maxWidth: '18vw'
            },
            [theme.breakpoints.up('xl')]: {
                maxWidth: '14vw'
            },
            minWidth: '250px',
            backgroundColor: props.isDarkMode ? 'grey' : '#f1f2f3',
            borderRadius: 0
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        title: {
            display: '-webkit-box',
            '-webkit-line-clamp': 1,
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
            color: props.isDarkMode ? 'ivory' : '#676563',
            fontSize: '1.125rem'
        },
        contentP: {
            display: '-webkit-box',
            '-webkit-line-clamp': 3,
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden'
        },
        cardAction: {
            color: props.isDarkMode ? '#d3d7d3' : 'rgba(0,0,0,0.54)',
            fontSize: '0.875rem'
        }
    }));

    const { recipe } = props;
    const classes = useStyles();
    const history = useHistory();

    const handleClick = () => {
        // const win = window.open(`#/recipe/${recipe.id}`, '_blank');
        // if (win != null) {
        //     win.focus();
        // }
        history.push(`/recipe/${recipe.id}`);
    };

    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <Card className={classes.root} elevation={0} onClick={handleClick}>
                <CardActionArea>
                    <CardHeader
                        title={recipe.title}
                        subheader={recipe.sourceName}
                        classes={{ title: classes.title }}
                    />
                    <CardMedia
                        className={classes.media}
                        image={`${recipe.image}`}
                        title={recipe.title}
                    />
                    <CardContent classes={{ root: classes.content }}>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.contentP} dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardAction}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <ScheduleIcon />
                        <span>&nbsp;{recipe.readyInMinutes} minutes</span>
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <PeopleOutlineIcon />
                        <span>&nbsp;{recipe.servings}</span>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkModeEnable.isDarkMode
    };
};

export default connect(mapStateToProps)(RecipeCard);
