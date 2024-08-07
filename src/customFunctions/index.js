export const dateFixerFn = (value, hour) => {
  const dateSelected = value.toString().split(' ');
  const selectedDay = dateSelected[0];
  const selectedDate = dateSelected[2];
  const selectedMonth = dateSelected[1];
  const selectedYear = dateSelected[3];
  const selectedHour = hour;
  const fixedDate = [
    selectedDay,
    selectedDate,
    selectedMonth,
    selectedYear,
    selectedHour,
    'GMT'
  ];
  return fixedDate.join(' ');
};
