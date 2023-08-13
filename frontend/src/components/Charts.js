import React, {useEffect, useState, useMemo} from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker, tr } from "@faker-js/faker"
import { bangkokStats } from "../data/bangkokStats";
import { glasgowStats } from "../data/glasgowStats";
import Form from 'react-bootstrap/Form';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const categoryLabels = ["","Buy Apartment", "Childcare", "Clothing And Shoes", "Markets", "Rent Per Month", "Restaurants", "Salaries And Financing", "Sports And Leisure", "Transportation", "Utilities Per Month",]


export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};




const Charts = ({query}) => {

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = event => {
    console.log('Label ', event.target.selectedOptions[0].label);
    console.log(event.target.value);
  
    setSelectedCategory(event.target.value);
  };

  const [chartData, setChartData]= useState({
    labels:["waiting for input"],
    datasets:[
      {
        label: "waiting for input",
        data:[0],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: "waiting for input",
        data:[0],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ]
  })


  useEffect(() => {
    
    const fetchData = async () => {
      
      var city1SelectedPrices=[];
        var city2SelectedPrices=[];

        var city1SelectedLabels=[];
        var city2SelectedLabels=[];

        console.log( query);      
        if(query.valid===true){
          for(var i=0; i < glasgowStats.prices.length; i++ ){
           
            if (glasgowStats.prices[i].category_id == query.category){
                city1SelectedPrices.push(glasgowStats.prices[i].avg);
                city1SelectedLabels.push(glasgowStats.prices[i].item_name)
                
                
            }
        }
        console.log(city1SelectedPrices);
        console.log(city1SelectedLabels);


        for(i=0; i < bangkokStats.prices.length; i++ ){
            
            if (bangkokStats.prices[i].category_id ==  query.category){
                city2SelectedPrices.push(bangkokStats.prices[i].avg*0.022);
                city2SelectedLabels.push(bangkokStats.prices[i].item_name);
            }
        }
        console.log(city2SelectedPrices);
        console.log(city2SelectedLabels);

        setChartData(
          {
            labels:city1SelectedLabels,
            datasets:[
              {
                label: "Glasgow",
                data:city1SelectedPrices,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: "Bangkok",
                data:city2SelectedPrices,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ]
          }
        )
        }

        } 

    fetchData();
  },[query]);

  useEffect(() =>{

  },[])


  return (
    <div align="center">
      
      <Form.Select aria-label="Default select example"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        align: "center",
                        width: 40 + '%'
                    }}
                    value={selectedCategory} onChange={handleChange}
                    disabled={!query.valid}
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

      <Bar options={
        {
          responsive: true,
          animation:true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: "City Comparison Data",
            },
          },
        }
      } data={chartData} />

    </div>

  )
}

export default Charts