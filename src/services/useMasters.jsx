import _ from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import APIUtils from "./APIUtils";
import useAPI from "./useAPI";

const MastersModel = {
  ranks: (Array, []),
};

const useMasters = () => {
  const [ranks, setRanks] = useLocalStorage("ranks", null);
  const [ranksList, setRanksList] = useState(null);
  const [mastersError, setError] = useState(null);

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
      APIUtils.getData(
        "/enrollment/fetch-rank-list",
        (ranksData) => {
          setRanksList(ranksData);
          setRanks(JSON.stringify(ranksData));
        },
        setError
      );
    }
  }, []);

  const updateDistributor = (distributorDetails) => {
    if (distributorDetails) {
      setDistributor(JSON.stringify(distributorDetails));
      setLoggedInUser(distributorDetails);
    }
  };

  return { ranksList, mastersError, loggedInUser, updateDistributor };
};

export default useMasters;
