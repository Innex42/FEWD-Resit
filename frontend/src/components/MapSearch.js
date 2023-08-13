import React, { useState } from "react";
import Map from "./LeafletMap";
import Button from "react-bootstrap/Button";

import { cites } from "../data/cities";
import { facts } from "../data/countryFactsData";


function MapSearch({ }) {
    const [citySearchField, setCitySearchField] = useState("");
    const [countrySearchField, setCountrySearchField] = useState("");

    let requestedCity;
    let requestedCountry;

    var requestedCityLocation={lat:0,lng:0};
    var requestedFacts=false;

    const handleClick = () => {
        requestedCity = citySearchField
        requestedCountry = countrySearchField
        console.log(requestedCity, requestedCountry)
        requestedCityLocation=false
        requestedFacts=false

        //for finding requested city and facts
         requestedCityLocation = cites.find(item => item.city_name.toLowerCase() === requestedCity.toLowerCase() && item.country_name.toLowerCase() === requestedCountry.toLowerCase());
         requestedFacts = facts.find(item => item.name.common.toLowerCase() === requestedCountry.toLowerCase());

        console.log(requestedCityLocation);
        console.log(requestedFacts);
    }

   


    return (
        <>
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
                        onClick={handleClick}
                    >Search</Button>
                </div>

            </div>
            <div id="leafletMap" align="center">

            <Map city={requestedCityLocation} facts={requestedFacts} />

            </div>
        </>
    )

}

export default MapSearch