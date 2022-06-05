/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import WishSimpleCard from "../../components/WishSimpleCard";
import WishStatusCard from "../../components/WishStatsCard";
import WishDistributorRankBar from "../../components/WishDistributorRankBar";
import WishLinkCard from "../../components/WishLinkCard";

export default function ProfileDashboard() {
  const percentage = 66;

  const profilePicture =
    "../../assets/app-assets/images/portrait/small/avatar-s-12.png";
  //const [isFlipped, setFlipped] = useState(false);
  const [isProfileFlipped, setProfileFlipped] = useState(false);
  const [isPersonalFlipped, setPersonalFlipped] = useState(false);
  const [isContactFlipped, setContactFlipped] = useState(false);
  const [isBankFlipped, setBankFlipped] = useState(false);
  const [areAddressesSame, setAddressesSame] = useState(false);

  const distributorProfileMessage = function () {
    return (
      <>
        <code>
          <strong>Superb!</strong>
        </code>{" "}
        you are ahead of your colleagues in your profile completion
      </>
    );
  };

  const doFlip = function (value, type) {
    switch (type) {
      case "flipProfileDetails":
        setProfileFlipped(value);
        break;

      case "flipPersonalDetails":
        setPersonalFlipped(value);
        break;

      case "flipContactDetails":
        setContactFlipped(value);
        break;

      case "flipBankDetails":
        setBankFlipped(value);
        break;

      default:
        //setFlipped(value);
        break;
    }

    return true;
  };

  const commonEditHeader = function (title, value, type) {
    return (
      <div className="row align-items-middle">
        <div className="col-8">
          <h3>{title ?? ""}</h3>
        </div>
        <div className="col-4 text-right">
          <a onClick={() => doFlip(value, type)}>
            <i className="las la-edit"></i>
          </a>
        </div>
      </div>
    );
  };

  const commonHeader = function (title, value, type) {
    return (
      <div className="row align-items-end">
        <div className="col-8">
          <h3>{title ?? ""}</h3>
        </div>
        <div className="col-4 text-right">
          <button
            className="btn btn-success"
            onClick={() => doFlip(value, type)}
          >
            <i className="las la-save"></i> Update
          </button>
        </div>
      </div>
    );
  };

  const commonFooter = function (value, type) {
    console.log(value);
    return (
      <button
        className="btn btn-success ml-auto"
        onClick={() => doFlip(value, type)}
      >
        <i className="las la-save"></i> Update
      </button>
    );
  };

  const profileCardFront = function () {
    return (
      <div className="bg-transparent border-0 box-shadow-0">
        <div className="row d-flex align-items-center pt-0">
          <div className="col-sm-3 text-center text-white">
            <CircularProgressbarWithChildren
              value={66}
              strokeWidth={10}
              styles={{
                path: {
                  // Trail color
                  stroke: "orange",
                },
                trail: {
                  stroke: "none",
                },
              }}
            >
              <img
                src={profilePicture}
                alt=""
                className="rounded-circle image-border height-100"
              />
            </CircularProgressbarWithChildren>

            <label className="pt-1">Black Diamond Ambassador</label>
          </div>
          <div className="col-sm-9 text-white text-center text-sm-left">
            <h1 className="text-white">M. Shamshudeen (Sheenu)</h1>
            <small>Distributor ID: 1001</small>
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
            <div className="col-12 text-right">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => doFlip(!isProfileFlipped, "flipProfileDetails")}
              >
                <i className="las la-edit"></i> Edit details
              </button>
            </div>
          </div>
          <div className="col-12 pt-2">
            <WishSimpleCard body={distributorProfileMessage()}></WishSimpleCard>
          </div>
        </div>
      </div>
    );
  };

  const profileCardBack = function () {
    return (
      <div className="card border-0 box-shadow-0 onhover-shadow onhover-change-border">
        <div className="card-header">
          {commonHeader(
            "Edit Profile",
            !isProfileFlipped,
            "flipProfileDetails"
          )}
        </div>
        <div className="card-body row d-flex align-items-center pt-0">
          <div className="col-sm-3 text-center">
            <CircularProgressbarWithChildren
              value={66}
              strokeWidth={10}
              styles={{
                path: {
                  // Trail color
                  stroke: "orange",
                },
                trail: {
                  stroke: "none",
                },
              }}
            >
              <img
                src={profilePicture}
                alt=""
                className="rounded-circle image-border height-100"
              />
            </CircularProgressbarWithChildren>
            <br />
            <button className="btn btn-sm btn-outline-primary">
              Edit Picture
            </button>
            <label className="pt-1">Black Diamond Ambassador</label>
          </div>
          <div className="col-sm-9 text-center text-sm-left">
            <div className="form-group row">
              <div className="col-sm-12">
                <input
                  id="txtDisplayName"
                  name="txtDisplayName"
                  type="text"
                  className="form-control"
                  required="required"
                  placeholder="Name you should be called with"
                  defaultValue="M. Shamshudeen (Sheenu)"
                />
              </div>
            </div>
            <small>Distributor ID: 1001</small>
            <hr />
            <div className="form-group row">
              <div className="col-sm-8">
                <input
                  id="txtPhone"
                  name="txtPhone"
                  type="text"
                  className="form-control"
                  required="required"
                  placeholder="Your primary phone number"
                  defaultValue="+91 9009009009"
                />
              </div>
              <div className="col-sm-4">
                <a href="#" className="btn btn-primary btn-block">
                  verify
                </a>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-8">
                <input
                  id="txtEmail"
                  name="txtEmail"
                  type="text"
                  className="form-control"
                  required="required"
                  placeholder="Your primary email address"
                  defaultValue="sheenu@gmail.com"
                />
              </div>
              <div className="col-sm-4">
                <a href="#" className="btn btn-primary btn-block">
                  verify
                </a>
              </div>
            </div>
            <small>Status: Inactive</small>
          </div>
        </div>
        <div className="card-footer text-right">
          {commonFooter(!isProfileFlipped, "flipProfileDetails")}
        </div>
      </div>
    );
  };

  const personalDetailsFront = function () {
    return (
      <div className="row">
        <div className="col-5">Date of birth:</div>
        <div className="col-7">
          <strong>01-Jan-1980</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Preferred Language:</div>
        <div className="col-7">
          <strong>English</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Gender:</div>
        <div className="col-7">
          <strong>Male</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Maritial Status:</div>
        <div className="col-7">
          <strong>Married</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Profession:</div>
        <div className="col-7">
          <strong>Businessmen</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Monthly Income:</div>
        <div className="col-7">
          <strong>Less than 5000</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Aadhar Card:</div>
        <div className="col-7">
          <strong>0000 0000 0000</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Pancard:</div>
        <div className="col-7">
          <strong>00000 00000</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">GST Number:</div>
        <div className="col-7">
          <strong>0000 0000 0000</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Nominee:</div>
        <div className="col-7">
          <strong>Shri Gajanan Maharaj</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Nominee Relatioship:</div>
        <div className="col-7">
          <strong>Father</strong>
        </div>
      </div>
    );
  };

  const personalDetailsBack = function () {
    return (
      <>
        <div className="form-group row">
          <label htmlFor="projectinput3" className="col-sm-4 col-form-label">
            Date of birth
          </label>
          <div className="col-sm-8">
            <input
              type="date"
              id="projectinput3"
              className="form-control"
              name="dateopened"
              data-toggle="tooltip"
              data-trigger="hover"
              data-placement="top"
              data-title="Date Opened"
              data-original-title=""
              title=""
            />
            <span id="txtDOBHelpBlock" className="form-text text-muted">
              Enter date in format (mm/dd/yyyy)
            </span>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddLanguage" className="col-sm-4 col-form-label">
            Preferred Language
          </label>
          <div className="col-sm-8">
            <select
              id="ddLanguage"
              name="ddLanguage"
              className="custom-select"
              required="required"
            >
              <option value="1">English</option>
              <option value="2">Marathi</option>
              <option value="3">Hindi</option>
              <option value="4">Gujarati</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4">Gender</label>
          <div className="col-sm-8">
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
          <label
            htmlFor="ddMartiaialStatus"
            className="col-sm-4 col-form-label"
          >
            Maritial Status
          </label>
          <div className="col-sm-8">
            <select
              id="ddMartiaialStatus"
              name="ddMartiaialStatus"
              className="custom-select"
              required="required"
            >
              <option value="1">Married</option>
              <option value="2">Widowed</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="ddProfession" className="col-sm-4 col-form-label">
            Profession
          </label>
          <div className="col-sm-8">
            <select
              id="ddProfession"
              name="ddProfession"
              className="custom-select"
              required="required"
            >
              <option value="business">Businessmen</option>
              <option value="professional">Professional</option>
              <option value="housewife">Housewife</option>
              <option value="management">Management</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddMonthlyIncome" className="col-sm-4 col-form-label">
            Monhtly Income
          </label>
          <div className="col-sm-8">
            <select
              id="ddMonthlyIncome"
              name="ddMonthlyIncome"
              className="custom-select"
              required="required"
            >
              <option value="0">Less than 5,000</option>
              <option value="1">5,001 - 15,000</option>
              <option value="2">15,001 - 25,000</option>
              <option value="3">25,001 - 50,000</option>
              <option value="4">More than 50,000</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtAadharCard" className="col-sm-4 col-form-label">
            Aadhar Card
          </label>
          <div className="col-sm-8">
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
          <label htmlFor="txtPanCard" className="col-sm-4 col-form-label">
            PAN Card
          </label>
          <div className="col-sm-8">
            <input
              id="txtPanCard"
              name="txtPanCard"
              placeholder="(Optional)"
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtGST" className="col-sm-4 col-form-label">
            GST Number
          </label>
          <div className="col-sm-8">
            <input
              id="txtGST"
              name="txtGST"
              placeholder="(Optional)"
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="txtBeneficiary" className="col-sm-4 col-form-label">
            Nominee Name
          </label>
          <div className="col-sm-8">
            <input
              id="txtBeneficiary"
              name="txtBeneficiary"
              type="text"
              className="form-control"
              required="required"
              placeholder="Name of next to kin"
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ddRelationship" className="col-sm-4 col-form-label">
            Nominee Relationship
          </label>
          <div className="col-sm-8">
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
      </>
    );
  };

  const contactDetailsFront = function () {
    return (
      <div className="row">
        <div className="col-5">Permanent Address:</div>
        <div className="col-7">
          <strong>
            IndusViva HealthSciences Private Limited,Viva Tower, No.36, V P
            Deendayal Road,
            <br />
            Jayamahal Extension,
            <br />
            Bangalore – 560046
          </strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Communication Address:</div>
        <div className="col-7">
          <strong>
            IndusViva HealthSciences Private Limited,Viva Tower, No.36, V P
            Deendayal Road,
            <br />
            Jayamahal Extension,
            <br />
            Bangalore – 560046
          </strong>
        </div>
      </div>
    );
  };

  const contactDetailsBack = function () {
    return (
      <>
        <h5>Permanent Address:</h5>
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
              <option value="udaipur">Udaipur</option>
              <option value="mumbai">Mumbai</option>
              <option value="chandigarh">Chandigarh</option>
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
              <option value="udaipur">Udaipur</option>
              <option value="mumbai">Nashik</option>
              <option value="chandigarh">Chandigarh</option>
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
              <option value="rajasthan">Rajasthan</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="gujarat">Gujarat</option>
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
              <option value="rajasthan">India</option>
              <option value="maharashtra">UAE</option>
              <option value="gujarat">Kenya</option>
            </select>
          </div>
        </div>

        <h5 className="pt-2">Communication Address:</h5>
        <div className="form-row">
          <div className="col-12 pb-2">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
                defaultChecked={areAddressesSame}
                onClick={() => setAddressesSame(!areAddressesSame)}
              />
              <label className="custom-control-label" htmlFor="customSwitch1">
                Same as Permanent Address
              </label>
            </div>
          </div>
        </div>

        <div className="form-group row">
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
              <option value="udaipur">Udaipur</option>
              <option value="mumbai">Mumbai</option>
              <option value="chandigarh">Chandigarh</option>
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
              <option value="udaipur">Udaipur</option>
              <option value="mumbai">Nashik</option>
              <option value="chandigarh">Chandigarh</option>
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
              <option value="rajasthan">Rajasthan</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="gujarat">Gujarat</option>
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
              <option value="rajasthan">India</option>
              <option value="maharashtra">UAE</option>
              <option value="gujarat">Kenya</option>
            </select>
          </div>
        </div>
      </>
    );
  };

  const bankDetailsFront = function () {
    return (
      <div className="row">
        <div className="col-5">Account Holder Name:</div>
        <div className="col-7">
          <strong>M. Shamshudeen (Sheenu)</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Account Number:</div>
        <div className="col-7">
          <strong>0000-0000-0000-0000-0000</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Bank Name:</div>
        <div className="col-7">
          <strong>ICICI Bank</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">Branch Name:</div>
        <div className="col-7">
          <strong>Saheli Marg, Branch. Udaipur</strong>
        </div>
        <div className="col-12 pt-1"></div>
        <div className="col-5">IFSC Code:</div>
        <div className="col-7">
          <strong>ICIC00001902</strong>
        </div>
      </div>
    );
  };

  const bankDetailsBack = function () {
    return (
      <>
        <div className="form-group row">
          <label
            htmlFor="txtAccountHolderName"
            className="col-sm-4 col-form-label"
          >
            Account holder name
          </label>
          <div className="col-sm-8">
            <input
              id="txtAccountHolderName"
              name="txtAccountHolderName"
              type="text"
              className="form-control"
              required=""
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtAccountNumber" className="col-sm-4 col-form-label">
            Account Number
          </label>
          <div className="col-sm-8">
            <input
              id="txtAccountNumber"
              name="txtAccountNumber"
              type="text"
              className="form-control"
              required=""
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtBankName" className="col-sm-4 col-form-label">
            Bank Name
          </label>
          <div className="col-sm-8">
            <input
              id="txtBankName"
              name="txtBankName"
              type="text"
              className="form-control"
              required=""
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtBranchName" className="col-sm-4 col-form-label">
            Branch Name
          </label>
          <div className="col-sm-8">
            <input
              id="txtBranchName"
              name="txtBranchName"
              type="text"
              className="form-control"
              required=""
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="txtIFSCCode" className="col-sm-4 col-form-label">
            IFSC Code
          </label>
          <div className="col-sm-8">
            <input
              id="txtIFSCCode"
              name="txtIFSCCode"
              type="text"
              className="form-control"
              required=""
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <PageLayout activeSideMenu="0" pageTitle="My Profile" extendedHeader>
      <section className="row">
        <div className="col-sm-8">
          {/* <ReactCardFlip
            isFlipped={isProfileFlipped}
            flipDirection="horizontal"
          >
            {profileCardFront()}
            {profileCardBack()}
          </ReactCardFlip> */}
        </div>
        <div className="col-sm-4">
          <WishSimpleCard
            background="bg-primary box-shadow-3"
            body={WishStatusCard({
              linkTitle: "Bank Details",
              linkTo: "/coapplicantprofile",
              percentage,
              color: "red",
              showTrail: false,
            })}
          ></WishSimpleCard>
        </div>
        <div className="col-sm-12 mt-3 pb-3">
          <WishDistributorRankBar></WishDistributorRankBar>
        </div>
        <div className="col-sm-6">
          <div className="row">
            <div className="col-6">
              <WishLinkCard
                linkTitle="KYC"
                linkTo="/kyc"
                background="onhover-highlight-primary"
                showArrow
              ></WishLinkCard>
            </div>
            <div className="col-6">
              <WishLinkCard
                linkTitle="My Cards"
                linkTo="/mycards"
                background="onhover-highlight-primary"
                showArrow
              ></WishLinkCard>
            </div>
            <div className="col-6">
              <WishLinkCard
                linkTitle="PCM Membership"
                linkTo="/pcmmembership"
                background="onhover-highlight-primary"
                showArrow
              ></WishLinkCard>
            </div>
            <div className="col-6">
              <WishLinkCard
                linkTitle="VOTM Membership"
                linkTo="/votmmembership"
                background="onhover-highlight-primary"
                showArrow
              ></WishLinkCard>
            </div>
            <div className="col-12">
              {/* <ReactCardFlip
                isFlipped={isPersonalFlipped}
                flipDirection="horizontal"
              >
                <WishSimpleCard
                  header={commonEditHeader(
                    "Personal Details",
                    !isPersonalFlipped,
                    "flipPersonalDetails"
                  )}
                  body={personalDetailsFront()}
                ></WishSimpleCard>
                <WishSimpleCard
                  header={commonHeader(
                    "Edit Personal Details",
                    !isPersonalFlipped,
                    "flipPersonalDetails"
                  )}
                  body={personalDetailsBack()}
                  footer={commonFooter(
                    !isPersonalFlipped,
                    "flipPersonalDetails"
                  )}
                ></WishSimpleCard>
              </ReactCardFlip> */}
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="row">
            <div className="col-12">
              {/* <ReactCardFlip
                isFlipped={isContactFlipped}
                flipDirection="horizontal"
              >
                <WishSimpleCard
                  header={commonEditHeader(
                    "Contact Details",
                    !isContactFlipped,
                    "flipContactDetails"
                  )}
                  body={contactDetailsFront()}
                ></WishSimpleCard>
                <WishSimpleCard
                  header={commonHeader(
                    "Edit Contact Details",
                    !isContactFlipped,
                    "flipContactDetails"
                  )}
                  body={contactDetailsBack()}
                  footer={commonFooter(!isContactFlipped, "flipContactDetails")}
                ></WishSimpleCard>
              </ReactCardFlip> */}
            </div>
            <div className="col-12">
              {/* <ReactCardFlip
                isFlipped={isBankFlipped}
                flipDirection="horizontal"
              >
                <WishSimpleCard
                  header={commonEditHeader(
                    "Bank Details",
                    !isBankFlipped,
                    "flipBankDetails"
                  )}
                  body={bankDetailsFront()}
                ></WishSimpleCard>
                <WishSimpleCard
                  header={commonHeader(
                    "Edit Bank Details",
                    !isBankFlipped,
                    "flipBankDetails"
                  )}
                  body={bankDetailsBack()}
                  footer={commonFooter(!isBankFlipped, "flipBankDetails")}
                ></WishSimpleCard>
              </ReactCardFlip> */}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
