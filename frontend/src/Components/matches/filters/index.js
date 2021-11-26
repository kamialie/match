import React, { useContext, useState } from 'react';
import clsx from 'clsx';

import { Button, Collapse, Grid, IconButton, Box } from '@material-ui/core';
import { HighlightOff, ExpandMore, SyncAlt } from '@material-ui/icons';

import Sort from './Sort';
import Row from './Row';

import { filterStyles } from '../../../styles/filter';
import { buttonStyle } from '../../../styles/button';
import { systemStyles } from '../../../styles/system';
import GetMatches from '../../common/GetMatches';
import { ServiceContext } from '../../../services/serviceContext';

const Filter = ({ setting }) => {
    const [filterIsOn, setFilter] = useState(1);
    const [reset, setReset] = useState(false);

    const filterService = useContext(ServiceContext).filterService;

    const handleClickReset = e => {
        filterService.reset();
        setFilter(1);
        setReset(!reset);
    };

    const classes = systemStyles();
    const classesCustom = buttonStyle();
    const classesFilter = filterStyles();
    const [expanded, setExpanded] = useState(setting);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Grid container direction="row" justify="space-between" alignItems="flex-end" pb={4}>
                <Grid item xs={6} sm={3}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            className={classesFilter.filter}
                            startIcon={<SyncAlt className={classes.mr0} />}
                            disabled
                        >
                            Filter&emsp;&emsp;
                        </Button>

                        {filterIsOn > 1 && (
                            <IconButton
                                onClick={() => {
                                    handleClickReset();
                                }}
                                size="small"
                                className={classes.padding}
                            >
                                <HighlightOff />
                            </IconButton>
                        )}
                        <IconButton
                            className={clsx(classesFilter.expand, classes.padding, classes.m0, {
                                [classesFilter.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                        >
                            <ExpandMore />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Sort
                        setFilter={setFilter}
                        filterIsOn={filterIsOn}
                        className={classesFilter.filter}
                        service={filterService}
                    />
                </Grid>
            </Grid>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Row row={1} />
                    <Row row={2} />
                    <Grid item xs={12} container spacing={3} className={classesFilter.row}>
                        <Button
                            onClick={() => {
                                setFilter(filterIsOn + 1);
                            }}
                            className={classesCustom.mainButton}
                        >
                            See results
                        </Button>
                        <Button
                            onClick={() => {
                                handleClickReset();
                            }}
                            className={`${classesCustom.mainButton} ${classesCustom.secondButton}`}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Collapse>
            <GetMatches reset={reset} route="/api/match/filter" filterIsOn={filterIsOn} />
        </>
    );
};

export default Filter;
