/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import PageLayout from "../../components/PageLayout";
import WishCarousel from "../../components/WishCarousel";

export default class DistributorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: "../../assets/app-assets/images/portrait/PlaceHolder.png",
    };
    this.handleProfilePicChange = this.handleProfilePicChange.bind(this);
  }

  handleProfilePicChange(selectedFile) {
    this.setState({ profilePicture: URL.createObjectURL(selectedFile) });
  }

  render() {
    return (
      <PageLayout activeSideMenu="0" pageTitle="My Profile">
        <section className="row">
          <div className="col-sm-8">
            <WishCarousel finishTo="/myprofile">
              <div className="item">
                <h3>Profile Details</h3>
                <div className="form-group row">
                  <label
                    htmlFor="txtDistributorID"
                    className="col-sm-4 col-form-label"
                  >
                    Distributor ID
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="txtDistributorID"
                      name="txtDistributorID"
                      className="form-control"
                      type="text"
                      required="required"
                      value={"1001"}
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="txtFullname"
                    className="col-sm-4 col-form-label"
                  >
                    Full Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="txtFullname"
                      name="txtFullname"
                      className="form-control"
                      type="text"
                      required="required"
                      value={"M. Shamshudeen"}
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="txtDisplayName"
                    className="col-sm-4 col-form-label"
                  >
                    Display Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="txtDisplayName"
                      name="txtDisplayName"
                      type="text"
                      className="form-control"
                      required="required"
                      placeholder="Name you should be called with"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="txtPhone" className="col-sm-4 col-form-label">
                    Phone
                  </label>
                  <div className="col-sm-5">
                    <input
                      id="txtPhone"
                      name="txtPhone"
                      type="text"
                      className="form-control"
                      required="required"
                      placeholder="Your primary phone number"
                    />
                  </div>
                  <div className="col-sm-3">
                    <a href="#" className="btn btn-primary btn-block">
                      verify
                    </a>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="txtEmail" className="col-sm-4 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-5">
                    <input
                      id="txtEmail"
                      name="txtEmail"
                      type="text"
                      className="form-control"
                      required="required"
                      placeholder="Your primary email address"
                    />
                  </div>
                  <div className="col-sm-3">
                    <a href="#" className="btn btn-primary btn-block">
                      verify
                    </a>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="txtSponsor" className="col-sm-4 col-form-label">
                    Sponsor
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="txtSponsor"
                      name="txtSponsor"
                      type="text"
                      className="form-control"
                      required="required"
                      value={"1000, Indusviva Healthsciences"}
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="txtRank" className="col-sm-4 col-form-label">
                    Rank
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="txtRank"
                      name="txtRank"
                      type="text"
                      className="form-control"
                      required="required"
                      value={"Black Diamond Ambassador"}
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="txtActivityStatus"
                    className="col-sm-4 col-form-label"
                  >
                    Activity Status
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="txtActivityStatus"
                      name="txtActivityStatus"
                      type="text"
                      className="form-control"
                      required="required"
                      value={"Inactive"}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="item">
                <h3>Personal Details</h3>
                <div className="card-body">
                  <div className="form-group row">
                    <label
                      htmlFor="projectinput3"
                      className="col-sm-4 col-form-label"
                    >
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
                      <span
                        id="txtDOBHelpBlock"
                        className="form-text text-muted"
                      >
                        Enter date in format (mm/dd/yyyy)
                      </span>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="ddLanguage"
                      className="col-sm-4 col-form-label"
                    >
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
                          value="male"
                          required="required"
                        />
                        <label
                          htmlFor="rdGender_0"
                          className="custom-control-label"
                        >
                          Male
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          name="rdGender"
                          id="rdGender_1"
                          type="radio"
                          className="custom-control-input"
                          value="female"
                          required="required"
                        />
                        <label
                          htmlFor="rdGender_1"
                          className="custom-control-label"
                        >
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
                    <label
                      htmlFor="ddProfession"
                      className="col-sm-4 col-form-label"
                    >
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
                    <label
                      htmlFor="ddMonthlyIncome"
                      className="col-sm-4 col-form-label"
                    >
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
                    <label
                      htmlFor="txtAadharCard"
                      className="col-sm-4 col-form-label"
                    >
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
                    <label
                      htmlFor="txtPanCard"
                      className="col-sm-4 col-form-label"
                    >
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
                    <label
                      htmlFor="txtBeneficiary"
                      className="col-sm-4 col-form-label"
                    >
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
                    <label
                      htmlFor="ddRelationship"
                      className="col-sm-4 col-form-label"
                    >
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
                </div>
              </div>
              <div className="item">
                <h3>Contact Details</h3>
                <div className="form-group row">
                  <label
                    htmlFor="txtPermanentAddress"
                    className="col-sm-4 col-form-label"
                  >
                    Permanent Address
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="txtPermanentAddress"
                      name="txtPermanentAddress"
                      type="text"
                      className="form-control"
                      required="required"
                      placeholder="Permanent Address"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="txtCommunicationAddress"
                    className="col-sm-4 col-form-label"
                  >
                    Communication Address
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="txtCommunicationAddress"
                      name="txtCommunicationAddress"
                      type="text"
                      className="form-control"
                      required="required"
                      placeholder="Communication Address"
                    />
                  </div>
                </div>
              </div>
              <div className="item">
                <h3>Bank Details</h3>
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
                      required="required"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="txtAccountNumber"
                    className="col-sm-4 col-form-label"
                  >
                    Account Number
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="txtAccountNumber"
                      name="txtAccountNumber"
                      type="text"
                      className="form-control"
                      required="required"
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
                      required="required"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="txtBranchName"
                    className="col-sm-4 col-form-label"
                  >
                    Branch Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      id="txtBranchName"
                      name="txtBranchName"
                      type="text"
                      className="form-control"
                      required="required"
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
                      required="required"
                    />
                  </div>
                </div>
              </div>
            </WishCarousel>
          </div>
          <div className="col-sm-4">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <img
                      src={this.state.profilePicture}
                      alt=""
                      className="profile-picture-zone"
                    />
                    <div className="pt-2">
                      <input
                        type="file"
                        name="fProfilePic"
                        id="fProfilePic"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          this.handleProfilePicChange(e.target.files[0])
                        }
                      />
                      <label
                        htmlFor="fProfilePic"
                        className="btn btn-primary btn-block"
                      >
                        Upload New Photo
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }
}
