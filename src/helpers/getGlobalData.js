export const getGlobalData = async () => {
    const request = await fetch("https://disease.sh/v3/covid-19/all")
    const data = await request.json()
    return data
}