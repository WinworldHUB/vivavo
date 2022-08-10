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
import VOTMMembership from "./Forms/VOTMMembership";
import WishModal from "../../components/WishModal";
import DistributorDetails from "./Forms/DistributorDetails";
import WishCarousel from "../../components/WishCarousel";
import WishSelect from "../../components/WishFormComponents/WishSelect";
import ChangeCoApplicantRequest from "./Forms/ChangeCoApplicantRequest";
import PCMMembership from "./Forms/PCMMembership";
import { AppUtils } from "../../services/AppUtils";

export default function ProfileDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentFormMode, setCurrentFormMode] = useState("display");
  const [coapplicantFormMode, setCoapplicantFormMode] = useState("display");

  const [changeCoApplicantPageIndex, setChangeCoApplicantPageIndex] =
    useState(0);
  const [isCoApplicantMother, setIsCoApplicantMother] = useState(true);

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
                data-toggle="modal"
                data-target="#dlgEditDetails"
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
                <Link to="/mygeneology" className="card-link link-dotted">
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
      <WishSimpleCard
        header={<h4 class="card-title">My Cards</h4>}
        cardBodyClassName="p-0"
      >
        <KYCDocuments
          fullLength={true}
          data={data.profile.MyCards}
          bgColor="doc-bg-awaiting"
        />
      </WishSimpleCard>
    );
  }

  function RenderCoApplicantProfile() {
    return (
      <WishSimpleCard
        header={
          <div className="d-flex justify-content-between align-items-center">
            <h4 class="card-title">Co-Applicant Profile</h4>
            <h4>
              <a
                className="clickable text-primary"
                onClick={() => {
                  if (coapplicantFormMode === "display")
                    setCoapplicantFormMode("edit");
                  else setCoapplicantFormMode("display");
                }}
              >
                <i className="las la-edit"></i>
              </a>
            </h4>
          </div>
        }
        footer={
          <a
            className="card-link text-primary link-dotted ml-auto"
            data-toggle="modal"
            data-target="#dlgChangeCoApplicant"
          >
            Change Co-Applicant
          </a>
        }
        cardBodyClassName="scrollOn200"
      >
        {/* <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
          <CoApplicantProfile mode={"edit"} />
        </div> */}
        <CoApplicantProfile mode={coapplicantFormMode} />
      </WishSimpleCard>
    );
  }

  function RenderVOTMMembershipt() {
    return (
      <WishSimpleCard
        header={<h4 class="card-title">VOTM Membership</h4>}
        footer={
          <Link
            className="card-link text-primary link-dotted ml-auto"
            to="/placeorder"
          >
            Place Order
          </Link>
        }
        cardBodyClassName="scrollOn200"
      >
        <VOTMMembership data={data.profile.VOTMMembership} />
      </WishSimpleCard>
    );
  }

  return (
    <PageLayout activeSideMenu="0" pageTitle="My Profile" extendedHeader>
      {renderProfileTop()}
      <div className="row">
        <div className="col-md-12">
          <RenderTabsUI />
          <br />
          <RenderTabContent />
        </div>
        <div className="col-md-8">
          <RenderMyCards />
        </div>
        <div className="col-md-4">
          <PCMMembership />
        </div>
        <div className="col-md-8">
          <RenderCoApplicantProfile />
        </div>
        <div className="col-md-4">
          <RenderVOTMMembershipt />
        </div>
      </div>
      <WishModal id="dlgEditDetails" title="Update details">
        <DistributorDetails />
      </WishModal>
      <WishModal
        id="dlgChangeCoApplicant"
        title="Change Co-Applicant"
        noFooter={true}
      >
        <WishColoredBar bgcolor="danger">
          CAUTION: This is an important change that you are making!
        </WishColoredBar>
        <WishCarousel
          showNextPrev={false}
          selectedPageIndex={changeCoApplicantPageIndex}
        >
          <>
            <h5 className="">
              We would like you to confirm few things about yourself first
            </h5>
            <p>Gender: Male</p>
            <WishSelect
              label="Martial Status:"
              data={["Single", "Married", "Divorced", "Widowed"]}
            />
          </>
          <>
            <h5 className="">Now tell us about the co-applicant</h5>
            <WishSelect
              label="Martial Status:"
              data={["Mother", "Other"]}
              onSelect={(index) => {
                console.log(index);
                setIsCoApplicantMother(parseInt(index) === 0);
              }}
            />
          </>
        </WishCarousel>
        <div className="d-flex justify-content-between">
          {changeCoApplicantPageIndex > 0 ? (
            <label
              className="card-link link-dotted clickable"
              onClick={() => {
                setChangeCoApplicantPageIndex(changeCoApplicantPageIndex - 1);
              }}
            >
              Change Martiail Status
            </label>
          ) : (
            <>&nbsp;</>
          )}

          {changeCoApplicantPageIndex === 0 ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                setChangeCoApplicantPageIndex(changeCoApplicantPageIndex + 1);
              }}
            >
              Next
            </button>
          ) : (
            <button
              className="btn btn-danger"
              data-dismiss="modal"
              // data-toggle="modal"
              // data-target="#dlgCoApplicantDetails"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                AppUtils.showDialog("dlgCoApplicantDetails");
              }}
            >
              Submit
            </button>
          )}
        </div>
      </WishModal>
      <WishModal
        id="dlgCoApplicantDetails"
        modalSize="modal-xl modal-dialog-scrollable"
        title="Submit Change CoApplicant Request"
      >
        <ChangeCoApplicantRequest isCoApplicantMother={isCoApplicantMother} />
      </WishModal>
    </PageLayout>
  );
}
