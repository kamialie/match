import React, { useState } from 'react';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    TextareaAutosize,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { accountService } from '../../../services/account.service';
import { alertService } from '../../../services/alert.service';

export const AccordionBiography = ({ classes }) => {
    const user = accountService.userValue;
    const [biography, setBiography] = useState(user.biography);

    const [disabled, setDisabled] = useState(true);

    const onBiographyChange = event => {
        setBiography(event.target.value);
        setDisabled(false);
    };

    const onBiographySave = () => {
        accountService.update(user.id, { biography }).then(() => {
            alertService.success('Success update biography!');
            setDisabled(true);
        });
    };

    const onBiographyCancel = () => {
        setBiography(user.biography || '');
        setDisabled(true);
    };

    return (
        <Accordion defaultExpanded className={classes.accordion}>
            <AccordionSummary
                id="panel1a-header"
                aria-controls="panel1a-content"
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography component="h2" variant="h6">
                    Biography
                </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails className={classes.accordionDetails}>
                <TextareaAutosize
                    className={classes.biography}
                    value={biography}
                    onChange={onBiographyChange}
                    rowsMin={3}
                    placeholder="Write something about yourself"
                />
            </AccordionDetails>
            <Divider />
            <AccordionActions>
                <Button onClick={onBiographyCancel}>Cancel</Button>
                <Button color="primary" disabled={disabled} onClick={onBiographySave}>
                    Save
                </Button>
            </AccordionActions>
        </Accordion>
    );
};
