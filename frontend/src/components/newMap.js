import React, { useState, useCallback, useEffect, useMemo } from "react";
import Map from "./LeafletMap";
import Button from "react-bootstrap/Button";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet/hooks'

import { cites } from "../data/cities";
import { facts } from "../data/countryFactsData";

let center = [51.505, -0.09]
const zoom = 13

const errorMessage="Opps it done goofed";

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(() => map.getCenter())

  const [citySearchField, setCitySearchField] = useState("");
  const [countrySearchField, setCountrySearchField] = useState("");
  const [requestedCityLocation, setRequestedCityLocation] = useState("");
  const [requestedFacts, setRequestedFacts]= useState("");
  const[popupMessage, setPopupMessage]= useState("")

    

    

  const onClick = useCallback(() => {
    //console.log(citySearchField,countrySearchField);
    setRequestedCityLocation(cites.find(item => item.city_name.toLowerCase() === citySearchField.toLowerCase() && item.country_name.toLowerCase() === countrySearchField.toLowerCase()));
    setRequestedFacts(facts.find(item => item.name.common.toLowerCase() === countrySearchField.toLowerCase()));
    console.log(requestedCityLocation, requestedFacts);
    if (!requestedCityLocation.lat){
      center=[0,0];
      setPopupMessage(errorMessage);
    } else{
      center=[requestedCityLocation.lat, requestedCityLocation.lng];
    }
    
    map.setView(center, zoom);
    
  }, [citySearchField, countrySearchField, map, requestedCityLocation, requestedFacts])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])



  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <div align="center">
                <h1>Homepage</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    align: "center",
                }}>
                    <input
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            align: "center",
                            width: 50 + '%'
                        }}
                        className="form-control"
                        type="text"
                        placeholder="Please enter a City"
                        onChange={(e) => setCitySearchField(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <input
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            align: "center",
                            width: 50 + '%'
                        }}
                        className="form-control"
                        type="text"
                        placeholder="Please enter the country of the city"
                        id="countryInput"
                        onChange={(e) => setCountrySearchField(e.target.value)}
                    />
                </div>

                <div align="center">
                    <Button
                        variant="primary"
                        type="submit"
                        style={{
                            marginTop: "15px",
                            marginBottom: "15px",
                            width: 150
                        }}
                        onClick={onClick}
                    >Search</Button>
                </div>

            </div>
  )
}

function MapSearch() {
  const [map, setMap] = useState(null)

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
      </MapContainer>
    ),
    [],
  )

  return (
    <div id="leafletMap" align="center">
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  )
}

export default MapSearch

