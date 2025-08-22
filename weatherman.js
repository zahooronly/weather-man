import { weatherData } from "./weather-data.js";
import {
  extractYear,
  extractDay,
  extractMonth,
  monthNumberToName,
} from "./utils.js";

const getMonthlyData = (yearSlashMonth) => {
  const year = parseInt(yearSlashMonth.split("/")[0]);
  const month = parseInt(yearSlashMonth.split("/")[1]);
  const result = weatherData.filter((item) => {
    if (extractYear(item) == year) {
      if (extractMonth(item) == month) {
        return item;
      }
    }
  });
  return result;
};

const getYearlyStats = (year) => {
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
  weatherData
    .filter((item) => year == extractYear(item))
    .map((item, index) => {
      let maxTemp = parseInt(item.maxTemperatureC);
      let minTemp = parseInt(item.minTemperatureC);
      let mostHumidity = parseInt(item.maxHumidity);
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
  const monthlyValues = getMonthlyData(yearSlashMonth);
  let monthlyTotal = {
    totalHighTemp: 0,
    totalLowTemp: 0,
    totalHumidity: 0,
  };
  if (monthlyValues) {
    monthlyValues.map((item) => {
      monthlyTotal.totalHighTemp += parseInt(item.maxTemperatureC);
      monthlyTotal.totalLowTemp += parseInt(item.minTemperatureC);
      monthlyTotal.totalHumidity += parseInt(item.maxHumidity);
    });
  }
  const totalDays = monthlyValues.length;

  return [
    `Highest average: ${Math.floor(monthlyTotal.totalHighTemp / totalDays)}C`,
    `Lowest average: ${Math.floor(monthlyTotal.totalLowTemp / totalDays)}C`,
    `Average Mean Humidity: ${Math.floor(
      monthlyTotal.totalHumidity / totalDays
    )}%`,
  ];
};
const dailyData = (yearSlashMonth) => {
  const monthlyValues = getMonthlyData(yearSlashMonth);
  let output = [];
  monthlyValues.map((item) => {
    output.push([
      `${extractDay(item)} ${"+".repeat(
        parseInt(item.maxTemperatureC)
      )} ${parseInt(item.maxTemperatureC)}C ${extractDay(item)} ${"+".repeat(
        parseInt(item.minTemperatureC)
      )} ${parseInt(item.minTemperatureC)}C`,
    ]);
  });
  return output;
};

console.log(getYearlyStats(2010));
console.log(monthlyData("2010/4"));
console.log(dailyData("2010/4"));
