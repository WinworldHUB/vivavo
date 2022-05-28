/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import DocumentCard from "../../components/DocumentCard";
import PageLayout from "../../components/PageLayout";

export default function KYC() {
  const handleActionClick = (event) => {
    console.log("Action Clicked");
  };
  return (
    <PageLayout activeSideMenu="0" pageTitle="KYC Dashboard">
      <div className="card bg-blue-grey bg-lighten-4 box-shadow-0">
        <div className="card-content">
          <div className="card-body">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="base-tab1"
                  data-toggle="tab"
                  aria-controls="tab1"
                  href="#tab1"
                  aria-expanded="true"
                >
                  My KYC
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="base-tab2"
                  data-toggle="tab"
                  aria-controls="tab2"
                  href="#tab2"
                  aria-expanded="false"
                >
                  Co-Applicant KYC
                </a>
              </li>
            </ul>
            <div className="tab-content px-1 pt-1">
              <div
                role="tabpanel"
                className="tab-pane active"
                id="tab1"
                aria-expanded="true"
                aria-labelledby="base-tab1"
              >
                <section className="row pl-0">
                  <div className="col-md-4 col-sm-6">
                    <DocumentCard
                      title="Aadhar Card"
                      status="notsubmitted"
                      onActionClick={(e) => handleActionClick(e)}
                    ></DocumentCard>
                  </div>

                  <div className="col-md-4 col-sm-6">
                    <DocumentCard
                      title="Pan Card"
                      status="inprogress"
                      onActionClick={(e) => handleActionClick(e)}
                    ></DocumentCard>
                  </div>

                  <div className="col-md-4 col-sm-6">
                    <DocumentCard
                      title="Address Proof"
                      status="approved"
                      onActionClick={(e) => handleActionClick(e)}
                    ></DocumentCard>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <DocumentCard
                      title="Bank Proof"
                      status="rejected"
                      message="Image not clear"
                      onActionClick={(e) => handleActionClick(e)}
                    ></DocumentCard>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <DocumentCard
                      title="Contract Form"
                      status="notsubmitted"
                      onActionClick={(e) => handleActionClick(e)}
                    ></DocumentCard>
                  </div>
                </section>
              </div>
              <div className="tab-pane" id="tab2" aria-labelledby="base-tab2">
                <section className="row pl-0">
                  <div className="col-md-4 col-sm-6">
                    <DocumentCard
                      title="Aadhar Card"
                      status="notsubmitted"
                      onActionClick={(e) => handleActionClick(e)}
                    ></DocumentCard>
                  </div>

                  <div className="col-md-4 col-sm-6">
                    <DocumentCard
                      title="Pan Card"
                      status="notsubmitted"
                      onActionClick={(e) => handleActionClick(e)}
                    ></DocumentCard>
                  </div>

                  <div className="col-md-4 col-sm-6">
                    <DocumentCard
                      title="Bank Proof"
                      status="notsubmitted"
                      onActionClick={(e) => handleActionClick(e)}
                    ></DocumentCard>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
