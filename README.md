# FEWD-Resit


## How to run the site

**A live version site can be accessed from the URL below:**

https://icampbel-fewd-resit.onrender.com

### Download copy of site 

First clone the respositry by running the code below in the terminal while cd into the desired folder.

```git clone git@github.com:Innex42/FEWD-Resit```

Then open the download folder in a code editor (VScode, Limewire etc).

once opened within a code editor, open a terminal (either in the code editor or a seperate terminal) within the repository and cd into the frontend folder 


```cd frontend/```

Next install the required dependencies

```npm i```

with the dependencies installed run the following command to start a loacl development server

```npm start```

with that a version of the site should load in your default web browser


## Features in the website

1. Get and compare price statistics for two cities (number are displayed in each citys default currency as currency exchanges from Cost of living and prices API are broken (all exchange rates are the same no matter the currency))

2. Leaflet Map is integrated into the site but due to issues with the map refusing to re-render when new data is submited (this stop the plan for inputting the facts about the selected country as it was intended to display this information as a popup from a marker within the map)

3. Connection to the requested API's have been established with the the data being stored when the site is running (Both Cost of living and prices data API endpoints (cites and Prices) as well as the Country Facts API all countries endpoint)