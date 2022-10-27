import _ from "lodash";
import { useState } from "react";
import { BASE_URL } from "./Constants";

const useAPIs = () => {
  const [apiError, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleError = (error, onFailure) => {
    setProcessing(false);
    onFailure && onFailure(error);
    console.log(error);
    setError(error);
  };

  const handleCatch = (error, onFailure) => {
    setProcessing(false);
    onFailure && onFailure(error);
    console.log("In catch");
    console.log(error);
    setError(error);
  };

  const postData = (url, inputData, onSuccess, onFailure) => {
    try {
      setError(null);
      setProcessing(true);
      fetch(BASE_URL.concat(url), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData ?? {}),
      })
        .then((res) => {
          res.headers.forEach((x) => console.log(x));
          return res.json();
        })
        .then((data) => {
          setProcessing(false);
          if (data && data.status === "success") {
            onSuccess && onSuccess(data.data);
            return;
          } else {
            handleError(data?.message, onFailure);
            return;
          }
        })
        .catch((error) => {
          handleError(error, onFailure);
        });
    } catch (error) {
      handleCatch(error, onFailure);
    }
  };

  const postFormData = (url, inputData, onSuccess, onFailure) => {
    try {
      setError(null);
      setProcessing(true);
      fetch(BASE_URL.concat(url), {
        method: "POST",
        body: inputData,
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
          if (data && data.status === "success") {
            onSuccess && onSuccess(data.data);
            return;
          } else {
            handleError(data?.message, onFailure);
            return;
          }
        })
        .catch((error) => {
          handleError(error, onFailure);
        });
    } catch (error) {
      handleCatch(error, onFailure);
    }
  };

  const getData = (url, onSuccess, onFailure) => {
    try {
      setError(null);
      setProcessing(true);
      fetch(BASE_URL.concat(url), {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
          if (data && data.status === "success") {
            onSuccess && onSuccess(data.data);
            return;
          } else {
            handleError(data?.message, onFailure);
            return;
          }
        })
        .catch((error) => {
          handleError(error, onFailure);
        });
    } catch (error) {
      handleCatch(error, onFailure);
    }
  };

  const getExternalData = (url, onSuccess, onFailure) => {
    try {
      setError(null);
      setProcessing(true);
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
          if (data && data.status === "success") {
            onSuccess && onSuccess(data.data);
            return;
          } else {
            handleError(data?.message, onFailure);
            return;
          }
        })
        .catch((error) => {
          handleError(error, onFailure);
        });
    } catch (error) {
      handleCatch(error, onFailure);
    }
  };

  return {
    apiError,
    processing,
    postData,
    postFormData,
    getData,
    getExternalData,
  };
};

export default useAPIs;
