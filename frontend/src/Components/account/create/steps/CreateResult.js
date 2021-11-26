import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { PrimaryButton } from '../../../common/PrimaryButton';
import { alertService } from '../../../../services/alert.service';
import { accountService } from '../../../../services/account.service';

const useStyles = makeStyles({
    root: {
        marginTop: '1rem',
        marginBottom: '2rem',
    },
    table: {
        marginBottom: '2rem',
    },
    tableCell: {
        overflowWrap: 'anywhere',
    },
    listItems: {
        width: '100%',
    },
    listItem: {
        padding: 0,
        justifyContent: 'space-between',
        marginTop: '1rem',
    },
    listItemText: {
        width: '100%',
        overflowWrap: 'anywhere',
    },
    listItemImage: {
        width: '100px',
        marginRight: '10px',
    },
    cell: {
        overflowWrap: 'anywhere',
    },
});

export const CreateResult = ({ data }) => {
    const user = accountService.userValue;
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);

    const entries = Object.entries(data).filter(entry => entry[0] !== 'images');
    const { images } = data;

    const onSubmit = () => {
        const formData = new FormData();
        if (data.images) {
            data.images.forEach(file => {
                formData.append('images', file, file.name);
            });
        }

        entries.forEach(entry => {
            formData.append(entry[0], entry[1]);
        });

        alertService.clear();

        setLoading(true);

        accountService
            .update(user.id, data)
            .then(() => {
                alertService.success('Success!', { keepAfterRouteChange: true });
            })
            .catch(error => {
                setLoading(false);
                alertService.error(error);
            });
    };

    return (
        <>
            <TableContainer className={classes.root} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Field</TableCell>
                            <TableCell className={classes.tableCell} align="right">
                                Value
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map(entry => (
                            <TableRow key={entry[0]}>
                                <TableCell component="th" scope="row">
                                    {entry[0]}
                                </TableCell>
                                <TableCell align="right" className={classes.cell}>
                                    {entry[1]?.toString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {!!images?.length && (
                <>
                    <Typography component="h2" variant="h5">
                        📦 Files
                    </Typography>
                    <List className={classes.listItems}>
                        {images.map((f, index) => (
                            <ListItem className={classes.listItem} key={index}>
                                <img
                                    src={URL.createObjectURL(f)}
                                    alt={f.name}
                                    className={classes.listItemImage}
                                />
                                <ListItemText
                                    className={classes.listItemText}
                                    primary={f.name}
                                    secondary={f.size}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
            <PrimaryButton disabled={isLoading} isLoading={isLoading} onClick={onSubmit}>
                Submit
            </PrimaryButton>
        </>
    );
};
