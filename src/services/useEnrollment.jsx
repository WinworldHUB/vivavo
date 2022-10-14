import { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import APIUtils from "./APIUtils";

const useEnrollment = (loggedInUser) => {
  const [enrollmentMasterData, setEnrollmentMasterData] = useState(null);
  const [enrollmentError, setError] = useState(null);
  const [enrollmentLoading, setLoading] = useState(false);
  const [locationDetails, setLocationDetaills] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      setLoading(true);
      // Load all init data here
      APIUtils.getData(
        "/enrollment/fetch-enrolment-form-master-data",
        (data) => {
          setLoading(false);
          setEnrollmentMasterData(data);
        },
        setError
      );
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (enrollmentError) {
      setLoading(false);
    }
  }, [enrollmentError]);

  const getLocationDetails = (pincode) => {
    setLoading(true);
    APIUtils.getData(
      `/sales/location/list/${pincode}`,
      (locationDetails) => {
        setLoading(false);
        setLocationDetaills(locationDetails);
      },
      setError
    );
  };


  
  return [
    enrollmentError,
    enrollmentLoading,
    { enrollmentMasterData, locationDetails, getLocationDetails },
  ];
};

export default useEnrollment;
