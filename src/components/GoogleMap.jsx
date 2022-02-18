import React from 'react';
import GoogleMapReact from 'google-map-react';
import getConfig from 'next/config';

const Marker = ({ text }) => (
  <div className="mx-2 mt-2 rounded-[50%] bg-black text-white text-lg min-w-[25px] h-[25px] flex justify-center">
    {text}
  </div>
);

const GoogleMap = ({ results }) => {
  const { publicRuntimeConfig } = getConfig();
  const [location, setLoc] = React.useState({ lat: 0, lng: 0 });
  const mapState = { location: location };

  React.useEffect(() => {
    let maxLat = null,
      minLat = null,
      maxLng = null,
      minLng = null;

    results.forEach(result => {
      const lat = result['location.lat'];
      const lng = result['location.lon'];

      if (lat > maxLat || maxLat === null) maxLat = lat;
      if (lat < minLat || minLat === null) minLat = lat;
      if (lng > maxLng || maxLng === null) maxLng = lng;
      if (lng < minLng || minLng === null) minLng = lng;

      setLoc({ lat: (maxLat + minLat) / 2, lng: (maxLng + minLng) / 2 });
    });
  }, [results]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: publicRuntimeConfig.GOOGLE_MAPS_API_KEY }}
        center={mapState.location}
        defaultZoom={8}
      >
        {results.map((result, idx) => (
          <Marker key={idx + 1} lat={result['location.lat']} lng={result['location.lon']} text={idx + 1} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
