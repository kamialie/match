import React, { useState } from 'react';
import { Map, Placemark } from 'react-yandex-maps';
import { usePosition } from '../../../helpers/usePosition';
import { Box, FormGroup, useMediaQuery } from '@material-ui/core';
import mapStyles from './MapStyles';
import { alertService } from '../../../services/alert.service';
import { PrimaryButton } from '../../common/PrimaryButton';

export const Geolocation = () => {
    // https://ip-api.io/
    const { latitude, longitude } = usePosition();

    const [isLoading, setLoading] = useState(false);

    const isMobile = useMediaQuery('(max-width:600px)');

    const [position, setPosition] = useState({
        geometry: [latitude || 55.754093, longitude || 37.620407],
    });

    const mapState = { center: [latitude || 55.754093, longitude || 37.620407], zoom: 12 };

    const mapContainerStyle = {
        width: '40vw',
        height: '40vh',
    };
    const mapContainerStyleSm = {
        width: '80vw',
        height: '60vh',
    };

    const options = {
        styles: mapStyles,
    };

    const onSubmit = () => {
        alertService.clear();
    };

    const clickOnMap = event => {
        setPosition({ geometry: [...event.get('coords')] });
    };

    return (
        <form onSubmit={onSubmit}>
            <FormGroup>
                <Box>
                    <Map
                        onClick={clickOnMap}
                        options={options}
                        style={isMobile ? mapContainerStyleSm : mapContainerStyle}
                        state={mapState}
                    >
                        <Placemark {...position} />
                    </Map>
                </Box>
                <PrimaryButton disabled={isLoading} isLoading={isLoading} onClick={onSubmit}>
                    Submit
                </PrimaryButton>
            </FormGroup>
        </form>
    );
};
