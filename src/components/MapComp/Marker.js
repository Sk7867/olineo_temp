import { useState, useEffect } from 'react'

const Marker = ({ position, map }) => {
  const [marker, setMarker] = useState(null)
  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker({
        animation: window.google.maps.Animation.DROP,
      }));
    }
    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker])

  if (marker) {
    marker.setMap(map);
    marker.setPosition(position);
  }



  return null
}

export default Marker