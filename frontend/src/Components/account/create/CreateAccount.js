import React, { useState } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { MainContainer } from '../../common/MainContainer';
import { Box, IconButton, LinearProgress, Paper, Tooltip, Typography } from '@material-ui/core';
import { Birthday } from './steps/Birthday';
import { Gender } from './steps/Gender';
import { Country } from './steps/Country';
import { Biography } from './steps/Biography';
import { Images } from './steps/Images';
import { CreateResult } from './steps/CreateResult';
import { SexualPreferences } from './steps/SexualPreferences';
import { Interests } from './steps/Interests';

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
        minHeight: '320px',
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

export const CreateAccount = () => {
    const [data, setData] = useState({});
    const [step, setStep] = useState(1);
    const classes = useStyles();

    const stepCount = 8;

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
        setStep(prevStep => prevStep - 1);
    };

    const getComponent = () => {
        if (step === 1) {
            return <Birthday data={data} onNext={onNext} />;
        }
        if (step === 2) {
            return <Gender data={data} onNext={onNext} />;
        }
        if (step === 3) {
            return <SexualPreferences data={data} onNext={onNext} />;
        }
        if (step === 4) {
            return <Interests data={data} onNext={onNext} />;
        }
        if (step === 5) {
            return <Country data={data} onNext={onNext} />;
        }
        if (step === 6) {
            return <Biography data={data} onNext={onNext} />;
        }
        if (step === 7) {
            return <Images data={data} onNext={onNext} />;
        }
        if (step === 8) {
            return <CreateResult data={data} />;
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
                                disabled={step === 1}
                                onClick={event => onBack(event)}
                            >
                                <ArrowBackIosOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography component="h2" variant="h5">
                            🦄 Fill information about you
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        className={classes.progressBar}
                        value={progress(step)}
                    />
                </Box>
                {getComponent()}
            </Paper>
        </MainContainer>
    );
};
