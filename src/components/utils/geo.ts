const defaultCenter = {
  lat: 51.50853,
  lng: -0.12574,
};

export const getBrowserLocation = () => {
  return new Promise<google.maps.LatLngLiteral>((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude: lat, longitude: lng } = pos.coords;
          resolve({ lat, lng });
        },
        () => {
          reject(defaultCenter);
        }
      );
    } else {
      reject(defaultCenter);
    }
  });
};
