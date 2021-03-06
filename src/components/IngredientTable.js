import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const BasicTable = (props) => {
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
            color: props.isDarkMode ? 'ivory' : '#676563'
        },
        header: {
            fontWeight: 'bold',
            color: props.isDarkMode ? 'ivory' : '#565553'
        },
        image: {
            maxWidth: '40%'
        }
    });

    const classes = useStyles();
    const ingredients = props.data;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="Ingredient List">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.header}></TableCell>
                        <TableCell align="left" className={classes.header}>Category</TableCell>
                        <TableCell align="left" className={classes.header}>Name</TableCell>
                        <TableCell align="left" className={classes.header}>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingredients.map((ingredient) => (
                        <TableRow key={ingredient.id}>
                            <TableCell component="th" scope="row">
                                <Box display='flex' justifyContent='center' alignItems='center'>
                                    <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt={`${ingredient.name}`} className={classes.image} />
                                </Box>
                            </TableCell>
                            <TableCell align="left">{ingredient.aisle}</TableCell>
                            <TableCell align="left" style={{ textTransform: 'capitalize' }}>{ingredient.name}</TableCell>
                            <TableCell align="left">{ingredient.amount}&nbsp;{ingredient.unit}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const mapStateToProps = state => {
    return {
        isDarkMode: state.darkModeEnable.isDarkMode
    };
};

export default connect(mapStateToProps)(BasicTable);
