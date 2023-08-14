import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import  Charts  from "./Charts.js";
import Alert from 'react-bootstrap/Alert';



const FetchStats = ({query}) => {
    const [city1Data, setCity1Data] = useState([{
        city_name:"",
        prices:[{
            category_id:"",
            avg:"",
            item_name:"",
        },
        {
            category_id:"",
            avg:"",
            item_name:"",
        },]
    }]);
    const [city2Data, setCity2Data] = useState([{
        city_name:"",
        prices:[{
            category_id:"",
            avg:"",
            item_name:"",
        },
        {
            category_id:"",
            avg:"",
            item_name:"",
        },]
    }]);

    const [validOutput, setvalidOutput]= useState(false);

    const [showError,setShowError]= useState(false);

    const apiErrorcode = "Couldn't find a city with a given name or id";

    useEffect(() => {
    
        const fetchData = async (query, ) => {
          const options1 ={
            method: 'GET',
            url: 'https://cost-of-living-and-prices.p.rapidapi.com/prices',
            params: {
              city_name: query.city1.name,
              country_name: query.city1.country
            },
            headers: {
              'X-RapidAPI-Key': '8679798c69msh8880aecbdfdc98fp1efa82jsn893f7db6f2b9',
              'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
            }
          }
    
          const options2 ={
            method: 'GET',
            url: 'https://cost-of-living-and-prices.p.rapidapi.com/prices',
            params: {
              city_name: query.city2.name,
              country_name: query.city2.country
            },
            headers: {
              'X-RapidAPI-Key': '8679798c69msh8880aecbdfdc98fp1efa82jsn893f7db6f2b9',
              'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
            }
          }
      
          try {
            const response1 = await axios.request(options1);
            const response2 = await axios.request(options2);
            const test1=response1.data;
            const test2=response2.data;
            console.log(test2.error);
            if(test1.error===apiErrorcode){
              console.log("error");
              setvalidOutput(false);
              setShowError(true);
            }else if(test2.error===apiErrorcode){
              console.log("error");
              setvalidOutput(false);
              setShowError(true);
            }else{
              console.log("non error");
              setCity1Data(response1.data);
            setCity2Data(response2.data);
              setvalidOutput(true);
            }

            
            
            
            console.log(city1Data, city2Data) 
          } catch (error) {
            console.error(error);
            
          }
      
            }
            if(query.valid==true){
              fetchData(query)
            }
      },[query]);


      
        function DisplayError  ()  {
          if(showError){
            return (
              <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                <Alert.Heading>Oh snap! Something when Wrong</Alert.Heading>
                <p>
                  please check your spelling and make sure countries are fully spelt out i.e uk is United Kingdom
                </p>
              </Alert>
            );
          }
        }
        
      
     

      return (
        <div>
          <DisplayError />
        <Charts city1Data={city1Data} city2Data={city2Data} valid={validOutput} />
        </div>
      );
};
export default FetchStats;

