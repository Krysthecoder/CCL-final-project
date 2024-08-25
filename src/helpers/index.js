import { utilsData } from '../utils/utilsData';

export const dateExtractor = (dateString) => {
  const dateMatch = dateString.match(/(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    return dateMatch[0];
  } else {
    return null;
  }
};

export const timeExtractor = (dateString) => {
  const timeMatch = dateString.match(/T(\d{2}:\d{2}:\d{2})/);
  if (timeMatch) {
    return timeMatch[1];
  } else {
    return null;
  }
};

export const appointmentDeleter = async (appointmentID) => {
  console.log(
    `${utilsData.apiURL}${utilsData.apiDeleteAppointment}/${appointmentID}`
  );
  try {
    const response = await fetch(
      `${utilsData.apiURL}${utilsData.apiDeleteAppointment}/${appointmentID}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('fetchedToken')
        }
      }
    );
    if (!response.ok) {
      console.log(response);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
