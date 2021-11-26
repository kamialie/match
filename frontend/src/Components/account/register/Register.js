import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, IconButton, LinearProgress, Paper, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { Names } from './steps/Names';
import { EmailAndUsername } from './steps/EmailAndUsername';
import { Password } from './steps/Password';
import { RegisterResult } from './steps/RegisterResult';
import { MainContainer } from '../../common/MainContainer';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem',
        borderRadius: '1rem',
        width: '100%',
        minHeight: '400px',
    },
    backButton: {
        marginLeft: '-2rem',
    },
    progressBar: {
        width: '100%',
        height: '10px',
        marginTop: '10px',
        borderRadius: '5px',
    },
}));

export const Register = () => {
    const [data, setData] = useState({});
    const [step, setStep] = useState(1);
    const history = useHistory();
    const classes = useStyles();
    const stepCount = 4;

    const setValues = values => {
        setData(prevData => ({
            ...prevData,
            ...values,
        }));
    };

    const onNext = data => {
        setValues(data);
        setStep(prevStep => prevStep + 1);
    };

    const onBack = event => {
        event.preventDefault();
        if (step === 1) {
            history.push('./');
        } else {
            setStep(prevStep => prevStep - 1);
        }
    };

    const getComponent = () => {
        if (step === 1) {
            return <Names data={data} onNext={onNext} />;
        }
        if (step === 2) {
            return <EmailAndUsername data={data} onNext={onNext} />;
        }
        if (step === 3) {
            return <Password data={data} onNext={onNext} />;
        }
        if (step === 4) {
            return <RegisterResult data={data} />;
        }
    };

    const progress = value => Math.min(((value - 1) / (stepCount - 1)) * 100, 100);

    return (
        <MainContainer>
            <Paper className={classes.paper}>
                <Box style={{ width: '100%' }}>
                    <Box className={classes.root}>
                        <Tooltip title="Move back" placement="top">
                            <IconButton
                                color="primary"
                                component="span"
                                className={classes.backButton}
                                onClick={event => onBack(event)}
                            >
                                <ArrowBackIosOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography component="h2" variant="h5">
                            🦄 Registration
                        </Typography>
                    </Box>
                </Box>
                <LinearProgress
                    variant="determinate"
                    className={classes.progressBar}
                    value={progress(step)}
                />
                {getComponent()}
            </Paper>
        </MainContainer>
    );
};
