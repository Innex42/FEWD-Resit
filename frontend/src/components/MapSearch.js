import React, { useState } from "react";
import Map from "./LeafletMap";
import Button from "react-bootstrap/Button";





function MapSearch({facts,coords}) {
    const [citySearchField, setCitySearchField] = useState("");
    const [countrySearchField, setCountrySearchField] = useState("");
    const [valid, setValid] = useState(false);
    const [requestedCityLocation, setRequestedCityLocation] =useState() ;
    let requestedCity;
    let requestedCountry;

    const [requestedFacts, setRequestedFacts]=useState("");

    const handleClick = () => {
        requestedCity = citySearchField
        requestedCountry = countrySearchField
        console.log(requestedCity, requestedCountry)
        

        var indexCheck = coords.findIndex(item => item.city_name.toLowerCase() === requestedCity.toLowerCase() && item.country_name.toLowerCase() === requestedCountry.toLowerCase());
        console.log(indexCheck)
        //for finding requested city and facts

        if (indexCheck === -1) {
            setValid(false)
            console.log("error")
        } else {
            var tempCoords= coords.find(item => item.city_name.toLowerCase() === requestedCity.toLowerCase() && item.country_name.toLowerCase() === requestedCountry.toLowerCase());
            var tempfacts=facts.find(item => item.name.common.toLowerCase() === requestedCountry.toLowerCase());
            console.log(tempCoords,tempfacts);
            setRequestedCityLocation(tempCoords); 
            setRequestedFacts(tempfacts);
            setValid(true)
            console.log(requestedCityLocation,requestedFacts)
        }
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

                <div id="leafletMap" align="center">

                    <Map city={requestedCityLocation} facts={requestedFacts} valid={valid} />

                </div>

            </div>

        </>
    )

}
/*<div id="leafletMap" align="center">

<Map city={requestedCityLocation} facts={requestedFacts} />

</div> */
export default MapSearch

