import { Container } from '@mui/material';
import { useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import ControlsPanel from '../../components/GoogleMap/ControlsPanel/ControlsPanel';
import { Map } from '../../components/GoogleMap/Map';
import { getBrowserLocation } from '../../components/utils/geo';

import { StyledMapPage } from './MapPage.style';

enum Libraries {
  DRAWING = 'drawing',
  GEOMETRY = 'geometry',
  LOCALCONTEXT = 'localContext',
  PLACES = 'places',
  VISUALIZATION = 'visualization',
}

const cinemas = [
  {
    id: 1,
    name: 'Poltava-cinema',
    city: 'Полтава',
    location: { lat: 49.588384463675304, lng: 34.55216416631392 },
    fullAdress: 'Полтава, ул. Соборности, 31',
  },
  {
    id: 2,
    name: 'Kyiv-cinema',
    city: 'Київ',
    location: { lat: 50.42151288197541, lng: 30.545295078776917 },
    fullAdress: 'Киев, бульвар Леси Украинки, 34',
  },
  {
    id: 3,
    name: 'Lviv-cinema',
    city: 'Львів',
    location: { lat: 49.84095796107813, lng: 24.021467119832305 },
    fullAdress: 'Львов, ул. Листопадового Чина, 6',
  },
];

export type TCinemasLocation = typeof cinemas;

const libraries = [Libraries.PLACES] as Libraries[];

const MapPage = () => {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 48.383022,
    lng: 31.1828699,
  });

  const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult | null>(
    null
  );

  const [zoom, setZoom] = useState<number>(6);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  return (
    <StyledMapPage>
      <Container>
        {isLoaded && (
          <ControlsPanel
            setDirectionResponse={setDirectionResponse}
            cinemas={cinemas}
            setCenter={setCenter}
            setZoom={setZoom}
          />
        )}
        {isLoaded && (
          <Map
            center={center}
            directionResponse={directionResponse}
            cinemas={cinemas}
            zoom={zoom}
          />
        )}
      </Container>
    </StyledMapPage>
  );
};

export default MapPage;
