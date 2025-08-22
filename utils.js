export const extractYear = (item) => parseInt(item.date?.split("-")[0]);
export const extractMonth = (item) => parseInt(item.date?.split("-")[1]);
export const extractDay = (item) => parseInt(item.date?.split("-")[2]);

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
