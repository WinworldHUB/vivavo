import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LoadingNote from "../../components/LoadingNote";
import PageLayout from "../../components/PageLayout";
import WishFlexBox from "../../components/WishFlexBox";
import WishSingleLineText from "../../components/WishFormComponents/WishSingleLineText";
import WishSimpleCard from "../../components/WishSimpleCard";
import WishToaster from "../../components/WishToaster";
import useAuthentication from "../../services/useAuthentication";
import useMasters from "../../services/useMasters";

const Settings = () => {
  const { loggedInUser } = useMasters();
  const { error, processing, changePassword } = useAuthentication();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setError] = useState(null);

  useEffect(() => {
    if (loggedInUser?.name === "") {
      setError("Please login to continue");
    }
  }, []);

  useEffect(() => {
    setError(error);
  }, [error]);

  useEffect(() => {
    if (errorMessage && errorMessage !== "") {
      WishToaster({ toastMessage: errorMessage });
    }
  }, [errorMessage]);

  const header = function () {
    return <h5>Change Password</h5>;
  };

  const doChangePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (currentPassword.trim() === "") {
      setError("Please provide current password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    changePassword(
      {
        user_name: loggedInUser?.distributor_id,
        user_type: 1,
        old_password: currentPassword,
        new_password: newPassword,
      },
      (response) => {
        WishToaster({
          toastMessage: "Password successfully updated",
          toastType: "success",
        });
        setError(null);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    );
  };

  const body = function () {
    return (
      <>
        <WishSingleLineText
          label="Current Password"
          initialValue={currentPassword}
          onChange={setCurrentPassword}
          passwordField
        />
        <WishSingleLineText
          label="New Password"
          initialValue={newPassword}
          onChange={setNewPassword}
          passwordField
        />
        <WishSingleLineText
          label="Confirm Password"
          initialValue={confirmPassword}
          passwordField
          onChange={setConfirmPassword}
          onBlurred={() => {
            if (confirmPassword !== newPassword) {
              setError("Passwords do not match!");
            } else {
              setError(null);
            }
          }}
        />
      </>
    );
  };

  const footer = function () {
    return (
      <>
        <button
          className="btn btn-primary"
          disabled={processing}
          onClick={doChangePassword}
        >
          {processing ? <LoadingNote /> : "Update"}
        </button>
        <p className="text-right text-danger">{errorMessage}</p>
      </>
    );
  };

  return (
    <PageLayout pageTitle="Settings">
      <section className="row">
        <div className="col-12">
          <WishSimpleCard
            header={header()}
            body={body()}
            footer={footer()}
          ></WishSimpleCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default Settings;
