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
