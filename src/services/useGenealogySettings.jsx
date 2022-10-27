import { useMemo, useEffect, useState } from "react";
import useAPIs from "./useAPIs";
//import APIUtils from "./APIUtils";

const useGenealogySettings = (distributorId) => {
  const { apiError, postData, getData } = useAPIs();
  const [preferences, setPreferences] = useState(null);
  const [settingsError, setError] = useState(null);
  const [positions, setPositions] = useState(null);
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

  const fetchPreferences = () => {
    if (distributorId) {
      //setLoading(true);
      setPreferences(null);
      postData(
        "/enrollment/fetch-dist-preferences",
        {
          distributor_id: distributorId,
        },
        (data) => {
          //setLoading(false);
          setPreferences(data);
        }
      );
    }
  };

  const savePreferences = (newPreferences) => {
    //setLoading(true);
    if (newPreferences) {
      postData("/enrollment/set-dist-preferences", newPreferences, () => {
        fetchPreferences();
        //setLoading(false);
      });
    }
  };

  const fetchPositions = () => {
    getData("/enrollment/fetch-position-master-list", setPositions);
  };

  useEffect(() => {
    if (distributorId) {
      fetchPositions();
      fetchPreferences();
    }
  }, [distributorId]);

  // useMemo(() => {
  //   if (distributorId) {
  //     fetchPreferences();
  //   }
  // }, [distributorId]);

  return {
    preferences,
    settingsError,
    fetchPreferences,
    savePreferences,
    positions,
  };
};

export default useGenealogySettings;
