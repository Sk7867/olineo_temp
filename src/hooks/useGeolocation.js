import React, { useState, useEffect } from 'react'

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
    address: { city: '', state: '', zip: '' }
  });

  const locationFetch = () => {
    const onSuccess = (location) => {
      setLocation(prev => ({
        ...prev,
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
      }))
      getAddress(location.coords.latitude, location.coords.longitude, 'AIzaSyAJ5hj Awd6gWA5-of4v0AqEOZ_90c_Zq-o')
    }

    const onError = error => {
      setLocation({
        loaded: true,
        error,
      })
    }

    const getAddress = (lat, long, googleKey) => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleKey}`)
        .then(res => res.json())
        .then(addrss => processUserAddress(addrss))
    }

    const processUserAddress = (addrss) => {
      const city = addrss?.results[5]?.address_components[2]?.short_name
      const state = addrss?.results[5]?.address_components[4]?.short_name
      const postal = addrss?.results[5]?.address_components[6]?.short_name

      setLocation(prev => ({
        ...prev,
        address: {
          city: city,
          state: state,
          zip: postal
        }
      }))
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