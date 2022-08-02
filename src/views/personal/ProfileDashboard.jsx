import React from "react";
import PageLayout from "../../components/PageLayout";
import WishColoredBar from "../../components/WishColoredBar";
import WishLinkCard from "../../components/WishLinkCard";
import WishIconCard from "../../components/WishIconCard";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import data from "../../data/Data.json";
import { Link } from "react-router-dom";
import { useState } from "react";
import WishImageBGCard from "../../components/WishImageBGCard";

export default function ProfileDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
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
          <div className="col-12 pt-2">
            <WishColoredBar bgcolor="light" className="row shadow-sm">
              <div className="col-auto border-2 border-right-primary progress-label text-primary">
                60%
              </div>
              <div className="col">
                <span className="lead">
                  Your profile is 60% complete. You are behind 10% of your peers
                  with respect to profile completion.
                </span>
              </div>
              <div className="col-12 text-right">
                <Link to="" className="card-link link-dotted">
                  View Genealogy
                </Link>
                <Link to="" className="card-link link-dotted">
                  Add KYC Details
                </Link>
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
              <div className="col-2" key={index}>
                <WishIconCard
                  selected={selectedTab === index ? true : false}
                  title={tab.title}
                  icon={tab.icon}
                  onClicked={() => {
                    setSelectedTab(index);
                  }}
                />
              </div>
            );
          })}
      </div>
    );
  }

  const tabContentEditClicked = function (mode) {
    alert(mode);
  };

  function RenderTabContent() {
    var children = "";
    switch (selectedTab) {
      case 0:
        children = <h3>Personal Details</h3>;
        break;

      case 1:
        children = <h3>Address</h3>;
        break;

      case 2:
        children = <h3>Bank Details</h3>;
        break;

      case 3:
        children = <h3>KYC Documents</h3>;
        break;

      case 4:
        children = <h3>Rank Journey</h3>;
        break;

      default:
        break;
    }
    return (
      <WishImageBGCard
        title="Personal Details"
        showEditButton={true}
        image={data.profile.tabContentBGs[selectedTab]}
        onEditClicked={() => {
          tabContentEditClicked("edit");
        }}
      >
        {children}
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </WishImageBGCard>
    );
  }

  return (
    <PageLayout activeSideMenu="0" pageTitle="My Profile" extendedHeader>
      {renderProfileTop()}
      <RenderTabsUI />
      <br />
      <RenderTabContent />
    </PageLayout>
  );
}
