import React, { useState, useEffect, useCallback, useMemo } from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet/hooks'


function DisplayPosition({ map, city, facts, valid }) {
  const [position, setPosition] = useState(() => map.getCenter())
  const [center, setCenter] = useState([51.505, -0.09])
  const[popupMessage, setPopupMessage]= useState("Please input a city in the Search Bars above.")

  

    useEffect(() => {
      if (valid){
      setCenter([city.lat, city.lng]);

      console.log("non error", center );

    } else{
      console.log("error")
    }
    map.setView(center, 10);
    },[map])


  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])




  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove,])

  
}




const Map = ({city, facts, valid}) => {

  const [newvalid,updatenewvalid]= useState(0)
  


   



  const[popupMessage, setPopupMessage]= useState("Please input a city in the Search Bars above.")
  
  
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

  const [map, setMap] = useState(null)

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
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
      {map ? <DisplayPosition map={map} city={city} facts={facts} valid={valid} /> : null}
      {displayMap}
    </div>
  )

}
export default Map;