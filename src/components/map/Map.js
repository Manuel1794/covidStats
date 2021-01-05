import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

function Map({ countries, casesType, center, zoom, casesTable }) {

  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 0.055,
    }, 
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 0.006,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 0.007,
    },
  };

  return (
      <LeafletMap center={center} zoom={zoom} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        /> 
        {
          countries.map((country) => (
            <Circle
              center={[country.countryInfo.lat, country.countryInfo.long]}
              color={casesTypeColors[casesType].hex}
              fillColor={casesTypeColors[casesType].hex}
              fillOpacity={0.4}
              radius={
                casesTable==='cases'?
                country.cases* casesTypeColors[casesType].multiplier
                :country.todayCases
              }
            >
              <Popup>
                <div className="info-container">
                  <div
                    className="info-flag"
                    style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                  ></div>
                  <div className="info-name">{country.country}</div>
                  <div className="info-confirmed">
                    Casos: {numeral(casesTable==='cases'?country.cases:country.todayCases).format("0,0")}
                  </div>
                  <div className="info-recovered">
                    Recuperados: {numeral(casesTable==='cases'?country.recovered:country.todayRecovered).format("0,0")}
                  </div>
                  <div className="info-deaths">
                    Fallecidos: {numeral(casesTable==='cases'?country.deaths:country.todayDeaths).format("0,0")}
                  </div>
                  <div className="info-deaths">
                    Activos: {numeral(country.active).format("0,0")}
                  </div>
                </div>
              </Popup>
            </Circle>
          ))
        }
      </LeafletMap>
  );
}

export default Map;