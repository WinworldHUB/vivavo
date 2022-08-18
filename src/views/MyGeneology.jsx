/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import WishGeneologyTree from "../components/WishGeneologyTree";
import WishSimpleCard from "../components/WishSimpleCard";

import "json-loader";
import data from "../data/Data.json";
import WishToaster from "../components/WishToaster";
import "charts.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import WishModal from "../components/WishModal";
import { useEffect } from "react";

import _ from "lodash";
import moment from "moment";
import WishFlexBox from "../components/WishFlexBox";
import ReactSpeedometer from "react-d3-speedometer";
import WishColoredBar from "../components/WishColoredBar";

export default function MyGeneology() {
  const breadcrumbs = [];

  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "My Genealogy", linkTo: "/" });

  const [isRotated, setIsRotated] = useState(false);
  const [filterApplied, applyFilter] = useState(false);

  const [filterText, setFilterText] = useState("");

  const randomLimit = Math.round(Math.random() * 5);
  const randomLimitCap = randomLimit === 0 ? 1 : randomLimit;

  const topStats = [
    {
      title: "First Organization",
      subTitle: "GV",
      PV: "500 PV",
      direction: "up",
      percentage: "10% (450)",
    },
    {
      title: "Second Organization",
      subTitle: "GV",
      PV: "500 PV",
      direction: "down",
      percentage: "10% (450)",
    },
    {
      title: "Third Organization",
      subTitle: "GV",
      PV: "500 PV",
      direction: "up",
      percentage: "10% (450)",
    },
    {
      title: "Fourth Organization",
      subTitle: "GV",
      PV: "500 PV",
      direction: "down",
      percentage: "10% (450)",
    },
    {
      title: "Fifth Organization",
      subTitle: "GV",
      PV: "500 PV",
      direction: "up",
      percentage: "10% (450)",
    },
  ];

  // const topStats = [
  //   {
  //     title: "LGV",
  //     value: "500",
  //     prevValues: [
  //       { key: "Wk 214", value: "350" },
  //       { key: "Wk 215", value: "450" },
  //       { key: "Wk 216", value: "550" },
  //     ],
  //     percentage: "10%",
  //     color: "success",
  //     organization: "Left Organization",
  //   },
  //   {
  //     title: "RGV",
  //     value: "350",
  //     prevValues: [
  //       { key: "Wk 214", value: "350" },
  //       { key: "Wk 215", value: "450" },
  //       { key: "Wk 216", value: "550" },
  //     ],
  //     percentage: "10%",
  //     color: "danger",
  //     organization: "Right Organization",
  //   },
  //   {
  //     title: "GV",
  //     value: "500",
  //     prevValues: [
  //       { key: "Wk 214", value: "350" },
  //       { key: "Wk 215", value: "450" },
  //       { key: "Wk 216", value: "550" },
  //     ],
  //     percentage: "10%",
  //     color: "success",
  //     organization: "Third Organization",
  //   },
  //   {
  //     title: "GV",
  //     value: "350",
  //     prevValues: [
  //       { key: "Wk 214", value: "350" },
  //       { key: "Wk 215", value: "450" },
  //       { key: "Wk 216", value: "550" },
  //     ],
  //     percentage: "10%",
  //     color: "danger",
  //     organization: "Fourth Organization",
  //   },
  //   {
  //     title: "LGV",
  //     value: "500",
  //     prevValues: [
  //       { key: "Wk 214", value: "350" },
  //       { key: "Wk 215", value: "450" },
  //       { key: "Wk 216", value: "550" },
  //     ],
  //     percentage: "10%",
  //     color: "success",
  //     organization: "Total",
  //   },
  //   {
  //     title: "RGV",
  //     value: "350",
  //     prevValues: [
  //       { key: "Wk 214", value: "350" },
  //       { key: "Wk 215", value: "450" },
  //       { key: "Wk 216", value: "550" },
  //     ],
  //     percentage: "10%",
  //     color: "danger",
  //     organization: "Total",
  //   },
  // ];

  // const renderRGVGraph = function ({ color }) {
  //   return (
  //     <table
  //       id="line-example-1"
  //       class={"charts-css line hide-data lw-2 " + (color ?? "")}
  //     >
  //       <tbody>
  //         {data.MyGenealogyRGVGraph.map((rgv, index) => {
  //           return (
  //             <tr>
  //               <td
  //                 style={{
  //                   "--start": rgv.start,
  //                   "--size": rgv.size,
  //                 }}
  //               ></td>
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   );
  // };

  // const renderLGVGraph = function ({ color }) {
  //   return (
  //     <table
  //       id="line-example-1"
  //       class={"charts-css line hide-data lw-2 " + (color ?? "")}
  //     >
  //       <tbody>
  //         {data.MyGenealogyLGVGraph.map((rgv, index) => {
  //           return (
  //             <tr>
  //               <td
  //                 style={{
  //                   "--start": rgv.start,
  //                   "--size": rgv.size,
  //                 }}
  //               ></td>
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </table>
  //   );
  // };

  //const [treeNodes, setTreeNodes] = useState(data.treeData);
  const [treeNodes, setTreeNodes] = useState(data.treeData);

  // Update the incoming json nodes with add-child elements
  useEffect(() => {
    var updatedTreeData = {};
    var firstLevelNodes = [];

    // Update First level Nodes
    var midPoint =
      data.treeData.nodes.length % 2 === 0
        ? data.treeData.nodes.length / 2
        : (data.treeData.nodes.length + 1) / 2;

    for (let index = 0; index < data.treeData.nodes.length; index++) {
      if (index !== midPoint) {
        firstLevelNodes.push(_.cloneDeep(data.treeData.nodes[index]));
      } else {
        //console.log (data.specialTreeNodes.addNode);
        firstLevelNodes.push(data.specialTreeNodes.addNode);
        firstLevelNodes.push(_.cloneDeep(data.treeData.nodes[index]));
      }
    }

    updatedTreeData = _.cloneDeep(data.treeData);
    updatedTreeData.nodes = Array.from(firstLevelNodes);
    console.log(midPoint);
    setTreeNodes(updatedTreeData);
  }, []);

  const [selectedNode, setSelectedNode] = useState(treeNodes);

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
            filterTree("");
          }}
        >
          <i className="las la-angle-left"></i>&nbsp;Go Back
        </a>
        &nbsp;&nbsp;
        <a
          className="d-flex align-items-center ml-auto"
          onClick={() => {
            $("#dlgSearch").modal("show");
          }}
        >
          <i className="las la-search"></i>&nbsp;Search
        </a>
        &nbsp;&nbsp;
        <a
          className="d-flex align-items-center"
          onClick={() => {
            setIsRotated(!isRotated);
          }}
        >
          <i className="las la-sync"></i>&nbsp;Rotate
        </a>
      </div>
    );
  };

  return (
    <PageLayout
      pageTitle="My Genealogy"
      header="My Genealogy"
      activeSideMenu="4"
      breadcrumbs={breadcrumbs}
    >
      <div className="row">
        <div className="col-12" style={{ marginTop: "-10px" }}>
          <WishGeneologyTree
            header={treeTopIcons()}
            reverse={isRotated}
            tree={treeNodes}
            showBackButton={filterApplied}
            onNodeSelected={(node) => {
              setSelectedNode(node);
            }}
            onFilterRequested={(filterString) => {
              filterTree(filterString);
            }}
            onResetRequested={() => {
              showAll();
            }}
          ></WishGeneologyTree>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <WishSimpleCard
            header={<h5>Group Volume Analysis</h5>}
            className="w-100"
            cardBodyClassName="scrollOn400"
            cardBodyProps={{ style: { minHeight: "480px" } }}
          >
            {topStats.map((stat, index) => (
              <>
                {index <= randomLimitCap ? (
                  <div className={index === 0 ? "" : "pt-1"}>
                    <div className="border border-light p-1 rounded-lg onhover-shadow">
                      <label className="text-primary card-title ">
                        {stat.title}
                      </label>
                      <WishFlexBox>
                        <span className="lead">{stat.subTitle}</span>
                        <span className="lead font-weight-bold d-flex align-items-center">
                          <i
                            className={
                              "las " +
                              (stat.direction === "up"
                                ? "la-long-arrow-alt-up text-success"
                                : "la-long-arrow-alt-down text-danger")
                            }
                          ></i>{" "}
                          {stat.PV}
                        </span>
                        <span
                          className={
                            "lead font-weight-bold " +
                            (stat.direction === "up"
                              ? "text-success"
                              : "text-danger")
                          }
                        >
                          {stat.percentage}
                        </span>
                      </WishFlexBox>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
            {/* <div className="">
              <div className="border border-light p-1 rounded-lg onhover-shadow">
                <label className="text-primary card-title ">
                  First Organization
                </label>
                <WishFlexBox>
                  <span className="lead">GV</span>
                  <span className="lead font-weight-bold d-flex align-items-center">
                    <i className="las la-long-arrow-alt-up text-success"></i>{" "}
                    500PV
                  </span>
                  <span className="lead font-weight-bold text-success">
                    10% (450)
                  </span>
                </WishFlexBox>
              </div>
            </div>
            <div className="pt-1">
              <div className="border border-light p-1 rounded-lg onhover-shadow">
                <label className="text-primary card-title ">
                  Second Organization
                </label>
                <WishFlexBox>
                  <span className="lead">GV</span>
                  <span className="lead font-weight-bold d-flex align-items-center">
                    <i className="las la-long-arrow-alt-down text-danger"></i>{" "}
                    500PV
                  </span>
                  <span className="lead font-weight-bold text-danger">
                    10% (450)
                  </span>
                </WishFlexBox>
              </div>
            </div>
            <div className="pt-1">
              <div className="border border-light p-1 rounded-lg onhover-shadow">
                <label className="text-primary card-title ">
                  Third Organization
                </label>
                <WishFlexBox>
                  <span className="lead">GV</span>
                  <span className="lead font-weight-bold d-flex align-items-center">
                    <i className="las la-long-arrow-alt-up text-success"></i>{" "}
                    500PV
                  </span>
                  <span className="lead font-weight-bold text-success">
                    10% (450)
                  </span>
                </WishFlexBox>
              </div>
            </div>
            <div className="pt-1">
              <div className="border border-light p-1 rounded-lg onhover-shadow">
                <label className="text-primary card-title ">
                  Fourth Organization
                </label>
                <WishFlexBox>
                  <span className="lead">GV</span>
                  <span className="lead font-weight-bold d-flex align-items-center">
                    <i className="las la-long-arrow-alt-up text-success"></i>{" "}
                    500PV
                  </span>
                  <span className="lead font-weight-bold text-success">
                    10% (450)
                  </span>
                </WishFlexBox>
              </div>
            </div>
            <div className="pt-1">
              <div className="border border-light p-1 rounded-lg onhover-shadow">
                <label className="text-primary card-title ">
                  Fifth Organization
                </label>
                <WishFlexBox>
                  <span className="lead">GV</span>
                  <span className="lead font-weight-bold d-flex align-items-center">
                    <i className="las la-long-arrow-alt-up text-success"></i>{" "}
                    500PV
                  </span>
                  <span className="lead font-weight-bold text-success">
                    10% (450)
                  </span>
                </WishFlexBox>
              </div>
            </div> */}
          </WishSimpleCard>
        </div>
        <div className="col-sm-6">
          <div className="row">
            <div className="col-12">
              <WishSimpleCard
                header={<h5>Activation PV</h5>}
                cardBodyClassName="p-0 pl-1 pr-1"
              >
                <WishFlexBox className="row-fluid">
                  <label className="fs-2 col-4 pl-0 d-block">200 PV</label>
                  <WishFlexBox className="border border-light p-0 rounded-lg col-8 bg-danger bg-lighten-4">
                    <div className="col-6 border-right text-center">
                      <label className="fs-2 d-block">150</label>
                      <label>Retail PV</label>
                    </div>
                    <div className="col-6 text-center">
                      <label className="fs-2">50</label>
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
                    left: "42%",
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
      </div>
      <div className="row">
        <div className="col-12">
          <WishColoredBar bgcolor="light">
            <h3 className="text-uppercase pt-1">Rank Badges</h3>
          </WishColoredBar>
          <Swiper
            slidesPerView={6}
            modules={[Navigation]}
            navigation={true}
            grabCursor={true}
          >
            {Array.from(data.timelineData)
              .reverse()
              .map((badge, index) => {
                return (
                  <SwiperSlide>
                    <div className="text-center">
                      <img
                        className="rounded-lg w-25"
                        src={badge.rankImage}
                        alt={badge.title}
                      />
                      <p>{badge.title}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>

      <WishModal
        id="dlgSearch"
        modalSize="modal-lg"
        noFooter
        infoMode={
          <div className="row">
            <div className="col-12">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search distributor id ..."
                  value={filterText}
                  onChange={(e) => {
                    setFilterText(e.target.value.trim());
                  }}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (filterText !== "") {
                        filterTree(filterText);
                      }
                      $("#dlgSearch").modal("hide");
                    }}
                  >
                    Go
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      ></WishModal>
    </PageLayout>
  );
}
