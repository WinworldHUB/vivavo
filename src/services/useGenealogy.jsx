import { useEffect } from "react";
import useAPI from "./useAPI";
//import genealogyData from "../data/temp.json";
import _ from "lodash";
import { TreeUtils } from "./TreeUtils";
import { useState } from "react";
import APIUtils from "./APIUtils";
import useLocalStorage from "react-use-localstorage";
import useMasters from "./useMasters";
//import useMasters from "./useMasters";

export const treeNode = {
  id: String,
  image: String,
  distId: String,
  name: String,
  activityStatus: String,
  achievedRankId: String,
  isActionNode: (Boolean, false),
  isRoot: (Boolean, false),
  isSelectable: (Boolean, false),
  isSelected: (Boolean, false),
  nodes: [],
  parentDistId: String,
  hide: (Boolean, false),
  rankBadge: (String, "Black Diamond Ambassador.png"),
  expanded: (Boolean, false),
  selected: (Boolean, false),
};

export const treeModel = {
  root: treeNode,
};

export const actionNode = {
  id: "action_node",
  image: "",
  distId: "",
  name: "Enroll",
  activityStatus: "-1",
  achievedRankId: "-1",
  isActionNode: true,
  isRoot: false,
  isSelectable: false,
  isSelected: false,
  parentDistId: String,
  hide: false,
  rankBadge: "AddNode.png",
  expanded: false,
  selected: false,
};

const useGenealogy = (loggedInUserId) => {
  const [treeData, setTreeData] = useState(null);
  const [genealogyData, setGenealogyData] = useState(null);
  const [genealogyError, setError] = useState(null);
  const { ranksList } = useMasters();
  const [ranks, setRanks] = useState(null);
  const [pendingEnrolleesList, setPendingEnrolleesList] = useState(null);
  const [placementPositions, setPlacementPositions] = useState(null);
  const [loading, setLoading] = useState(false);

  const [distributorStats, setDistributorStats] = useState(null);
  const [distributorGVStats, setDistributorGVStats] = useState(null);
  const [distributorMemberStats, setDistributorMemberStats] = useState(null);

  useEffect(() => {
    if (loggedInUserId) {
      setLoading(true);
      APIUtils.postData(
        "/reports/fetch-geneology-details-activity-details",
        {
          distributor_id: loggedInUserId.distributor_id,
        },
        (stats) => {
          resetError();
          setDistributorStats(stats);
          console.log(stats);
        },
        setError
      );

      APIUtils.postData(
        "/reports/fetch-geneology-details-team-count",
        {
          distributor_id: loggedInUserId.distributor_id,
        },
        (stats) => {
          resetError();
          setDistributorMemberStats(stats);
          console.log(stats);
        },
        setError
      );

      APIUtils.postData(
        "/reports/fetch-geneology-details-group-volume",
        {
          distributor_id: loggedInUserId.distributor_id,
        },
        (stats) => {
          resetError();
          setDistributorGVStats(stats);
          console.log(stats);
        },
        setError
      );
    }
  }, [loggedInUserId]);

  useEffect(() => {
    if (ranksList) setRanks(ranksList);
  }, [ranksList]);

  useEffect(() => {
    if (genealogyData) {
      processGenealogyData(genealogyData.map((x) => x._values));
    }
  }, [genealogyData]);

  useEffect(() => {
    if (genealogyError) setLoading(false);
  }, [genealogyError]);

  const getTreeData = (payload, direction = null) => {
    setLoading(true);
    APIUtils.postData(
      direction
        ? `/enrollment/${direction}`
        : "/enrollment/load-geneology-redis",
      payload,
      (apiData) => {
        resetError();
        setGenealogyData(Array.from(apiData));
      },
      setError
    );
  };

  const processGenealogyData = (treeNodes = []) => {
    if (treeNodes.length > 0) {
      //console.clear();
      // console.log(ranksList);

      const processedNodes = [];
      treeNodes.map((node, index) => {
        const currentNodeProperties = treeNodes[index][0].properties;
        const currentNodeNodes = treeNodes[index][1].nodes;
        const currentNodeEdges = treeNodes[index][1].edges;

        if (currentNodeProperties) {
          const { distId, name, activityStatus, achievedRankId } =
            currentNodeProperties;
          const foundRank = ranks.filter(
            (x) => parseInt(x.id) === parseInt(achievedRankId)
          )[0];
          const rankBadgeImage = foundRank.title + ".png";

          const newNode = _.clone(treeNode);
          newNode.id = distId;
          newNode.distId = distId;
          newNode.name = name;
          newNode.activityStatus = activityStatus;
          newNode.achievedRankId = achievedRankId;
          newNode.rankBadge = rankBadgeImage;
          newNode.isRoot = currentNodeEdges.length === 0;

          if (currentNodeEdges.length > 0) {
            newNode.parentDistId =
              currentNodeNodes[currentNodeNodes.length - 2].properties.distId;
          } else {
            newNode.parentDistId = null;
          }

          processedNodes.push(newNode);

          //console.log(processedNodes);
        } else {
          console.log("No properties found");
          console.log(treeNodes[index]);
        }
      });

      setTreeData(TreeUtils.prepareTree(processedNodes));
    }
  };

  const getPendingEnrolleesFor = (distributorId, placement_distributor_id) => {
    setLoading(true);
    APIUtils.postData(
      "/enrollment/fetch-pending-enrollee-list",
      {
        distributor_id: distributorId,
        section_level: 5,
      },
      (enrolleesList) => {
        resetError();
        console.log(enrolleesList);
        setPendingEnrolleesList(enrolleesList);
      },
      setError
    );

    APIUtils.postData(
      "/enrollment/fetch-available-position",
      {
        placement_distributor_id: placement_distributor_id,
      },
      (positionsList) => {
        resetError();
        console.log(positionsList);
        setPlacementPositions(Array.from(positionsList.valid_position_ist));
      },
      setError
    );
  };

  const enrollDistributor = (enrollmentDetails, selectedDistributor) => {
    setLoading(true);
    APIUtils.postData(
      "/enrollment/create-new-distributor",
      enrollmentDetails,
      () => {
        resetError();
        getTreeData({
          distributor_id: selectedDistributor,
          depth: 2,
        });
      },
      setError
    );
  };

  const navigateTreeTo = (direction, selectedDistributor) => {
    getTreeData(
      {
        distributor_id: selectedDistributor,
        depth: 2,
      },
      direction
    );
  };

  const resetError = () => {
    setLoading(false);
    setError(null);
  };

  return {
    genealogyError,
    ranks,
    treeData,
    getTreeData,
    pendingEnrolleesList,
    getPendingEnrolleesFor,
    placementPositions,
    enrollDistributor,
    navigateTreeTo,
    loading,
    distributorStats,
    distributorMemberStats,
    distributorGVStats
  };
};

export default useGenealogy;
