import React from 'react'
import InfoBox from './InfoBox';
import './InfoBox.css';

import { prettyPrintStat } from '../../util/util';

const Infoboxes = ({setCasesType,casesTable,countryInfo,
                    loading,error,bgImage}) => {

    return (
        <div className="infoboxes">
            <InfoBox  
                  onClick={(e) => setCasesType("cases")}
                  title="Contagiados"
                  isRed
                  cases={prettyPrintStat(
                    casesTable==='cases'?
                    countryInfo.cases
                    :countryInfo.todayCases
                    )}
                  loading = {loading}
                  error = {error}
                  bgImage={bgImage}
                />
                <InfoBox
                  onClick={(e) => setCasesType("recovered")}
                  title="Recuperados"
                  cases={prettyPrintStat(
                    casesTable==='cases'?
                    countryInfo.recovered
                    :countryInfo.todayRecovered
                  )}
                  loading = {loading}
                  error = {error}
                  bgImage={bgImage}
                />
                <InfoBox
                  onClick={(e) => setCasesType("deaths")}
                  title="Fallecidos"
                  isRed
                  cases={prettyPrintStat(
                    casesTable==='cases'?
                    countryInfo.deaths
                    :countryInfo.todayDeaths
                  )}
                  loading = {loading}
                  error = {error}
                  bgImage={bgImage}
                />
                <InfoBox
                  onClick={(e) => setCasesType("deaths")}
                  title="Casos Activos Totales"
                  isRed
                  cases={prettyPrintStat(countryInfo.active)}
                  loading = {loading}
                  error = {error}
                  bgImage={bgImage}
                />
        </div>
    )
}

export default Infoboxes
