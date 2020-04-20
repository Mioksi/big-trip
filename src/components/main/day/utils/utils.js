const getTripDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getTripDays = (dates) => {
  return Array.from(new Set(dates.map((date) => Date.parse(getTripDate(date.startTime)))));
};
