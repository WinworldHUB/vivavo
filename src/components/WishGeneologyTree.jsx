/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import WishModal from "./WishModal";
import WishSimpleCard from "./WishSimpleCard";
import Tree from "./WishTree/Tree";
import TreeNode from "./WishTree/TreeNode";
import WishToaster from "./WishToaster";
import WishSelect from "./WishSelect";
import WishColoredBar from "./WishColoredBar";
import "json-loader";
import data from "../data/Data.json";
import WishRankTimeline from "./WishTimelines/WishRankTimeline";
import { useEffect } from "react";

export default function WishGeneologyTree({
  tree,
  reverse,
  header,
  footer,
  onNodeSelected,
  onOrganizationSelected,
  organizations,
  hideExitingEnrollments,
}) {
  const [isRotated, setIsRotated] = useState(
    reverse !== undefined ? reverse : false
  );

  const [isRootNode, setIsRootNode] = useState(true);
  const [selectedNode, setSelectedNode] = useState(tree);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [treeNodes, setTreeNodes] = useState(tree.nodes);

  useEffect(() => {
    setIsRotated(reverse);
    setSelectedNode(tree);
    setTreeNodes(tree.nodes);
  }, [reverse, tree]);

  const existingEnrollments = [
    "New Enrollment",
    "John Doe 1 (ongoing enrollments)",
    "John Doe 2 (ongoing enrollments)",
    "John Doe 3 (ongoing enrollments)",
    "John Doe 4 (ongoing enrollments)",
  ];

  const organizationsArray = organizations ?? [
    "Left Organization",
    "Right Organization",
  ];

  const clearNodeSelection = function () {
    const treeNodesCopy = Array.from(treeNodes);
    treeNodesCopy.forEach(function (treenode, index) {
      treenode.selected = false;

      treenode.nodes.forEach((node, index) => {
        node.selected = false;
      });
    });

    setSelectedNode(tree);
    setTreeNodes(treeNodesCopy);
    onNodeSelected && onNodeSelected(null);
  };

  const getDistributor = function (id, changeSelection) {
    const treeNodesCopy = Array.from(treeNodes);
    treeNodesCopy.forEach(function (treenode, index) {
      treenode.selected = false;
      if (treenode.id === id) {
        treenode.selected = changeSelection;

        if (changeSelection) {
          setSelectedNode(treenode);
          onNodeSelected && onNodeSelected(treenode);
        } else {
          return treenode;
        }
      }

      treenode.nodes.forEach((node, index) => {
        node.selected = false;
        if (node.id === id) {
          node.selected = changeSelection;

          if (changeSelection) {
            setSelectedNode(node);
            onNodeSelected && onNodeSelected(node);
          } else {
            return node;
          }
        }
      });
    });

    if (changeSelection) {
      setIsRootNode(false);
      setTreeNodes(treeNodesCopy);
    }
  };

  const onClicked = function (id) {
    getDistributor(id, true);
  };

  const renderTreeNode = function (node) {
    return (
      <div className="apply-transition">
        <a className="media border-0 d-flex align-items-center">
          <div className="media-left pr-1">
            <span className="avatar avatar-md avatar-online">
              <img
                className="media-object rounded-circle"
                src="../assets/app-assets/images/logo/logo.png"
                alt="Generic placeholder image"
              />
            </span>
          </div>
          <div className="media-body w-100 text-left">
            <span className="list-group-item-heading">
              <small>Name: {node.title}</small>
            </span>
            <p className="list-group-item-text mb-0">
              <span className="blue-grey lighten-2 font-small-3">
                {" "}
                <small>ID: {node.id}</small>{" "}
              </span>
            </p>
          </div>
        </a>
        <div className={"pt-1 " + (node.selected === true ? " " : " hidden ")}>
          <div className="d-flex">
            <a
              className="mr-auto onhover-dotted-link"
              onClick={() => {
                setIsRootNode(node.isRoot && node.isRoot);
                $("#dlgEnrollUser").modal("show");
              }}
            >
              <small>
                <i className="las la-plus"></i>
              </small>
            </a>
            <a
              className="ml-auto mr-auto onhover-dotted-link"
              onClick={() => {
                setIsRootNode(node.isRoot && node.isRoot);
                $("#dlgUserRank").modal("show");
              }}
            >
              <small>
                <i className="las la-certificate"></i>
              </small>
            </a>
            <a
              className="ml-auto onhover-dotted-link"
              onClick={() => {
                setIsRootNode(node.isRoot && node.isRoot);
                //$("#dlgEnrollUser").modal("show");
              }}
            >
              <small>
                <i className="las la-chart-bar"></i>
              </small>
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <WishSimpleCard
        header={header ?? null}
        body={
          <div style={{ maxWidth: "100%", overflowX: "scroll" }}>
            <div
              className={
                isRotated === false ? " wish-rotate-0 " : " wish-rotate-180 "
              }
              style={{ width: "max-content" }}
            >
              <Tree label={renderTreeNode(tree)} lineWidth={"2px"}>
                {treeNodes.map((treenode, index) => {
                  return (
                    <TreeNode
                      label={renderTreeNode(treenode)}
                      id={treenode.id}
                      key={index}
                      selected={treenode.selected}
                      onClick={onClicked}
                      details={treenode}
                      hide={treenode.hide}
                    >
                      {treenode.nodes &&
                        treenode.nodes.map((node, nIndex) => {
                          return (
                            <TreeNode
                              label={renderTreeNode(node)}
                              id={node.id}
                              key={nIndex}
                              selected={node.selected}
                              onClick={onClicked}
                              details={node}
                              hide={node.hide}
                            ></TreeNode>
                          );
                        })}
                    </TreeNode>
                  );
                })}
              </Tree>
            </div>
          </div>
        }
        footer={footer ?? null}
      ></WishSimpleCard>
      <WishModal id="dlgEnrollUser" title="Enroll New User" finishTitle="Done">
        <div className="text-center">
          <div
            className="btn-group"
            role="group"
            aria-label="New Enrollment Position"
          >
            {organizationsArray.map((organization, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className={
                    "btn " +
                    (selectedOrganization === undefined
                      ? " btn-light "
                      : selectedOrganization === index
                      ? " btn-primary "
                      : " btn-light ")
                  }
                  onClick={() => {
                    setSelectedOrganization(index);
                  }}
                >
                  {organization}
                </button>
              );
            })}
          </div>
          <div
            className={
              "pt-2 " +
              (hideExitingEnrollments && " hidden ") +
              (selectedOrganization ?? " hidden ")
            }
          >
            <WishSelect
              label="Select Enrollment"
              data={existingEnrollments}
            ></WishSelect>
          </div>
        </div>
      </WishModal>
      <WishModal
        id="dlgUserRank"
        title={
          isRootNode
            ? "Your Achievements"
            : selectedNode.title + " Achievements"
        }
        noFooter
        modalSize="modal-lg"
      >
        <div className="row">
          <div className="col-12">
            <WishColoredBar
              message={
                <div className="d-flex">
                  <small className="mr-auto">
                    Current Rank: Black Diamond Ambassador
                  </small>
                  <small className="ml-auto">
                    Paid as Rank: Ruby Executive
                  </small>
                </div>
              }
            ></WishColoredBar>
          </div>
          <div className="col-12 file-list">
            <WishRankTimeline data={data.timelineData}></WishRankTimeline>
          </div>
          <div className="col-12 pt-2">
            <h5>Your badges:</h5>
            <div className="d-flex justify-content-around">
              <img
                className="thumbnail-sm"
                src="../assets/app-assets/images/badges/idealDistributor.jpg"
                alt="Ideal Distributor"
              />
              <img
                className="thumbnail-sm"
                src="../assets/app-assets/images/badges/presidentialClub.jpg"
                alt="Ideal Distributor"
              />
            </div>
          </div>
        </div>
      </WishModal>
    </>
  );
}
