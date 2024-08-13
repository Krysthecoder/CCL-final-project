
export const dateFixerFn = (value, hour) => {
  const dateSelected = value.toString().split(' ');
  
  const [ selectedDay, selectedMonth, selectedDate, selectedYear ] = dateSelected
  
  return [
    selectedDay,
    selectedDate,
    selectedMonth,
    selectedYear,
    hour,
    'GMT'
  ].join(' ');
};

//toto change the  customFun name to helpers Dir