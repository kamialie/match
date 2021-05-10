import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PrimaryButton } from '../../../common/PrimaryButton';
import { alertService } from '../../../../services/alert.service';
import { accountService } from '../../../../services/account.service';

const useStyles = makeStyles({
    root: {
        marginTop: '10px',
        marginBottom: '30px',
    },
    table: {
        marginBottom: '30px',
    },
});

const prepareFieldValue = entry => {
    if (entry[0] === 'password' || entry[0] === 'confirmPassword') {
        return '*** *** ***';
    }
    return entry[1].toString();
};

export const RegisterResult = ({ data }) => {
    const history = useHistory();
    const styles = useStyles();

    const entries = Object.entries(data).filter(entry => entry[0] !== 'files');

    const onSubmit = () => {
        alertService.clear();

        accountService
            .register(data)
            .then(() => {
                alertService.success(
                    'Registration successful, please check your email for verification instructions',
                    { keepAfterRouteChange: true }
                );
                history.push('./login');
            })
            .catch(error => {
                alertService.error(error);
            });
    };

    return (
        <>
            <TableContainer className={styles.root} component={Paper}>
                <Table className={styles.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Field</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map(entry => (
                            <TableRow key={entry[0]}>
                                <TableCell component="th" scope="row">
                                    {entry[0]}
                                </TableCell>
                                <TableCell align="right">{prepareFieldValue(entry)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
        </>
    );
};
