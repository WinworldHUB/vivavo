import { useState } from "react";
import { BASE_URL } from "./Constants";

const useAPI = ()  => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const postData = (url, inputData) => { 
    try {
      resetError();
      fetch(BASE_URL.concat(url), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData ?? {}),
      })
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => {
          setError(error);
        });
    } catch (error) {
      setError(error);
      console.log("In catch");
    }
  }

  const getData = (url = String, inputData = Object) => { 
    try {
      resetError();
      fetch(BASE_URL.concat(url), {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData ?? {}),
      })
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => {
          setError(error);
        });
    } catch (error) {
      setError(error);
      console.log("In catch");
    }
  }

  const resetError = () => {
    setError(null);
  };

  return [ data, error, {postData, getData }];
};

export default useAPI;
