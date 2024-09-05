const useLocalStorage = () => {
  const getItem = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error retrieving item from localStorage', error);
      return null;
    }
  };

  const setItem = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in localStorage', error);
      return null;
    }
  };

  return {
    getItem,
    setItem
  };
};

export default useLocalStorage;
