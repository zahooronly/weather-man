import { weatherData } from "./weather-data.js";

const extractYear = (item) => {
  if (item.date) return parseInt(item.date.split("-")[0]);
};
const extractMonth = (item) => {
  if (item.date) return parseInt(item.date.split("-")[1]);
};
const extractDay = (item) => {
  if (item.date) return parseInt(item.date.split("-")[2]);
};
const extractMaxTemperature = (item) => {
  if (item.maxTemperatureC) return parseInt(item.maxTemperatureC);
};
const extractMinTemperature = (item) => {
  if (item.minTemperatureC) return parseInt(item.minTemperatureC);
};
const extractHumidity = (item) => {
  if (item.maxHumidity) return parseInt(item.maxHumidity);
};

console.log(extractYear(weatherData[0]));
console.log(extractMonth(weatherData[0]));
console.log(extractDay(weatherData[0]));
console.log(extractMaxTemperature(weatherData[0]));
console.log(extractMinTemperature(weatherData[0]));
console.log(extractHumidity(weatherData[0]));

const maxValue = (arr) => {
  let maxValue = 0;
  for (let temp in arr) {
    if (arr[temp] > maxValue) maxValue = temp;
  }
  return maxValue;
};

const yearlyData = (year) => {
  let stats = {
    maxTemp: {
      value: 0,
      index: 0,
    },
    minTemp: {
      value: 200,
      index: 0,
    },
    mostHumidity: {
      value: 0,
      index: 0,
    },
  };
  const yearly = weatherData.filter((item) => year == extractYear(item));
  yearly.map((item, index) => {
    let maxTemp = extractMaxTemperature(item);
    let minTemp = extractMinTemperature(item);
    let mostHumidity = extractHumidity(item);
    if (maxTemp > stats.maxTemp.value) {
      stats.maxTemp.value = maxTemp;
      stats.maxTemp.index = index;
    }
    if (minTemp < stats.minTemp.value) {
      stats.minTemp.value = minTemp;
      stats.minTemp.index = index;
    }
    if (mostHumidity > stats.mostHumidity.value) {
      stats.mostHumidity.value = mostHumidity;
      stats.mostHumidity.index = index;
    }
  });
  return stats;
};

console.log(yearlyData(2010));
