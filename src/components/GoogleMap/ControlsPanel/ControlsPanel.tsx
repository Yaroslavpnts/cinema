import { Autocomplete } from '@react-google-maps/api';
import React, { useRef, useState } from 'react';
import { TCinemasLocation } from '../../../pages/MapPage/MapPage';
import {
  StyledAutocomplete,
  StyledButton,
  StyledCalculatedData,
  StyledCityList,
  StyledInput,
  StyledLocationBlock,
} from './ControlsPanel.styled';
import PlaceIcon from '@mui/icons-material/Place';
import { GeoIcon } from './GeoIcon';

interface IControlPanelProps {
  setDirectionResponse: (direction: google.maps.DirectionsResult | null) => void;
  cinemas: TCinemasLocation;
  setCenter: (center: google.maps.LatLngLiteral) => void;
  setZoom: (zoom: number) => void;
}

const ControlsPanel: React.FC<IControlPanelProps> = ({
  setDirectionResponse,
  cinemas,
  setCenter,
  setZoom,
}) => {
  const originRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);

  const [destinationCinema, setDestinationCinema] = useState<typeof cinemas[number]>();
  const [distance, setDistance] = useState<string>();
  const [duration, setDuration] = useState<string>();

  const calculateRoute = async () => {
    if (!originRef.current?.value || !destinationCinema) {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: originRef.current?.value,
      // destination: destinationRef.current?.value,
      destination: destinationCinema?.fullAdress,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionResponse(results);

    setDistance(results.routes[0]?.legs[0].distance?.text);
    setDuration(results.routes[0].legs[0].duration?.text);
  };

  const clearRoute = () => {
    setDirectionResponse(null);
    // setDistance('');
    // setDuration('');
    if (originRef.current) {
      originRef.current.value = '';
    }
    if (destinationRef.current) {
      destinationRef.current.value = '';
    }
  };

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      console.log(autocompleteRef.current.getPlace());
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onClickCity = (cinema: typeof cinemas[number]) => {
    setCenter(cinema.location);
    setDestinationCinema(cinema);
    setZoom(12);
  };

  return (
    <StyledLocationBlock>
      <h2>Оберіть ваше місто</h2>
      <StyledCityList>
        {cinemas.map(cinema => (
          <li key={cinema.id}>
            <button onClick={() => onClickCity(cinema)}>{cinema.city}</button>
          </li>
        ))}
      </StyledCityList>

      <h3>Вкажіть ваше місце знаходження</h3>

      <StyledAutocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
        <>
          <StyledInput
            placeholder="Наприклад, м. Полтава, вул. Лесі Українки, буд. Х"
            ref={originRef}
          />
          <GeoIcon />
        </>
      </StyledAutocomplete>
      <StyledButton variant="contained" onClick={calculateRoute} disableRipple>
        Прокласти маршрут
      </StyledButton>
      {distance && (
        <StyledCalculatedData>
          <span>Дистанція маршруту: {distance}</span>
          <span>Тривалість маршруту: {duration}</span>
        </StyledCalculatedData>
      )}
    </StyledLocationBlock>
  );
};

export default ControlsPanel;
