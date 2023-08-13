import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Charts from "./Charts";

import { bangkokStats } from "../data/bangkokStats";
import { glasgowStats } from "../data/glasgowStats";


const CompareInputs = () => {

    


    const [city1SearchField, setCity1SearchField] = useState("");
    const [country1SearchField, setCountry1SearchField] = useState("");
    const [city2SearchField, setCity2SearchField] = useState("");
    const [country2SearchField, setCountry2SearchField] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    


    const[selectedComparsionData,setSelectedComparsionData] = useState(
        {
            city1:{
                name: "",
                country: ""
            },
            city2:{
                name: "",
                country: ""
            },
            category: "",
            valid:false
        }
    )

    const handleChange = event => {
        console.log('Label ', event.target.selectedOptions[0].label);
        console.log(event.target.value);
      
        setSelectedCategory(event.target.value);
      };
      


    function submitChartData()  {
        
        setSelectedComparsionData(
            {
                city1:{
                    name: city1SearchField,
                    country: country1SearchField
                },
                city2:{
                    name: city2SearchField,
                    country: country2SearchField
                },
                category: selectedCategory,
                valid:true
            }
        )
        //console.log(selectedComparsionData)

        
    }


    return (
        <div>
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
                        width: 40 + '%',
                        marginRight: 5 + "%",
                        marginLeft: 10 +"%"
                    }}
                    className="form-control"
                    type="text"
                    placeholder="Please enter City 1"
                    id="city1"
                    onChange={(e) => setCity1SearchField(e.target.value)}
                />
                <input
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        align: "center",
                        width: 40 + '%',
                        marginRight: 10 + "%"
                    }}
                    className="form-control"
                    type="text"
                    placeholder="Please enter City 2"
                    id="city2"
                    onChange={(e) => setCity2SearchField(e.target.value)}
                />
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                align: "center",
                marginTop: "10px",
            }}>
                <input
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        align: "center",
                        width: 40 + '%',
                        marginRight: 5 + "%",
                        marginLeft: 10 +"%"
                    }}
                    className="form-control"
                    type="text"
                    placeholder="Please enter Country of City 1"
                    id="country1"
                    onChange={(e) => setCountry1SearchField(e.target.value)}
                />
                <input
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        align: "center",
                        width: 40 + '%',
                        marginRight: 10 + "%"
                    }}
                    className="form-control"
                    type="text"
                    placeholder="Please enter Country of City 2"
                    id="country2"
                    onChange={(e) => setCountry2SearchField(e.target.value)}
                />
            </div>
            
            <div align="center" style={{marginTop:"15px"}}>
                <Form.Select aria-label="Default select example"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        align: "center",
                        width: 40 + '%'
                    }}
                    value={selectedCategory} onChange={handleChange}
                    >
                    <option disabled={true} value="">Select a Comparsion Category</option>
                    <option value={1}>Buy Apartment</option>
                    <option value={2}>Childcare</option>
                    <option value={3}>Clothing And Shoes</option>
                    <option value={4}>Markets</option>
                    <option value={5}>Rent Per Month</option>
                    <option value={6}>Restaurants</option>
                    <option value={7}>Salaries And Financing</option>
                    <option value={8}>Sports And Leisure</option>
                    <option value={9}>Transportation</option>
                    <option value={10}>Utilities Per Month</option>
                </Form.Select>
                <Button onClick={submitChartData} type="submit" variant="primary" style={{marginTop:"15px", marginBottom:"15px"}}>Compare</Button>
            </div>
            <Charts  query={selectedComparsionData} />
            <br />
        </div>

    )
}
export default CompareInputs


