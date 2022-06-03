/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishLinkCard from "../../components/WishLinkCard";
import WishModal from "../../components/WishModal";
import WishSimpleCard from "../../components/WishSimpleCard";

export default function EnrollUser() {
  const location = useLocation();
  const { step } = location.state ?? 0;

  const totalPages = 6;
  const [currentPage, setCurrentPage] = useState(step ?? 0);
  const [termsAgreed, setTermsAgreed] = useState(false);
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
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          PROCEED <i className="las la-angle-right"></i>
        </a>
      </>
    );
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
      <div>
        <div className="form-group row">
          <label htmlFor="ddTitle" className="col-4 col-form-label">
            Title
          </label>
          <div className="col-8">
            <select
              id="ddTitle"
              name="ddTitle"
              className="custom-select"
              required="required"
            >
              <option defaultValue="Mr.">Mr.</option>
              <option defaultValue="Mrs.">Mrs.</option>
              <option defaultValue="Ms.">Ms.</option>
              <option defaultValue="Dr.">Dr.</option>
            </select>
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
              data-title="Date Opened"
            />
            <span id="txtDOBHelpBlock" className="form-text text-muted">
              Enter date in format (mm/dd/yyyy)
            </span>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddLanguage" className="col-4 col-form-label">
            Preferred Language
          </label>
          <div className="col-8">
            <select
              id="ddLanguage"
              name="ddLanguage"
              className="custom-select"
              required="required"
            >
              <option defaultValue="1">English</option>
              <option defaultValue="2">Marathi</option>
              <option defaultValue="3">Hindi</option>
              <option defaultValue="4">Gujarati</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-4">Gender</label>
          <div className="col-8">
            <div className="custom-control custom-radio custom-control-inline">
              <input
                name="rdGender"
                id="rdGender_0"
                type="radio"
                className="custom-control-input"
                defaultValue="male"
                required="required"
              />
              <label htmlFor="rdGender_0" className="custom-control-label">
                Male
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                name="rdGender"
                id="rdGender_1"
                type="radio"
                className="custom-control-input"
                defaultValue="female"
                required="required"
              />
              <label htmlFor="rdGender_1" className="custom-control-label">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="ddMartiaialStatus" className="col-4 col-form-label">
            Maritial Status
          </label>
          <div className="col-8">
            <select
              id="ddMartiaialStatus"
              name="ddMartiaialStatus"
              className="custom-select"
              required="required"
            >
              <option defaultValue="1">Married</option>
              <option defaultValue="2">Widowed</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="ddProfession" className="col-4 col-form-label">
            Profession
          </label>
          <div className="col-8">
            <select
              id="ddProfession"
              name="ddProfession"
              className="custom-select"
              required="required"
            >
              <option defaultValue="business">Businessmen</option>
              <option defaultValue="professional">Professional</option>
              <option defaultValue="housewife">Housewife</option>
              <option defaultValue="management">Management</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddMonthlyIncome" className="col-4 col-form-label">
            Monhtly Income
          </label>
          <div className="col-8">
            <select
              id="ddMonthlyIncome"
              name="ddMonthlyIncome"
              className="custom-select"
              required="required"
            >
              <option defaultValue="0">Less than 5,000</option>
              <option defaultValue="1">5,001 - 15,000</option>
              <option defaultValue="2">15,001 - 25,000</option>
              <option defaultValue="3">25,001 - 50,000</option>
              <option defaultValue="4">More than 50,000</option>
            </select>
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
            />
          </div>
        </div>
      </div>
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

        <p className="lead border-bottom">Permanent Address</p>

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
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddCity" className="col-4 col-form-label">
            District
          </label>
          <div className="col-8">
            <select
              id="ddCity"
              name="ddCity"
              className="custom-select"
              required="required"
            >
              <option defaultValue="udaipur">Udaipur</option>
              <option defaultValue="mumbai">Mumbai</option>
              <option defaultValue="chandigarh">Chandigarh</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddDistrict" className="col-4 col-form-label">
            District
          </label>
          <div className="col-8">
            <select
              id="ddDistrict"
              name="ddDistrict"
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

        <div className="form-row border-bottom">
          <p className="lead col-4">Communication Address</p>
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
              <option defaultValue="mumbai">Mumbai</option>
              <option defaultValue="chandigarh">Chandigarh</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddCDistrict" className="col-4 col-form-label">
            District
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
          <div className="table-responsive">
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
          <div className="table-responsive">
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
          <div className="table-responsive">
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
        <div className="col-12">
          <div className="alert alert-warning" role="alert">
            Terms and Conditions
          </div>
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
        modalSize="modal-lg"
      >
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </WishModal>
    </PageLayout>
  );
}
