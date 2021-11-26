import React, { useState, useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { alertService, AlertType } from '../../services/alert.service';
import { history } from '../../helpers/history';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

function LocalAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function Alert({ id, fade }) {
    const [alerts, setAlerts] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = alertService.onAlert(id).subscribe(alert => {
            // clear alerts when an empty alert is received
            if (!alert.message) {
                setAlerts(alerts => {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);

                    // remove 'keepAfterRouteChange' flag on the rest
                    filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
                    return filteredAlerts;
                });
            } else {
                // add alert to array
                setAlerts(alerts => [...alerts, alert]);

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() => removeAlert(alert), 3000);
                }
            }
        });

        // clear alerts on location change
        const historyUnlisten = history.listen(({ pathname }) => {
            // don't clear if pathname has trailing slash because this will be auto redirected again
            if (pathname.endsWith('/')) return;

            alertService.clear(id);
        });

        // clean up function that runs when the component unmounts
        return () => {
            // unsubscribe & unlisten to avoid memory leaks
            subscription.unsubscribe();
            historyUnlisten();
        };
    }, []);

    function removeAlert(alert) {
        if (fade) {
            // fade out alert
            const alertWithFade = { ...alert, fade: true };
            setAlerts(alerts => alerts.map(x => (x === alert ? alertWithFade : x)));

            // remove alert after faded out
            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
            }, 250);
        } else {
            // remove alert
            setAlerts(alerts => alerts.filter(x => x !== alert));
        }
    }

    function cssClasses(alert) {
        if (!alert) return '';

        const alertTypeClass = {
            [AlertType.Success]: 'success',
            [AlertType.Error]: 'error',
            [AlertType.Info]: 'info',
            [AlertType.Warning]: 'warning',
        };

        return alertTypeClass[alert.type];
    }

    if (!alerts.length) return null;

    return (
        <div className={classes.root}>
            {alerts.map((alert, index) => (
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    key={index}
                    open={true}
                    onClose={() => removeAlert(alert)}
                >
                    <LocalAlert onClose={() => removeAlert(alert)} severity={cssClasses(alert)}>
                        {alert.message.toString()}
                    </LocalAlert>
                </Snackbar>
            ))}
        </div>
    );
}
