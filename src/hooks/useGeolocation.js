import React, { useState, useEffect } from 'react'
import { storeLocation } from '../api/StoreApi';

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' }
  });


  // useEffect(() => {
  // }, [])

  const locationFetch = () => {
    const onSuccess = (location) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        }
      })
      storeLocation(location)
    }

    const onError = error => {
      setLocation({
        loaded: true,
        error,
      })
    }

    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported'
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }


  return { location, locationFetch }
}

export default useGeolocation