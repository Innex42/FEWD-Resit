import React, { useState, useCallback, useEffect, useMemo } from "react";

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Button from "react-bootstrap/Button";



let center = [51.505, -0.09]
const zoom = 13


const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

function DisplayPosition({ map, facts, coords }) {
  const [position, setPosition] = useState(() => map.getCenter())

  const [citySearchField, setCitySearchField] = useState("");
    const [countrySearchField, setCountrySearchField] = useState("");
    const [valid, setValid] = useState(false);
    const [requestedCityLocation, setRequestedCityLocation] =useState({ lat: 0, lng: 0 }) ;
    let requestedCity;
    let requestedCountry;

    const [requestedFacts, setRequestedFacts]=useState("");
    

    

  const onClick = useCallback(() => {
    requestedCity = citySearchField
        requestedCountry = countrySearchField
        console.log(requestedCity, requestedCountry)
        console.log(facts);

        var indexCheck = coords.findIndex(item => item.city_name.toLowerCase() === requestedCity.toLowerCase() && item.country_name.toLowerCase() === requestedCountry.toLowerCase());
        console.log(indexCheck)
        //for finding requested city and facts


        if (indexCheck === -1) {
            setValid(false)
            console.log("error")
        } else {
            var tempCoords= coords?.find(item => item.city_name.toLowerCase() === requestedCity.toLowerCase() && item.country_name.toLowerCase() === requestedCountry.toLowerCase());
            var tempfacts=facts?.find(item => item.name.common.toLowerCase() === requestedCountry.toLowerCase());
            console.log(tempCoords,tempfacts)
            setRequestedCityLocation(tempCoords) 
            setRequestedFacts(tempfacts);
            setValid(true)
            console.log(requestedCityLocation,requestedFacts)
        }
        console.log(requestedCityLocation);
        console.log(requestedFacts);
    
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

function MapSearch({facts, coords}) {
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
      {map ? <DisplayPosition map={map} facts={facts} coords={coords} /> : null}
      {displayMap}
    </div>
  )
}

export default MapSearch

