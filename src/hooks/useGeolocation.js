import React, { useState, useEffect } from 'react'

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' }
  });

  const locationFetch = () => {
    const onSuccess = (location) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        }
      })
      // getUserAddress(location)
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

  // const getUserAddress = (location) => {
  //   var lat = location.coords.latitude
  //   var lng = location.coords.longitude

  //   var latlng = new window.google.maps.LatLng(lat, lng);
  //   // This is making the Geocode request
  //   var geocoder = new window.google.maps.Geocoder();

  //   geocoder.geocode({ 'latLng': latlng }, (results, status) => {
  //     console.log(results);
  //     if (status !== window.google.maps.GeocoderStatus.OK) {
  //       alert(status);
  //     }
  //     // This is checking to see if the Geoeode Status is OK before proceeding
  //     if (status == window.google.maps.GeocoderStatus.OK) {
  //       console.log(results);
  //       var address = (results[0].formatted_address);
  //       console.log(address);
  //     }
  //   });
  // }


  return { location, locationFetch }
}

export default useGeolocation