import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./editCar";


function CarList() {
      const [cars, setCars] = useState([]);


      const fetchData = () => {
            fetch('http://carrestapi.herokuapp.com/cars')
                  .then(resp => resp.json())
                  .then(data => setCars(data._embedded.cars))
                  .catch(error => console.error(error));
      };

      const saveCar = car => {
            const options = {
                  method: "post", 
                  headers: {
                        'Content-Type': 'application/json'
                  }, 
                  body: JSON.stringify(car)
            };
            fetch('https://carrestapi.herokuapp.com/cars', options)
            .then(resp => fetchData())
            .catch(error => console.error(error))
      };

      const updateCar = (url, car) => {
            const options = {
                  method: "put", 
                  headers: {
                        'Content-Type': 'application/json'
                  }, 
                  body: JSON.stringify(car)
            };
            fetch(url, options)
            .then(resp => fetchData())
            .catch(error => console.error(error))
      };

      const deleteCar = url => {

            if (!window.confirm("Do you want to delete this car?")) return;
            const options = {
                  method: 'delete'
            };
            fetch(url, options)
            .then(resp => fetchData())
            .catch(error => console.error(error))
      }

      const columnDefs = [
            { field: "brand" },
            { field: "model" },
            { field: "color" },
            { field: "fuel" },
            { field: "year" },
            { field: "price" },
            {
                  field: "_links.self.href",
                  headerName: "",
                  sortable: false,
                  floatingFilter: false,
                  cellRenderer: params => {
                        return (
                              <EditCar car={params.data} updateCar={updateCar} />
                        )
                  }
            },
            {
                  field: "_links.self.href",
                  headerName: "",
                  sortable: false,
                  floatingFilter: false,
                  cellRenderer: params => {
                        return (
                              <Button onClick={() => deleteCar(params.value)}>Delete</Button>
                        )
                  }
            }
            

      ];

      const defaultColDef = {
            sortable: true,
            filter: true,
            floatingFilter: true


      };

      useEffect(fetchData, []);
      return (
            <div>
                <AddCar saveCar={saveCar}/>        
            <div className="ag-theme-material"
                  style={{ height: '700px', width: '95%', margin: 'auto' }} >

                  <AgGridReact
                        rowData={cars}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}

                  />

            </div>
            </div>
      );
}

export default CarList;