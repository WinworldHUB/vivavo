import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import pageConfig from "../../data/config.json";
import WishCarousel from "../../components/WishCarousel";
import WishLinkCard from "../../components/WishLinkCard";
import _ from "lodash";
import useEnrollment, {
  BankDetails,
  CoAppDetails,
  ContactDetails,
  PersonalDetails,
} from "../../services/useEnrollment";
import useMasters from "../../services/useMasters";
import WishToaster from "../../components/WishToaster";
import LoadingNote from "../../components/LoadingNote";
import WishSelect from "../../components/WishFormComponents/WishSelect";
import WishSingleLineText from "../../components/WishFormComponents/WishSingleLineText";
import WishDateControl from "../../components/WishFormComponents/WishDateControl";
import WishFileControl from "../../components/WishFormComponents/WishFileControl";
import WishFormSection from "../../components/WishFormComponents/WishFormSection";
import WishFlexBox from "../../components/WishFlexBox";
import WishCheckBox from "../../components/WishFormComponents/WishCheckBox";
import WishPreviewSection from "../../components/WishPreviewSection";
import WishModal from "../../components/WishModal";
import WishColoredBar from "../../components/WishColoredBar";
import { AppUtils } from "../../services/AppUtils";
import { ValidationUtils } from "../../services/ValidationUtils";
import { GST_DECLARATION, PAN_DECLARATION } from "../../services/Constants";
import WishDialog from "../../components/WishDialog";

const BasicDetailsForm = {
  Title: { id: 1, title_name: "Mr." },
  "First Name": (String, ""),
  "Last Name": (String, ""),
  "Date of birth": (String, ""),
  Language: { id: 1, title_name: "Mr." },
  Gender: { id: 1, title_name: "Mr." },
  "Marital Status": { id: 1, title_name: "Mr." },
  Profession: { id: 1, title_name: "Mr." },
  "Monthly Income": { id: 1, title_name: "Mr." },
  "Aadhar Number": (String, ""),
  "Aadhar Document": (Object, { filename: String, file: File }),
  "PAN Number": (String, ""),
  "PAN Document": (Object, { filename: String, file: File }),
  "GST Number": (String, ""),
  "PAN Consent": (Boolean, false),
  "GST Consent": (Boolean, false),
};

const ContactDetailsForm = {
  "Full Name": (String, ""),
  "Phone Number": (String, ""),
  "Email Address": (String, ""),
  "Address Line 1": (String, ""),
  "Address Line 2": (String, ""),
  Pincode: (String, ""),
  "Location Details": (String, ""),
  "Postal Code": (Object, { id: Number, title_name: String }),
  "Postal Code List": [],
  SameCA: (Boolean, true),
  "CA Address Line 1": (String, ""),
  "CA Address Line 2": (String, ""),
  CAPincode: (String, ""),
  "CA Location Details": (String, ""),
  "CA Postal Code": (Object, { id: Number, title_name: String }),
  "CA Postal Code List": [],
};

const BankDetailsForm = {
  "Account Holder": (String, ""),
  "Account Number": (String, ""),
  "Confirm Account Number": (String, ""),
  "IFSC Code": (String, ""),
  "Bank Name": (String, ""),
  "Bank Branch": (String, ""),
};

const CoApplicantDetailsForm = {
  "Co Applicant Name": (String, ""),
  "Date of birth": (String, ""),
  Gender: { id: 1, title_name: "Mr." },
  "Phone Number": (String, ""),
  "Email Address": (String, ""),
  "PAN Number": (String, ""),
  "Account Name": (String, ""),
  "Account Number": (String, ""),
  "Confirm Account Number": (String, ""),
  "IFSC Code": (String, ""),
  "Bank Name": (String, ""),
  "Bank Branch": (String, ""),
  "Nominee Name": (String, ""),
  Relationship: { id: 1, title_name: "Mother" },
};

const initialEnrollmentDetails = {
  basicDetails: _.cloneDeep(BasicDetailsForm),
  contactDetails: _.cloneDeep(ContactDetailsForm),
  bankDetails: _.cloneDeep(BankDetailsForm),
  coApplicantDetails: _.cloneDeep(CoApplicantDetailsForm),
};

