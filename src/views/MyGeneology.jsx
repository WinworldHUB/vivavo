/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import WishCarousel from "../components/WishCarousel";
import WishGeneologyTree from "../components/WishGeneologyTree";
import WishSimpleCard from "../components/WishSimpleCard";

import "json-loader";
import data from "../data/Data.json";
import WishFlipCard from "../components/WishFlipCard";
import WishToaster from "../components/WishToaster";
import "charts.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function MyGeneology() {
  const breadcrumbs = [];

  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "My Genealogy", linkTo: "/" });

  const [isRotated, setIsRotated] = useState(true);
  const [filterApplied, applyFilter] = useState(false);

  const [filterText, setFilterText] = useState("");

  const topStats = [
    { title: "LGV", value: "500 | 350", percentage: "10%", color: "success" },
    { title: "RGV", value: "350 | 500", percentage: "10%", color: "danger" },
    { title: "CFL", value: "500 | 350", percentage: "10%", color: "success" },
    { title: "CFR", value: "350 | 500", percentage: "10%", color: "danger" },
    {
      title: "Total LGV",
      value: "500 | 350",
      percentage: "10%",
      color: "success",
    },
    {
      title: "Total RGV",
      value: "350 | 500",
      percentage: "10%",
      color: "danger",
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
                  <WishSimpleCard background="shadow-sm">
                    <div className="d-flex align-items-center">
                      <div className="">
                        <small className="d-block">{stats.title}</small>
                        <small>
                          <span
                            className={"float-left text-" + stats.color}
                            style={{ fontSize: "8px" }}
                          >
                            ({stats.percentage})
                          </span>
                        </small>
                      </div>
                      <div className="col">
                        {stats.color === "success"
                          ? renderLGVGraph({ color: stats.color })
                          : renderRGVGraph({ color: stats.color })}
                      </div>
                      <div className="text-right">
                        <small className="text-success d-block">
                          <span className="font-weight-bold text-muted">
                            {stats.value}
                          </span>
                        </small>
                        <small className="text-success d-block text-center">
                          <span
                            className="font-weight-bold text-muted"
                            style={{ fontSize: "8px" }}
                          >
                            CW &nbsp;&nbsp; &nbsp;&nbsp; PW
                          </span>
                        </small>
                      </div>
                    </div>
                  </WishSimpleCard>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="col-12" style={{ marginTop: "-20px" }}>
          <WishGeneologyTree
            //header={treeHeader()}
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
    </PageLayout>
  );
}
