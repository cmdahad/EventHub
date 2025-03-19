import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for the marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// Component to set view to specific location
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, map, zoom]);
  return null;
};

const MapComponent = ({ location, name, position }) => {
  // Default coordinates (if provided coordinates are invalid)
  const defaultPosition = [40.730610, -73.935242]; // NYC coordinates
  
  // Use provided position or default
  const mapPosition = position || defaultPosition;
  
  return (
    <MapContainer 
      center={mapPosition} 
      zoom={14} 
      style={{ height: '300px', width: '100%', borderRadius: '4px' }}
    >
      <ChangeView center={mapPosition} zoom={14} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={mapPosition}>
        <Popup>{name || location || 'Event Location'}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent; 