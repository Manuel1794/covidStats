import React from "react";
import "./Table.css";
import numeral from "numeral";
import Error from '../error/Error';
import Spinner from '../../spinner/Spinner';

const Table = ({ countries, 
  loading, error, casesTable, 
  handleCountry,setBgImage }) => {

  return (
    <div className="table">
    {error && <Error error = {error}/>}
    {loading && <Spinner />}
    { 
      countries.map((country) => (
        <tr onClick={()=>{
          setBgImage(country.countryInfo.flag)
          handleCountry(country.countryInfo.iso2)
          }} 
          style={{cursor:'pointer'}} key={country.country}>
          <td>{country.country}</td>
          <td>
            <strong>{
              numeral(casesTable==='cases'?country.cases:country.todayCases).format("0,0")}
              </strong>
          </td>
        </tr>
      ))
    }
    </div>
  );
}

export default Table;
