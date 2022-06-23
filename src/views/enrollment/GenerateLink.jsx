/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";
import WishModal from "../../components/WishModal";
import WishToaster from "../../components/WishToaster";
import WishGeneologyTree from "../../components/WishGeneologyTree";
import { useState } from "react";

import "json-loader";
import data from "../../data/Data.json";

export default function GenerateLink() {
  const breadcrumbs = [];

  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "Enrollment", linkTo: "/enrollment" });
  breadcrumbs.push({ title: "Generate Link", linkTo: "/" });

  const [isRotated, setIsRotated] = useState(true);
  const [filterApplied, applyFilter] = useState(false);

  const [filterText, setFilterText] = useState("");

  const [treeNodes, setTreeNodes] = useState(data.treeData);

  const pageHeader = function () {
    return (
      <div className="row">
        <div className="col-sm-9">
          <p className="badge badge-lg badge-primary">Sponsor Details</p>
          <label className="lead">
            &nbsp;Sponsor ID: <code>684313</code> &nbsp; Sponsor Name:
            <code>John Doe</code>
          </label>
        </div>
        <div className="col-sm-3 text-right">
          <a
            className="card-link"
            data-toggle="modal"
            data-target="#dlgGenology"
          >
            Select From Geneology
          </a>
        </div>
        <div className="col-sm-12 pt-2">
          <div className="form-row">
            <div className="col-5">
              <label htmlFor="txtDistributor">Parent Distributor ID</label>
              <input
                id="txtDistributor"
                type="text"
                className="form-control"
                placeholder="Parent Distributor ID"
              />
            </div>
            <div className="col-5">
              <label htmlFor="ddPosition">Position</label>
              <select
                title="Select Position"
                name="ddPosition"
                id="ddPosition"
                className="form-control"
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div className="col-2 d-flex align-items-end">
              <a className="btn btn-primary flex-fill" href="#">
                GENERATE
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-12 pt-2">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="bg-primary white">
                <tr>
                  <th>#</th>
                  <th>Parent ID</th>
                  <th>Position</th>
                  <th>Link</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>688195</td>
                  <td>Left</td>
                  <td>
                    <a
                      onClick={() =>
                        WishToaster({
                          toastMessage: "Link copied to clipboard",
                          toastType: "success",
                        })
                      }
                    >
                      Copy Link
                    </a>
                  </td>
                  <td>Not Occupied</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>688195</td>
                  <td>Right</td>
                  <td>
                    <a
                      onClick={() =>
                        WishToaster({
                          toastMessage: "Link copied to clipboard",
                          toastType: "success",
                        })
                      }
                    >
                      Copy Link
                    </a>
                  </td>
                  <td>Not Occupied</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const page = function () {
    return;
  };

  const showAll = function () {
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
        </div>
      </div>
    );
  };

  return (
    <PageLayout
      activeSideMenu="3"
      pageTitle="Ongoing Enrollments"
      breadcrumbs={breadcrumbs}
      header={" "}
    >
      <WishSimpleCard header={pageHeader()} body={page()}></WishSimpleCard>

      <WishModal
        id="dlgGenology"
        title="Geneology"
        noFooter
        modalSize="modal-xl"
      >
        <WishGeneologyTree
          reverse={isRotated}
          hideExitingEnrollments
          header={treeHeader()}
          tree={treeNodes}
        ></WishGeneologyTree>
      </WishModal>
    </PageLayout>
  );
}
