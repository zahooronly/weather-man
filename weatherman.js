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
  const yearly = weatherData.filter((item) => year == extractYear(item));
  const yearlyMaxTemp = yearly.map((item) => {
    if (extractMaxTemperature(item)) return extractMaxTemperature(item);
  });

  return maxValue(yearlyMaxTemp);
};

console.log(yearlyData(2013));
