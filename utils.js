export const extractYear = (item) => {
  if (item.date) return parseInt(item.date.split("-")[0]);
};
export const extractMonth = (item) => {
  if (item.date) return parseInt(item.date.split("-")[1]);
};
export const extractDay = (item) => {
  if (item.date) return parseInt(item.date.split("-")[2]);
};
export const extractMaxTemperature = (item) => {
  if (item.maxTemperatureC) return parseInt(item.maxTemperatureC);
};
export const extractMinTemperature = (item) => {
  if (item.minTemperatureC) return parseInt(item.minTemperatureC);
};
export const extractHumidity = (item) => {
  if (item.maxHumidity) return parseInt(item.maxHumidity);
};

export const monthNumberToName = (n) => {
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
