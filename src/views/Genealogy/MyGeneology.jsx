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
import useAPI from "../../services/useAPI";
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

  const {
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
  } = useGenealogy();
  const [selectedDistributor, setSelectedDistributor] = useState(-1);
  const [treeNavigationHistory, setTreeNavigationHistory] = useState([]);
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

  useEffect(() => {
    //console.log(distributor);
    if (distributor !== "") {
      const distributorFromLocalStorage = JSON.parse(distributor);

      setLoggedInDistributor(distributorFromLocalStorage.distributor_id);
      setSelectedDistributor(distributorFromLocalStorage.distributor_id);
      setTreeNavigationHistory([
        String(distributorFromLocalStorage.distributor_id),
      ]);
    }
  }, []);

  useEffect(() => {
    if (selectedDistributor > -1) {
      getTreeData({
        distributor_id: selectedDistributor,
        depth: 2,
      });
    }
  }, [selectedDistributor]);

  useEffect(() => {
    //console.clear();
    console.log("---- Tree Navigation History ---- ");
    console.log(treeNavigationHistory);
  }, [treeNavigationHistory]);

  useEffect(() => {
    //console.log(treeData ?? "");
    if (treeData) {
      setTreeNodes(treeData);
    }
  }, [treeData]);

  useEffect(() => {
    if (genealogyError) {
      WishToaster({
        toastMessage: genealogyError,
        toastType: "error",
      });
    }
  }, [genealogyError]);

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
        <a
          className={"d-flex align-items-center text-primary "}
          onClick={() => {
            if (distributor !== "") {
              const distributorFromLocalStorage = JSON.parse(distributor);

              if (
                !treeNavigationHistory.includes(
                  distributorFromLocalStorage.distributor_id
                )
              )
                setTreeNavigationHistory([
                  distributorFromLocalStorage.distributor_id,
                ]);

              setSelectedDistributor(
                distributorFromLocalStorage.distributor_id
              );
            }
          }}
        >
          <i className="las la-angle-left"></i>&nbsp;Go Back
        </a>
        &nbsp;&nbsp;
        <a
          className="d-flex align-items-center ml-auto"
          onClick={() => {
            AppUtils.showDialog("dlgSearch");
            //$("#dlgSearch").modal("show");
          }}
        >
          <i className="las la-search"></i>&nbsp;Search
        </a>
        &nbsp;&nbsp;
        {/* <a
          className="d-flex align-items-center"
          onClick={() => {
            setIsRotated(!isRotated);
          }}
        >
          <i className="las la-sync"></i>&nbsp;Rotate
        </a> */}
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
        <div class="dropdown-menu">
          <a
            class="dropdown-item"
            href="#"
            onClick={() => {
              navigateTreeTo(LOAD_EXTREME_LEFT, selectedDistributor);
            }}
          >
            To Extreme Left
          </a>
          <a
            class="dropdown-item"
            href="#"
            onClick={() => {
              navigateTreeTo(LOAD_EXTREME_RIGHT, selectedDistributor);
            }}
          >
            To Extreme Right
          </a>
          <a
            class="dropdown-item"
            href="#"
            onClick={() => {
              navigateTreeTo(LOAD_PREFERRED_LEFT, selectedDistributor);
            }}
          >
            To Preferred Extreme Left
          </a>
          <a
            class="dropdown-item"
            href="#"
            onClick={() => {
              navigateTreeTo(LOAD_PREFERRED_RIGHT, selectedDistributor);
            }}
          >
            To Preferred Extreme Right
          </a>
          <a
            class="dropdown-item"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              //treeNavigationHistory.pop();
              if (treeNavigationHistory.length > 1) {
                const currentElement = treeNavigationHistory[0];

                if (selectedDistributor === currentElement)
                  treeNavigationHistory.shift();

                setSelectedDistributor(treeNavigationHistory.shift());
              } else {
                setSelectedDistributor(
                  treeNavigationHistory[treeNavigationHistory.length - 1]
                );
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
          <label className="text-primary card-title ">{details.title}</label>
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
              {details.percentage}
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
          {treeNodes && (
            <WishGeneologyTree
              loading={loading}
              header={treeTopIcons()}
              reverse={isRotated}
              tree={treeNodes.root}
              showBackButton={filterApplied}
              onNodeSelected={(distributorId, isActionNode) => {
                if (!isActionNode) {
                  setTreeNavigationHistory([
                    distributorId,
                    ...treeNavigationHistory,
                  ]);
                  setSelectedDistributor(distributorId);
                } else {
                  if (distributor !== "") {
                    const distributorFromLocalStorage = JSON.parse(distributor);
                    getPendingEnrolleesFor(
                      distributorFromLocalStorage.distributor_id,
                      distributorId
                    );
                    setSelectedNodeParentId(distributorId);
                    const newPosition = _.cloneDeep(placementStructure);
                    newPosition.dist_temp_id = -1;
                    newPosition.placement_position_id = -1;

                    setSelectedPosition(newPosition);
                    setSelectedPositionIndex(null);
                    setSelectedEnrolleeIndex(null);
                    AppUtils.showDialog("dlgEnroll");
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
          )}
        </div>
        <div className="col-6">
          <WishSimpleCard
            className="rounded-2 border-light"
            changeBorder={false}
            cardBodyClassName="flex-none overflow-auto"
          >
            <div className="" style={{ minHeight: "400px" }}>
              {pageConfig.mygenealogy.topStats.map((info, index) => {
                //console.log(info);
                return (
                  <RenderGroupVolumeTile
                    details={info}
                    addTopPadding={index !== 0}
                  />
                );
              })}
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
                  <label className="fs-2 col-4 pl-0 d-block">200 PV</label>
                  <WishFlexBox className="border border-light p-0 rounded-lg col-8 bg-danger bg-lighten-4">
                    <div className="col-6 border-right text-center">
                      <label className="fs-2 d-block">150</label>
                      <label>Retail PV</label>
                    </div>
                    <div className="col-6 text-center">
                      <label className="fs-2 d-block">50</label>
                      <label>Sponsor PV</label>
                    </div>
                  </WishFlexBox>
                </WishFlexBox>
                <WishFlexBox className="pt-2">
                  <label className="text-info">17 days left</label>
                  <label className="">Next activation week 265</label>
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
                <ReactSpeedometer
                  forceRender={true}
                  needleHeightRatio={0}
                  needleColor={"transparent"}
                  needleTransition={"easeCircleInOut"}
                  maxSegmentLabels={3}
                  segments={3}
                  customSegmentStops={[1, 3, 4, 5]}
                  minValue={1} //<---here
                  maxValue={5} //<---here
                  segmentColors={["mediumseagreen", "orange", "red"]}
                  value={4}
                  textColor={"transparent"}
                  height={150}
                  width={300}
                  ringWidth={30}
                />
                <label
                  className="progress-label"
                  style={{
                    position: "relative",
                    left: "45%",
                    bottom: "40px",
                  }}
                >
                  65%
                </label>
                <WishFlexBox>
                  <small>
                    <i className="las la-square-full text-success"></i> Active
                    Members
                  </small>
                  <small>
                    <i className="las la-square-full text-warning"></i> Inactive
                    Members
                  </small>
                  <small>
                    <i className="las la-square-full text-danger"></i> Will be
                    inactive by week 236
                  </small>
                </WishFlexBox>
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
              {(ranks ?? []).reverse().map((badge, index) => {
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
            )}
          </>
        )}
      </WishModal>
    </PageLayout>
  );
}
