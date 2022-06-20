/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";
import WishModal from "../../components/WishModal";
import WishToaster from "../../components/WishToaster";
import WishGeneologyTree from "../../components/WishGeneologyTree";
import { useState } from "react";

export default function GenerateLink() {
  const breadcrumbs = [];

  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "Enrollment", linkTo: "/enrollment" });
  breadcrumbs.push({ title: "Generate Link", linkTo: "/" });

  const [treeNodes, setTreeNodes] = useState({
    title: "Root Node",
    id: 0,
    distributorID: "1000",
    name: "John Doe",
    achievedRank: "Royal Black Diamond",
    paidAsRank: "Ruby Executive",
    status: "Active",
    activationPV: "100",
    nextActivationWeek: "433",
    aggregateIncome: "2,39,837",
    expanded: true,
    selected: true,
    nodes: [
      {
        title: "Child 1",
        id: 1,
        distributorID: "1001",
        expanded: true,
        selected: false,
        nodes: [
          {
            title: "Child 11",
            id: 11,
            distributorID: "11001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
          {
            title: "Child 12",
            id: 12,
            distributorID: "12001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
        ],
      },
      {
        title: "Child 2",
        id: 2,
        distributorID: "2001",
        expanded: true,
        selected: false,
        nodes: [
          {
            title: "Child 21",
            id: 21,
            distributorID: "21001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
          {
            title: "Child 22",
            id: 22,
            distributorID: "22001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
        ],
      },
      {
        title: "Child 3",
        id: 3,
        distributorID: "3001",
        name: "John Doe",
        achievedRank: "Royal Black Diamond",
        paidAsRank: "Ruby Executive",
        status: "Active",
        activationPV: "100",
        nextActivationWeek: "433",
        aggregateIncome: "2,39,837",
        expanded: true,
        selected: false,
        nodes: [
          {
            title: "Child 31",
            id: 31,
            distributorID: "31001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
          {
            title: "Child 32",
            id: 32,
            distributorID: "32001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
          {
            title: "Child 33",
            id: 33,
            distributorID: "33001",
            name: "John Doe",
            achievedRank: "Royal Black Diamond",
            paidAsRank: "Ruby Executive",
            status: "Active",
            activationPV: "100",
            nextActivationWeek: "433",
            aggregateIncome: "2,39,837",
            expanded: true,
            selected: false,
            nodes: [],
          },
        ],
      },
    ],
  });

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
        modalSize="modal-lg"
      >
        <WishGeneologyTree tree={treeNodes}></WishGeneologyTree>
      </WishModal>
    </PageLayout>
  );
}
