import React, { useState } from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet/hooks'




const Map = ({city, facts}) => {

  if (city===false || facts===false){
    
    city={lat:0, lng:0}
    
  }


  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        setPosition([city.lat, city.lng])
        map.flyTo([city.lat, city.lng], map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position} icon={customMarker}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  
  
  
  
  const customMarker = new L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
  });
  
  function RenderMarker(wantedCity, wantedFacts) {
    if (wantedCity!==false && wantedFacts!==false){
      
      return(
        <Marker position={[wantedCity.lat, wantedCity.lng]} icon={customMarker}>
            <Popup>
              <b>Name:</b> {wantedCity.city_name} <br/>
              <b>Country:</b> {wantedCity.country_name} <br/>
              <b>Continent:</b> {wantedFacts.region} <br/>
              <b>United Nations Status:</b> {wantedFacts.unMember.toString()} <br/>
              <b>Calling Code: </b> {wantedFacts.callingCodes}
            </Popup>
          </Marker>
      )
      
    }
  }

  return (
    
    <div aligin="center" id="map">
      <MapContainer center={[55.8, -5]} zoom={7} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />

      </MapContainer>

    </div>
  )

}
export default Map;