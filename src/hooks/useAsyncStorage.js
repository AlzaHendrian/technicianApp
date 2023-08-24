import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to install the package

// Custom hook to handle AsyncStorage operations
const useAsyncStorage = (key) => {
  const [value, setValue] = useState(null);

  // Fetch data from AsyncStorage when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setValue(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    }

    fetchData();
  }, [key]);

  // Store data in AsyncStorage
  const storeValue = async (newValue) => {
    try {
      const jsonValue = JSON.stringify(newValue);
      await AsyncStorage.setItem(key, jsonValue);
      setValue(newValue);
    } catch (error) {
      console.error('Error storing data in AsyncStorage:', error);
    }
  };

  // Remove data from AsyncStorage
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
    }
  };

  return {value, storeValue, removeValue};
};

export default useAsyncStorage;
