import numeral from "numeral";

export const sortData = (data,valueOrder) => {
  let sortedData = [...data];
  if(valueOrder === 'cases') {
    sortedData.sort((a, b) => {
      if (a.cases > b.cases) {
        return -1;
      } else {
        return 1;
      }
    })
    return sortedData;
  }
  if(valueOrder === 'todayCases') {
    sortedData.sort((a, b) => {
      if (a.todayCases > b.todayCases) {
        return -1;
      } else {
        return 1;
      }
    })
    return sortedData;
  }
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
