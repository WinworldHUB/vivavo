import { useState, useEffect } from "react";
import { BASE_URL } from "./Constants";

const useAPI = () => {
  const [data, setData] = useState(null);

  const postData = (url, inputData) =>
    fetch(BASE_URL.concat(url), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData ?? {}),
    })
      .then((res) => res.json())
      .then((data) => setData(data));

  // useEffect(() => {
  //   fetch(BASE_URL.concat(url), {
  //     method: method,
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(inputData ?? {}),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, [url, inputData]);

  return [data, postData];
};

export default useAPI;
