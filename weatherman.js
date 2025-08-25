import { weatherData } from "./weather-data.js";
import {
  extractYear,
  extractDay,
  extractMonth,
  getMonthNameFromNumber,
} from "./utils.js";

const getMonthlyData = (yearSlashMonth) => {
  const year = parseInt(yearSlashMonth.split("/")[0]);
  const month = parseInt(yearSlashMonth.split("/")[1]);
  const result = weatherData.filter((item) => {
    if (extractYear(item) == year && extractMonth(item) == month) return item;
  });
  return result;
};

const getYearlyStats = (year) => {
  let stats = {
    maxTemp: weatherData[0],
    minTemp: weatherData[0],
    mostHumidity: weatherData[0],
  };

  weatherData
    .filter((item) => year == extractYear(item))
    .forEach((item) => {
      let maxTemp = parseInt(item.maxTemperatureC);
      let minTemp = parseInt(item.minTemperatureC);
      let mostHumidity = parseInt(item.maxHumidity);

      if (maxTemp > stats.maxTemp.maxTemperatureC) {
        stats.maxTemp = item;
      }
      if (minTemp < stats.minTemp.minTemperatureC) {
        stats.minTemp = item;
      }
      if (mostHumidity > stats.mostHumidity.maxHumidity) {
        stats.mostHumidity = item;
      }
    });
  return [
    `Highest: ${stats.maxTemp.maxTemperatureC}C on ${getMonthNameFromNumber(
      extractMonth(stats.maxTemp)
    )} ${extractDay(stats.maxTemp)}`,
    `Lowest: ${stats.minTemp.minTemperatureC}C on ${getMonthNameFromNumber(
      extractMonth(stats.minTemp)
    )} ${extractDay(stats.minTemp)}`,
    `Humidity: ${stats.mostHumidity.maxHumidity}% on ${getMonthNameFromNumber(
      extractMonth(stats.mostHumidity)
    )} ${extractDay(stats.mostHumidity)}`,
  ];
};

const getMonthlyStatistics = (yearSlashMonth) => {
  const monthlyValues = getMonthlyData(yearSlashMonth);
  let monthlyTotal = {
    totalHighTemp: 0,
    totalLowTemp: 0,
    totalHumidity: 0,
  };
  if (monthlyValues) {
    monthlyValues.forEach((item) => {
      monthlyTotal.totalHighTemp += parseInt(item.maxTemperatureC);
      monthlyTotal.totalLowTemp += parseInt(item.minTemperatureC);
      monthlyTotal.totalHumidity += parseInt(item.maxHumidity);
    });
  }
  const totalDaysOfMonth = monthlyValues.length;

  return [
    `Highest average: ${(monthlyTotal.totalHighTemp / totalDaysOfMonth).toFixed(
      2
    )}C`,
    `Lowest average: ${(monthlyTotal.totalLowTemp / totalDaysOfMonth).toFixed(
      2
    )}C`,
    `Average Mean Humidity: ${(
      monthlyTotal.totalHumidity / totalDaysOfMonth
    ).toFixed(2)}%`,
  ];
};
const getDailyStats = (yearSlashMonth) => {
  const monthlyValues = getMonthlyData(yearSlashMonth);
  let output = [];
  monthlyValues.forEach((item) => {
    output.push([
      `${extractDay(item)} ${"+".repeat(
        parseInt(item.maxTemperatureC)
      )} ${parseInt(item.maxTemperatureC)}C  ${extractDay(item)} ${"+".repeat(
        parseInt(item.minTemperatureC)
      )} ${parseInt(item.minTemperatureC)}C`,
    ]);
  });
  return output;
};

console.log(getYearlyStats(2015));
console.log(getMonthlyStatistics("2010/4"));
console.log(getDailyStats("2010/4"));