const EnrollUser = () => {
  const navigations = [
    "Applicant Details",
    "Contact Details",
    "Bank Details",
    "Co-Applicant Details",
    "Preview",
  ];

  const PageTitles = [
    "Primary Applicant | Basic Details",
    "Primary Applicant | Contact Details",
    "Primary Applicant | Bank Details",
    "Co Applicant Details",
    "Preview",
  ];

  const totalPages = navigations.length;
  const [isPageDirty, setIsPageDirty] = useState(true);
  const [pageError, setPageError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [canNavigate, setCanNavigate] = useState(false);
  const [enrollmentDetails, setEnrollmentDetails] = useState(
    initialEnrollmentDetails
  );
  const [personalDetails, updatePersonalDetails] = useState(
    initialEnrollmentDetails.basicDetails
  );
  const [contactDetails, updateContactDetails] = useState(
    initialEnrollmentDetails.contactDetails
  );
  const [bankDetails, updateBankDetails] = useState(
    initialEnrollmentDetails.bankDetails
  );
  const [coApplicantDetails, updateCoApplicantDetails] = useState(
    initialEnrollmentDetails.coApplicantDetails
  );
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [isPANConsent, setIsPANConsent] = useState(false);
  const [isGSTConsent, setIsGSTConsent] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const { loggedInUser } = useMasters();
  const {
    enrollmentError,
    enrollmentLoading,
    enrollmentMasterData,
    getLocationDetails,
  } = useEnrollment(loggedInUser?.distributor_id);

  useEffect(() => {
    if (enrollmentError) {
      WishToaster({ toastMessage: enrollmentError });
    }
  }, [enrollmentError]);

  const NavigationBar = () => {
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
                onClick={() => {
                  if (canNavigate) {
                    validatePage(index);
                  }
                }}
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

  const handlePageLoad = (pageIndex) => {
    switch (pageIndex) {
      case 0:
        break;

      default:
        break;
    }
  };

  const ErrorSection = () => {
    if (pageError) {
      return (
        <>
          <hr />
          <div className="text-danger">{pageError}</div>
          <small>
            <em>Correct the above error(s) to proceed further</em>
          </small>
        </>
      );
    }

    return <></>;
  };

  const validatePage = (navigateToPage = -1) => {
    let pageIsValid = true;

    if (isPageDirty) {
      switch (currentPage) {
        case 0:
          pageIsValid =
            pageIsValid &&
            ValidationUtils.isEmpty(
              personalDetails["First Name"],
              "Please enter your first name",
              setPageError
            );

          pageIsValid =
            pageIsValid &&
            ValidationUtils.isEmpty(
              personalDetails["Last Name"],
              "Please enter your last name",
              setPageError
            );

          pageIsValid =
            pageIsValid &&
            ValidationUtils.validateDOB(
              personalDetails["Date of birth"],
              "Please enter date of birth",
              setPageError
            );

          pageIsValid =
            pageIsValid &&
            (!ValidationUtils.isEmpty(
              personalDetails["Aadhar Number"],
              "Kindly enter a valid Aadhar Number",
              () => {}
            ) ||
              ValidationUtils.isValid(
                personalDetails["Aadhar Number"],
                "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$",
                "Kindly enter a valid Aadhar Number",
                setPageError
              ));

          pageIsValid =
            pageIsValid &&
            (!ValidationUtils.isEmpty(
              personalDetails["PAN Number"],
              "Kindly enter a valid PAN Number",
              () => {}
            ) ||
              ValidationUtils.isValid(
                personalDetails["PAN Number"],
                "[A-Z]{5}[0-9]{4}[A-Z]{1}",
                "Kindly enter a valid PAN Number",
                setPageError
              ));

          pageIsValid =
            pageIsValid &&
            (!ValidationUtils.isEmpty(
              personalDetails["GST Number"],
              "Kindly enter a valid GST Number",
              () => {}
            ) ||
              ValidationUtils.isValid(
                personalDetails["GST Number"],
                "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
                "Kindly enter a valid GST Number",
                setPageError
              ));

          if (
            (pageIsValid &&
              !ValidationUtils.isEmpty(
                personalDetails["PAN Number"],
                "",
                null
              ) &&
              !isPANConsent) ||
            (pageIsValid &&
              !ValidationUtils.isEmpty(
                personalDetails["GST Number"],
                "",
                null
              ) &&
              !isGSTConsent)
          ) {
            setIsPANConsent(personalDetails["PAN Consent"]);
            setIsGSTConsent(personalDetails["GST Consent"]);
            setShowConsentDialog(true);
            pageIsValid = false;
          }

          if (pageIsValid) {
            contactDetails[
              "Full Name"
            ] = `${personalDetails["First Name"]} ${personalDetails["Last Name"]}`;
            bankDetails[
              "Account Holder"
            ] = `${personalDetails["First Name"]} ${personalDetails["Last Name"]}`;
          }

          break;

        case 1:
          pageIsValid =
            pageIsValid &&
            ValidationUtils.isEmpty(
              contactDetails["Phone Number"],
              "Kindly enter a valid Mobile Number",
              setPageError
            ) &&
            ValidationUtils.isValid(
              contactDetails["Phone Number"],
              "^[0-9]{10}$",
              "Kindly enter a valid Mobile Number",
              setPageError
            );

          pageIsValid =
            pageIsValid &&
            ValidationUtils.isEmpty(
              contactDetails["Email Address"],
              "Kindly enter a valid Email Address",
              setPageError
            ) &&
            ValidationUtils.isValid(
              contactDetails["Email Address"],
              "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
              "Kindly enter a valid Email Address",
              setPageError
            );

          pageIsValid =
            pageIsValid &&
            ValidationUtils.isEmpty(
              contactDetails["Address Line 1"],
              "Kindly enter a valid address in Address Line 1",
              setPageError
            );

          pageIsValid =
            pageIsValid &&
            ValidationUtils.isEmpty(
              contactDetails.Pincode,
              "Kindly enter a valid Pincode",
              setPageError
            ) &&
            ValidationUtils.isValid(
              contactDetails.Pincode,
              "^[1-9]{1}[0-9]{5}$",
              "Kindly enter a valid Pincode",
              setPageError
            );

          if (contactDetails.SameCA === false) {
            pageIsValid =
              pageIsValid &&
              !ValidationUtils.isEmpty(
                contactDetails["CA Address Line 1"],
                "Kindly enter a valid address in Communication Address Line 1",
                setPageError
              );

            pageIsValid =
              pageIsValid &&
              ValidationUtils.isEmpty(
                contactDetails.CAPincode,
                "Kindly enter a valid Pincode",
                setPageError
              ) &&
              ValidationUtils.isValid(
                contactDetails.CAPincode,
                "^[1-9]{1}[0-9]{5}$",
                "Kindly enter a valid Communication Address Pincode",
                setPageError
              );
          }

          break;

        case 2:
          pageIsValid =
            pageIsValid &&
            ValidationUtils.isEmpty(
              bankDetails["Account Holder"],
              "Kindly enter a valid account name holder",
              setPageError
            );

          pageIsValid =
            pageIsValid &&
            ValidationUtils.isEmpty(
              bankDetails["Account Number"],
              "Kindly enter a valid account number",
              setPageError
            );

          pageIsValid =
            pageIsValid &&
            ValidationUtils.isEmpty(
              bankDetails["Confirm Account Number"],
              "Kindly enter the same account number",
              setPageError
            ) &&
            ValidationUtils.isSame(
              bankDetails["Account Number"],
              bankDetails["Confirm Account Number"],
              "Kindly enter the same account number",
              setPageError
            );

          pageIsValid =
            pageIsValid &&
            ValidationUtils.isEmpty(
              bankDetails["IFSC Code"],
              "Kindly enter a valid IFSC Code",
              setPageError
            ) &&
            ValidationUtils.isValid(
              bankDetails["IFSC Code"],
              "^[A-Z]{4}0[A-Z0-9]{6}$",
              "Kindly enter a valid IFSC Code",
              setPageError
            );

          break;

        case 3:
          pageIsValid = true;
          break;

        case 4:
          pageIsValid = true;
          break;

        default:
          pageIsValid = true;
          break;
      }
    }

    if (pageIsValid === true && navigateToPage > -1) {
      setPageError(null);
      setCurrentPage(navigateToPage);
    }
  };

  const BasicDetailsPage = () => {
    return (
      <div
        onChange={() => {
          setIsPageDirty(true);
        }}
      >
        <WishSelect
          data={enrollmentMasterData?.titles}
          label="Title"
          initialValue={personalDetails.Title.id}
          onSelect={(newValue) => {
            personalDetails.Title.id = newValue;
            personalDetails.Title.title_name =
              enrollmentMasterData?.titles[newValue - 1].title_name;
          }}
        />
        <WishSingleLineText
          label="First Name"
          initialValue={personalDetails["First Name"]}
          onChange={(newValue) => {
            personalDetails["First Name"] = newValue;
          }}
        />
        <WishSingleLineText
          label="Last Name"
          initialValue={personalDetails["Last Name"]}
          onChange={(newValue) => {
            personalDetails["Last Name"] = newValue;
          }}
        />
        <WishDateControl
          label="Date of birth"
          initialValue={personalDetails["Date of birth"]}
          onChange={(newValue) => {
            personalDetails["Date of birth"] = newValue;
          }}
        />
        <WishSelect
          data={enrollmentMasterData?.languages}
          label="Language"
          initialValue={personalDetails.Language.id}
          onSelect={(newValue) => {
            personalDetails.Language.id = newValue;
            personalDetails.Language.title_name =
              enrollmentMasterData?.languages[newValue - 1].title_name;
          }}
        />
        <WishSelect
          data={enrollmentMasterData?.gender}
          label="Gender"
          initialValue={personalDetails.Gender.id}
          onSelect={(newValue) => {
            personalDetails.Gender.id = newValue;
            personalDetails.Gender.title_name =
              enrollmentMasterData?.gender[newValue - 1].title_name;
          }}
        />
        <WishSelect
          data={enrollmentMasterData?.marital_status}
          label="Marital Status"
          initialValue={personalDetails["Marital Status"].id}
          onSelect={(newValue) => {
            personalDetails["Marital Status"].id = newValue;
            personalDetails["Marital Status"].title_name =
              enrollmentMasterData?.marital_status[newValue - 1].title_name;
          }}
        />
        <WishSelect
          data={enrollmentMasterData?.profession}
          label="Profession"
          initialValue={personalDetails.Profession.id}
          onSelect={(newValue) => {
            personalDetails.Profession.id = newValue;
            personalDetails.Profession.title_name =
              enrollmentMasterData?.profession[newValue - 1].title_name;
          }}
        />
        <WishSelect
          data={enrollmentMasterData?.monthly_income}
          label="Monthly Income"
          initialValue={personalDetails["Monthly Income"].id}
          onSelect={(newValue) => {
            personalDetails["Monthly Income"].id = newValue;
            personalDetails["Monthly Income"].title_name =
              enrollmentMasterData?.monthly_income[newValue - 1].title_name;
          }}
        />
        <WishSingleLineText
          label="Aadhar Number (optional)"
          initialValue={personalDetails["Aadhar Number"]}
          onChange={(newValue) => {
            personalDetails["Aadhar Number"] = newValue;
          }}
        />
        <WishFileControl
          filter="image/png, image/jpg, image/jpeg"
          label="Aadhar Document (attachment)"
          initialValue={personalDetails["Aadhar Document"].filename}
          onChange={(fileName, fileObject) => {
            personalDetails["Aadhar Document"] = {
              filename: fileName,
              file: fileObject,
            };
          }}
        />
        <WishSingleLineText
          label="PAN Number (optional)"
          initialValue={personalDetails["PAN Number"]}
          onChange={(newValue) => {
            personalDetails["PAN Number"] = newValue;
          }}
        />
        <WishFileControl
          filter="image/png, image/jpg, image/jpeg"
          label="PAN Document (attachment)"
          initialValue={personalDetails["PAN Document"].filename}
          onChange={(fileName, fileObject) => {
            personalDetails["PAN Document"] = {
              filename: fileName,
              file: fileObject,
            };
          }}
        />
        <WishSingleLineText
          label="GST Number (optional)"
          initialValue={personalDetails["GST Number"]}
          onChange={(newValue) => {
            personalDetails["GST Number"] = newValue;
          }}
        />
        <ErrorSection />
      </div>
    );
  };
  const ContactDetailsPage = () => {
    return (
      <div
        onChange={() => {
          setIsPageDirty(true);
        }}
      >
        <WishSingleLineText
          label="Full Name"
          readonly
          initialValue={contactDetails["Full Name"]}
        />
        <WishSingleLineText
          label="Mobile Number"
          initialValue={contactDetails["Phone Number"]}
          onChange={(newValue) => {
            contactDetails["Phone Number"] = newValue;
          }}
        />
        <WishSingleLineText
          label="Email Address"
          initialValue={contactDetails["Email Address"]}
          onChange={(newValue) => {
            contactDetails["Email Address"] = newValue;
          }}
        />
        <WishFormSection title="Permanent Address" />
        <WishSingleLineText
          label="Address Line 1"
          initialValue={contactDetails["Address Line 1"]}
          onChange={(newValue) => {
            contactDetails["Address Line 1"] = newValue;
          }}
        />
        <WishSingleLineText
          label="Address Line 2"
          initialValue={contactDetails["Address Line 2"]}
          onChange={(newValue) => {
            contactDetails["Address Line 2"] = newValue;
          }}
        />
        <WishSingleLineText
          label="Pincode"
          placeholder="City, District, State, Country"
          onBlurred={(value) => {
            if (value.trim() !== "") {
              getLocationDetails(value, (locationDetails) => {
                const firstLocation = locationDetails?.[0];
                contactDetails[
                  "Location Details"
                ] = `${firstLocation.city_name}, ${firstLocation.district_name}, ${firstLocation.state_name}, ${firstLocation.country_name}`;
                contactDetails["Postal Code List"] = locationDetails;
              });
            } else {
              contactDetails["Location Details"] = "";
              contactDetails["Postal Code List"] = [];
            }
          }}
          initialValue={contactDetails.Pincode}
          onChange={(newValue) => {
            contactDetails.Pincode = newValue;
          }}
        />
        <WishSingleLineText
          label="Location details"
          readonly={true}
          initialValue={contactDetails["Location Details"]}
        />
        <WishFormSection
          title={
            <WishFlexBox>
              <span>Communications Address</span>
              <WishCheckBox
                label="Same as Permanent Address"
                initialValue={contactDetails.SameCA}
                onChange={(newValue) => {
                  updateContactDetails({ ...contactDetails, SameCA: newValue });
                }}
              />
            </WishFlexBox>
          }
        />
        {contactDetails.SameCA === true ? (
          <></>
        ) : (
          <>
            <WishSingleLineText label="Address Line 1" id="caLine1" />
            <WishSingleLineText label="Address Line 2" id="caLine2" />
            <WishSingleLineText
              id="caPincode"
              label="Pincode"
              onBlurred={(value) => {
                if (value.trim()) {
                  getLocationDetails(value, (locationDetails) => {
                    console.log(locationDetails);
                  });
                }
              }}
            />
          </>
        )}
        <ErrorSection />
      </div>
    );
  };
  const BankDetailsPage = () => {
    return (
      <div
        onChange={() => {
          setIsPageDirty(true);
        }}
      >
        <WishSingleLineText
          label="Account Holder"
          initialValue={bankDetails["Account Holder"]}
          onChange={(newValue) => {
            bankDetails["Account Holder"] = newValue;
          }}
        />
        <WishSingleLineText
          label="Account Number"
          initialValue={bankDetails["Account Number"]}
          onChange={(newValue) => {
            bankDetails["Account Number"] = newValue;
          }}
        />
        <WishSingleLineText
          label="Confirm Account Number"
          initialValue={bankDetails["Confirm Account Number"]}
          onChange={(newValue) => {
            bankDetails["Confirm Account Number"] = newValue;
          }}
        />
        <WishSingleLineText
          label="IFSC Code"
          initialValue={bankDetails["IFSC Code"]}
          onChange={(newValue) => {
            bankDetails["IFSC Code"] = newValue;
          }}
          onBlurred={(ifscCode) => {
            // Fetch Bank Details
          }}
        />
        <WishSingleLineText
          label="Bank Name"
          readonly
          initialValue={bankDetails["Bank Name"]}
        />
        <WishSingleLineText
          label="Bank Branch"
          readonly
          initialValue={bankDetails["Bank Branch"]}
        />
        <WishFileControl label="Bank (proof of address)" />
        <ErrorSection />
      </div>
    );
  };
  const CoApplicantDetailsPage = () => {
    return (
      <div
        onChange={() => {
          setIsPageDirty(true);
        }}
      >
        <WishSingleLineText
          label="Co Applicant Name"
          initialValue={coApplicantDetails["Co Applicant Name"]}
          onChange={(newValue) => {
            bankDetails["Co Applicant Name"] = newValue;
          }}
        />
        <WishDateControl
          label="Date of birth"
          id="caDOB"
          initialValue={coApplicantDetails["Date of birth"]}
          onChange={(newValue) => {
            bankDetails["Date of birth"] = newValue;
          }}
        />
        <WishSelect
          data={enrollmentMasterData?.gender}
          label="Gender"
          id="caGender"
          initialValue={coApplicantDetails.Gender.id}
          onSelect={(newValue) => {
            coApplicantDetails.Gender.id = newValue;
            coApplicantDetails.Gender.title_name =
              enrollmentMasterData?.gender[newValue - 1].title_name;
          }}
        />
        <WishSingleLineText
          label="Mobile Number"
          id="caMobile"
          initialValue={coApplicantDetails["Phone Number"]}
          onChange={(newValue) => {
            bankDetails["Phone Number"] = newValue;
          }}
        />
        <WishSingleLineText
          label="Email Address"
          id="caEmail"
          initialValue={coApplicantDetails["Email Address"]}
          onChange={(newValue) => {
            bankDetails["Email Address"] = newValue;
          }}
        />
        <WishSingleLineText
          label="PAN Number"
          id="caPan"
          initialValue={coApplicantDetails["PAN Number"]}
          onChange={(newValue) => {
            bankDetails["PAN Number"] = newValue;
          }}
        />
        <WishFileControl label="PAN Document (attachment)" id="caPANDoc" />
        <WishSingleLineText
          label="Account Name"
          id="caAccName"
          initialValue={coApplicantDetails["Account Name"]}
          onChange={(newValue) => {
            bankDetails["Account Name"] = newValue;
          }}
        />
        <WishSingleLineText
          label="Account Number"
          id="caAccNumber"
          initialValue={coApplicantDetails["Account Number"]}
          onChange={(newValue) => {
            bankDetails["Account Number"] = newValue;
          }}
        />
        <WishSingleLineText
          label="Confirm Account Number"
          id="caConfirmAccNumber"
          initialValue={coApplicantDetails["Confirm Account Number"]}
          onChange={(newValue) => {
            bankDetails["Confirm Account Number"] = newValue;
          }}
        />
        <WishSingleLineText
          label="IFSC Code"
          id="caIFSC"
          initialValue={coApplicantDetails["IFSC Code"]}
          onChange={(newValue) => {
            bankDetails["IFSC Code"] = newValue;
          }}
        />
        <WishSingleLineText
          label="Bank Name"
          readonly
          id="caBankName"
          initialValue={coApplicantDetails["Bank Name"]}
        />
        <WishSingleLineText
          label="Bank Branch"
          readonly
          id="caBankBranch"
          initialValue={coApplicantDetails["Bank Branch"]}
        />
        <WishFileControl label="Bank (proof of address)" id="caBankDoc" />
        <WishSingleLineText
          label="Nominee Name"
          id="caNomineeName"
          initialValue={coApplicantDetails["Nominee Name"]}
          onChange={(newValue) => {
            bankDetails["Nominee Name"] = newValue;
          }}
        />
        <WishSelect
          label="Nominee Relationship"
          data={enrollmentMasterData.relationship}
          initialValue={coApplicantDetails.Relationship.id}
          onSelect={(newValue) => {
            coApplicantDetails.Relationship.id = newValue;
            coApplicantDetails.Relationship.title_name =
              enrollmentMasterData?.relationship[newValue - 1].title_name;
          }}
        />
        <ErrorSection />
      </div>
    );
  };
  const PreviewPage = () => {
    return (
      <div className="row">
        <div className="col-sm-6">
          <WishPreviewSection
            title={PageTitles[0]}
            data={enrollmentDetails.personalDetails}
          />
        </div>
        <div className="col-sm-6">
          <WishPreviewSection title={PageTitles[1]} />
        </div>
        <div className="col-sm-6">
          <WishPreviewSection title={PageTitles[2]} />
        </div>
        <div className="col-sm-6">
          <WishPreviewSection title={PageTitles[3]} />
        </div>
      </div>
    );
  };

  const ConsentDialog = ({ show }) => {
    return (
      <WishDialog
        show={show}
        id="dlgConsent"
        size="modal-xl"
        title="You are seeing this because"
        onClose={(isSaveClicked) => {
          if (isSaveClicked) {
            personalDetails["PAN Consent"] = isPANConsent;
            personalDetails["GST Consent"] = isGSTConsent;
            validatePage();
          } else {
            setIsPANConsent(personalDetails["PAN Consent"]);
            setIsGSTConsent(personalDetails["GST Consent"]);
          }

          setShowConsentDialog(false);
        }}
      >
        <WishColoredBar bgcolor="danger">
          You did not provide PAN Card / GST details. Please provide your
          consent for non-provision of PAN Card / GST Number
        </WishColoredBar>
        <div className="form-group row">
          <div className="col-12 pb-2">
            <h5>PAN Card Consent</h5>
            <WishCheckBox
              id="pan_declaration"
              label={PAN_DECLARATION}
              initialValue={isPANConsent}
              onChange={(value) => {
                setIsPANConsent(value);
              }}
            />
          </div>
          <div className="col-12">
            <hr />
          </div>

          <div className="col-12 pb-2">
            <h5>GST Number Consent</h5>
            <WishCheckBox
              id="gst_declaration"
              label={GST_DECLARATION}
              initialValue={isGSTConsent}
              onChange={(value) => {
                setIsGSTConsent(value);
              }}
            />
          </div>
          <div className="col-12">
            <hr />
          </div>
        </div>
      </WishDialog>
    );
  };

  return (
    <PageLayout {...pageConfig.enrollUser}>
      <NavigationBar />
      <WishCarousel
        selectedPageIndex={currentPage}
        nextLinkTitle="PROCEED"
        showArrows
        onNextClicked={() => {
          if (!canNavigate) setCanNavigate(true);
          validatePage(currentPage + 1);
        }}
        onPreviousClicked={() => {
          if (!canNavigate) setCanNavigate(true);
          validatePage(currentPage - 1);
        }}
        title={<h5>{PageTitles[currentPage]}</h5>}
        onPageLoad={handlePageLoad}
      >
        {enrollmentLoading ? <LoadingNote /> : <BasicDetailsPage />}
        {enrollmentLoading ? <LoadingNote /> : <ContactDetailsPage />}
        {enrollmentLoading ? <LoadingNote /> : <BankDetailsPage />}
        {enrollmentLoading ? <LoadingNote /> : <CoApplicantDetailsPage />}
        {enrollmentLoading ? <LoadingNote /> : <PreviewPage />}
      </WishCarousel>
      <ConsentDialog show={showConsentDialog} />
    </PageLayout>
  );
};

export default EnrollUser;
