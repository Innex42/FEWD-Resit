import React from "react";
import Card from "react-bootstrap/Card"
import Map from "./LeafletMap";

const Homepage = () => {
    return(
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
                    placeholder="Search ..."
                    //onChange={(e) => setSearchField(e.target.value)}
                />
            </div>
            <br/>
            </div>
            <div id="leafletMap" align="center">
                <Card border="secondary" style={{width: 70 + "%"}}>
                    <Card.Body><Map /></Card.Body>
                </Card>
            
            </div>
            
        </>
    );
};

export default Homepage;