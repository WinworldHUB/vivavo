import { useState, useEffect, useRef } from "react";
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
import { AppUtils } from "../../services/AppUtils";
import { ValidationUtils } from "../../services/ValidationUtils";

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
  "Aadhar Document": (String, ""),
  "PAN Number": (String, ""),
  "PAN Document": (String, ""),
  "GST Number": (String, ""),
};

const initialEnrollmentDetails = {
  basicDetails: _.cloneDeep(BasicDetailsForm),
  contactDetails: _.cloneDeep(ContactDetails),
  bankDetails: _.cloneDeep(BankDetails),
  coApplicantDetails: _.cloneDeep(CoAppDetails),
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
  const [isSameAddress, setIsSameAddress] = useState(true);
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

  useEffect(() => {
    if (personalDetails) {
      setEnrollmentDetails({
        ...enrollmentDetails,
        basicDetails: personalDetails,
      });
      console.log(personalDetails);
    }
  }, [personalDetails]);

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

          break;

        case 1:
          pageIsValid = true;
          break;

        case 2:
          pageIsValid = true;
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
            //personalDetails["First Name"] = newValue;
            updatePersonalDetails({
              ...personalDetails,
              ["First Name"]: newValue,
            });
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
          label="Aadhar Document (attachment)"
          initialValue={personalDetails["Aadhar Document"]}
          onChange={(fileName, fileObject) => {
            personalDetails["Aadhar Document"] = fileName;
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
          initialValue={personalDetails["PAN Document"]}
          onChange={(fileName, fileObject) => {
            personalDetails["PAN Document"] = fileName;
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
        <WishSingleLineText label="Full Name" readonly />
        <WishSingleLineText label="Mobile Number" />
        <WishSingleLineText label="Email Address" />
        <WishFormSection title="Permanent Address" />
        <WishSingleLineText label="Address Line 1" />
        <WishSingleLineText label="Address Line 2" />
        <WishSingleLineText
          label="Pincode"
          onBlurred={(value) => {
            if (value.trim()) {
              getLocationDetails(value, (locationDetails) => {
                console.log(locationDetails);
              });
            }
          }}
        />
        <WishFormSection
          title={
            <WishFlexBox>
              <span>Communications Address</span>
              <WishCheckBox
                label="Same as Permanent Address"
                initialValue={isSameAddress}
                onChange={setIsSameAddress}
              />
            </WishFlexBox>
          }
        />
        {isSameAddress ? (
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
        <WishSingleLineText label="Account Holder" />
        <WishSingleLineText label="Account Number" />
        <WishSingleLineText label="Confirm Account Number" />
        <WishSingleLineText label="IFSC Code" />
        <WishSingleLineText label="Bank Name" readonly />
        <WishSingleLineText label="Bank Branch" readonly />
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
        <WishSingleLineText label="Co Applicant Name" />
        <WishDateControl label="Date of birth" id="caDOB" />
        <WishSelect
          data={enrollmentMasterData?.gender}
          label="Gender"
          id="caGender"
        />
        <WishSingleLineText label="Mobile Number" id="caMobile" />
        <WishSingleLineText label="Email Address" id="caEmail" />
        <WishSingleLineText label="PAN Number" id="caPan" />
        <WishFileControl label="PAN Document (attachment)" id="caPANDoc" />
        <WishSingleLineText label="Account Name" id="caAccName" />
        <WishSingleLineText label="Account Number" id="caAccNumber" />
        <WishSingleLineText
          label="Confirm Account Number"
          id="caConfirmAccNumber"
        />
        <WishSingleLineText label="IFSC Code" id="caIFSC" />
        <WishSingleLineText label="Bank Name" readonly id="caBankName" />
        <WishSingleLineText label="Bank Branch" readonly id="caBankBranch" />
        <WishFileControl label="Bank (proof of address)" id="caBankDoc" />
        <WishSingleLineText label="Nominee Name" id="caNomineeName" />
        <WishSelect
          label="Nominee Relationship"
          data={enrollmentMasterData.relationship}
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
      >
        {enrollmentLoading ? <LoadingNote /> : <BasicDetailsPage />}
        {enrollmentLoading ? <LoadingNote /> : <ContactDetailsPage />}
        {enrollmentLoading ? <LoadingNote /> : <BankDetailsPage />}
        {enrollmentLoading ? <LoadingNote /> : <CoApplicantDetailsPage />}
        {enrollmentLoading ? <LoadingNote /> : <PreviewPage />}
      </WishCarousel>
    </PageLayout>
  );
};

export default EnrollUser;
