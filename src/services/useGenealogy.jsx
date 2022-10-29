import { useEffect } from "react";
//import genealogyData from "../data/temp.json";
import _ from "lodash";
import { TreeUtils } from "./TreeUtils";
import { useState } from "react";
//import APIUtils from "./APIUtils";
import useMasters from "./useMasters";
import useAPIs from "./useAPIs";

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
  isBerthEnabled: (Boolean, false),
  relation: (String, ""),
  relationId: (Number, 0),
  position: (Number, 0),
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
  isBerthEnabled: false,
  relation: "",
  relationId: 0,
  position: 0,
};

const useGenealogy = (loggedInUserId) => {
  const { apiError, getData, postData } = useAPIs();
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
    setLoading(false);
    setError(apiError);
  }, [apiError]);

  useEffect(() => {
    if (loggedInUserId) {
      setLoading(true);
      //fetchDistributorDetails(loggedInUserId.distributor_id);
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

  const fetchDistributorDetails = (selectedDistributorId) => {
    setDistributorGVStats(null);
    setDistributorMemberStats(null);
    setDistributorStats(null);
    //alert(selectedDistributorId);
    postData(
      "/reports/fetch-geneology-details-activity-details",
      {
        distributor_id: selectedDistributorId,
      },
      (stats) => {
        //resetError();
        setDistributorStats(stats);
        console.log(stats);
      }
    );

    postData(
      "/reports/fetch-geneology-details-team-count",
      {
        distributor_id: selectedDistributorId,
      },
      (stats) => {
        //resetError();
        setDistributorMemberStats(stats);
        console.log(stats);
      }
    );

    postData(
      "/reports/fetch-geneology-details-group-volume",
      {
        distributor_id: selectedDistributorId,
      },
      (stats) => {
        //resetError();
        setDistributorGVStats(stats);
        console.log(stats);
      }
    );
  };

  const getTreeData = (payload, direction = null) => {
    setLoading(true);
    postData(
      direction
        ? `/enrollment/${direction}`
        : "/enrollment/load-geneology-redis",
      payload,
      (apiData) => {
        //resetError();
        setGenealogyData(Array.from(apiData));
        fetchDistributorDetails(payload.distributor_id);
      }
    );
  };

  const processGenealogyData = (treeNodes = []) => {
    if (treeNodes.length > 0) {
      //console.clear();
      console.log(treeNodes);
      // console.log(ranksList);

      const processedNodes = [];
      treeNodes.map((node, index) => {
        const currentNodeProperties = treeNodes[index][0].properties;
        const currentNodeNodes = treeNodes[index][1].nodes;
        const currentNodeEdges = treeNodes[index][1].edges;

        if (currentNodeProperties) {
          const { distId, name, activityStatus, achievedRankId } =
            currentNodeProperties;
          const foundRank =
            ranks.filter(
              (x) => parseInt(x.id) === parseInt(achievedRankId)
            )[0] ?? "Independent Distributor";
          const rankBadgeImage = foundRank.title + ".png";

          const newNode = _.clone(treeNode);
          newNode.isBerthEnabled = Boolean(
            currentNodeProperties.isBerthEnabled
          );
          newNode.id = distId;
          newNode.distId = distId;
          newNode.name = name;
          newNode.activityStatus = activityStatus;
          newNode.achievedRankId = achievedRankId;
          newNode.rankBadge = rankBadgeImage;
          newNode.isRoot = currentNodeEdges.length === 0;
          const edgeToConsider =
            currentNodeEdges.length > 0
              ? currentNodeEdges[currentNodeEdges.length - 1]
              : null;

          newNode.relation = edgeToConsider ? edgeToConsider.relation : "";
          newNode.relationId = edgeToConsider
            ? edgeToConsider.properties.relation_id
            : 0;

          newNode.position = 0;

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

  const getPendingEnrolleesFor = (
    distributorId,
    placement_distributor_id,
    onSuccess
  ) => {
    setLoading(true);
    setPendingEnrolleesList(null);
    setPlacementPositions(null);
    postData(
      "/enrollment/fetch-pending-enrollee-list",
      {
        distributor_id: distributorId,
        section_level: 5,
      },
      (enrolleesList) => {
        postData(
          "/enrollment/fetch-available-position",
          {
            placement_distributor_id: placement_distributor_id,
          },
          (positionsList) => {
            //resetError();
            console.log(positionsList);
            setPlacementPositions(Array.from(positionsList.valid_position_ist));
            onSuccess(enrolleesList, positionsList);
            console.log(enrolleesList);
            setPendingEnrolleesList(enrolleesList);
          }
        );
        //resetError();
      }
    );
  };

  const enrollDistributor = (enrollmentDetails, selectedDistributor) => {
    setLoading(true);
    postData("/enrollment/create-new-distributor", enrollmentDetails, () => {
      //resetError();
      getTreeData({
        distributor_id: selectedDistributor,
        depth: 2,
      });
    });
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

  const navigateTreeToOneLevelUp = (rootDistributor) => {
    getTreeData(
      {
        root_distributor_id: rootDistributor,
        depth: 2,
      },
      "load-one-level-up"
    );
  };

  return {
    distributorGVStats,
    distributorMemberStats,
    distributorStats,
    enrollDistributor,
    genealogyError,
    getPendingEnrolleesFor,
    getTreeData,
    loading,
    navigateTreeTo,
    navigateTreeToOneLevelUp,
    pendingEnrolleesList,
    placementPositions,
    ranks,
    treeData,
    fetchDistributorDetails,
  };
};

export default useGenealogy;
