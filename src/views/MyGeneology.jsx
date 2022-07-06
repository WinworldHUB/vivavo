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

export default function MyGeneology() {
  const breadcrumbs = [];

  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "My Genealogy", linkTo: "/" });

  const [isRotated, setIsRotated] = useState(true);
  const [filterApplied, applyFilter] = useState(false);

  const [filterText, setFilterText] = useState("");

  const topStats = [
    {
      title: "LGV",
      value: "500",
      prevValues: [
        { key: "Wk 214", value: "350" },
        { key: "Wk 215", value: "450" },
        { key: "Wk 216", value: "550" },
      ],
      percentage: "10%",
      color: "success",
      organization: "Left Organization",
    },
    {
      title: "RGV",
      value: "350",
      prevValues: [
        { key: "Wk 214", value: "350" },
        { key: "Wk 215", value: "450" },
        { key: "Wk 216", value: "550" },
      ],
      percentage: "10%",
      color: "danger",
      organization: "Right Organization",
    },
    {
      title: "GV",
      value: "500",
      prevValues: [
        { key: "Wk 214", value: "350" },
        { key: "Wk 215", value: "450" },
        { key: "Wk 216", value: "550" },
      ],
      percentage: "10%",
      color: "success",
      organization: "Third Organization",
    },
    {
      title: "GV",
      value: "350",
      prevValues: [
        { key: "Wk 214", value: "350" },
        { key: "Wk 215", value: "450" },
        { key: "Wk 216", value: "550" },
      ],
      percentage: "10%",
      color: "danger",
      organization: "Fourth Organization",
    },
    {
      title: "LGV",
      value: "500",
      prevValues: [
        { key: "Wk 214", value: "350" },
        { key: "Wk 215", value: "450" },
        { key: "Wk 216", value: "550" },
      ],
      percentage: "10%",
      color: "success",
      organization: "Total",
    },
    {
      title: "RGV",
      value: "350",
      prevValues: [
        { key: "Wk 214", value: "350" },
        { key: "Wk 215", value: "450" },
        { key: "Wk 216", value: "550" },
      ],
      percentage: "10%",
      color: "danger",
      organization: "Total",
    },
  ];

  const renderRGVGraph = function ({ color }) {
    return (
      <table
        id="line-example-1"
        class={"charts-css line hide-data lw-2 " + (color ?? "")}
      >
        <tbody>
          {data.MyGenealogyRGVGraph.map((rgv, index) => {
            return (
              <tr>
                <td
                  style={{
                    "--start": rgv.start,
                    "--size": rgv.size,
                  }}
                ></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderLGVGraph = function ({ color }) {
    return (
      <table
        id="line-example-1"
        class={"charts-css line hide-data lw-2 " + (color ?? "")}
      >
        <tbody>
          {data.MyGenealogyLGVGraph.map((rgv, index) => {
            return (
              <tr>
                <td
                  style={{
                    "--start": rgv.start,
                    "--size": rgv.size,
                  }}
                ></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const [treeNodes, setTreeNodes] = useState(data.treeData);

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
        <div className="col-12">
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            grabCursor={true}
            rewind={true}
            navigation={true}
            modules={[Navigation]}
            className="pt-1"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
              550: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              760: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
          >
            {topStats.map((stats, index) => {
              return (
                <SwiperSlide key={index}>
                  <WishSimpleCard
                    background="shadow-sm"
                    cardBodyClassName="p-0"
                  >
                    <div className="text-center">
                      <small className="font-weight-bold text-primary">
                        {stats.organization ?? <>&nbsp;</>}
                      </small>
                    </div>
                    <div className="d-flex align-items-center p-1">
                      <div className="">
                        <small className="d-block">
                          {stats.title} ({stats.percentage})
                        </small>
                      </div>
                      <div className="col">
                        {stats.color === "success"
                          ? renderLGVGraph({ color: stats.color })
                          : renderRGVGraph({ color: stats.color })}
                      </div>
                      <div className="text-right">
                        <label className="text-success d-block lead">
                          <span className="font-weight-bold text-muted">
                            {stats.value} <small>(cw)</small>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="bg-primary bg-lighten-4 d-flex justify-content-between pl-1 pr-1">
                      {stats.prevValues &&
                        stats.prevValues.map((prev, vIndex) => {
                          return <small>{prev.key}</small>;
                        })}
                    </div>
                    <div className="bg-primary text-white d-flex justify-content-between pl-1 pr-1">
                      {stats.prevValues &&
                        stats.prevValues.map((prev, vIndex) => {
                          return <small>{prev.value}</small>;
                        })}
                    </div>
                  </WishSimpleCard>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
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
