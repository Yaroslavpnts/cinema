import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useCallback, useRef } from 'react';
import { TCinemasLocation } from '../../pages/MapPage/MapPage';
import { StyledMap } from './ControlsPanel/Map.styled';

import { defaultTheme } from './theme';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true, // зум при скроле
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
};

interface IMapProps {
  center: google.maps.LatLngLiteral | undefined;
  directionResponse: google.maps.DirectionsResult | null;
  cinemas: TCinemasLocation;
  zoom: number;
}

export const Map: React.FC<IMapProps> = ({ center, directionResponse, cinemas, zoom }) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = null;
  }, []);

  return (
    <StyledMap>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {directionResponse && <DirectionsRenderer directions={directionResponse} />}
        {cinemas.map(cinema => (
          <Marker
            key={cinema.id}
            position={cinema.location}
            onClick={(e: google.maps.MapMouseEvent) => console.log(e)}
          />
        ))}
      </GoogleMap>
    </StyledMap>
  );
};
