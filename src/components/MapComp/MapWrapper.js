import React from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import Map from './Map'
import Marker from './Marker'

const MapWrapper = ({ center, markerPostions }) => {
  // const center = { lat: -34.397, lng: 150.644 }
  const zoom = 16


  return (
    <>
      <Wrapper apiKey='AIzaSyBZUenWnfY7CHnyPGWXw01OH_wC6u6c44A'>
        <Map center={center} zoom={zoom}>
          <Marker position={center} />
          {markerPostions.map((postion) => <Marker position={postion} />)}
        </Map>
      </Wrapper>
    </>
  )
}

export default MapWrapper