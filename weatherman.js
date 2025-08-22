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

const monthNumberToName = (n) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[n - 1];
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
  let result = [
    `Highest: ${stats.maxTemp.value}C on ${monthNumberToName(
      extractMonth(weatherData[stats.maxTemp.index])
    )} ${extractDay(weatherData[stats.maxTemp.index])}`,
    `Lowest: ${stats.minTemp.value}C on ${monthNumberToName(
      extractMonth(weatherData[stats.minTemp.index])
    )} ${extractDay(weatherData[stats.minTemp.index])}`,
    `Humidity: ${stats.mostHumidity.value}% on ${monthNumberToName(
      extractMonth(weatherData[stats.mostHumidity.index])
    )} ${extractDay(weatherData[stats.mostHumidity.index])}`,
  ];
  return result;
};

const monthlyData = (yearSlashMonth) => {
  const year = parseInt(yearSlashMonth.split("/")[0]);
  const month = parseInt(yearSlashMonth.split("/")[1]);
  let monthlyTotal = {
    totalHighTemp: 0,
    totalLowTemp: 0,
    totalHumidity: 0,
  };
  let result = {
    averageHighTemp: 0,
    averageLowTemp: 0,
    averageHumidity: 0,
  };
  const monthlyValue = weatherData.filter((item) => {
    if (extractYear(item) == year) {
      if (extractMonth(item) == month) {
        return item;
      }
    }
  });
  monthlyValue.map((item) => {
    monthlyTotal.totalHighTemp += extractMaxTemperature(item);
    monthlyTotal.totalLowTemp += extractMinTemperature(item);
    monthlyTotal.totalHumidity += extractHumidity(item);
  });
  console.log(monthlyTotal);
  const totalDays = monthlyValue.length;

  result.averageHighTemp = Math.floor(monthlyTotal.totalHighTemp / totalDays);
  result.averageLowTemp = Math.floor(monthlyTotal.totalLowTemp / totalDays);
  result.averageHumidity = Math.floor(monthlyTotal.totalHumidity / totalDays);

  return result;
};

console.log(monthlyData("2010/4"));
console.log(yearlyData(2010));
