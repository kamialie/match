import React from 'react';
import { Box, Button, Link, Tooltip, Typography, useMediaQuery } from '@material-ui/core';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            © Copyright 2021 All Rights Reserved.{' '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
        </Typography>
    );
}

export function Footer() {
    const authors = [
        {
            name: 'rgyles',
            github: 'https://github.com/wise-Kaas',
        },
        {
            name: 'lwyl-the',
            github: 'https://github.com/diazometan',
        },
    ];

    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Box paddingTop={2} paddingBottom={2} textAlign="center">
            <Copyright />
            {authors.map((value, index) => {
                return (
                    <span key={index}>
                        <Tooltip title="Open GitHub" placement="top">
                            <Button color="primary" target="_blank" href={value.github}>
                                {value.name}
                            </Button>
                        </Tooltip>
                        {index === 0 ? ' & ' : ''}
                    </span>
                );
            })}
        </Box>
    );
}
