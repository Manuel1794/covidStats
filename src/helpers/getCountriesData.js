export const getCountriesData = async (valueCountry,isMediumDevice) => {
    if(!valueCountry && !isMediumDevice){
        const request = await fetch("https://disease.sh/v3/covid-19/countries")
        const data = await request.json()
        return data
    }else{
        const url =`https://disease.sh/v3/covid-19/countries/${!isMediumDevice?valueCountry.target.value:valueCountry}`
        const request = await fetch(url)
        const data = await request.json()
        return data
    }
}