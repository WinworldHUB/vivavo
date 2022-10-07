/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishForm from "../../components/WishForm";
import useAuthentication, {
  authenticationModel,
} from "../../services/useAuthentication";
import _ from "lodash";
import { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
import { EMPTY_CREDENTIALS } from "../../services/Constants";
import { maskEmail } from "react-email-mask";
import WishFlexBox from "../../components/WishFlexBox";
import useMasters from "../../services/useMasters";

const SignIn = () => {
  const masters = useMasters();
  const [mode, setMode] = useState(0);

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [userCredentials, setUserCredentials] = useState(
    _.cloneDeep(authenticationModel)
  );

  const [loginResponse, loginError, { login }] = useAuthentication();
  const [changePasswordResponse, changePasswordError, { changePassword }] =
    useAuthentication();

  const [distributor, setDistributorDetails] = useLocalStorage(
    "distributor",
    null
  );

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (loginResponse) {
      setIsProcessing(false);

      setDistributorDetails(JSON.stringify(loginResponse));
      navigate("/");
    }
  }, [loginResponse]);

  useEffect(() => {
    if (changePasswordResponse !== null) {
      setIsProcessing(false);
      if (changePasswordResponse.status === "error") {
        setErrorMessage(changePasswordResponse.message);
      } else if (changePasswordResponse.status === "success") {
        setMode(2);
      } else {
        setErrorMessage(changePasswordResponse.message);
      }
    }
  }, [changePasswordResponse]);

  useEffect(() => {
    setIsProcessing(false);
    if (loginError)
      setErrorMessage(
        loginError === {} ? "Error occurred" : JSON.stringify(loginError)
      );
    else if (changePasswordError)
      setErrorMessage(
        changePasswordError === {}
          ? "Error occurred"
          : JSON.stringify(changePasswordError)
      );
  }, [loginError, changePasswordError]);

  const DoLogin = () => {
    if (
      userCredentials.user_name.trim() !== "" &&
      userCredentials.password.trim() !== ""
    ) {
      login({
        user_name: userCredentials.user_name,
        password: userCredentials.password,
        isReadyToAuthenticate: true,
      });
      setIsProcessing(true);
    } else {
      setErrorMessage(EMPTY_CREDENTIALS);
    }
  };

  const DoChangePassword = () => {
    if (userCredentials.user_name.trim() !== "") {
      changePassword({
        user_name: userCredentials.user_name,
        user_type: 1,
      });
      setIsProcessing(true);
    } else {
      setErrorMessage(EMPTY_CREDENTIALS);
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
                    alt="Indusviva Health Sciences"
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
                {mode === 0 ? (
                  <div className="card-body">
                    <fieldset className="form-group position-relative has-icon-left">
                      <input
                        type="number"
                        className="form-control"
                        id="user-name"
                        placeholder="Your Username"
                        value={userCredentials.user_name}
                        onChange={(e) => {
                          setUserCredentials({
                            ...userCredentials,
                            user_name: e.target.value,
                          });
                        }}
                      />
                      <div className="form-control-position">
                        <i className="ft-user"></i>
                      </div>
                    </fieldset>
                    <fieldset className="form-group position-relative has-icon-left">
                      <input
                        type="password"
                        className="form-control"
                        id="user-password"
                        placeholder="Enter Password"
                        required="required"
                        value={userCredentials.password}
                        onChange={(e) => {
                          setUserCredentials({
                            ...userCredentials,
                            password: e.currentTarget.value,
                          });
                        }}
                      />
                      <div className="form-control-position">
                        <i className="ft-lock"></i>
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
                          <label
                            htmlFor="checkbox_0"
                            className="custom-control-label"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 col-12 float-sm-left text-center text-sm-right">
                        <a
                          className="card-link link-dotted"
                          onClick={() => {
                            setErrorMessage("");
                            setMode(1);
                          }}
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <div className="form-group text-center">
                      <p className="text-danger">{errorMessage}</p>
                    </div>
                    <div className="form-group text-center">
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={(e) => {
                          DoLogin();
                        }}
                        className={
                          "btn btn-block text-uppercase " +
                          (isProcessing ? " btn-secondary" : " btn-success ")
                        }
                      >
                        {isProcessing ? (
                          <WishFlexBox justifyContent="center">
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <strong>&nbsp; Processing</strong>
                          </WishFlexBox>
                        ) : (
                          <>Sign In</>
                        )}
                      </button>
                    </div>
                  </div>
                ) : mode === 1 ? (
                  <div className="card-body">
                    <p className="lead">
                      Enter Distributor ID below to receive the password reset
                      email
                    </p>
                    <fieldset className="form-group position-relative has-icon-left">
                      <input
                        type="number"
                        className="form-control"
                        id="user-name"
                        placeholder="Your Username"
                        value={userCredentials.user_name}
                        onChange={(e) => {
                          setUserCredentials({
                            ...userCredentials,
                            user_name: e.target.value,
                          });
                        }}
                      />
                      <div className="form-control-position">
                        <i className="ft-user"></i>
                      </div>
                      <div className="invalid-feedback text-danger">
                        You must provide username to proceed.
                      </div>
                    </fieldset>
                    <div className="form-group text-center">
                      <p className="text-danger">{errorMessage}</p>
                    </div>
                    <div className="form-group text-center">
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          DoChangePassword();
                        }}
                        className={
                          "btn btn-block text-uppercase " +
                          (isProcessing ? " btn-secondary" : " btn-success ")
                        }
                      >
                        {isProcessing ? (
                          <WishFlexBox justifyContent="center">
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <strong>&nbsp; Processing</strong>
                          </WishFlexBox>
                        ) : (
                          <>Request Password Reset Email</>
                        )}
                      </button>
                    </div>
                    <div className="text-center">
                      <a
                        className="card-link link-dotted text-primary"
                        onClick={() => {
                          setErrorMessage("");
                          setMode(0);
                        }}
                      >
                        Back to Sign In
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h1>
                      <i className="las la-envelope-open la-2x text-warning"></i>
                    </h1>
                    <h3>Check your email</h3>
                    <p className="lead pb-3">
                      {maskEmail(changePasswordResponse.data)}
                    </p>
                    <a
                      className="card-link link-dotted text-primary"
                      onClick={() => {
                        setErrorMessage("");
                        setMode(0);
                      }}
                    >
                      Back to Sign In
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SignIn;
