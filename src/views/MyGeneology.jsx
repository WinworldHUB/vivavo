/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState, useRef } from "react";
import PageLayout from "../components/PageLayout";
import WishCarousel from "../components/WishCarousel";
import WishGeneologyStatsCard from "../components/WishGeneologyStatsCard";
import WishGeneologyTree from "../components/WishGeneologyTree";
import WishSimpleCard from "../components/WishSimpleCard";

import "json-loader";
import data from "../data/Data.json";
import WishFlipCard from "../components/WishFlipCard";
import WishToaster from "../components/WishToaster";

export default function MyGeneology() {
  const [flip, doFlip] = useState(false);
  const [isRotated, setIsRotated] = useState(true);
  const [filterApplied, applyFilter] = useState(false);

  const [filterText, setFilterText] = useState("");

  const currentWeekStats = [
    { key: "LGV", value: 500 },
    { key: "RGV", value: 300 },
    { key: "CFL", value: 50 },
    { key: "CFR", value: 0 },
    { key: "Total LGV", value: 550 },
    { key: "Total RGV", value: 500 },
  ];
  const previousWeekStats = [
    { key: "LGV", value: 500 },
    { key: "RGV", value: 300 },
    { key: "CFL", value: 50 },
    { key: "CFR", value: 0 },
    { key: "Total LGV", value: 550 },
    { key: "Total RGV", value: 500 },
  ];

  const currentWeekStats3 = [{ key: "GV", value: 400 }];
  const previousWeekStats3 = [{ key: "GV", value: 400 }];
  const [treeNodes, setTreeNodes] = useState(data.treeData);

  const [selectedNode, setSelectedNode] = useState(treeNodes);

  const nodeDetails = function (nodeID) {
    return (
      <>
        {selectedNode && (
          <>
            <p>Distributur ID: {selectedNode.distributorID}</p>
            <p>Name: {selectedNode.name}</p>
            <p>Acheived Rank: {selectedNode.achievedRank}</p>
            <p>Paid as Rank: {selectedNode.paidAsRank}</p>
            <p>Activation PV: {selectedNode.activationPV}</p>
            <p>Next activation week: {selectedNode.nextActivationWeek}</p>
            <p>Aggregate Income: {selectedNode.aggregateIncome}</p>
          </>
        )}
      </>
    );
  };

  const showAll = function () {
    setSelectedNode(data.treeData);
    setTreeNodes(data.treeData);
  };

  const searchDistributor = function (filter) {
    var found = null;
    var treeNodesCopy = data.treeData;

    console.log(filter);

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

  const filterTree = function () {
    if (filterText === "") {
      showAll();
    } else {
      searchDistributor(filterText);
    }
  };

  const treeHeader = function () {
    return (
      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <div className="input-group">
              <div
                className={
                  "input-group-append " + (filterText === "" ? " hidden " : "")
                }
              >
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setFilterText("");
                    showAll();
                  }}
                >
                  <i className="las la-arrow-left"></i>
                </button>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Search distributor id ..."
                value={filterText}
                onChange={(e) => {
                  setFilterText(e.target.value);
                }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    filterTree();
                  }}
                >
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                doFlip(!flip);
              }}
            >
              {flip === true ? (
                <i className="las la-chart-bar"></i>
              ) : (
                <i className="las la-eye"></i>
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                setIsRotated(!isRotated);
              }}
            >
              <i className="las la-sync"></i>
            </button>
            <div className="btn-group">
              <button
                className="btn btn-danger"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="las la-sitemap"></i>
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
                x-placement="bottom-start"
                style={{
                  position: "absolute",
                  transform: "translate3d(0px, 41px, 0px)",
                  top: "0px",
                  left: "0px",
                  willChange: "transform",
                }}
              >
                <a className="dropdown-item">To Extreme Left</a>
                <a className="dropdown-item">To Extreme Right</a>
                <a className="dropdown-item">To Preferred Extreme Left</a>
                <a className="dropdown-item">To Preferred Extreme Right</a>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setFilterText("");
                    showAll();
                  }}
                >
                  To Top
                </a>
              </div>
            </div>
          </div>
          {/* <a
            className=""
            onClick={() => {
              doFlip(!flip);
            }}
          >
            {flip === true ? (
              <i className="las la-chart-bar"></i>
            ) : (
              <i className="las la-eye"></i>
            )}
          </a>
          &nbsp;
          <a
            className=""
            onClick={() => {
              setIsRotated(!isRotated);
            }}
          >
            <i className="las la-sync"></i>
          </a> */}
        </div>
      </div>
    );
  };

  return (
    <PageLayout pageTitle="My Geneology" activeSideMenu="4">
      <div className="row">
        <div className="col-8 table-responsive">
          <WishGeneologyTree
            header={treeHeader()}
            reverse={isRotated}
            tree={treeNodes}
            onNodeSelected={(node) => {
              setSelectedNode(node);
            }}
          ></WishGeneologyTree>
        </div>
        <div className="col-sm-4">
          <WishFlipCard cardFlip={flip}>
            {{
              back: (
                <WishSimpleCard
                  background="bg-primary bg-lighten-4"
                  header={<h5>DISTRIBUTOR DETAILS</h5>}
                  body={nodeDetails()}
                ></WishSimpleCard>
              ),
              front: (
                <WishCarousel showArrows>
                  <WishGeneologyStatsCard
                    renderWithoutCard
                    title="First Organization"
                    statsCurrentWeek={currentWeekStats}
                    statsPreviousWeek={previousWeekStats}
                  ></WishGeneologyStatsCard>
                  <WishGeneologyStatsCard
                    renderWithoutCard
                    title="Second Organization"
                    statsCurrentWeek={currentWeekStats}
                    statsPreviousWeek={previousWeekStats}
                  ></WishGeneologyStatsCard>
                  <WishGeneologyStatsCard
                    renderWithoutCard
                    title="Third Organization"
                    statsCurrentWeek={currentWeekStats3}
                    statsPreviousWeek={previousWeekStats3}
                  ></WishGeneologyStatsCard>
                </WishCarousel>
              ),
            }}
          </WishFlipCard>
        </div>
      </div>
    </PageLayout>
  );
}
