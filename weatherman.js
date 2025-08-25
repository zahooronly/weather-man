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
  return weatherData.filter((item) => {
    if (extractYear(item) == year && extractMonth(item) == month) return item;
  });
};

const getYearlyStats = (year) => {
  const stats = {
    maxTemperatureRecord: weatherData[0],
    minTemperatureRecord: weatherData[0],
    maxHumidityRecord: weatherData[0],
  };

  weatherData
    .filter((item) => year == extractYear(item))
    .forEach((item) => {
      if (
        parseInt(item.maxTemperatureC) >
        stats.maxTemperatureRecord.maxTemperatureC
      )
        stats.maxTemperatureRecord = item;
      if (
        parseInt(item.minTemperatureC) <
        stats.minTemperatureRecord.minTemperatureC
      )
        stats.minTemperatureRecord = item;
      if (parseInt(item.maxHumidity) > stats.maxHumidityRecord.maxHumidity)
        stats.maxHumidityRecord = item;
    });
  return [
    `Highest: ${
      stats.maxTemperatureRecord.maxTemperatureC
    }C on ${getMonthNameFromNumber(
      extractMonth(stats.maxTemperatureRecord)
    )} ${extractDay(stats.maxTemperatureRecord)}`,
    `Lowest: ${
      stats.minTemperatureRecord.minTemperatureC
    }C on ${getMonthNameFromNumber(
      extractMonth(stats.minTemperatureRecord)
    )} ${extractDay(stats.minTemperatureRecord)}`,
    `Humidity: ${
      stats.maxHumidityRecord.maxHumidity
    }% on ${getMonthNameFromNumber(
      extractMonth(stats.maxHumidityRecord)
    )} ${extractDay(stats.maxHumidityRecord)}`,
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
