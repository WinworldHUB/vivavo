/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishCarousel from "../../components/WishCarousel";

export default function ChangeCoApplicant() {
  let location = useLocation();
  const isMother = location.state[0] === "mother" ? true : false;

  const [selectedBankDocument, setSelectedBankDocument] = React.useState();
  const [selectedJustificationDocument, setSelectedJustificationDocument] =
    React.useState();

  return (
    <PageLayout activeSideMenu="0" pageTitle="Change Co-Applicant">
      <section className="row">
        <div className="col-sm-12">
          <WishCarousel finishTo="/myprofile">
            <div className="item">
              <h3>Personal Details</h3>
              <div className="form-group row pt-2">
                <label htmlFor="txtFullname" className="col-4 col-form-label">
                  Full Name
                </label>
                <div className="col-8">
                  <input
                    id="txtFullname"
                    name="txtFullname"
                    className="form-control"
                    type="text"
                    required="required"
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
                    data-original-title=""
                    title=""
                  />
                  <span id="txtDOBHelpBlock" className="form-text text-muted">
                    Enter date in format (mm/dd/yyyy)
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="ddRelationship"
                  className="col-4 col-form-label"
                >
                  Relationship with applicant
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

              <div className="form-group row">
                <label htmlFor="txtPhone" className="col-4 col-form-label">
                  Phone
                </label>
                <div className="col-5">
                  <input
                    id="txtPhone"
                    name="txtPhone"
                    type="text"
                    className="form-control"
                    required="required"
                    placeholder="Your primary phone number"
                  />
                </div>
                <div className="col-3">
                  <a href="#" className="btn btn-primary btn-block">
                    verify
                  </a>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="txtEmail" className="col-4 col-form-label">
                  Email
                </label>
                <div className="col-5">
                  <input
                    id="txtEmail"
                    name="txtEmail"
                    type="text"
                    className="form-control"
                    required="required"
                    placeholder="Your primary email address"
                  />
                </div>
                <div className="col-3">
                  <a href="#" className="btn btn-primary btn-block">
                    verify
                  </a>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="txtAadharCard" className="col-4 col-form-label">
                  Aadhar Card
                </label>
                <div className="col-5">
                  <input
                    id="txtAadharCard"
                    name="txtAadharCard"
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-3">
                  <a href="#" className="btn btn-primary btn-block">
                    Attach file
                  </a>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="txtPanCard" className="col-4 col-form-label">
                  PAN Card
                </label>
                <div className="col-5">
                  <input
                    id="txtPanCard"
                    name="txtPanCard"
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-3">
                  <a href="#" className="btn btn-primary btn-block">
                    Attach file
                  </a>
                </div>
              </div>
            </div>
            <div className="item">
              <h3>Bank Details</h3>
              <div className="form-group row pt-2">
                <label
                  htmlFor="txtAccountHolderName"
                  className="col-4 col-form-label"
                >
                  Account holder name
                </label>
                <div className="col-8">
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
                  className="col-4 col-form-label"
                >
                  Account Number
                </label>
                <div className="col-8">
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
                <label htmlFor="txtBankName" className="col-4 col-form-label">
                  Bank Name
                </label>
                <div className="col-8">
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
                <label htmlFor="txtBranchName" className="col-4 col-form-label">
                  Branch Name
                </label>
                <div className="col-8">
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
                <label htmlFor="txtIFSCCode" className="col-4 col-form-label">
                  IFSC Code
                </label>
                <div className="col-8">
                  <input
                    id="txtIFSCCode"
                    name="txtIFSCCode"
                    type="text"
                    className="form-control"
                    required="required"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="txtProofFile" className="col-4 col-form-label">
                  Proof
                </label>
                <div className="col-5">
                  <input
                    id="txtProofFile"
                    name="txtProofFile"
                    type="file"
                    className="form-control hidden"
                    required="required"
                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*,.pdf"
                    onChange={(e) =>
                      setSelectedBankDocument(e.target.files[0].name)
                    }
                  />

                  <input
                    id="txtProof"
                    name="txtProof"
                    type="text"
                    className="form-control"
                    readOnly="readonly"
                    value={selectedBankDocument ?? ""}
                  />
                </div>

                <div className="col-3">
                  <label
                    className="btn btn-primary btn-block"
                    htmlFor="txtProofFile"
                  >
                    Upload document
                  </label>
                </div>
              </div>
            </div>

            {!isMother && (
              <div className="item">
                <h3>Co-Application Change Justification</h3>
                <div className="form-group row pt-2">
                  <label
                    htmlFor="txtProofJustificationFile"
                    className="col-4 col-form-label"
                  >
                    Proof of Justification
                  </label>
                  <div className="col-5">
                    <input
                      id="txtProofJustificationFile"
                      name="txtProofJustificationFile"
                      type="file"
                      className="form-control hidden"
                      required="required"
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*,.pdf"
                      onChange={(e) =>
                        setSelectedJustificationDocument(e.target.files[0].name)
                      }
                    />

                    <input
                      id="txtProofJustification"
                      name="txtProofJustification"
                      type="text"
                      className="form-control"
                      readOnly="readonly"
                      value={selectedJustificationDocument ?? ""}
                    />
                  </div>

                  <div className="col-3">
                    <label
                      className="btn btn-primary btn-block"
                      htmlFor="txtProofJustificationFile"
                    >
                      Upload document
                    </label>
                  </div>
                </div>
              </div>
            )}
          </WishCarousel>
        </div>
      </section>
    </PageLayout>
  );
}
