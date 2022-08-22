/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import WishSimpleCard from "../components/WishSimpleCard";
import WishColoredBar from "../components/WishColoredBar";
import WishFlexBox from "../components/WishFlexBox";
import WishGeneologyTree from "../components/WishGeneologyTree";
import pageConfig from "../data/config.json";
import data from "../data/Data.json";
import WishToaster from "../components/WishToaster";
import { AppUtils } from "../services/AppUtils";
import moment from "moment";
import ReactSpeedometer from "react-d3-speedometer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function MyGeneology() {
  const [treeNodes, setTreeNodes] = useState(data.treeData);
  const [selectedNode, setSelectedNode] = useState(treeNodes);
  const [isRotated, setIsRotated] = useState(true);
  const [filterApplied, applyFilter] = useState(false);

  const [filterText, setFilterText] = useState("");

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
          <a class="dropdown-item" href="#">
            To Extreme Left
          </a>
          <a class="dropdown-item" href="#">
            To Extreme Right
          </a>
          <a class="dropdown-item" href="#">
            To Preferred Extreme Left
          </a>
          <a class="dropdown-item" href="#">
            To Preferred Extreme Right
          </a>
          <a class="dropdown-item" href="#">
            To Top
          </a>
        </div>
        &nbsp;&nbsp;
        <a
          className="d-flex align-items-center"
          // onClick={() => {
          //   setIsRotated(!isRotated);
          // }}
        >
          <i className="las la-cog"></i>&nbsp;Settings
        </a>
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
          />
        </div>
        <div className="col-6">
          <WishSimpleCard
            className="rounded-2 border-light"
            changeBorder={false}
            cardBodyClassName="flex-none overflow-auto"
          >
            <div className="" style={{ minHeight: "400px" }}>
              {pageConfig.mygenealogy.topStats.map((info, index) => {
                console.log(info);
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
          </WishSimpleCard>
        </div>
      </div>
    </PageLayout>
  );
}
