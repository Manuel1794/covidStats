import React, { useState } from 'react'
import '../../App.css';

const SelectCases = ({orderDataTotal,
    orderDataToday,orderDataGlobal,
    dateSelected,setDateSelected,
    setBgImage,defaultImageInfobox}) => {

    const [casesSelected,setCasesSelected] = useState(true)

    return (
        <div className="selectCases">
            <p  onClick={()=>{
                    setCasesSelected(!casesSelected)
                    orderDataTotal()
                    }} 
                className={`${casesSelected && 'focusSelectedCases'}`}
            >
            Totales
            </p>
            <p  onClick={()=>{
                    setCasesSelected(!casesSelected)
                    orderDataToday()
                }}
                className={`${!casesSelected && 'focusSelectedCases'}`}
            >
            Hoy
            </p>
            {dateSelected &&
                <p  onClick={()=>{
                        setBgImage(defaultImageInfobox)
                        orderDataGlobal()
                        setDateSelected(false)
                    }}
                >
                Global
                </p>
            }
        </div>
    )
}

export default SelectCases