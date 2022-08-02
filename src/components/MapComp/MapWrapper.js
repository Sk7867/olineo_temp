import React from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import Map from './Map'
import Marker from './Marker'

const MapWrapper = ({ center, markerPostions }) => {
  const zoom = 16


  return (
    <>
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_KEY}>
        <Map center={center} zoom={zoom}>
          <Marker position={center} />
          {markerPostions.map((postion) => <Marker position={postion} />)}
        </Map>
      </Wrapper>
    </>
  )
}

export default MapWrapper