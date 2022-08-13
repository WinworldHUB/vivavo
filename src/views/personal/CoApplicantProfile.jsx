/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import PageLayout from "../../components/PageLayout";
import WishCarousel from "../../components/WishCarousel";
import WishSimpleCard from "../../components/WishSimpleCard";

export default class CoApplicantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture:
        "../../assets/app-assets/images/portrait/small/avatar-s-12.png",
      otherSelected: false,
      secondCarousel: React.createRef(),
    };
    this.handleProfilePicChange = this.handleProfilePicChange.bind(this);
    this.handleCARelationshipChange =
      this.handleCARelationshipChange.bind(this);
    this.handleChangeCoApplicantFinish =
      this.handleChangeCoApplicantFinish.bind(this);
  }

  handleProfilePicChange(selectedFile) {
    this.setState({ profilePicture: URL.createObjectURL(selectedFile) });
  }

  handleCARelationshipChange(event) {
    if (event.target.value === "other") {
      this.setState({ otherSelected: true });
    } else {
      this.setState({ otherSelected: false });
    }

    //this.state.secondCarousel.current.refreshCarousel();
  }

  handleChangeCoApplicantFinish() {
    //window.location.href = "/changecoapplicant";
  }

  profileCardFront() {
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
                src={this.state.profilePicture}
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
          </div>
          <div className="col-12 pt-2">
            <WishSimpleCard
              body={this.distributorProfileMessage()}
            ></WishSimpleCard>
          </div>
        </div>
      </div>
    );
  }

  distributorProfileMessage() {
    return (
      <>
        <code>
          <strong>Superb!</strong>
        </code>{" "}
        you are ahead of your colleagues in your profile completion
      </>
    );
  }

  render() {
    return (
      <PageLayout
        activeSideMenu="0"
        pageTitle="Co-Applicant Profile"
        extendedHeader
      >
        <section className="row">
          <div className="offset-sm-2 col-sm-8">
            {this.profileCardFront()}
            {/* <div className="card bg-transparent border-0 box-shadow-0">
              <div className="card-body row d-flex align-items-center pt-0">
                <div className="col-sm-3 text-center text-white">
                  <img
                    src={this.state.profilePicture}
                    alt=""
                    className="rounded-circle image-border height-100"
                  />
                  <label className="lead pt-1">Black Diamond Ambassador</label>
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
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-sm-8">
            <WishCarousel finishTo="/myprofile">
              <div className="item">
                <h3>Personal Details</h3>
                <div className="card-body">
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
                      htmlFor="ddRelationship"
                      className="col-sm-4 col-form-label"
                    >
                      Relationship with applicant
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

                  <div className="form-group row">
                    <label
                      htmlFor="txtPhone"
                      className="col-sm-4 col-form-label"
                    >
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
                    <label
                      htmlFor="txtEmail"
                      className="col-sm-4 col-form-label"
                    >
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
                  <label
                    htmlFor="txtBankName"
                    className="col-sm-4 col-form-label"
                  >
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
                  <label
                    htmlFor="txtIFSCCode"
                    className="col-sm-4 col-form-label"
                  >
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
                <WishCarousel
                  title={"Change Co-Applicant"}
                  ref={this.state.secondCarousel}
                  finishTo={"/changecoapplicant"}
                  finishToState={[
                    this.state.otherSelected === true ? "other" : "mother",
                  ]}
                >
                  <div className="item">
                    <div className="form-group row">
                      <label
                        htmlFor="txtGender"
                        className="col-12 col-form-label"
                      >
                        Gender
                      </label>
                      <div className="col-12">
                        <input
                          id="txtGender"
                          name="txtGender"
                          className="form-control"
                          type="text"
                          required="required"
                          value={"Male"}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="ddMartiaialStatus"
                        className="col-12 col-form-label"
                      >
                        Maritial Status
                      </label>
                      <div className="col-12">
                        <select
                          id="ddMartiaialStatus"
                          name="ddMartiaialStatus"
                          className="custom-select"
                          required="required"
                        >
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="item">
                    <div className="form-group row">
                      <label
                        htmlFor="ddCARelationship"
                        className="col-12 col-form-label"
                      >
                        Co-Applicants Relationship
                      </label>
                      <div className="col-12">
                        <select
                          id="ddCARelationship"
                          name="ddCARelationship"
                          className="custom-select"
                          required="required"
                          onChange={this.handleCARelationshipChange}
                        >
                          <option value="mother">Mother</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div
                      className={
                        "form-group row " +
                        (this.state.otherSelected ? "" : "invisible")
                      }
                    >
                      <label
                        htmlFor="ddCARelationshipOther"
                        className="col-12 col-form-label"
                      >
                        Other
                      </label>
                      <div className="col-12">
                        <select
                          id="ddCARelationshipOther"
                          name="ddCARelationshipOther"
                          className="custom-select"
                          required="required"
                        >
                          <option value="son">Son</option>
                          <option value="father">Father</option>
                          <option value="daughter">Daughter</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </WishCarousel>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }
}
