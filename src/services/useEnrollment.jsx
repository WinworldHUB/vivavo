import { useState } from "react";
import { useEffect } from "react";
import APIUtils from "./APIUtils";
import { AppUtils } from "./AppUtils";

export const PersonalDetails = {
  distributor_id: Number,
  dist_temp_id: Number,
  title_id: Number,
  first_name: (String, ""),
  second_name: (String, ""),
  dob: Date,
  language_id: Number,
  gender_id: Number,
  marital_status_id: Number,
  profession_id: Number,
  monthly_income_id: Number,
  aadhar_no: (String, ""),
  pan_no: (String, ""),
  gst_no: (String, ""),
  pan_declaration1: Boolean,
  gst_declaration1: Boolean,
  pan_declaration: Number,
  gst_declaration: Number,
  aadhar_file: File,
  aadhar_filename: (String, ""),
  pan_file: File,
  pan_filename: (String, ""),
};

export const ContactDetails = {
  distributor_id: Number,
  dist_temp_id: Number,
  email: (String, ""),
  phone: (String, ""),
  permanent_address_line1: (String, ""),
  permanent_address_line2: (String, ""),
  permanent_postalcode_id: Number,
  permanent_city_id: Number,
  permanent_district_id: Number,
  permanent_state_id: Number,
  permanent_country_id: Number,
  is_addresses_same: (Number, 0),
  communication_address_line1: (String, ""),
  communication_address_line2: (String, ""),
  communication_postalcode_id: Number,
  communication_city_id: Number,
  communication_district_id: Number,
  communication_state_id: Number,
  communication_country_id: Number,
  address_proof_file: File,
  address_proof_filename: (String, ""),
};

export const BankDetails = {
  distributor_id: Number,
  dist_temp_id: Number,
  bank_name: (String, ""),
  branch_name: (String, ""),
  ifsc: (String, ""),
  account_no: (String, ""),
  confirm_account_no: (String, ""),
  account_name: (String, ""),
  bank_id: (Number, 1),
  bank_proof_file: File,
  bank_proof_filename: (String, ""),
};

export const CoAppDetails = {
  distributor_id: Number,
  dist_temp_id: Number,
  coapplicant_name: (String, ""),
  coapplicant_phone: (String, ""),
  coapplicant_email: (String, ""),
  coapplicant_dob: Date,
  coapplicant_gender_id: Number,
  coapplicant_relationship_id: Number,
  coapplicant_pan_no: Number,
  coapplicant_bank_name: (String, ""),
  coapplicant_branch_name: (String, ""),
  coapplicant_ifsc: (String, ""),
  coapplicant_account_no: (String, ""),
  coapplicant_account_name: (String, ""),
  coapplicant_confirm_account_name: (String, ""),
  coapplicant_bank_id: Number,
  nominee: (String, ""),
  nominee_mrelationship_id: Number,
  coapp_pan_file: File,
  coapp_pan_filename: (String, ""),
  coapp_bank_proof_file: File,
  coapp_bank_proof_filename: (String, ""),
};

const useEnrollment = (distributorId) => {
  const [enrollmentMasterData, setEnrollmentMasterData] = useState(null);
  const [enrollmentError, setError] = useState(null);
  const [enrollmentLoading, setLoading] = useState(false);
  const [locationDetails, setLocationDetaills] = useState(null);
  const [pendingEnrollments, setPendingEnrollments] = useState(null);
  const [tempDistId, setTempDistId] = useState("");

  useEffect(() => {
    if (distributorId) {
      setLoading(true);
      // Load all init data here
      APIUtils.getData(
        "/enrollment/fetch-enrolment-form-master-data",
        (data) => {
          setLoading(false);
          setEnrollmentMasterData(data);
        },
        setError
      );

      APIUtils.postData(
        "/enrollment/fetch-pending-enrollee-list",
        {
          distributor_id: distributorId.distributor_id,
          section_level: null,
        },
        setPendingEnrollments,
        setError
      );
    }
  }, [distributorId]);

  useEffect(() => {
    if (enrollmentError) {
      setLoading(false);
    }
  }, [enrollmentError]);

  const getLocationDetails = (pincode, onSuccess) => {
    setLoading(true);
    APIUtils.getData(
      `/sales/location/list/${pincode}`,
      (locationDetails) => {
        setLoading(false);
        setLocationDetaills(locationDetails);
        onSuccess(locationDetails);
      },
      setError
    );
  };

  const saveEnrolleeDetails = (pageNumber, payload, onSuccess) => {
    const pages = [
      "personal-details",
      "contact-details",
      "bank-details",
      "coapp-details",
    ];

    switch (pageNumber) {
      case 0:
        payload.pan_declaration = Number(payload.pan_declaration1);
        payload.gst_declaration = Number(payload.gst_declaration1);
        break;

      default:
        break;
    }

    const formData = AppUtils.createFormData(payload);
    //alert(personalDetailsFormData.get("marital_status_id"));
    APIUtils.postFormData(
      `/enrollment/store-temp-${pages[pageNumber]}`,
      formData,
      (data) => {
        //alert(data.dist_temp_id);
        if (pageNumber === 0) {
          setTempDistId(data.dist_temp_id);
        }

        onSuccess(data);
      },
      setError
    );
  };

  const getBankBranchDetails = (ifscCode, onSuccess) => {
    APIUtils.getExternalData(
      `https://ifsc.razorpay.com/${ifscCode}`,
      (data) => {
        onSuccess(data);
      },
      setError
    );
  };

  const getCoAppRelationships = (genderId, maritialStatusId, onSuccess) => {
    APIUtils.getData(
      `/enrollment/fetch-coapp-relationships-list?gender_id=${genderId}&marital_status_id=${maritialStatusId}`,
      (data) => {
        onSuccess(data);
      },
      setError
    );
  };

  return [
    enrollmentError,
    enrollmentLoading,
    {
      enrollmentMasterData,
      getLocationDetails,
      locationDetails,
      pendingEnrollments,
      saveEnrolleeDetails,
      tempDistId,
      getBankBranchDetails,
      getCoAppRelationships,
    },
  ];
};

export default useEnrollment;
