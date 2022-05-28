import React from "react";
import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";

export default function Settings() {
  const header = function () {
    return <h5>Change Password</h5>;
  };

  const body = function () {
    return (
      <>
        <div className="form-group row">
          <label for="txtCurrentPassword" className="col-sm-4 col-form-label">
            Current Password
          </label>
          <div className="col-sm-8">
            <input
              id="txtCurrentPassword"
              name="txtCurrentPassword"
              type="password"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label for="txtNewPassword" className="col-sm-4 col-form-label">
            New Password
          </label>
          <div className="col-sm-8">
            <input
              id="txtNewPassword"
              name="txtNewPassword"
              type="password"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <label for="txtConfirmPassword" className="col-sm-4 col-form-label">
            Confirm Password
          </label>
          <div className="col-sm-8">
            <input
              id="txtConfirmPassword"
              name="txtConfirmPassword"
              type="password"
              className="form-control"
            />
          </div>
        </div>
      </>
    );
  };

  const footer = function () {
    return <button className="btn btn-primary">Update</button>;
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
}
