/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";
import WishColoredBar from "../../components/WishColoredBar";
import WishFlexBox from "../../components/WishFlexBox";
import WishGeneologyTree from "../../components/WishGeneologyTree";
import pageConfig from "../../data/config.json";
import data from "../../data/Data.json";
import WishToaster from "../../components/WishToaster";
import { AppUtils } from "../../services/AppUtils";
import moment from "moment";
import ReactSpeedometer from "react-d3-speedometer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useGenealogy from "../../services/useGenealogy";
import useLocalStorage from "react-use-localstorage";
import WishModal from "../../components/WishModal";
import WishListGroup from "../../components/WishListGroup";
import WishButtonGroup from "../../components/WishButtonGroup";
import _ from "lodash";
import {
  LOAD_EXTREME_LEFT,
  LOAD_EXTREME_RIGHT,
  LOAD_PREFERRED_LEFT,
  LOAD_PREFERRED_RIGHT,
} from "../../services/Constants";
import useMasters from "../../services/useMasters";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import LoadingNote from "../../components/LoadingNote";
import { useRef } from "react";
import EmptyNote from "../../components/EmptyNote";

export default function MyGeneology() {
  const [treeNodes, setTreeNodes] = useState(null);
  const [selectedNode, setSelectedNode] = useState(treeNodes);
  const [isRotated, setIsRotated] = useState(true);
  const [filterApplied, applyFilter] = useState(false);

  const [filterText, setFilterText] = useState("");

  const [distributor, setDistributorDetails] = useLocalStorage(
    "distributor",
    ""
  );
  const [loggedInDistributor, setLoggedInDistributor] = useState(null);

  //const [masters, setMasters] = useLocalStorage("masters", "");
  //const [ranks, setRanks] = useState([]);

  const { loggedInUser } = useMasters();

  const {
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
    //fetchDistributorDetails,
  } = useGenealogy(loggedInUser);
  const [selectedDistributor, setSelectedDistributor] = useState(-1);

  const placementStructure = {
    distributor_id: "",
    placement_distributor_id: "",
    placement_position_id: 0,
    sponsor_distributor_id: "",
    dist_temp_id: 0,
  };
  const [selectedPosition, setSelectedPosition] = useState(
    _.cloneDeep(placementStructure)
  );
  const [selectedNodeParentId, setSelectedNodeParentId] = useState(null);

  const [selectedPositionIndex, setSelectedPositionIndex] = useState(null);

  const [selectedEnrolleeIndex, setSelectedEnrolleeIndex] = useState(null);

  const [pageError, setError] = useState(null);

  const WORDS = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
    "Tenth",
  ];

  //const doughnutRef = useRef(null);
  ChartJS.register(ArcElement, Tooltip);

  const data = {
    labels: ["Active Members", "Inactive Members", "Other Members"],
    datasets: [
      {
        data: [
          distributorMemberStats?.Active ?? 0,
          distributorMemberStats?.Inactive ?? 0,
          distributorMemberStats?.Others ?? 0,
        ],
        backgroundColor: ["green", "orange", "red"],
        borderColor: ["green", "orange", "red"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const plugin = {
    id: "custom_text",
    beforeDraw: (chart) => {
      const { ctx } = chart;
      ctx.save();
      ctx.font = "22px comfortaa";
      ctx.fillStyle = "grey";

      let line1 = distributorMemberStats?.Active ?? 0,
        line1X = Math.round((chart.width - ctx.measureText(line1).width) / 2),
        line1Y = chart.height / 2 - 25;
      ctx.fillText(line1, line1X, line1Y + 2);

      ctx.font = "14px comfortaa";
      let line2 = "Active members",
        line2X = Math.round((chart.width - ctx.measureText(line2).width) / 2),
        line2Y = chart.height / 2;
      ctx.fillText(line2, line2X, line2Y + 2);

      ctx.font = "14px comfortaa";
      let line3 =
          "of " +
          (parseInt(distributorMemberStats?.Active) +
            parseInt(distributorMemberStats?.Inactive) +
            parseInt(distributorMemberStats?.Others)),
        line3X = Math.round((chart.width - ctx.measureText(line3).width) / 2),
        line3Y = chart.height / 2 + 25;
      ctx.fillText(line3, line3X, line3Y + 2);
      ctx.restore();
    },
  };

  useEffect(() => {
    //console.log(distributor);
    if (loggedInUser?.distributor_id) {
      setSelectedDistributor(loggedInUser.distributor_id);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (selectedDistributor > -1) {
      getTreeData({
        distributor_id: selectedDistributor,
        depth: 2,
      });
    }
  }, [selectedDistributor]);

  useEffect(() => {
    //console.log(treeData ?? "");
    if (treeData) {
      setTreeNodes(treeData);

      //Load data for selected node
      //fetchDistributorDetails(treeData?.root?.distId ?? 0);
    }
  }, [treeData]);

  useEffect(() => {
    setError(genealogyError);
  }, [genealogyError]);

  useEffect(() => {
    if (pageError) {
      WishToaster({
        toastMessage: pageError,
      });
    }
  }, [pageError]);

  useEffect(() => {
    if (distributorMemberStats) {
      //ChartJS.register(ArcElement, Tooltip);
      //doughnutRef.current?.update();
    }
  }, [distributorMemberStats]);

  useEffect(() => {
    if (placementPositions) {
      console.clear();
      console.log(placementPositions);
    }
  }, [placementPositions]);

  const showAll = function () {
    applyFilter(false);
    setSelectedNode(data.treeData);
    setTreeNodes(data.treeData);
  };

  const searchDistributor = function (filter) {
    var found = null;
    var treeNodesCopy = data.treeData;

    //console.log(filter);

    if (treeNodesCopy.nodes !== undefined) {
      treeNodesCopy.nodes.forEach(function (treenode, index) {
        treenode.selected = false;
        treenode.nodes.forEach((node, index) => {
          node.selected = false;
          if (node.distributorID === filter) {
            //node.hide = true;
            //found = true;
            found = node;
            applyFilter(true);
          }
        });

        if (found === null) {
          if (treenode.distributorID === filter) {
            //treenode.hide = true;
            found = treenode;
            applyFilter(true);
          }
        }
      });

      if (found !== null) {
        found.selected = true;
        setSelectedNode(found);
        setTreeNodes(found);
        WishToaster({
          toastMessage: "Distributor found and set as root",
          toastType: "success",
        });
      } else {
        WishToaster({
          toastMessage: "Distributor not found",
          toastType: "error",
        });
      }
    }
  };

  const filterTree = function (filter) {
    setFilterText(filter);
    if (filter === "") {
      showAll();
    } else {
      searchDistributor(filter);
    }
  };

  const treeTopIcons = function () {
    return (
      <div className="row pl-2 pr-2">
        <button
          className={"d-flex align-items-center text-primary "}
          onClick={() => {
            if (loggedInUser?.distributor_id) {
              setSelectedDistributor(loggedInUser.distributor_id);
              // getTreeData({
              //   distributor_id: selectedDistributor,
              //   depth: 2,
              // });
            }
          }}
        >
          <i className="las la-angle-left"></i>&nbsp;Go Back
        </button>
        &nbsp;&nbsp;
        <button
          className="d-flex align-items-center ml-auto"
          onClick={() => {
            AppUtils.showDialog("dlgSearch");
            //$("#dlgSearch").modal("show");
          }}
        >
          <i className="las la-search"></i>&nbsp;Search
        </button>
        &nbsp;&nbsp;
        <button
          className="d-flex align-items-center btn btn-primary btn-sm shadow"
          data-toggle="dropdown"
          aria-expanded="false"
          // onClick={() => {
          //   setIsRotated(!isRotated);
          // }}
        >
          <i className="las la-route"></i>&nbsp;Navigation
        </button>
        <div className="dropdown-menu">
          <a
            className="dropdown-item"
            href="#"
            onClick={() => {
              navigateTreeTo(LOAD_EXTREME_LEFT, selectedDistributor);
            }}
          >
            To Extreme Left
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => {
              navigateTreeTo(LOAD_EXTREME_RIGHT, selectedDistributor);
            }}
          >
            To Extreme Right
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => {
              navigateTreeTo(LOAD_PREFERRED_LEFT, selectedDistributor);
            }}
          >
            To Preferred Extreme Left
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => {
              navigateTreeTo(LOAD_PREFERRED_RIGHT, selectedDistributor);
            }}
          >
            To Preferred Extreme Right
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              const rootDistributor = treeNodes.root.distId;

              if (
                rootDistributor &&
                parseInt(rootDistributor) !==
                  parseInt(loggedInUser.distributor_id)
              ) {
                navigateTreeToOneLevelUp(rootDistributor);
              } else {
                WishToaster({
                  toastMessage:
                    "You are already at the top of your organization tree.",
                  toastType: "error",
                });
              }
            }}
          >
            To Top
          </a>
        </div>
        &nbsp;&nbsp;
        <Link className="d-flex align-items-center" to="/mygeneologysettings">
          <i className="las la-cog"></i>&nbsp;Settings
        </Link>
      </div>
    );
  };

  function RenderGroupVolumeTile({ details, addTopPadding = false }) {
    return (
      <div className={addTopPadding ? "pt-1" : ""}>
        <div className="border border-light p-1 rounded-lg onhover-shadow">
          <label className="text-primary card-title ">
            {details.title} Organization
          </label>
          <WishFlexBox>
            <span className="lead">{details.subTitle}</span>
            <span className="lead font-weight-bold d-flex align-items-center">
              <i
                className={
                  "las " +
                  (details.direction === "up"
                    ? "la-long-arrow-alt-up text-success"
                    : "la-long-arrow-alt-down text-danger")
                }
              ></i>{" "}
              {details.PV}
            </span>
            <span
              className={
                "lead font-weight-bold " +
                (details.direction === "up" ? "text-success" : "text-danger")
              }
            >
              {details.percentage}%
            </span>
          </WishFlexBox>
        </div>
      </div>
    );
  }

  return (
    <PageLayout {...pageConfig.mygenealogy}>
      <div className="row">
        <div className="col-12">
          {treeNodes ? (
            <WishGeneologyTree
              loading={loading}
              header={treeTopIcons()}
              reverse={isRotated}
              tree={treeNodes.root}
              showBackButton={filterApplied}
              onNodeSelected={(distributorId, isActionNode) => {
                if (!isActionNode) {
                  setSelectedDistributor(distributorId);
                } else {
                  if (distributor !== "") {
                    // const distributorFromLocalStorage = JSON.parse(distributor);
                    getPendingEnrolleesFor(
                      loggedInUser.distributor_id,
                      distributorId,
                      (pendingEnrolleesListData) => {
                        if (
                          pendingEnrolleesListData &&
                          pendingEnrolleesListData.length > 0
                        ) {
                          setSelectedNodeParentId(distributorId);
                          const newPosition = _.cloneDeep(placementStructure);
                          newPosition.dist_temp_id = -1;
                          newPosition.placement_position_id = -1;

                          setSelectedPosition(newPosition);
                          setSelectedPositionIndex(null);
                          setSelectedEnrolleeIndex(null);
                          AppUtils.showDialog("dlgEnroll");
                        } else {
                          setError("No pending enrollees found.");
                          return;
                        }
                      }
                    );
                    // setSelectedNodeParentId(distributorId);
                    // const newPosition = _.cloneDeep(placementStructure);
                    // newPosition.dist_temp_id = -1;
                    // newPosition.placement_position_id = -1;

                    // setSelectedPosition(newPosition);
                    // setSelectedPositionIndex(null);
                    // setSelectedEnrolleeIndex(null);
                    // AppUtils.showDialog("dlgEnroll");
                  }
                }
              }}
              onResetRequested={() => {
                showAll();
              }}
              onSearchClicked={(searchString) => {
                if (parseInt(searchString))
                  setSelectedDistributor(searchString);
                else {
                  WishToaster({
                    toastMessage: "Invalid distributor Id",
                    toastType: "error",
                  });
                }
              }}
            />
          ) : (
            <WishSimpleCard noFooter>
              <LoadingNote />
            </WishSimpleCard>
          )}
        </div>
        <div className="col-6">
          <WishSimpleCard
            className="rounded-2 border-light"
            changeBorder={false}
            cardBodyClassName="flex-none overflow-auto"
          >
            <div className="" style={{ minHeight: "400px" }}>
              {distributorGVStats ? (
                distributorGVStats.map((info, index) => {
                  const GVTileInfo = {
                    title: WORDS[index],
                    subTitle: "GV",
                    direction: info.is_increase ? "up" : "down",
                    PV: info.cw_gv ?? 0,
                    percentage: info.percentage ?? 0,
                  };

                  return (
                    <RenderGroupVolumeTile
                      details={GVTileInfo}
                      addTopPadding={index !== 0}
                    />
                  );
                })
              ) : (
                <EmptyNote />
              )}
            </div>
          </WishSimpleCard>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-12">
              <WishSimpleCard
                className="rounded-2 border-light"
                changeBorder={false}
                header={<h5>Activation PV</h5>}
              >
                <WishFlexBox className="row-fluid">
                  <label className="fs-2 col-4 pl-0 d-block">
                    {distributorStats?.current_pv_active ?? 0} PV
                  </label>
                  <WishFlexBox className="border border-light p-0 rounded-lg col-8 bg-danger bg-lighten-4">
                    <div className="col-6 border-right text-center">
                      <label className="fs-2 d-block">
                        {distributorStats?.retail_activation_pv ?? 0}
                      </label>
                      <label>Retail PV</label>
                    </div>
                    <div className="col-6 text-center">
                      <label className="fs-2 d-block">
                        {distributorStats?.sponsor_activation_pv ?? 0}
                      </label>
                      <label>Sponsor PV</label>
                    </div>
                  </WishFlexBox>
                </WishFlexBox>
                <WishFlexBox className="pt-2">
                  <label className="text-info">
                    {distributorStats?.comment ?? ""}
                  </label>
                  <label className="">
                    Next activation week{" "}
                    {distributorStats?.next_activation_week ?? 0}
                  </label>
                </WishFlexBox>
              </WishSimpleCard>
            </div>
            <div className="col-12">
              <WishSimpleCard
                className="rounded-2 border-light"
                changeBorder={false}
                header={
                  <h5>
                    Team Member Status as on {moment().format("DD-MMM-YY")}
                  </h5>
                }
                cardBodyClassName="pt-0 wish-speedometer"
              >
                <div className="text-center">
                  <div
                    style={{
                      height: "200px",
                      width: "200px",
                    }}
                  >
                    {distributorMemberStats ? (
                      <Doughnut
                        id="dgTeamMemberStatus"
                        data={data}
                        options={options}
                        plugins={
                          distributorMemberStats &&
                          distributorMemberStats?.Active
                            ? [plugin]
                            : []
                        }
                        //ref={doughnutRef}
                      />
                    ) : (
                      <LoadingNote />
                    )}
                  </div>
                </div>
                <div className="pt-2">
                  <table width="100%">
                    <thead>
                      <tr>
                        <th className="text-center">
                          {distributorMemberStats?.Active}
                        </th>
                        <th className="text-center">
                          {" "}
                          {distributorMemberStats?.Inactive}
                        </th>
                        <th className="text-center">
                          {" "}
                          {distributorMemberStats?.Others}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          className="text-center text-white"
                          style={{ backgroundColor: "green" }}
                        >
                          Active
                        </td>
                        <td
                          className="text-center text-white"
                          style={{ backgroundColor: "orange" }}
                        >
                          Inactive
                        </td>
                        <td
                          className="text-center text-white"
                          style={{ backgroundColor: "red" }}
                        >
                          Others
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </WishSimpleCard>
            </div>
          </div>
        </div>
        <div className="col-12">
          <WishColoredBar
            className="rounded-1 onhover-shadow"
            bgcolor="transparent"
          >
            <h1 className="pt-1">Rank Badges</h1>
          </WishColoredBar>
        </div>
        <div className="col-12">
          <WishSimpleCard
            className="rounded-2 border-light pt-2"
            changeBorder={false}
            cardBodyClassName="flex-none overflow-auto"
          >
            <Swiper
              slidesPerView={6}
              modules={[Navigation]}
              navigation={true}
              grabCursor={true}
            >
              {(ranks ?? []).map((badge, index) => {
                return (
                  <SwiperSlide>
                    <div className="text-center">
                      <img
                        className="rounded-lg w-25"
                        src={
                          "/assets/app-assets/images/badges/" +
                          badge.title +
                          ".png"
                        }
                        alt={badge.title}
                      />
                      <p>{badge.title}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </WishSimpleCard>
        </div>
      </div>
      <WishModal
        id="dlgEnroll"
        title="Enroll New Distributor"
        noFooter={
          selectedEnrolleeIndex === null || selectedPositionIndex === null
        }
        onFinish={() => {
          const newPosition = _.cloneDeep(selectedPosition);

          if (distributor !== "") {
            const distributorFromLocalStorage = JSON.parse(distributor);
            newPosition.sponsor_distributor_id =
              distributorFromLocalStorage.distributor_id;
            newPosition.distributor_id =
              distributorFromLocalStorage.distributor_id;
            newPosition.placement_distributor_id = selectedNodeParentId;

            setSelectedPosition(newPosition);

            console.clear();
            console.log(newPosition);
            if (
              selectedPosition.dist_temp_id === -1 ||
              selectedPosition.placement_position_id === -1
            ) {
              WishToaster({ toastMessage: "No position selected" });
            } else {
              enrollDistributor(newPosition, selectedDistributor);
            }
          } else {
            WishToaster({ toastMessage: "Oops! Something went wrong." });
          }
        }}
      >
        {genealogyError ? (
          <h3 className="text-danger">{genealogyError}</h3>
        ) : (
          <>
            {pendingEnrolleesList && (
              <WishListGroup
                title="Assign Enrollees"
                subTitle="Select from below list"
                items={pendingEnrolleesList.map((x) => x.display_name)}
                selectedItemIndex={selectedEnrolleeIndex}
                onSelect={(index) => {
                  setSelectedEnrolleeIndex(index);
                  const newPosition = _.cloneDeep(selectedPosition);

                  newPosition.dist_temp_id =
                    pendingEnrolleesList[index].dist_temp_id;

                  setSelectedPosition(newPosition);
                }}
              />
            )}

            {placementPositions && (
              <>
                <h5 className="pt-2">Select appropriate position below:</h5>
                <WishButtonGroup
                  selectedIndex={selectedPositionIndex}
                  onSelect={(index) => {
                    setSelectedPositionIndex(index);
                    const newPosition = _.cloneDeep(selectedPosition);

                    newPosition.placement_position_id =
                      placementPositions[index].position_id;

                    setSelectedPosition(newPosition);
                  }}
                  buttons={placementPositions.map((x) => x.position_title)}
                />
              </>
            )}
          </>
        )}
      </WishModal>
    </PageLayout>
  );
}
