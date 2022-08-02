/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishForm from "../../components/WishForm";

export default function SignIn({ clicked }) {
  const [mode, setMode] = useState(0);
  const validateLoginForm = useRef(null);
  const validateForgotPasswordForm = useRef(null);

  const navigate = useNavigate();

  function RenderLoginForm() {
    return (
      <WishForm validate={validateLoginForm}>
        <fieldset className="form-group position-relative has-icon-left">
          <input
            type="text"
            className="form-control"
            id="user-name"
            placeholder="Your Username"
            required="required"
          />
          <div className="form-control-position">
            <i className="ft-user"></i>
          </div>
          <div className="invalid-feedback text-danger">
            You must provide username to proceed.
          </div>
        </fieldset>
        <fieldset className="form-group position-relative has-icon-left">
          <input
            type="password"
            className="form-control"
            id="user-password"
            placeholder="Enter Password"
            required="required"
          />
          <div className="form-control-position">
            <i className="ft-lock"></i>
          </div>
          <div className="invalid-feedback text-danger">
            You must provide password to proceed.
          </div>
        </fieldset>
        <div className="form-group row pb-2">
          <div className="col-md-6 col-12 text-center text-sm-left">
            <div className="custom-control custom-checkbox custom-control-inline">
              <input
                name="checkbox"
                id="checkbox_0"
                type="checkbox"
                className="custom-control-input"
                value="rememberme"
              />
              <label htmlFor="checkbox_0" className="custom-control-label">
                Remember Me
              </label>
            </div>
          </div>
          <div className="col-md-6 col-12 float-sm-left text-center text-sm-right">
            <a
              className="card-link link-dotted"
              onClick={() => {
                setMode(1);
              }}
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="form-group text-center">
          <button
            type="button"
            onClick={() => {
              if (!validateLoginForm.current()) {
                navigate("/");
              }
              clicked && clicked();
            }}
            className="btn btn-success btn-block"
          >
            Sign in
          </button>
        </div>
      </WishForm>
    );
  }

  function RenderForgotPasswordForm() {
    return (
      <WishForm validate={validateForgotPasswordForm}>
        <p className="lead">
          Enter Distributor ID below to receive the password reset email
        </p>
        <fieldset className="form-group position-relative has-icon-left">
          <input
            type="text"
            className="form-control"
            id="user-name"
            placeholder="Your Username"
            required="required"
          />
          <div className="form-control-position">
            <i className="ft-user"></i>
          </div>
          <div className="invalid-feedback text-danger">
            You must provide username to proceed.
          </div>
        </fieldset>
        <div className="form-group text-center">
          <button
            type="button"
            onClick={() => {
              if (validateForgotPasswordForm.current() === false) {
                setMode(2);
              }
              clicked && clicked();
            }}
            className="btn btn-success btn-block"
          >
            Request Password Reset Email
          </button>
        </div>
        <div className="text-center">
          <a
            className="card-link link-dotted text-primary"
            onClick={() => {
              setMode(0);
            }}
          >
            Back to Sign In
          </a>
        </div>
      </WishForm>
    );
  }

  function RenderSentMailForm() {
    return (
      <div className="text-center">
        <h1>
          <i className="las la-envelope-open la-2x text-warning"></i>
        </h1>
        <h3>Check your email</h3>
        <p className="lead pb-3">
          We have sent the mail to your registered email address
        </p>
        <a
          className="card-link link-dotted text-primary"
          onClick={() => {
            setMode(0);
          }}
        >
          Back to Sign In
        </a>
      </div>
    );
  }

  const renderForm = function () {
    switch (mode) {
      case 0:
        return <RenderLoginForm />;

      case 1:
        return <RenderForgotPasswordForm />;

      case 2:
        return <RenderSentMailForm />;

      default:
        break;
    }
  };

  const renderTitle = function () {
    switch (mode) {
      case 0:
        return "DISTRIBUTOR LOGIN";

      case 1:
        return "Forgot Password";

      case 2:
        return "Email Sent";

      default:
        return "Logged In";
    }
  };

  return (
    <PageLayout isAuthentication>
      <section className="flexbox-container">
        <div className="col-12 d-flex align-items-center justify-content-center">
          <div className="col-lg-4 col-md-6 col-10 box-shadow-2 p-0">
            <div className="card border-grey border-lighten-3 px-1 py-1 m-0">
              <div className="card-header border-0">
                <div className="text-center mb-1">
                  <img
                    src="./assets/app-assets/images/ico/android-chrome-192x192.png"
                    width="100px"
                    alt="branding logo"
                  />
                </div>
                <div className="text-center">
                  <h1 className="badge badge-primary badge-lg text-uppercase">
                    Indusviva Virtual Office
                  </h1>
                  <h6 className="text-uppercase">{renderTitle()}</h6>
                </div>
              </div>
              <div className="card-content">
                <div className="card-body">{renderForm()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
