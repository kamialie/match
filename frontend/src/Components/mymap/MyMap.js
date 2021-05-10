import React from 'react';
import { Map, Placemark } from 'react-yandex-maps';
import { usePosition } from '../../helpers/usePosition';

export const MyMap = () => {
    // https://ip-api.io/
    const { latitude, longitude } = usePosition();

    const mapState = { center: [latitude || 55.754093, longitude || 37.620407], zoom: 12 };
    const placeMark = {
        geometry: [latitude || 55.754093, longitude || 37.620407],
        properties: {
            hintContent: 'Это хинт',
            balloonContent: 'Это балун',
        },
    };

    return (
        <Map className="map" state={mapState}>
            <Placemark
                {...placeMark}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            />
        </Map>
    );
};
