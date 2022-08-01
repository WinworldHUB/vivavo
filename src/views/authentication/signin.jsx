/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishModal from "../../components/WishModal";

export default function SignIn({ clicked }) {
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
                  <h1 className="badge badge-primary badge-lg">
                    Indusviva Virtual Office
                  </h1>
                  <h6>DISTRIBUTOR LOGIN</h6>
                </div>
              </div>
              <div className="card-content">
                <div className="card-body">
                  <div className="form-horizontal">
                    <fieldset className="form-group position-relative has-icon-left">
                      <input
                        type="text"
                        className="form-control"
                        id="user-name"
                        placeholder="Your Username"
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
                      />
                      <div className="form-control-position">
                        <i className="ft-lock"></i>
                      </div>
                    </fieldset>
                    <div className="form-group row">
                      <div className="col-md-6 col-12 text-center text-sm-left"></div>
                      <div className="col-md-6 col-12 float-sm-left text-center text-sm-right">
                        <Link
                          className="card-link"
                          data-toggle="modal"
                          data-target="#dlgForgotPassword"
                          to=""
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                    <div className="form-group text-center">
                      <Link
                        to="/"
                        onClick={() => clicked && clicked()}
                        className="btn btn-success btn-block"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>

                {/* <p className="card-subtitle text-muted text-center font-small-3 mx-2 my-1">
                  <span>
                    Don't have an account ?
                    <Link className="card-link" to="/">
                      Sign Up
                    </Link>
                  </span>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WishModal id="dlgForgotPassword" title="Forgot Password">
        <div class="form-group row">
          <label for="txtUsername" class="col-4 col-form-label">
            Username
          </label>
          <div class="col-8">
            <input
              id="txtUsername"
              name="txtUsername"
              type="text"
              class="form-control"
              placeholder="Your Username"
            />
          </div>
        </div>
      </WishModal>
    </PageLayout>
  );
}
