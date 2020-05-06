const getFuturePoint = (point, date) => {
  const startDate = point.startTime;

  return date < startDate;
};

const getFuturePoints = (points, date) => points.filter((point) => getFuturePoint(point, date));

const getPastPoint = (point, date) => {
  const startDate = point.startTime;

  return date > startDate;
};

const getPastPoints = (points, date) => points.filter((point) => getPastPoint(point, date));

const filterTypes = {
  'everything': (points) => points,
  'future': (points, nowDate) => getFuturePoints(points, nowDate),
  'past': (points, nowDate) => getPastPoints(points, nowDate)
};

export const getPointsByFilter = (points, filterType) => {
  const nowDate = new Date();

  return filterTypes[filterType](points, nowDate);
};
