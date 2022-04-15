import React, { useState, useEffect, useRef } from 'react'
import './Map.css'

const Map = ({ center, zoom, children }) => {
  const mapRef = useRef()
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(new window.google.maps.Map(mapRef.current, {}));
    }
  }, [mapRef, map])

  if (map) {
    map.setCenter(center);
    map.setZoom(zoom)
  }


  return (
    <div ref={mapRef} className='mapComponent' id='map'>
      {
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // set the map prop on the child component
            return React.cloneElement(child, { map });
          }
        })
      }
    </div>
  )
}

export default Map