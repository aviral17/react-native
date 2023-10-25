// import { useState, useEffect } from "react";
// import axios from "axios";

// // npm install @react-native-async-storage/async-storage
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const useFetch = (endpoint, query) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const options = {
//     method: "GET",
//     url: `https://jsearch.p.rapidapi.com/${endpoint}`,
//     headers: {
//       "X-RapidAPI-Key": "f1d8a2b6c4mshdf3c1be66a4347dp155a18jsn7bda2b76e062",
//       "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
//     },
//     params: { ...query },
//   };

//   // Save data to AsyncStorage
//   const saveData = async (key, value) => {
//     try {
//       await AsyncStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       setError("Async Storage Error: ", error);
//     }
//   };

//   // Fetch data from AsyncStorage
//   const fetchDataFromStorage = async (key) => {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       if (value !== null) {
//         // We have data!!
//         return JSON.parse(value);
//       }
//     } catch (error) {
//       setError("Async Fetch Data from Storage Error: ", error);
//     }
//   };

//   const fetchData = async () => {
//     setIsLoading(true);

//     try {
//       // Check if data is already cached
//       const cachedData = await fetchDataFromStorage(endpoint);
//       if (cachedData) {
//         setData(cachedData);
//         setIsLoading(false);
//         return;
//       }

//       const response = await axios.request(options);

//       setData(response.data.data);

//       // Save data to cache
//       saveData(endpoint, response.data.data);

//       setIsLoading(false);
//     } catch (error) {
//       setError(error);
//       alert("There is an error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   //   sometimes if we are not able to load the data, this function will help us to refetch the data
//   const refetch = () => {
//     setIsLoading(true);
//     fetchData();
//   };

//   return { data, isLoading, error, refetch };
// };

// export default useFetch;

/* *********************** */

// import { RAPID_API_KEY } from "@env"; // In react-native we cannot directly use 'env' variables, also we installed "dotenv" here

// const rapidApiKey = RAPID_API_KEY;

import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "f1d8a2b6c4mshdf3c1be66a4347dp155a18jsn7bda2b76e062",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
