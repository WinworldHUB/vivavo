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
import useEnrollment, {
  BankDetails,
  CoAppDetails,
  ContactDetails,
  PersonalDetails,
} from "../../services/useEnrollment";
import { useEffect } from "react";
import WishSelect from "../../components/WishFormComponents/WishSelect";
import LoadingNote from "../../components/LoadingNote";
import { useRef } from "react";
import WishSingleLineText from "../../components/WishFormComponents/WishSingleLineText";
import WishFileControl from "../../components/WishFormComponents/WishFileControl";
import _ from "lodash";
import moment from "moment/moment";
import WishFlexBox from "../../components/WishFlexBox";
import useLocalStorage from "react-use-localstorage";

export default function EnrollUser() {
  const location = useLocation();
  const { step } = location.state ?? 0;

  const totalPages = 6;
  const [currentPage, setCurrentPage] = useState(step ?? 0);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const { loggedInUser } = useMasters();
  const [
    enrollmentError,
    enrollmentLoading,
    {
      enrollmentMasterData,
      locationDetails,
      getLocationDetails,
      saveEnrolleeDetails,
      tempDistId,
      getBankBranchDetails,
      getCoAppRelationships,
    },
  ] = useEnrollment(loggedInUser);

  const breadcrumbs = [];
  const navigations = [
    "Applicant Details",
    "Contact Details",
    "Bank Details",
    "Co-Applicant Details",
    "Preview",
  ];

  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "Enrollment", linkTo: "/enrollment" });
  breadcrumbs.push({ title: "New User", linkTo: "/" });

  const [isRotated, setIsRotated] = useState(true);
  const [filterApplied, applyFilter] = useState(false);
  const [isCurrentPageDirty, setIsCurrentPageDirty] = useState(false);
  const [paPincode, setPAPincode] = useState("");
  const [caPincode, setCAPincode] = useState("");

  const [personalDetails, updatePersonalDetails] = useState(
    _.cloneDeep(PersonalDetails)
  );
  const [contactDetails, updateContactDetails] = useState(
    _.cloneDeep(ContactDetails)
  );
  const [bankDetails, updateBankDetails] = useState(_.cloneDeep(BankDetails));
  const [coAppDetails, updateCoAppDetails] = useState(
    _.cloneDeep(CoAppDetails)
  );

  const [paLocationDetails, setPALocationDetails] = useState(null);
  const [caLocationDetails, setCALocationDetails] = useState(null);
  const [coAppRelationshipDetails, setCoAppRelationshipDetails] =
    useState(null);

  const [currentEnrolleeData, setCurrentEnrolleeData] = useState({
    distributor_id: null,
    dist_temp_id: null,
    section_level: null,
  });

  const [currentEnrolleeDetails, saveCurrentEnrolleeDetails] = useLocalStorage(
    "enrollee",
    null
  );

  const [filterText, setFilterText] = useState("");

  const [treeNodes, setTreeNodes] = useState(data.treeData);

  const [validationError, setValidationError] = useState(null);
  const validationRef = useRef(null);

  useEffect(() => {
    if (currentEnrolleeDetails) {
      const enrolleeDetailsFromLocalStorage = JSON.parse(
        currentEnrolleeDetails
      );
      setCurrentEnrolleeData(enrolleeDetailsFromLocalStorage);

      //if (enrolleeDetailsFromLocalStorage.section_level)
    }
  }, []);

  useEffect(() => {
    if (enrollmentError) {
      WishToaster({ toastMessage: enrollmentError.message });
    }
  }, [enrollmentError]);

  useEffect(() => {
    if (enrollmentMasterData) {
      console.log(enrollmentMasterData);

      updatePersonalDetails({
        ...personalDetails,
        title_id: enrollmentMasterData?.titles[0]?.id,
        gender_id: enrollmentMasterData?.gender[0]?.id,
        language_id: enrollmentMasterData?.languages[0]?.id,
        marital_status_id: enrollmentMasterData?.marital_status[0]?.id,
        profession_id: enrollmentMasterData?.profession[0]?.id,
        monthly_income_id: enrollmentMasterData?.monthly_income[0]?.id,
      });
    }
  }, [enrollmentMasterData]);

  useEffect(() => {
    if (loggedInUser) {
      updatePersonalDetails({
        ...personalDetails,
        distributor_id: loggedInUser.distributor_id,
        dist_temp_id: "",
      });
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (tempDistId) {
      updatePersonalDetails({ ...personalDetails, dist_temp_id: tempDistId });
      setCurrentEnrolleeData({
        ...currentEnrolleeData,
        distributor_id: personalDetails.distributor_id,
        dist_temp_id: tempDistId,
      });
      saveCurrentEnrolleeDetails(JSON.stringify(currentEnrolleeData));
    }
  }, [tempDistId]);

  useEffect(() => {
    setValidationError(null);
  }, [isCurrentPageDirty]);

  useEffect(() => {
    //alert(moment(personalDetails.dob).format("DD/MM/YYYY"));
    if (personalDetails && personalDetails.dob) {
      //alert(personalDetails.dob);
    }
  }, [personalDetails]);

  useEffect(() => {
    if (validationError && validationRef) {
      validationRef.current.scrollIntoView();
    }
  }, [validationError]);

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
        <p className="text-danger" ref={validationRef}>
          {validationError ?? ""}
        </p>
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

  const RenderCommunicationAddress = () => {
    return (
      <>
        <WishSingleLineText
          label="Address Line 1"
          initialValue={contactDetails?.communication_address_line1}
          onChange={(value) => {
            updateContactDetails({
              ...contactDetails,
              communication_address_line1: value,
            });
          }}
        />

        <WishSingleLineText
          label="Address Line 2"
          initialValue={contactDetails?.communication_address_line2}
          onChange={(value) => {
            updateContactDetails({
              ...contactDetails,
              communication_address_line2: value,
            });
          }}
        />

        <WishSingleLineText
          id="caPincode"
          label="Pincode"
          initialValue={caPincode}
          onChange={(value) => {
            setCAPincode(value);
          }}
          onBlurred={() => {
            if (caPincode.trim() !== "") {
              getLocationDetails(caPincode, (locationDetails) => {
                setCALocationDetails(locationDetails);
                updateContactDetails({
                  ...contactDetails,
                  communication_city_id: locationDetails[0]?.city_id,
                  communication_district_id: locationDetails[0]?.district_id,
                  communication_state_id: locationDetails[0]?.state_id,
                  communication_country_id: locationDetails[0]?.country_id,
                  communication_postalcode_id:
                    locationDetails[0]?.postalcode_id,
                });
              });
            } else {
              WishToaster({ toastMessage: "Kindly enter a valid pincode " });
            }
          }}
        />

        {caLocationDetails && (
          <div className="form-group row">
            <label htmlFor="ddCity" className="col-4 col-form-label">
              Location (City, District, State, Country)
            </label>
            <div className="col-8 col-form-label">
              {!caLocationDetails ? (
                <LoadingNote />
              ) : (
                `${caLocationDetails[0]?.city_name}, ${caLocationDetails[0]?.district_name}, ${caLocationDetails[0]?.state_name}, ${caLocationDetails[0]?.country_name}`
              )}
            </div>
          </div>
        )}

        {caLocationDetails &&
          (!caLocationDetails ? (
            <LoadingNote />
          ) : (
            <WishSelect
              label="Post Name"
              initialValue={contactDetails.communication_postalcode_id}
              data={caLocationDetails ?? []}
              dataKey="postalcode_id"
              dataValue="post_name"
              onSelect={(value) => {
                updateContactDetails({
                  ...contactDetails,
                  communication_postalcode_id: value,
                });
              }}
            />
          ))}
      </>
    );
  };

  const gotoNextPage = function () {
    let payload = {};
    switch (currentPage) {
      case 0:
        payload = personalDetails;
        break;

      case 1:
        payload = contactDetails;
        break;

      case 2:
        payload = bankDetails;
        break;

      case 3:
        payload = bankDetails;
        break;

      default:
        break;
    }

    if (validatePage()) {
      saveEnrolleeDetails(currentPage, payload, () => {
        setCurrentPage(currentPage + 1);
      });
    }
  };

  const validatePage = function () {
    switch (currentPage) {
      case 0:
        if (
          (personalDetails.pan_no.trim() === "" &&
            personalDetails.pan_declaration1 === false) ||
          (personalDetails.gst_no.trim() === "" &&
            personalDetails.gst_declaration1 === false)
        ) {
          AppUtils.showDialog("dlgConsent");
          return false;
        }

        var ageDifMs = Date.now() - (personalDetails?.dob ?? Date.now());
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        if (Math.abs(ageDate.getUTCFullYear() - 1970) < 18) {
          setValidationError("Year must be 18 years or before");
          return false;
        }

        updateContactDetails({
          ...contactDetails,
          distributor_id: personalDetails.distributor_id,
          dist_temp_id: personalDetails.dist_temp_id,
        });

        getCoAppRelationships(
          personalDetails.gender_id,
          personalDetails.marital_status_id,
          (details) => {
            setCoAppRelationshipDetails(details);
          }
        );
        break;

      case 1:
        if (contactDetails.is_addresses_same === 1) {
          updateContactDetails({
            ...contactDetails,
            communication_address_line1: contactDetails.permanent_address_line1,
            communication_address_line2: contactDetails.permanent_address_line2,
            communication_city_id: contactDetails.permanent_city_id,
            communication_district_id: contactDetails.permanent_district_id,
            communication_state_id: contactDetails.permanent_state_id,
            communication_country_id: contactDetails.permanent_country_id,
            communication_postalcode_id: contactDetails.permanent_postalcode_id,
          });
        }
        break;

      case 2:
        updateBankDetails({
          ...bankDetails,
          distributor_id: personalDetails.distributor_id,
          dist_temp_id: personalDetails.dist_temp_id,
        });
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
      <form id="frmPage1">
        <div>
          <div className="">
            <WishSingleLineText
              label="distributor_id"
              initialValue={personalDetails.distributor_id}
            />
            <WishSingleLineText
              label="dist_temp_id"
              initialValue={personalDetails.dist_temp_id}
            />
            <input
              type="checkbox"
              name="pan_declaration"
              id="pan_declaration"
              checked={personalDetails.pan_declaration1}
              onChange={() => {
                setIsCurrentPageDirty(true);
                updatePersonalDetails({
                  ...personalDetails,
                  pan_declaration1: !personalDetails.pan_declaration1,
                });
              }}
            />
            <input
              type="checkbox"
              name="gst_declaration"
              id="gst_declaration"
              checked={personalDetails.gst_declaration1}
              onChange={() => {
                setIsCurrentPageDirty(true);
                updatePersonalDetails({
                  ...personalDetails,
                  gst_declaration1: !personalDetails.gst_declaration1,
                });
              }}
            />
          </div>
          {enrollmentLoading ? (
            <LoadingNote />
          ) : (
            <WishSelect
              id="title_id"
              label="title"
              initialValue={personalDetails.title_id}
              data={enrollmentMasterData?.titles ?? []}
              onSelect={(value) => {
                setIsCurrentPageDirty(true);
                updatePersonalDetails({
                  ...personalDetails,
                  title_id: value,
                });
              }}
            />
          )}
          <WishSingleLineText
            id="first_name"
            label="First Name"
            initialValue={personalDetails.first_name}
            onChange={(value) => {
              updatePersonalDetails({
                ...personalDetails,
                first_name: value,
              });
            }}
          />
          <WishSingleLineText
            id="second_name"
            label="Last Name"
            initialValue={personalDetails.second_name}
            onChange={(value) => {
              setIsCurrentPageDirty(true);
              updatePersonalDetails({
                ...personalDetails,
                second_name: value,
              });
            }}
          />
          <div className="form-group row">
            <label htmlFor="projectinput3" className="col-4 col-form-label">
              Date of birth
            </label>
            <div className="col-8">
              <input
                type="date"
                id="dob"
                className="form-control"
                name="dob"
                data-toggle="tooltip"
                data-trigger="hover"
                data-placement="top"
                data-title="Date of birth"
                defaultValue={personalDetails?.dob}
                onChange={(e) => {
                  setIsCurrentPageDirty(true);
                  updatePersonalDetails({
                    ...personalDetails,
                    dob: e.target.valueAsDate,
                  });
                }}
              />
            </div>
          </div>
          {enrollmentLoading ? (
            <LoadingNote />
          ) : (
            <WishSelect
              id="language_id"
              label="Language"
              initialValue={personalDetails.language_id}
              data={enrollmentMasterData?.languages ?? []}
              onSelect={(value) => {
                setIsCurrentPageDirty(true);
                updatePersonalDetails({
                  ...personalDetails,
                  title_id: value,
                });
              }}
            />
          )}
          {enrollmentLoading ? (
            <LoadingNote />
          ) : (
            <WishSelect
              id="gender_id"
              label="Gender"
              initialValue={personalDetails.gender_id}
              data={enrollmentMasterData?.gender ?? []}
              onSelect={(value) => {
                setIsCurrentPageDirty(true);
                updatePersonalDetails({
                  ...personalDetails,
                  title_id: value,
                });
              }}
            />
          )}
          {enrollmentLoading ? (
            <LoadingNote />
          ) : (
            <WishSelect
              id="marital_status_id"
              label="Martial Status"
              initialValue={personalDetails.marital_status_id}
              data={enrollmentMasterData?.marital_status ?? []}
              onSelect={(value) => {
                setIsCurrentPageDirty(true);
                updatePersonalDetails({
                  ...personalDetails,
                  title_id: value,
                });
              }}
            />
          )}
          {enrollmentLoading ? (
            <LoadingNote />
          ) : (
            <WishSelect
              id="profession_id"
              label="Profession"
              initialValue={personalDetails.profession_id}
              data={enrollmentMasterData?.profession ?? []}
              onSelect={(value) => {
                setIsCurrentPageDirty(true);
                updatePersonalDetails({
                  ...personalDetails,
                  title_id: value,
                });
              }}
            />
          )}
          {enrollmentLoading ? (
            <LoadingNote />
          ) : (
            <WishSelect
              id="monthly_income_id"
              label="Monthly Income"
              initialValue={personalDetails.monthly_income_id}
              data={enrollmentMasterData?.monthly_income ?? []}
              onSelect={(value) => {
                setIsCurrentPageDirty(true);
                updatePersonalDetails({
                  ...personalDetails,
                  title_id: value,
                });
              }}
            />
          )}

          <WishSingleLineText
            id="aadhar_no"
            label="Aadhar Number"
            initialValue={personalDetails.aadhar_no}
            onChange={(value) => {
              setIsCurrentPageDirty(true);
              updatePersonalDetails({
                ...personalDetails,
                aadhar_no: value,
              });
            }}
          />
          <WishFileControl
            id="aadhar_file"
            label="Aadhar Document (Attachment)"
            initialValue={personalDetails.aadhar_filename}
            onChange={(filename, fileObject) => {
              setIsCurrentPageDirty(true);
              updatePersonalDetails({
                ...personalDetails,
                aadhar_file: fileObject,
                aadhar_filename: filename,
              });
            }}
          />
          <WishSingleLineText
            id="pan_no"
            label="PAN Number"
            initialValue={personalDetails.pan_no}
            onChange={(value) => {
              setIsCurrentPageDirty(true);
              updatePersonalDetails({
                ...personalDetails,
                pan_no: value,
                pan_declaration1: value.trim() !== "",
              });
            }}
          />
          <WishFileControl
            id="pan_file"
            label="PAN Document (Attachment)"
            initialValue={personalDetails.pan_filename}
            onChange={(filename, fileObject) => {
              setIsCurrentPageDirty(true);
              updatePersonalDetails({
                ...personalDetails,
                pan_file: fileObject,
                pan_filename: filename,
              });
            }}
          />
          <WishSingleLineText
            id="gst_no"
            label="GST Number"
            initialValue={personalDetails.gst_no}
            onChange={(value) => {
              setIsCurrentPageDirty(true);
              updatePersonalDetails({
                ...personalDetails,
                gst_no: value,
                gst_declaration1: value.trim() !== "",
              });
            }}
          />
        </div>
      </form>
    );
  };

  const page2 = function () {
    return (
      <div>
        <WishSingleLineText
          label="Full Name"
          readonly
          initialValue={`${personalDetails.first_name} ${personalDetails.second_name}`}
        />

        <WishSingleLineText
          label="Mobile Number"
          initialValue={contactDetails?.phone}
          onChange={(value) => {
            updateContactDetails({ ...contactDetails, phone: value });
          }}
        />

        <WishSingleLineText
          label="Email"
          initialValue={contactDetails?.email}
          onChange={(value) => {
            updateContactDetails({ ...contactDetails, email: value });
          }}
        />

        <p className="lead border-bottom text-primary pt-2">
          Permanent Address
        </p>

        <WishSingleLineText
          label="Address Line 1"
          initialValue={contactDetails?.permanent_address_line1}
          onChange={(value) => {
            updateContactDetails({
              ...contactDetails,
              permanent_address_line1: value,
            });
          }}
        />

        <WishSingleLineText
          label="Address Line 2"
          initialValue={contactDetails?.permanent_address_line2}
          onChange={(value) => {
            updateContactDetails({
              ...contactDetails,
              permanent_address_line2: value,
            });
          }}
        />

        <WishSingleLineText
          id="paPincode"
          label="Pincode"
          initialValue={paPincode}
          onChange={(value) => {
            setPAPincode(value);
          }}
          onBlurred={() => {
            if (paPincode.trim() !== "") {
              getLocationDetails(paPincode, (locationDetails) => {
                setPALocationDetails(locationDetails);
                updateContactDetails({
                  ...contactDetails,
                  permanent_city_id: locationDetails[0]?.city_id,
                  permanent_district_id: locationDetails[0]?.district_id,
                  permanent_state_id: locationDetails[0]?.state_id,
                  permanent_country_id: locationDetails[0]?.country_id,
                  permanent_postalcode_id: locationDetails[0]?.postalcode_id,
                });
              });
            } else {
              setPALocationDetails(null);
              WishToaster({ toastMessage: "Kindly enter a valid pincode " });
            }
          }}
        />

        {paLocationDetails && (
          <div className="form-group row">
            <label htmlFor="ddCity" className="col-4 col-form-label">
              Location (City, District, State, Country)
            </label>
            <div className="col-8 col-form-label">
              {!paLocationDetails ? (
                <LoadingNote />
              ) : (
                `${paLocationDetails[0]?.city_name}, ${paLocationDetails[0]?.district_name}, ${paLocationDetails[0]?.state_name}, ${paLocationDetails[0]?.country_name}`
              )}
            </div>
          </div>
        )}

        {paLocationDetails &&
          (!locationDetails ? (
            <LoadingNote />
          ) : (
            <WishSelect
              label="Post Name"
              initialValue={contactDetails.permanent_postalcode_id}
              data={paLocationDetails ?? []}
              dataKey="postalcode_id"
              dataValue="post_name"
              onSelect={(value) => {
                updateContactDetails({
                  ...contactDetails,
                  permanent_postalcode_id: value,
                });
              }}
            />
          ))}

        <WishFileControl
          label="Address Proof (Attachment)"
          id="address_proof_file"
          initialValue={contactDetails.address_proof_filename}
          onChange={(filename, fileObject) => {
            updateContactDetails({
              ...contactDetails,
              address_proof_filename: filename,
              address_proof_file: fileObject,
            });
          }}
        />

        <div className="form-row border-bottom pt-2">
          <p className="lead col-4 text-primary">Communication Address</p>
          <div className="col-8 pl-1">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
                defaultChecked={contactDetails.is_addresses_same === 1}
                onChange={(e) => {
                  if (e.target.checked === true) {
                    updateContactDetails({
                      ...contactDetails,
                      is_addresses_same: 1,
                      communication_address_line1:
                        contactDetails.permanent_address_line1,
                      communication_address_line2:
                        contactDetails.permanent_address_line2,
                      communication_city_id: contactDetails.permanent_city_id,
                      communication_district_id:
                        contactDetails.permanent_district_id,
                      communication_state_id: contactDetails.permanent_state_id,
                      communication_country_id:
                        contactDetails.permanent_country_id,
                      communication_postalcode_id:
                        contactDetails.permanent_postalcode_id,
                    });

                    setCAPincode(paPincode);
                    setCALocationDetails(paLocationDetails);
                  } else {
                    updateContactDetails({
                      ...contactDetails,
                      is_addresses_same: 0,
                      communication_address_line1: "",
                      communication_address_line2: "",
                      communication_city_id: null,
                      communication_district_id: null,
                      communication_state_id: null,
                      communication_country_id: null,
                      communication_postalcode_id: null,
                    });

                    setCAPincode("");
                    setCALocationDetails(null);
                  }
                }}
              />
              <label className="custom-control-label" htmlFor="customSwitch1">
                Same as Permanent Address
              </label>
            </div>
          </div>
        </div>

        {contactDetails.is_addresses_same === 0 ? (
          <RenderCommunicationAddress />
        ) : (
          <></>
        )}
      </div>
    );
  };

  const page3 = function () {
    return (
      <div>
        <WishSingleLineText
          label="Account Holder"
          initialValue={BankDetails?.account_name}
          onChange={(value) => {
            updateBankDetails({ ...bankDetails, account_name: value });
          }}
        />
        <WishSingleLineText
          label="Account Number"
          initialValue={BankDetails?.account_no}
          onChange={(value) => {
            updateBankDetails({ ...bankDetails, account_no: value });
          }}
        />
        <WishSingleLineText
          label="Confirm Account Number"
          initialValue={BankDetails?.confirm_account_no}
          onChange={(value) => {
            updateBankDetails({ ...bankDetails, confirm_account_no: value });
          }}
          onBlurred={() => {
            if (bankDetails.confirm_account_no !== bankDetails.account_no) {
              WishToaster({
                toastMessage:
                  "Accounts numbers do not match. Must be same as entered above",
              });
              updateBankDetails({ ...bankDetails, confirm_account_no: "" });
            }
          }}
        />
        <WishSingleLineText
          label="IFSC Code"
          initialValue={BankDetails?.ifsc}
          onChange={(value) => {
            updateBankDetails({ ...bankDetails, ifsc: value });
          }}
          onBlurred={() => {
            // getBankBranchDetails(bankDetails.ifsc, (branchDetails) => {
            //   alert(branchDetails);
            // });
            updateBankDetails({
              ...bankDetails,
              bank_name: "Delhi Nagrik Sehkari Bank",
              branch_name: "Delhi Nagrik Sehkari Bank IMPS",
            });
          }}
        />
        <WishSingleLineText
          label="Bank Name"
          readonly
          initialValue={bankDetails?.bank_name}
        />
        <WishSingleLineText
          label="Bank Branch"
          readonly
          initialValue={bankDetails?.branch_name}
        />
        <WishFileControl
          label="Bank (proof of address)"
          initialValue={BankDetails?.bank_proof_filename}
          onChange={(filename, fileObject) => {
            updateBankDetails({
              ...bankDetails,
              bank_proof_filename: filename,
              bank_proof_file: fileObject,
            });
          }}
        />
      </div>
    );
  };

  const page4 = function () {
    return (
      <div>
        <WishSingleLineText
          label="Co-Applicant Name"
          initialValue={coAppDetails?.coapplicant_name}
          onChange={(value) => {
            updateCoAppDetails({ ...coAppDetails, coapplicant_name: value });
          }}
        />

        <div className="form-group row">
          <label htmlFor="txtdob" className="col-4 col-form-label">
            Date of birth
          </label>
          <div className="col-8">
            <input
              type="date"
              id="txtCodob"
              className="form-control"
              name="dateopened"
              data-toggle="tooltip"
              data-trigger="hover"
              data-placement="top"
              data-title="Date of birth"
              onChange={(e) => {
                updateCoAppDetails({
                  ...coAppDetails,
                  coapplicant_dob: e.target.value,
                });
              }}
            />
          </div>
        </div>

        {enrollmentLoading ? (
          <LoadingNote />
        ) : (
          <WishSelect
            id="co_gender_id"
            label="Gender"
            initialValue={coAppDetails.gender_id}
            data={enrollmentMasterData?.gender ?? []}
            onSelect={(value) => {
              setIsCurrentPageDirty(true);
              updateCoAppDetails({
                ...coAppDetails,
                gender_id: value,
              });
            }}
          />
        )}

        <WishSingleLineText
          label="Mobile Number"
          initialValue={coAppDetails?.coapplicant_phone}
          onChange={(value) => {
            updateCoAppDetails({ ...coAppDetails, coapplicant_phone: value });
          }}
        />

        <WishSingleLineText
          label="Email"
          initialValue={coAppDetails?.coapplicant_email}
          onChange={(value) => {
            updateCoAppDetails({ ...coAppDetails, coapplicant_email: value });
          }}
        />

        {coAppRelationshipDetails && (
          <WishSelect
            label="Relationship"
            data={coAppRelationshipDetails?.relationships}
            dataValue="title"
            initialValue={coAppDetails?.coapplicant_relationship_id}
            onChange={(value) => {
              updateCoAppDetails({
                ...coAppDetails,
                coapplicant_relationship_id: value,
              });
            }}
          />
        )}

        {/* <div className="form-group row">
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
        </div> */}

        <WishSingleLineText
          label="PAN Number"
          initialValue={coAppDetails?.coapplicant_pan_no}
          onChange={(value) => {
            updateCoAppDetails({ ...coAppDetails, coapplicant_pan_no: value });
          }}
        />

        <WishFileControl
          label="PAN (Attachment)"
          initialValue={coAppDetails?.coapp_pan_filename}
          onChange={(filename, fileObject) => {
            updateCoAppDetails({
              ...coAppDetails,
              coapp_pan_filename: filename,
              coapp_pan_file: fileObject,
            });
          }}
        />

        <WishSingleLineText
          label="Account Name"
          initialValue={coAppDetails?.coapplicant_account_name}
          onChange={(value) => {
            updateCoAppDetails({
              ...coAppDetails,
              coapplicant_account_name: value,
            });
          }}
        />

        <WishSingleLineText
          label="Account Number"
          initialValue={coAppDetails?.coapplicant_account_no}
          onChange={(value) => {
            updateCoAppDetails({
              ...coAppDetails,
              coapplicant_account_no: value,
            });
          }}
        />

        <WishSingleLineText
          label="Confirm Account Number"
          initialValue={coAppDetails?.coapplicant_confirm_account_name}
          onChange={(value) => {
            updateCoAppDetails({
              ...coAppDetails,
              coapplicant_confirm_account_name: value,
            });
          }}
        />

        <WishSingleLineText
          label="IFSC Code"
          initialValue={coAppDetails?.coapplicant_ifsc}
          onChange={(value) => {
            updateCoAppDetails({ ...coAppDetails, coapplicant_ifsc: value });
          }}
        />

        <WishSingleLineText
          label="Bank Name"
          initialValue={coAppDetails?.coapplicant_bank_name}
          readonly
        />

        <WishSingleLineText
          label="Branch Name"
          initialValue={coAppDetails?.coapplicant_branch_name}
          readonly
        />

        <WishFileControl
          label="BANK (Proof of address)"
          initialValue={coAppDetails?.coapp_bank_proof_filename}
          onChange={(filename, fileObject) => {
            updateCoAppDetails({
              ...coAppDetails,
              coapp_bank_proof_filename: filename,
              coapp_bank_proof_file: fileObject,
            });
          }}
        />

        <WishSingleLineText
          label="Nominee Name"
          initialValue={coAppDetails?.nominee}
          onChange={(value) => {
            updateCoAppDetails({ ...coAppDetails, nominee: value });
          }}
        />

        {coAppRelationshipDetails && (
          <WishSelect
            label="Nominee Relationship"
            data={coAppRelationshipDetails?.relationships}
            dataValue="title"
            initialValue={coAppDetails?.nominee_mrelationship_id}
            onChange={(value) => {
              updateCoAppDetails({
                ...coAppDetails,
                nominee_mrelationship_id: value,
              });
            }}
          />
        )}

        {/* <div className="form-group row">
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
        </div>*/}
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
          //savePersonalDetails(personalDetails);
          //gotoNextPage();
        }}
      >
        <WishColoredBar bgcolor="danger">
          You did not provide PAN Card / Aadhar Card details. Please provide
          your consent for non-provision of PAN Card / GST Number
        </WishColoredBar>
        <div className="form-group row">
          {personalDetails.pan_no === "" ? (
            <>
              <div className="col-12 pb-2">
                <h5>PAN Card Consent</h5>
                <div className="custom-control custom-checkbox custom-control-inline">
                  <input
                    name="checkbox"
                    id="checkbox_0"
                    type="checkbox"
                    checked={personalDetails.pan_declaration1}
                    className="custom-control-input"
                    value="pancard"
                    onChange={() => {
                      updatePersonalDetails({
                        ...personalDetails,
                        pan_declaration1: !personalDetails.pan_declaration1,
                      });
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

          {personalDetails.gst_no === "" ? (
            <div className="col-12 pt-2">
              <h5>GST Number Consent</h5>
              <div className="custom-control custom-checkbox custom-control-inline">
                <input
                  name="checkbox"
                  id="checkbox_1"
                  type="checkbox"
                  checked={personalDetails.gst_declaration1}
                  className="custom-control-input"
                  value="gstnumber"
                  onChange={() => {
                    updatePersonalDetails({
                      ...personalDetails,
                      gst_declaration1: !personalDetails.gst_declaration1,
                    });
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
