/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishLinkCard from "../../components/WishLinkCard";
import WishModal from "../../components/WishModal";
import WishSimpleCard from "../../components/WishSimpleCard";
import WishGeneologyTree from "../../components/WishGeneologyTree";
import "react-datepicker/dist/react-datepicker.css";
import { AppUtils } from "../../services/AppUtils";

import "json-loader";
import data from "../../data/Data.json";
import WishToaster from "../../components/WishToaster";
import WishColoredBar from "../../components/WishColoredBar";
import useMasters from "../../services/useMasters";
import useEnrollment from "../../services/useEnrollment";
import { useEffect } from "react";
import WishSelect from "../../components/WishFormComponents/WishSelect";
import LoadingNote from "../../components/LoadingNote";
import { useRef } from "react";

export default function EnrollUser() {
  const location = useLocation();
  const { step } = location.state ?? 0;

  const totalPages = 6;
  const [currentPage, setCurrentPage] = useState(step ?? 0);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [pancardConsent, setPancardConsent] = useState(false);
  const [pancard, setPancard] = useState("");
  const [gstConsent, setGSTConsent] = useState(false);
  const [gstnumber, setGSTNumber] = useState("");

  const page1Ref = useRef(null);

  const { loggedInUser } = useMasters();
  const [
    enrollmentError,
    enrollmentLoading,
    { enrollmentMasterData, locationDetails, getLocationDetails },
  ] = useEnrollment(loggedInUser);

  const breadcrumbs = [];
  const navigations = [
    "Applicant Details",
    "Contact Details",
    "Bank Details",
    "Co-Applicant Details",
  ];

  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "Enrollment", linkTo: "/enrollment" });
  breadcrumbs.push({ title: "New User", linkTo: "/" });

  const [isRotated, setIsRotated] = useState(true);
  const [filterApplied, applyFilter] = useState(false);

  const [filterText, setFilterText] = useState("");

  const [treeNodes, setTreeNodes] = useState(data.treeData);

  useEffect(() => {
    if (enrollmentMasterData) {
      console.log(enrollmentMasterData);
    }
  }, [enrollmentMasterData]);

  const navigationBar = function () {
    var currentProgress = ((currentPage + 1) / totalPages) * 100;
    return (
      <div className="row">
        {navigations.map((navigation, index) => {
          return (
            <div className="col" key={index}>
              <WishLinkCard
                key={index}
                linkTitle={navigation}
                background={
                  currentPage === index
                    ? "bg-primary white text-white link-white box-shadow-3"
                    : termsAgreed === true
                    ? "bg-success white text-white link-white "
                    : ""
                }
                onClick={() => setCurrentPage(index)}
              ></WishLinkCard>
            </div>
          );
        })}
        <div className="col-12">
          <div className="progress" style={{ height: "3px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: currentProgress + "%" }}
              aria-valuenow={currentProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const pageHeader = function () {
    switch (currentPage) {
      default:
        return;

      case 0:
        return (
          <h4 className="card-title">Primary Applicant | Basic Details</h4>
        );

      case 1:
        return (
          <h4 className="card-title">Primary Applicant | Contact Details</h4>
        );

      case 2:
        return <h4 className="card-title">Primary Applicant | Bank Details</h4>;

      case 3:
        return <h4 className="card-title">Co-Applicant Details</h4>;

      case 4:
        return <h4 className="card-title">Preview</h4>;

      case 5:
        return (
          <div className="row">
            <div className="col-6">
              <h4 className="card-title">Sponsor / Placement Details</h4>
            </div>
            <div className="col-6 text-right">
              <a
                data-target="#dlgGenology"
                data-toggle="modal"
                className="card-link"
              >
                Select from genology
              </a>
            </div>
          </div>
        );
    }
  };

  const pageFooter = function () {
    return (
      <>
        <a
          className={
            "card-link lead d-flex align-items-baseline text-muted mr-auto " +
            (currentPage === 0 ? " hidden " : "")
          }
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <i className="las la-angle-left"></i> BACK
        </a>
        <a
          className={
            "card-link lead d-flex align-items-baseline text-primary ml-auto " +
            (currentPage === totalPages - 1 ? " hidden " : " ") +
            (currentPage === 4 && termsAgreed === false ? " hidden " : "")
          }
          onClick={() => {
            gotoNextPage();
          }}
        >
          PROCEED <i className="las la-angle-right"></i>
        </a>
      </>
    );
  };

  const gotoNextPage = function () {
    if (validatePage()) setCurrentPage(currentPage + 1);
  };

  const validatePage = function () {
    switch (currentPage) {
      case 0:
        console.clear();
        console.log(new FormData(page1Ref.current).get("txtFirstname"));
        if (
          (pancard === "" && pancardConsent === false) ||
          (gstnumber === "" && gstConsent === false)
        ) {
          AppUtils.showDialog("dlgConsent");
          return false;
        }
        break;

      default:
        break;
    }

    return true;
  };

  const page = function () {
    switch (currentPage) {
      default:
        return page1();

      case 0:
        return page1();

      case 1:
        return page2();

      case 2:
        return page3();

      case 3:
        return page4();

      case 4:
        return page5();

      case 5:
        return page6();
    }
  };

  const page1 = function () {
    return (
      <form id="frmPage1" ref={page1Ref}>
        <div>
          <div className="form-group row">
            <label htmlFor="ddTitle" className="col-4 col-form-label">
              Title
            </label>
            <div className="col-8">
              {enrollmentLoading ? (
                <LoadingNote />
              ) : (
                <WishSelect
                  data={[
                    ...(enrollmentMasterData?.titles ?? []).map(
                      (x) => x.title_name
                    ),
                  ]}
                />
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="txtFirstname" className="col-4 col-form-label">
              First Name
            </label>
            <div className="col-8">
              <input
                id="txtFirstname"
                name="txtFirstname"
                placeholder="First Name"
                type="text"
                required="required"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="txtLastname" className="col-4 col-form-label">
              Last Name
            </label>
            <div className="col-8">
              <input
                id="txtLastname"
                name="txtLastname"
                placeholder="Last Name"
                type="text"
                required="required"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="projectinput3" className="col-4 col-form-label">
              Date of birth
            </label>
            <div className="col-8">
              <input
                type="date"
                id="projectinput3"
                className="form-control"
                name="dateopened"
                data-toggle="tooltip"
                data-trigger="hover"
                data-placement="top"
                data-title="Date of birth"
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="ddLanguage" className="col-4 col-form-label">
              Preferred Language
            </label>
            <div className="col-8">
              {enrollmentLoading ? (
                <LoadingNote />
              ) : (
                <WishSelect
                  data={[
                    ...(enrollmentMasterData?.languages ?? []).map(
                      (x) => x.title_name
                    ),
                  ]}
                />
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-4">Gender</label>
            <div className="col-8">
              {enrollmentLoading ? (
                <LoadingNote />
              ) : (
                <WishSelect
                  data={[
                    ...(enrollmentMasterData?.gender ?? []).map((x) => x.title),
                  ]}
                />
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="ddMartiaialStatus" className="col-4 col-form-label">
              Maritial Status
            </label>
            <div className="col-8">
              {enrollmentLoading ? (
                <LoadingNote />
              ) : (
                <WishSelect
                  data={[
                    ...(enrollmentMasterData?.marital_status ?? []).map(
                      (x) => x.title_name
                    ),
                  ]}
                />
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="ddProfession" className="col-4 col-form-label">
              Profession
            </label>
            <div className="col-8">
              {enrollmentLoading ? (
                <LoadingNote />
              ) : (
                <WishSelect
                  data={[
                    ...(enrollmentMasterData?.profession ?? []).map(
                      (x) => x.title_name
                    ),
                  ]}
                />
              )}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="ddMonthlyIncome" className="col-4 col-form-label">
              Monhtly Income
            </label>
            <div className="col-8">
              {enrollmentLoading ? (
                <LoadingNote />
              ) : (
                <WishSelect
                  data={[
                    ...(enrollmentMasterData?.monthly_income ?? []).map(
                      (x) => x.title_name
                    ),
                  ]}
                />
              )}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="txtAadharCard" className="col-4 col-form-label">
              Aadhar Card
            </label>
            <div className="col-8">
              <input
                id="txtAadharCard"
                name="txtAadharCard"
                placeholder="(Optional)"
                type="text"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="txtfAadharCard" className="col-4 col-form-label">
              Aadhar Card (Attachment)
            </label>
            <div className="col-8">
              <input
                id="txtfAadharCard"
                name="txtfAadharCard"
                placeholder="(Optional)"
                type="file"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="txtGST" className="col-4 col-form-label">
              GST Number
            </label>
            <div className="col-8">
              <input
                id="txtGST"
                name="txtGST"
                placeholder="(Optional)"
                type="text"
                className="form-control"
                defaultValue={gstnumber}
                onChange={(e) => {
                  setGSTNumber(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="txtPAN" className="col-4 col-form-label">
              PAN
            </label>
            <div className="col-8">
              <input
                id="txtPAN"
                name="txtPAN"
                placeholder="(Optional)"
                type="text"
                className="form-control"
                defaultValue={pancard}
                onChange={(e) => {
                  setPancard(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="txtfPAN" className="col-4 col-form-label">
              PAN (Attachment)
            </label>
            <div className="col-8">
              <input
                id="txtfPAN"
                name="txtfPAN"
                placeholder="(Optional)"
                type="file"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </form>
    );
  };

  const page2 = function () {
    return (
      <div>
        <div className="form-group row">
          <label htmlFor="txtDistiName" className="col-4 col-form-label">
            Full Name
          </label>
          <div className="col-8">
            <input
              id="txtDistiName"
              name="txtDistiName"
              placeholder="Primary Applicant Fullname"
              type="text"
              className="form-control"
              disabled="disabled"
              defaultValue="John Doe"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtMobile" className="col-4 col-form-label">
            Mobile Number
          </label>
          <div className="col-8">
            <input
              id="txtMobile"
              name="txtMobile"
              placeholder="Mobile Number"
              type="text"
              className="form-control"
              aria-describedby="txtMobileHelpBlock"
              required="required"
            />
            <span id="txtMobileHelpBlock" className="form-text text-muted">
              Please do not append country code
            </span>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtEmail" className="col-4 col-form-label">
            Email
          </label>
          <div className="col-8">
            <input
              id="txtEmail"
              name="txtEmail"
              placeholder="Primary Applicant Fullname"
              type="email"
              className="form-control"
            />
          </div>
        </div>

        <p className="lead border-bottom text-primary pt-2">
          Permanent Address
        </p>

        <div className="form-group row">
          <label htmlFor="txtAddressLine1" className="col-4 col-form-label">
            Address Line 1
          </label>
          <div className="col-8">
            <input
              id="txtAddressLine1"
              name="txtAddressLine1"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtAddressLine2" className="col-4 col-form-label">
            Address Line 2
          </label>
          <div className="col-8">
            <input
              id="txtAddressLine2"
              name="txtAddressLine2"
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtPincode" className="col-4 col-form-label">
            Pincode
          </label>
          <div className="col-8">
            <input
              id="txtPincode"
              name="txtPincode"
              type="text"
              className="form-control"
              required="required"
              onBlur={() => {
                getLocationDetails("313001");
              }}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddCity" className="col-4 col-form-label">
            Location
          </label>
          <div className="col-8">
            {!locationDetails ? (
              <LoadingNote />
            ) : (
              `${locationDetails[0]?.city_name}, ${locationDetails[0]?.district_name}, ${locationDetails[0]?.state_name}, ${locationDetails[0]?.country_name}`
            )}
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddDistrict" className="col-4 col-form-label">
            Post Name
          </label>
          <div className="col-8">
            {!locationDetails ? (
              <LoadingNote />
            ) : (
              <WishSelect
                data={[...(locationDetails ?? []).map((x) => x.post_name)]}
              />
            )}
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddState" className="col-4 col-form-label">
            State
          </label>
          <div className="col-8">
            <select
              id="ddState"
              name="ddState"
              className="custom-select"
              required="required"
            >
              <option defaultValue="rajasthan">Rajasthan</option>
              <option defaultValue="maharashtra">Maharashtra</option>
              <option defaultValue="gujarat">Gujarat</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddCountry" className="col-4 col-form-label">
            Country
          </label>
          <div className="col-8">
            <select
              id="ddCountry"
              name="ddCountry"
              className="custom-select"
              required="required"
            >
              <option defaultValue="rajasthan">India</option>
              <option defaultValue="maharashtra">UAE</option>
              <option defaultValue="gujarat">Kenya</option>
            </select>
          </div>
        </div>

        <div className="form-group row pt-1">
          <label htmlFor="txtfAddressProof" className="col-4 col-form-label">
            Address Proof (Attachment)
          </label>
          <div className="col-8">
            <input
              id="txtfAddressProof"
              name="txtfAddressProof"
              type="file"
              className="form-control"
              required="required"
            />
          </div>
        </div>

        <div className="form-row border-bottom pt-2">
          <p className="lead col-4 text-primary">Communication Address</p>
          <div className="col-8 pl-1">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
                defaultChecked=""
              />
              <label className="custom-control-label" htmlFor="customSwitch1">
                Same as Permanent Address
              </label>
            </div>
          </div>
        </div>

        <div className="form-group row pt-1">
          <label htmlFor="txtCAddressLine1" className="col-4 col-form-label">
            Address Line 1
          </label>
          <div className="col-8">
            <input
              id="txtCAddressLine1"
              name="txtCAddressLine1"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtCAddressLine2" className="col-4 col-form-label">
            Address Line 2
          </label>
          <div className="col-8">
            <input
              id="txtCAddressLine2"
              name="txtCAddressLine2"
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtCPincode" className="col-4 col-form-label">
            Pincode
          </label>
          <div className="col-8">
            <input
              id="txtCPincode"
              name="txtCPincode"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddCCity" className="col-4 col-form-label">
            District
          </label>
          <div className="col-8">
            <select
              id="ddCCity"
              name="ddCCity"
              className="custom-select"
              required="required"
            >
              <option defaultValue="udaipur">Udaipur</option>
              <option defaultValue="nashik">Nashik</option>
              <option defaultValue="bhiwadi">Bhiwadi</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddCDistrict" className="col-4 col-form-label">
            City
          </label>
          <div className="col-8">
            <select
              id="ddCDistrict"
              name="ddCDistrict"
              className="custom-select"
              required="required"
            >
              <option defaultValue="udaipur">Udaipur</option>
              <option defaultValue="mumbai">Nashik</option>
              <option defaultValue="chandigarh">Chandigarh</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddCState" className="col-4 col-form-label">
            State
          </label>
          <div className="col-8">
            <select
              id="ddCState"
              name="ddCState"
              className="custom-select"
              required="required"
            >
              <option defaultValue="rajasthan">Rajasthan</option>
              <option defaultValue="maharashtra">Maharashtra</option>
              <option defaultValue="gujarat">Gujarat</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddCCountry" className="col-4 col-form-label">
            Country
          </label>
          <div className="col-8">
            <select
              id="ddCCountry"
              name="ddCCountry"
              className="custom-select"
              required="required"
            >
              <option defaultValue="rajasthan">India</option>
              <option defaultValue="maharashtra">UAE</option>
              <option defaultValue="gujarat">Kenya</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const page3 = function () {
    return (
      <div>
        <div className="form-group row">
          <label htmlFor="txtAccountHolder" className="col-4 col-form-label">
            Account Holder
          </label>
          <div className="col-8">
            <input
              id="txtAccountHolder"
              name="txtAccountHolder"
              placeholder="Fullname"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtAccNumber" className="col-4 col-form-label">
            Account Number
          </label>
          <div className="col-8">
            <input
              id="txtAccNumber"
              name="txtAccNumber"
              placeholder="Account Number"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtConfirmAccNumber" className="col-4 col-form-label">
            Confirm Account Number
          </label>
          <div className="col-8">
            <input
              id="txtConfirmAccNumber"
              name="txtConfirmAccNumber"
              placeholder="Account Number"
              type="password"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtIFSCCode" className="col-4 col-form-label">
            IFSC Code
          </label>
          <div className="col-8">
            <input
              id="txtIFSCCode"
              name="txtIFSCCode"
              placeholder="IFSC Code"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtBankName" className="col-4 col-form-label">
            Bank Name
          </label>
          <div className="col-8">
            <input
              id="txtBankName"
              name="txtBankName"
              type="text"
              className="form-control"
              disabled="disabled"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtBankBranch" className="col-4 col-form-label">
            Bank Branch
          </label>
          <div className="col-8">
            <input
              id="txtBankBranch"
              name="txtBankBranch"
              type="text"
              className="form-control"
              disabled="disabled"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtfBankProof" className="col-4 col-form-label">
            Bank (<span className="font-italic">Proof of address</span>)
          </label>
          <div className="col-8">
            <input
              id="txtfBankProof"
              name="txtfBankProof"
              type="file"
              className="form-control"
            />
          </div>
        </div>
      </div>
    );
  };

  const page4 = function () {
    return (
      <div>
        <div className="form-group row">
          <label htmlFor="txtCoApplicant" className="col-4 col-form-label">
            Co-Applicant Name
          </label>
          <div className="col-8">
            <input
              id="txtCoApplicant"
              name="txtCoApplicant"
              type="text"
              required="required"
              className="form-control"
              aria-describedby="txtCoApplicantHelpBlock"
            />
            <span id="txtCoApplicantHelpBlock" className="form-text text-muted">
              If unmarried Mother/Father
            </span>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtdob" className="col-4 col-form-label">
            Date of birth
          </label>
          <div className="col-8">
            <input
              type="date"
              id="txtdob"
              className="form-control"
              name="dateopened"
              data-toggle="tooltip"
              data-trigger="hover"
              data-placement="top"
              data-title="Date of birth"
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-4">Gender</label>
          <div className="col-8">
            <div className="custom-control custom-radio custom-control-inline">
              <input
                name="rdGender1"
                id="rdGender1_0"
                type="radio"
                className="custom-control-input"
                defaultValue="male"
                required="required"
              />
              <label htmlFor="rdGender1_0" className="custom-control-label">
                Male
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                name="rdGender1"
                id="rdGender1_1"
                type="radio"
                className="custom-control-input"
                defaultValue="female"
                required="required"
              />
              <label htmlFor="rdGender1_1" className="custom-control-label">
                Female
              </label>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtCOMobile" className="col-4 col-form-label">
            Mobile Number
          </label>
          <div className="col-8">
            <input
              id="txtCOMobile"
              name="txtCOMobile"
              placeholder="Mobile Number"
              type="text"
              className="form-control"
              aria-describedby="txtMobileHelpBlock"
              required="required"
            />
            <span id="txtMobileHelpBlock" className="form-text text-muted">
              Please do not append country code
            </span>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtCOEmail" className="col-4 col-form-label">
            Email
          </label>
          <div className="col-8">
            <input
              id="txtCOEmail"
              name="txtCOEmail"
              placeholder="Primary Applicant Fullname"
              type="email"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddRelationship" className="col-4 col-form-label">
            Relationship
          </label>
          <div className="col-8">
            <select
              id="ddRelationship"
              name="ddRelationship"
              aria-describedby="ddRelationshipHelpBlock"
              className="custom-select"
            >
              <option value="36">Son</option>
              <option value="37">Daughter</option>
              <option value="38">Father</option>
              <option value="39">Mother</option>
              <option value="40">Husband</option>
              <option value="41">Wife</option>
              <option value="42">Brother</option>
              <option value="43">Sister</option>
              <option value="44">Grand Son</option>
              <option value="45">Grand Daughter</option>
              <option value="46">Brother In Law</option>
              <option value="47">Sister In Law</option>
              <option value="48">Son In Law</option>
              <option value="49">Daughter In Law</option>
              <option value="50">Father In Law</option>
              <option value="51">Mother In Law</option>
              <option value="52">Friend</option>
            </select>
            <span id="ddRelationshipHelpBlock" className="form-text text-muted">
              With Primary Applicant
            </span>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtCOPAN" className="col-4 col-form-label">
            PAN
          </label>
          <div className="col-8">
            <input
              id="txtCOPAN"
              name="txtCOPAN"
              placeholder="PAN Number"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtfCOPAN" className="col-4 col-form-label">
            PAN (Attachment)
          </label>
          <div className="col-8">
            <input
              id="txtfCOPAN"
              name="txtfCOPAN"
              placeholder="PAN Attachment"
              type="file"
              className="form-control"
              required="required"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtCOAccountHolder" className="col-4 col-form-label">
            Account Holder
          </label>
          <div className="col-8">
            <input
              id="txtCOAccountHolder"
              name="txtCOAccountHolder"
              placeholder="Fullname"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtCOAccNumber" className="col-4 col-form-label">
            Account Number
          </label>
          <div className="col-8">
            <input
              id="txtCOAccNumber"
              name="txtCOAccNumber"
              placeholder="Account Number"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="txtCOConfirmAccNumber"
            className="col-4 col-form-label"
          >
            Confirm Account Number
          </label>
          <div className="col-8">
            <input
              id="txtCOConfirmAccNumber"
              name="txtCOConfirmAccNumber"
              placeholder="Account Number"
              type="password"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtCOIFSCCode" className="col-4 col-form-label">
            IFSC Code
          </label>
          <div className="col-8">
            <input
              id="txtCOIFSCCode"
              name="txtCOIFSCCode"
              placeholder="IFSC Code"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtCOBankName" className="col-4 col-form-label">
            Bank Name
          </label>
          <div className="col-8">
            <input
              id="txtCOBankName"
              name="txtCOBankName"
              type="text"
              className="form-control"
              disabled="disabled"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtCOBankBranch" className="col-4 col-form-label">
            Bank Branch
          </label>
          <div className="col-8">
            <input
              id="txtCOBankBranch"
              name="txtCOBankBranch"
              type="text"
              className="form-control"
              disabled="disabled"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtfCOBank" className="col-4 col-form-label">
            Bank (Proof of address)
          </label>
          <div className="col-8">
            <input
              id="txtfCOBank"
              name="txtfCOBank"
              placeholder="Proof of address"
              type="file"
              className="form-control"
              required="required"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtBeneficiary" className="col-4 col-form-label">
            Nominee Name
          </label>
          <div className="col-8">
            <input
              id="txtBeneficiary"
              name="txtBeneficiary"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="ddRelationship" className="col-4 col-form-label">
            Nominee Relationship
          </label>
          <div className="col-8">
            <select
              id="ddRelationship"
              name="ddRelationship"
              className="custom-select"
            >
              <option value="36">Son</option>
              <option value="37">Daughter</option>
              <option value="38">Father</option>
              <option value="39">Mother</option>
              <option value="40">Husband</option>
              <option value="41">Wife</option>
              <option value="42">Brother</option>
              <option value="43">Sister</option>
              <option value="44">Grand Son</option>
              <option value="45">Grand Daughter</option>
              <option value="46">Brother In Law</option>
              <option value="47">Sister In Law</option>
              <option value="48">Son In Law</option>
              <option value="49">Daughter In Law</option>
              <option value="50">Father In Law</option>
              <option value="51">Mother In Law</option>
              <option value="52">Friend</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const page5 = function () {
    return (
      <div className="row">
        <div className="col-sm-6">
          <div className="alert alert-primary" role="alert">
            <div className="row d-flex align-items-baseline">
              <div className="col-10">Primary Applicant | Basic Details</div>
              <div className="col-2 text-right">
                <a onClick={() => setCurrentPage(0)}>
                  <i className="las la-edit"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Title</td>
                  <td>Mr.</td>
                </tr>
                <tr>
                  <td>First Name</td>
                  <td>Shamsudeen</td>
                </tr>
                <tr>
                  <td>Last Name</td>
                  <td>Raghvan</td>
                </tr>
                <tr>
                  <td>Date of birth</td>
                  <td>01-Jan-1980</td>
                </tr>
                <tr>
                  <td>Preferred Language</td>
                  <td>English</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>Male</td>
                </tr>
                <tr>
                  <td>Maritial Status</td>
                  <td>Married</td>
                </tr>
                <tr>
                  <td>Profession</td>
                  <td>Businessmen</td>
                </tr>
                <tr>
                  <td>Monthly Income</td>
                  <td>Less than 5000</td>
                </tr>
                <tr>
                  <td>Aadhar Card</td>
                  <td>0000-0000-0000-0000-0000</td>
                </tr>
                <tr>
                  <td>GST Number</td>
                  <td>0000-0000-0000-0000</td>
                </tr>
                <tr>
                  <td>PAN</td>
                  <td>0000000</td>
                </tr>
                <tr>
                  <td>Aadhar Card (Attachment)</td>
                  <td>
                    <a href="javascript:void();">
                      <i className="las la-file-alt la-2x"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>PAN Card (Attachment)</td>
                  <td className="text-muted">No attachment specified</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="alert alert-primary" role="alert">
            <div className="row d-flex align-items-baseline">
              <div className="col-10">Co-Applicant Details</div>
              <div className="col-2 text-right">
                <a onClick={() => setCurrentPage(3)}>
                  <i className="las la-edit"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Co-Applicant Name</td>
                  <td>Mrs. Shabeena Raghvan</td>
                </tr>
                <tr>
                  <td>Co-Applicant Date of birth</td>
                  <td>06-June-1980</td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td>+91 9000 0000 00</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>Shamsudeen.Raghvan@gmail.com</td>
                </tr>
                <tr>
                  <td>Relationship</td>
                  <td>Wife</td>
                </tr>
                <tr>
                  <td>Co-Applicant PAN</td>
                  <td>000000</td>
                </tr>
                <tr>
                  <td>PAN (Attachment)</td>
                  <td className="">
                    <a href="javascript:void();">
                      <i className="las la-file-alt la-2x"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Account Holder</td>
                  <td>Mr. Shamsudeen Raghvan</td>
                </tr>
                <tr>
                  <td>Account Number</td>
                  <td>0000 0000 0000 0000 0000 0000</td>
                </tr>
                <tr>
                  <td>IFSC Code</td>
                  <td>ICIC00000129</td>
                </tr>
                <tr>
                  <td>Bank Name</td>
                  <td>ICICI Bank</td>
                </tr>
                <tr>
                  <td>Bank Branch</td>
                  <td>Bangaluru Branch</td>
                </tr>
                <tr>
                  <td>Bank Address Proof (Attachment)</td>
                  <td className="">
                    <a href="javascript:void();">
                      <i className="las la-file-alt la-2x"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Nominee Name</td>
                  <td>Mr. Salman Raghvan</td>
                </tr>
                <tr>
                  <td>Nominee Relationship</td>
                  <td>Son</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="alert alert-primary" role="alert">
            <div className="row d-flex align-items-baseline">
              <div className="col-10">Primary Applicant | Contact Details</div>
              <div className="col-2 text-right">
                <a onClick={() => setCurrentPage(1)}>
                  <i className="las la-edit"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Full Name</td>
                  <td>Mr. Shamsudeen Raghvan</td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td>+91 9000 0000 00</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>Shamsudeen.Raghvan@gmail.com</td>
                </tr>
                <tr>
                  <td>Permanent Address</td>
                  <td>
                    IndusViva HealthSciences Private Limited,Viva Tower, No.36,
                    V P Deendayal Road,
                    <br />
                    Jayamahal Extension,
                    <br />
                    Bangalore – 560046
                  </td>
                </tr>
                <tr>
                  <td>Communication Address</td>
                  <td>
                    IndusViva HealthSciences Private Limited,Viva Tower, No.36,
                    V P Deendayal Road,
                    <br />
                    Jayamahal Extension,
                    <br />
                    Bangalore – 560046
                  </td>
                </tr>
                <tr>
                  <td>Permanent Address Proof (Attachment)</td>
                  <td className="">
                    <a href="javascript:void();">
                      <i className="las la-file-alt la-2x"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="alert alert-primary" role="alert">
            <div className="row d-flex align-items-baseline">
              <div className="col-10">Primary Applicant | Bank Details</div>
              <div className="col-2 text-right">
                <a onClick={() => setCurrentPage(2)}>
                  <i className="las la-edit"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="">
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Account Holder</td>
                  <td>Mr. Shamsudeen Raghvan</td>
                </tr>
                <tr>
                  <td>Account Number</td>
                  <td>0000 0000 0000 0000 0000 0000</td>
                </tr>
                <tr>
                  <td>IFSC Code</td>
                  <td>ICIC00000129</td>
                </tr>
                <tr>
                  <td>Bank Name</td>
                  <td>ICICI Bank</td>
                </tr>
                <tr>
                  <td>Bank Branch</td>
                  <td>Bangaluru Branch</td>
                </tr>
                <tr>
                  <td>Bank Address Proof (Attachment)</td>
                  <td className="">
                    <a href="javascript:void();">
                      <i className="las la-file-alt la-2x"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-12">
          <WishColoredBar
            bgcolor="warning"
            className="d-flex justify-content-between align-items-center"
          >
            Terms and Conditions
            <a
              href="https://ivhspl-my.sharepoint.com/personal/ashif_indusviva_com/Documents/review.xlsx?web=1"
              target="_blank"
              className="card-link link-dotted text-white"
            >
              Download (T&amp;C)
            </a>
          </WishColoredBar>
          <div className="form-group row">
            <div className="col-12">
              <div className="custom-control custom-checkbox custom-control-inline">
                <input
                  name="chkTerms"
                  id="chkTerms_0"
                  type="checkbox"
                  className="custom-control-input"
                  value="1"
                  defaultChecked={termsAgreed}
                  onClick={() => setTermsAgreed(!termsAgreed)}
                />
                <label htmlFor="chkTerms_0" className="custom-control-label">
                  By checking this box, I agree that I have read IndusViva
                  HealthSciences Pvt. Ltd.'s Terms & Conditions and will comply
                  with the same. I understand that failure to abide by these
                  terms and conditions may result in penalties without further
                  notice, up to and including termination of my IndusViva
                  HealthSciences Pvt. Ltd. Distributor Account.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const page6 = function () {
    return (
      <div>
        <div className="form-group row">
          <label htmlFor="txtPlacementID" className="col-4 col-form-label">
            Placement ID
          </label>
          <div className="col-8">
            <input
              id="txtPlacementID"
              name="txtPlacementID"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-4">Position</label>
          <div className="col-8">
            <div className="custom-control custom-radio custom-control-inline">
              <input
                name="rPosition"
                id="rPosition_0"
                type="radio"
                className="custom-control-input"
                value="right"
              />
              <label htmlFor="rPosition_0" className="custom-control-label">
                Right
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                name="rPosition"
                id="rPosition_1"
                type="radio"
                className="custom-control-input"
                value="left"
              />
              <label htmlFor="rPosition_1" className="custom-control-label">
                Left
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtSponsorID" className="col-4 col-form-label">
            Sponsor ID
          </label>
          <div className="col-8">
            <input
              id="txtSponsorID"
              name="txtSponsorID"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtSponsorName" className="col-4 col-form-label">
            Sponsor Name
          </label>
          <div className="col-8">
            <input
              id="txtSponsorName"
              name="txtSponsorName"
              type="text"
              className="form-control"
              required="required"
            />
          </div>
        </div>
      </div>
    );
  };

  /* Geneology Tree */
  const showAll = function () {
    setTreeNodes(data.treeData);
  };

  const searchDistributor = function (filter) {
    var found = null;
    var treeNodesCopy = data.treeData;

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
  /* END: Geneology Tree */

  return (
    <PageLayout
      activeSideMenu="3"
      pageTitle="Enroll New User"
      header="Enrollment Details"
      breadcrumbs={breadcrumbs}
    >
      {navigationBar()}
      <WishSimpleCard
        header={pageHeader()}
        body={page()}
        footer={pageFooter()}
      ></WishSimpleCard>
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
      <WishModal
        id="dlgConsent"
        modalSize="modal-xl"
        title="You are seeing this because"
        onFinish={() => {
          gotoNextPage();
        }}
      >
        <WishColoredBar bgcolor="danger">
          You did not provide PAN Card / Aadhar Card details. Please provide
          your consent for non-provision of PAN Card / GST Number
        </WishColoredBar>
        <div className="form-group row">
          {pancard === "" ? (
            <>
              <div className="col-12 pb-2">
                <h5>PAN Card Consent</h5>
                <div className="custom-control custom-checkbox custom-control-inline">
                  <input
                    name="checkbox"
                    id="checkbox_0"
                    type="checkbox"
                    checked={pancardConsent === false ? "" : "checked"}
                    className="custom-control-input"
                    value="pancard"
                    onClick={() => {
                      setPancardConsent(!pancardConsent);
                    }}
                  />
                  <label for="checkbox_0" className="custom-control-label">
                    I hereby undertake that I am not an ASSESSEE as defined
                    under the provisions of Income Tax, 1961. I do not have
                    income exceeding the limit on which tax is required to be
                    paid and therefore do not have PAN No. I have not applied
                    for PAN number either voluntarily or otherwise in the past.
                    I hereby, further undertake to keep the company informed,
                    once I get PAN number allocated by Income Tax Department
                    immediately. I therefore, authorize company to deduct Tax at
                    the appropriate rate in the absence of PAN number and
                    exonerate company from all future tax liability that may
                    arise because of non-compliance of Income Tax Act, 1961 from
                    my end.
                  </label>
                </div>
              </div>
              <div className="col-12">
                <hr />
              </div>
            </>
          ) : (
            <></>
          )}

          {gstnumber === "" ? (
            <div className="col-12 pt-2">
              <h5>GST Number Consent</h5>
              <div className="custom-control custom-checkbox custom-control-inline">
                <input
                  name="checkbox"
                  id="checkbox_1"
                  type="checkbox"
                  checked={gstConsent === false ? "" : "checked"}
                  className="custom-control-input"
                  value="gstnumber"
                  onClick={() => {
                    setGSTConsent(!gstConsent);
                  }}
                />
                <label for="checkbox_1" className="custom-control-label">
                  I hereby undertake that I am not a supplier as defined under
                  the provisions of Goods and Services Tax, 2017 requiring
                  registration. I do not have turnover during the current and
                  previous year exceeding the limit which requires mandatory
                  registration and GST law and therefore do not have GST No. I
                  have not applied for GST number either voluntarily or
                  otherwise in the past. I hereby, further undertake to keep the
                  company informed, once I get GST number allocated by GST
                  Department immediately. I therefore, authorize company to
                  charge GST at the appropriate rate in the absence of GST
                  number and exonerate company from all future tax liability
                  that may arise because of non-compliance of GST laws from my
                  end.
                </label>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </WishModal>
    </PageLayout>
  );
}
