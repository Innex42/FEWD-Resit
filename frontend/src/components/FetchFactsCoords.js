import React, { useState } from "react";
import axios from 'axios';
//import MapSearch from "./MapSearch";
import MapSearch from "./MapSearch";


const FetchFactsCoords = () => {
    const [getData, setGetData] = useState(true);
    const [facts, setFacts] = useState("");
    const [coords, setCoords] = useState("");


    const factsOptions = {
        method: 'GET',
        url: 'https://country-facts.p.rapidapi.com/all',
        headers: {
            'X-RapidAPI-Key': '8679798c69msh8880aecbdfdc98fp1efa82jsn893f7db6f2b9',
            'X-RapidAPI-Host': 'country-facts.p.rapidapi.com'
        }
    };

    const coordsOptions = {
        method: 'GET',
        url: 'https://cost-of-living-and-prices.p.rapidapi.com/cities',
        headers: {
            'X-RapidAPI-Key': '8679798c69msh8880aecbdfdc98fp1efa82jsn893f7db6f2b9',
            'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
        }
    }

    const apiCalls = async () => {
        try {
            const factsResponse = await axios.request(factsOptions);
            const coordsResponse = await axios.request(coordsOptions);
            console.log(factsResponse.data,coordsResponse.data);
            var parsedCoords= coordsResponse.data;
            parsedCoords=parsedCoords.cities;
            setFacts(factsResponse.data);
            setCoords(parsedCoords);
            console.log(facts, coords)
            setGetData(false);
        } catch (error) {
            console.log(error);
        }
    }

    if (getData) {
        apiCalls();
        setGetData(false);
    }


    return (
        <MapSearch facts={facts} coords={coords} />
    )
}



export default FetchFactsCoords;