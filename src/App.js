import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent, 
} from "@material-ui/core";
import Map from './components/map/Map';
import Title from './components/title/Title';
import Infoboxes from "./components/infoboxes/Infoboxes";
import SelectCases from "./components/selectCases/SelectCases";
import useWidth from "./custom-hook/useWidth";
import Table from './components/table/Table';
import { sortData } from "./util/util";
import { getGlobalData } from './helpers/getGlobalData';
import { getCountriesData } from './helpers/getCountriesData';
import "leaflet/dist/leaflet.css";
import "./App.css";

const defaultImageInfobox = require('./assets/bg_worldwide.jpg')

const App = () => {

  const {isMediumDevice} = useWidth()

  const [country, setCountry] = useState("all")
  const [countryInfo, setCountryInfo] = useState({})
  const [countries, setCountries] = useState([])
  const [tableData, setTableData] = useState([])
  const [casesType, setCasesType] = useState("cases")
  const [mapCenter, setMapCenter] = useState({ lat: -10, lng: -55 })
  const [mapZoom, setMapZoom] = useState(2);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [casesTable, setCasesTable] = useState('cases')
  const [dateSelected,setDateSelected] = useState(false)
  const [bgImage, setBgImage] = useState(defaultImageInfobox)

  const handleCountriesData = () => {
    getCountriesData()
      .then((data) => {
        setLoading(false)
        setCountries(data)
        let sortedData = sortData(data, casesTable)
        setTableData(sortedData)
      })
      .catch(() => {
        setLoading(false)
        setError('hubo un error de conexión obteniendo los datos')
      })
  }

  const handleGlobalData = (value) => {
    getGlobalData()
      .then((data) => {
        if(error) setError(null)
        setLoading(false)
        setCountryInfo(data)
        setCountry("all")
        if(value==='all') setBgImage(defaultImageInfobox)
      })
      .catch(()=> {
        alert('hubo un error de conexión obteniendo los datos')
      })
  }

  const orderDataTotal = () => {
    let sortedData = sortData(countries,'cases')
    setTableData(sortedData)
    setCasesTable('cases')
  }

  const orderDataToday = () => {
    let sortedData = sortData(countries,'todayCases')
    setTableData(sortedData)
    setCasesTable('todayCases')
  }

  const handleCountry = async (countryValue) => {
    setDateSelected(true)
    if(!isMediumDevice){
      if(countryValue.target.value==='all'){
        setDateSelected(false)
        setCountry(countryValue.target.value)
        setMapZoom(1)
      return handleGlobalData('all')
      }
    }
    getCountriesData(countryValue,isMediumDevice)
      .then((data) => {
        if(error) setError(null)
        setCountryInfo(data)
        setCountry(data.countryInfo.iso2)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
        setCountry(!isMediumDevice?countryValue.target.value:data.country)
        setBgImage(data.countryInfo.flag)
      })
      .catch(()=>{
        setError('hubo un error obteniendo los datos')
      })
  };

  useEffect(() => {
    handleGlobalData()
    handleCountriesData()
  }, []);

  return (
    <>
    <div className="app">
      <Title title={'Estadísticas globales Covid-19'} />
      {!isMediumDevice &&
        <div className="selectCountryResponsive">
          <FormControl>
            <Select
              variant="outlined"
              value={country}
              onChange={handleCountry}
            >
              <MenuItem value="all">Global</MenuItem>
                {countries.map((country) => ( 
                  <MenuItem value={country.countryInfo.iso2} key={country.country}>{country.country}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      }
      <div className="mainContent">
        {isMediumDevice&& 
          <div className="mainTable">
            <Card className="cardApp">
              <CardContent>
                <div className="cardInfo">
                  <p style={{textAlign:'center',marginBottom:'0.75rem'}}>Casos contabilizados</p>
                  <SelectCases  
                    orderDataTotal={orderDataTotal}
                    orderDataToday={orderDataToday}
                    orderDataGlobal={handleGlobalData}
                    dateSelected={dateSelected}
                    setDateSelected={setDateSelected}
                    setBgImage={setBgImage}
                    defaultImageInfobox={defaultImageInfobox}
                  /> 
                  <Table
                    countries={tableData}
                    loading = {loading} 
                    error = {error}
                    casesTable={casesTable}
                    handleCountry = {handleCountry}
                    setBgImage={setBgImage}
                  />
                </div>
              </CardContent>
            </Card>
          </div> 
        }
        <div className="mapAndInfox">
          <Map 
            countries={countries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
            casesTable={casesTable}
          />
          <h2>Estadísticas{country==="all"?' alrededor del mundo':` en ${countryInfo.country}`}</h2>
          {!isMediumDevice &&
            <SelectCases  
              orderDataTotal={orderDataTotal}
              orderDataToday={orderDataToday}
              orderDataGlobal={handleGlobalData}
              dateSelected={dateSelected}
              setDateSelected={setDateSelected}
              setBgImage={setBgImage}
              defaultImageInfobox={defaultImageInfobox}
            /> 
          }
          <div className="appStats">
            <div className="infoboxes">
              <Infoboxes
                setCasesType = {setCasesType}
                casesTable={casesTable}
                countryInfo={countryInfo}
                loading={loading}
                error = {error}
                bgImage = {bgImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
          <p style={{fontSize:'0.75rem'}}>
          desarrollado por:  
          <a href="https://ymportfolio.herokuapp.com/" target="_blank" style={{textDecoration:'none'}}>
            Manuel Parra</a></p>
    </footer>
    </>
  );
};

export default App;