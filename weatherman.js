import { weatherData } from "./weather-data.js";
import {
  extractYear,
  extractDay,
  extractHumidity,
  extractMaxTemperature,
  extractMinTemperature,
  extractMonth,
  monthNumberToName,
} from "./utils.js";

const monthlyValue = (yearSlashMonth) => {
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
  const monthlyValues = monthlyValue(yearSlashMonth);
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
  if (monthlyValues) {
    monthlyValues.map((item) => {
      monthlyTotal.totalHighTemp += extractMaxTemperature(item);
      monthlyTotal.totalLowTemp += extractMinTemperature(item);
      monthlyTotal.totalHumidity += extractHumidity(item);
    });
  }
  const totalDays = monthlyValues.length;

  result.averageHighTemp = Math.floor(monthlyTotal.totalHighTemp / totalDays);
  result.averageLowTemp = Math.floor(monthlyTotal.totalLowTemp / totalDays);
  result.averageHumidity = Math.floor(monthlyTotal.totalHumidity / totalDays);

  return [
    `Highest average: ${result.averageHighTemp}C`,
    `Lowest average: ${result.averageLowTemp}C`,
    `Average Mean Humidity: ${result.averageHumidity}%`,
  ];
};
const dailyData = (yearSlashMonth) => {
  const monthlyValues = monthlyValue(yearSlashMonth);
  let output = [];
  monthlyValues.map((item) => {
    output.push(
      [
        `${extractDay(item)} ${"+".repeat(
          extractMaxTemperature(item)
        )} ${extractMaxTemperature(item)}C`,
      ],
      [
        `${extractDay(item)} ${"+".repeat(
          extractMinTemperature(item)
        )} ${extractMinTemperature(item)}C`,
      ]
    );
  });
  return output;
};

console.log(yearlyData(2010));
console.log(monthlyData("2010/4"));
console.log(dailyData("2010/4"));
