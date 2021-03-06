import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import IngredientTable from './IngredientTable';

const Accord = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: props.isDarkMode ? 'ivory' : '#565553'
        },
        subheading: {
            fontSize: '1rem',
            color: props.isDarkMode ? 'ivory' : '#676563'
        }
    }));

    const classes = useStyles();
    const { summary, extendedIngredients, instructions } = props.data;

    return (
        <div className={classes.root}>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className={classes.heading}>Recipe Summary</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div dangerouslySetInnerHTML={{ __html: summary }} className={classes.subheading} />
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <div className={classes.heading}>Ingredient List</div>
                </AccordionSummary>
                <AccordionDetails>
                    <IngredientTable data={extendedIngredients} />
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <div className={classes.heading}>Cooking Instructions</div>
                </AccordionSummary>
                <AccordionDetails>
                    <Box ml={2}>
                        <div dangerouslySetInnerHTML={{ __html: instructions }} className={classes.subheading} />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkModeEnable.isDarkMode
    };
};

export default connect(mapStateToProps)(Accord);

