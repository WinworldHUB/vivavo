/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PageLayout from "../../components/PageLayout";
import WishColoredBar from "../../components/WishColoredBar";
import WishIconCard from "../../components/WishIconCard";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import data from "../../data/Data.json";
import { Link } from "react-router-dom";
import { useState } from "react";
import WishImageBGCard from "../../components/WishImageBGCard";
import PersonalDetails from "./Forms/PersonalDetails";
import AddressDetails from "./Forms/AddressDetails";
import BankDetails from "./Forms/BankDetails";
import WishToaster from "../../components/WishToaster";
import KYCDocuments from "./Forms/KYCDocuments";
import RankJourney from "./Forms/RankJourney";
import WishSimpleCard from "../../components/WishSimpleCard";
import CoApplicantProfile from "./Forms/CoApplicantProfile";

export default function ProfileDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentFormMode, setCurrentFormMode] = useState("display");

  const renderProfileTop = function () {
    return (
      <div className="bg-transparent border-0 box-shadow-0">
        <div className="row d-flex align-items-center pt-0">
          <div className="col-sm-3 col-md-2 offset-md-3 offset-sm-4 text-center text-white border-2 border-right-white">
            <CircularProgressbarWithChildren
              value={66}
              strokeWidth={10}
              styles={{
                path: {
                  // Trail color
                  stroke: "#FF971D",
                },
                trail: {
                  stroke: "none",
                },
              }}
            >
              <img
                src={data.profile.picture}
                alt=""
                className="rounded-circle image-border"
                style={{ height: "80%" }}
              />
            </CircularProgressbarWithChildren>

            <label className="pt-1">Black Diamond Ambassador</label>
          </div>
          <div className="col-sm-5 col-md-4 text-white text-center text-sm-left">
            <h1 className="text-white">M. Shamshudeen (Sheenu)</h1>
            <div className="d-flex justify-content-between align-items-center">
              <small>Distributor ID: 1001</small>
              <button
                className="btn btn-primary btn-sm"
                //onClick={() => doFlip(!isProfileFlipped, "flipProfileDetails")}
              >
                <i className="las la-edit"></i> Edit details
              </button>
            </div>

            <hr className="border-white" />
            <table className="offset-3 offset-sm-0 text-left">
              <tbody>
                <tr>
                  <td>Phone:</td>
                  <td>+91 9009009009</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>sheenu@gmail.com</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>Inactive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-2">
            <WishColoredBar bgcolor="white" className="row shadow-sm">
              <div className="col-auto border-2 border-right-primary progress-label text-primary">
                60%
              </div>
              <div className="col">
                <span className="lead text-muted">
                  Your profile is 60% complete. You are behind 10% of your peers
                  with respect to profile completion.
                </span>
              </div>
              <div className="col-12 text-right">
                <Link to="" className="card-link link-dotted">
                  View Genealogy
                </Link>
                <a
                  to=""
                  className="card-link link-dotted text-primary"
                  onClick={() => {
                    setSelectedTab(3);
                  }}
                >
                  Add KYC Details
                </a>
              </div>
            </WishColoredBar>
          </div>
        </div>
      </div>
    );
  };

  function RenderTabsUI() {
    return (
      <div className="row">
        {data.profile.tabs &&
          data.profile.tabs.map((tab, index) => {
            return (
              <div className="col-2 p-0" key={index}>
                <WishIconCard
                  selected={selectedTab === index ? true : false}
                  title={tab.title}
                  icon={tab.icon}
                  onClicked={() => {
                    if (currentFormMode !== "edit") {
                      setSelectedTab(index);
                    } else {
                      WishToaster({
                        toastTitle: "Please save your changes to proceed",
                        toastType: "error",
                      });
                    }
                  }}
                />
              </div>
            );
          })}
      </div>
    );
  }

  const tabContentEditClicked = function (mode) {
    setCurrentFormMode(mode);
    console.log(mode, currentFormMode);
  };

  function RenderTabContent() {
    var isEditable = true;
    var size = "col-md-6";
    var children = "";
    var title = "";
    switch (selectedTab) {
      case 0:
        children = <PersonalDetails mode={currentFormMode} />;
        title = "Personal Details";
        break;

      case 1:
        children = <AddressDetails mode={currentFormMode} />;
        title = "Address Details";
        break;

      case 2:
        children = <BankDetails mode={currentFormMode} />;
        title = "Bank Details";
        break;

      case 3:
        children = <KYCDocuments />;
        title = "KYC Documents";
        isEditable = false;
        break;

      case 4:
        children = <RankJourney />;
        title = "Rank Journey";
        isEditable = false;
        break;

      default:
        break;
    }
    return (
      <WishImageBGCard
        title={title}
        showEditButton={currentFormMode === "display" && isEditable}
        showSaveButton={currentFormMode === "edit" && isEditable}
        image={data.profile.tabContentBGs[selectedTab]}
        onEditClicked={(mode) => {
          tabContentEditClicked(mode);
        }}
      >
        <div className="row">{children}</div>
      </WishImageBGCard>
    );
  }

  function RenderMyCards() {
    return (
      <WishSimpleCard header={<h4 class="card-title">My Cards</h4>}>
        <KYCDocuments
          fullLength={true}
          data={data.profile.MyCards}
          bgColor="doc-bg-awaiting"
        />
      </WishSimpleCard>
    );
  }

  function RenderPCMMembership() {
    return (
      <WishSimpleCard
        header={<h4 class="card-title">PCM Membership</h4>}
        footer={
          <a className="card-link text-primary link-dotted ml-auto" href="#">
            Avail
          </a>
        }
      >
        <p className="lead pb-1">
          You have not yet availed the PCM benefits. Use the avail button to
          initiate the process
        </p>
      </WishSimpleCard>
    );
  }

  function RenderCoApplicantProfile() {
    return (
      <WishSimpleCard
        header={<h4 class="card-title">Co-Applicant Profile</h4>}
        footer={
          <a className="card-link text-primary link-dotted ml-auto" href="#">
            Change Co-Applicant
          </a>
        }
      >
        <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
          <CoApplicantProfile mode={currentFormMode} />
        </div>
      </WishSimpleCard>
    );
  }

  return (
    <PageLayout activeSideMenu="0" pageTitle="My Profile" extendedHeader>
      {renderProfileTop()}
      <RenderTabsUI />
      <br />
      <RenderTabContent />
      <div className="row">
        <div className="col-md-8 p-0">
          <RenderMyCards />
        </div>
        <div className="col-md-4 pr-0">
          <RenderPCMMembership />
        </div>
        <div className="col-md-8 p-0">
          <RenderCoApplicantProfile />
        </div>
        <div className="col-md-4 pr-0">
          <RenderPCMMembership />
        </div>
      </div>
    </PageLayout>
  );
}
