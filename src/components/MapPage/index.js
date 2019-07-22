import React, { useState } from 'react';
import Atlas from '../Atlas';
import Modal from '../Modal';
import { fetchLocationsCall } from '../../utils/apiCalls/fetchLocationsCall';

const MapPage = () => {
  const [userAddress, setUserAddress] = useState('');
  const [userLocation, setUserLocation] = useState([]);
  const [closestLocation, setClosestLocation] = useState({
      "id": 1,
      "name": "Denver Walk-In Crisis Services",
      "phone": 3035041299,
      "address": "4353 E. Colfax Avenue",
      "city": "Denver", 
      "state": "CO", 
      "zip": 80220,
      "hours": "24 hours a day, 7 days a week",
      "lat": 39.7403,
      "lng": -104.9363

    });

  const getAndFetchUserLocation = () => {
    if (window.navigator.geolocation) {
    };
    fetchLocations();
  };

  const getUserLocation = async () => {
    await window.navigator.geolocation.getCurrentPosition(async (position) => 
      await setUserLocation([position.coords.latitude, position.coords.longitude])
    );
    fetchLocations(userLocation)
  };

  const fetchLocations = () => {
    const url = 'https://cohelp-backend.herokuapp.com/api/v1/locations/sort?lat=39.7504&lng=-104.9963'
    fetchLocationsCall(url)
  };

  const drivingUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${closestLocation.lat},${closestLocation.lng}&travelmode=driving`;
  const walkingUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${closestLocation.lat},${closestLocation.lng}&travelmode=walking`;
  const transitUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${closestLocation.lat},${closestLocation.lng}&travelmode=transit`;
  const bikingUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${closestLocation.lat},${closestLocation.lng}&travelmode=bicycling`;



  return (
    <main className="map-page">
      {
        userLocation.length === 0
        &&
        <Modal userLocation={{ userLocation: [userLocation, setUserLocation] }} />
      }
      {
        userLocation.length > 0
        &&
        <article>
          <map>
            <Atlas userLocation={userLocation} />
          </map>
          <p>Center is {closestLocation.distance} miles away</p>
          <h3>GET DIRECTIONS</h3>
          <a href={drivingUrl} target="_blank" rel="noopener noreferrer">
            <img className="svg-icon car-icon" src={require("../../assets/images/icons/car.svg")} alt="car directions link"/>
          </a>
          <a href={walkingUrl} target="_blank" rel="noopener noreferrer">
            <img className="svg-icon walk-icon" src={require("../../assets/images/icons/walk.svg")} alt="walking directions link"/>
          </a>
          <a href={bikingUrl} target="_blank" rel="noopener noreferrer">
            <img className="svg-icon bike-icon" src={require("../../assets/images/icons/bike.svg")} alt="biking directions link"/>
          </a>
          <a href={transitUrl} target="_blank" rel="noopener noreferrer">
            <img className="svg-icon bus-icon"src={require("../../assets/images/icons/bus.svg")} alt="public transit directions link"/>
          </a>
        </article>
      }
    </main>
  );
};

export default MapPage;

