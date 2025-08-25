import { months } from "./constants.js";
export const extractYear = (item) => parseInt(item?.date?.split("-")[0]);
export const extractMonth = (item) => parseInt(item?.date?.split("-")[1]);
export const extractDay = (item) => parseInt(item?.date?.split("-")[2]);

export const getMonthNameFromNumber = (n) => {
  return months[n - 1];
};
