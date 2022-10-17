import { useState } from "react";
import { useEffect } from "react";
import APIUtils from "./APIUtils";

const useEnrollment = (distributorId) => {
  const [enrollmentMasterData, setEnrollmentMasterData] = useState(null);
  const [enrollmentError, setError] = useState(null);
  const [enrollmentLoading, setLoading] = useState(false);
  const [locationDetails, setLocationDetaills] = useState(null);
  const [pendingEnrollments, setPendingEnrollments] = useState(null);

  useEffect(() => {
    if (distributorId) {
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

      APIUtils.postData(
        "/enrollment/fetch-pending-enrollee-list",
        {
          distributor_id: distributorId,
          section_level: null,
        },
        setPendingEnrollments,
        setError
      );
    }
  }, [distributorId]);

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
    {
      enrollmentMasterData,
      getLocationDetails,
      locationDetails,
      pendingEnrollments,
    },
  ];
};

export default useEnrollment;
