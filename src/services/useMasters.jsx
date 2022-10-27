import _ from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import useAPIs from "./useAPIs";

const useMasters = () => {
  const [ranks, setRanks] = useLocalStorage("ranks", null);
  const [ranksList, setRanksList] = useState(null);
  const [mastersError, setError] = useState(null);
  const { apiError, postData, getData } = useAPIs();

  useEffect(() => {
    setError(apiError);
  }, [apiError]);

  const [distributor, setDistributor] = useLocalStorage("distributor", null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (distributor && distributor !== "") {
      const distributorFromLocalStorage = JSON.parse(distributor);

      setLoggedInUser(distributorFromLocalStorage);
    }

    if (ranks && ranks !== "") {
      const ranksFromLocalStorage = JSON.parse(ranks);

      setRanksList(ranksFromLocalStorage);
    } else {
      getData("/enrollment/fetch-rank-list", (ranksData) => {
        setRanksList(ranksData);
        setRanks(JSON.stringify(ranksData));
      });
    }
  }, []);

  const updateDistributor = (distributorDetails) => {
    if (distributorDetails) {
      setDistributor(JSON.stringify(distributorDetails));
      setLoggedInUser(distributorDetails);
    }
  };

  const getNotifications = (distributor_id, onSuccess) => {
    postData(
      "/enrollment/fetch-dist-notification",
      { distributor_id: distributor_id ?? 0 },
      (data) => {
        onSuccess(data);
      }
    );
  };

  return {
    ranksList,
    mastersError,
    loggedInUser,
    updateDistributor,
    getNotifications,
  };
};

export default useMasters;
