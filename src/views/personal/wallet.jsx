/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";
import { Link } from "react-router-dom";
import WishModal from "../../components/WishModal";
import WishUploadFiles from "../../components/WishUploadFiles";
import { useState } from "react";

export default function Wallet(props) {
  const [amount, setAmount] = useState(0);
  const availableBalance = 11654;
  const [withdrawError, setWithdrawError] = useState(false);

  const balanceContent = function () {
    return (
      <>
        <h5 className="white">Total Available Balance:</h5>
        <br />
        <div className="row">
          <label className="lead col">Rs. 11,654</label>
          <a className="white">
            <i className="las la-sync col-auto"></i>
          </a>
        </div>
        <div className="form-group row pt-2">
          <div className="col">
            <input
              id="txtGender"
              name="txtGender"
              className="form-control"
              type="text"
              required=""
              disabled=""
              placeholder="Enter amount"
              defaultValue={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
          <div className="col-auto">
            <button
              className="btn btn-success"
              data-toggle="modal"
              data-target="#dlgAddMoney"
            >
              Add money
            </button>
          </div>
        </div>

        <div className="form-group row pt-1">
          <div className="col-auto">
            <a
              className="text-white link"
              data-toggle="modal"
              data-target="#dlgWithdraw"
            >
              Withdraw
            </a>
          </div>
          <div className="col-auto">
            <a
              href="#"
              className="text-white link"
              data-toggle="modal"
              data-target="#dlgTransfer"
            >
              Transfer
            </a>
          </div>
        </div>
      </>
    );
  };

  const recentTransactionsHeader = function () {
    return <h3>Recent transactions</h3>;
  };

  const recentTransactionsFooter = function () {
    return (
      <Link to="/" className="btn btn-link ml-auto">
        View All <i className="las la-angle-right"></i>
      </Link>
    );
  };

  const recentTransactions = function () {
    return (
      <table className="table border-0">
        <thead>
          <tr>
            <th className="w-50">Transaction</th>
            <th>Date</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="#">Transaction 1</a>
            </td>
            <td>23-May-22</td>
            <td className="text-right">Rs. 3,000</td>
          </tr>
          <tr>
            <td>
              <a href="#">Transaction 2</a>
            </td>
            <td>23-May-22</td>
            <td className="text-right">Rs. 3,000</td>
          </tr>
          <tr>
            <td>
              <a href="#">Transaction 3</a>
            </td>
            <td>23-May-22</td>
            <td className="text-right">Rs. 3,000</td>
          </tr>
          <tr>
            <td>
              <a href="#">Transaction 4</a>
            </td>
            <td>23-May-22</td>
            <td className="text-right">Rs. 3,000</td>
          </tr>
          <tr>
            <td>
              <a href="#">Transaction 5</a>
            </td>
            <td>23-May-22</td>
            <td className="text-right">Rs. 3,000</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const validateWithdraw = function (value) {
    if (value <= availableBalance) {
      setWithdrawError(false);
    } else {
      setWithdrawError(true);
    }
  };

  return (
    <PageLayout pageTitle="Wallet">
      <section className="row">
        <div className="col-sm-5">
          <WishSimpleCard
            background="bg-primary box-shadow-3 white"
            body={balanceContent()}
          ></WishSimpleCard>
        </div>
        <div className="col-sm-7">
          <WishSimpleCard
            header={recentTransactionsHeader()}
            body={recentTransactions()}
            footer={recentTransactionsFooter()}
          ></WishSimpleCard>
        </div>
      </section>

      <WishModal
        id="dlgAddMoney"
        title="Add Money"
        noFooter
        modalSize="modal-lg"
      >
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="base-tab1"
              data-toggle="tab"
              aria-controls="tab1"
              href="#tab1"
              aria-expanded="true"
            >
              PayU
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="base-tab2"
              data-toggle="tab"
              aria-controls="tab2"
              href="#tab2"
              aria-expanded="false"
            >
              Wire Transfer
            </a>
          </li>
        </ul>
        <div className="tab-content px-1 pt-1">
          <div
            role="tabpanel"
            className="tab-pane active"
            id="tab1"
            aria-labelledby="base-tab1"
          >
            <div className="row">
              <div className="col-sm-6 offset-sm-3">
                <div className="card text-white box-shadow-3 bg-primary">
                  <div className="card-content collapse show">
                    <div className="card-header">
                      <h4 className="card-title text-white">PayU</h4>
                      <div className="heading-elements">
                        <img
                          src="./assets/app-assets/images/logo/payu-logo.png"
                          alt="VIVA Wallet"
                          width="50px"
                        />
                      </div>
                    </div>
                    <div className="card-body row">
                      <div className="col-9">
                        <h5 className="text-white">Add money:</h5>
                      </div>
                      <div className="col-3 text-right">
                        <h5 className="text-white">Rs. {amount}</h5>
                      </div>
                    </div>
                    <div className="card-footer border-top-lighten-5 text-right">
                      <a
                        href="#"
                        className="card-link text-white"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        PAY NOW
                        <i className="la la-angle-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="tab2" aria-labelledby="base-tab2">
            <div className="row">
              <div className="col-sm-6">
                <label className="pb-2 lead">
                  Upload wire transfer payment reciepts:
                </label>
                <WishUploadFiles></WishUploadFiles>
              </div>
              <div className="col-sm-6 border-sm-left pt-2 pt-sm-0 d-none d-sm-block">
                <label className="lead">Bank Account Details:</label>
                <table className="table table-borderless table-sm">
                  <tbody>
                    <tr>
                      <td>Bank Name:</td>
                      <td>AXIS Bank</td>
                    </tr>
                    <tr>
                      <td>Account Number:</td>
                      <td>26637662777276762</td>
                    </tr>
                    <tr>
                      <td>Account Type:</td>
                      <td>Current Account</td>
                    </tr>
                    <tr>
                      <td>IFSC Code:</td>
                      <td>AXIS000190290</td>
                    </tr>
                    <tr>
                      <td>Beneficiary Name:</td>
                      <td>M. Shanshudeen</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </WishModal>

      <WishModal
        id="dlgWithdraw"
        title="Withdraw money"
        finishTitle="Withdraw"
        modalSize="modal-lg"
      >
        <div className="row align-items-center">
          <div className="col-sm-6">
            <div className="row">
              <div className="col-9">
                <h5 className="">Withdrawable balance:</h5>
              </div>
              <div className="col-3 text-right">
                <h5 className="">Rs. {availableBalance}</h5>
              </div>
            </div>
            <div className="form-group row pt-2 align-items-end">
              <h5 htmlFor="txtWithdraw" className="col-5">
                Withdraw:
              </h5>
              <div className="col-7">
                <input
                  id="txtWithdraw"
                  name="txtWithdraw"
                  type="text"
                  className="form-control text-right"
                  required="required"
                  onChange={(e) => validateWithdraw(e.target.value)}
                />
                <small
                  className={
                    "error-text text-danger " +
                    (withdrawError === true ? "" : "d-none")
                  }
                >
                  Withdrawal value must be less than {availableBalance}
                </small>
              </div>
            </div>
          </div>
          <div className="col-sm-6 border-left">
            <label>
              Money will be credited to the following bank account (
              <code>your primary account</code>):
            </label>
            <table className="table table-borderless table-sm">
              <tbody>
                <tr>
                  <td>Bank Name:</td>
                  <td>AXIS Bank</td>
                </tr>
                <tr>
                  <td>Account Number:</td>
                  <td>26637662777276762</td>
                </tr>
                <tr>
                  <td>Account Type:</td>
                  <td>Current Account</td>
                </tr>
                <tr>
                  <td>IFSC Code:</td>
                  <td>AXIS000190290</td>
                </tr>
                <tr>
                  <td>Beneficiary Name:</td>
                  <td>M. Shanshudeen</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </WishModal>

      <WishModal id="dlgTransfer" title="Transfer money" finishTitle="Transfer">
        <div className="row align-items-center">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-9">
                <h5 className="">Transferrable balance:</h5>
              </div>
              <div className="col-3 text-right">
                <h5 className="">Rs. {availableBalance}</h5>
              </div>
            </div>
            <div className="form-group row pt-2 align-items-end">
              <h5 htmlFor="txtWithdraw" className="col-6">
                To Distributor:
              </h5>
              <div className="col-6">
                <div className="input-group">
                  <input
                    id="txtWithdraw"
                    name="txtWithdraw"
                    type="text"
                    className="form-control"
                    required="required"
                    defaultValue="1001"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <a className="text-success">
                        <i className="las la-check"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <small className="error-text ">M. Shamshudden</small>
              </div>
            </div>
            <div className="form-group row pt-2 align-items-end">
              <h5 htmlFor="txtWithdraw" className="col-6">
                Transfer amount:
              </h5>
              <div className="col-6">
                <input
                  id="txtWithdraw"
                  name="txtWithdraw"
                  type="text"
                  className="form-control text-right"
                  required="required"
                  onChange={(e) => validateWithdraw(e.target.value)}
                />
                <small
                  className={
                    "error-text text-danger " +
                    (withdrawError === true ? "" : "d-none")
                  }
                >
                  Transfer value must be less than {availableBalance}
                </small>
              </div>
            </div>
          </div>
          {/* <div className="col-sm-6 border-left">
            <label>
              Money will be credited to the following bank account (
              <code>your primary account</code>):
            </label>
            <table className="table table-borderless table-sm">
              <tbody>
                <tr>
                  <td>Bank Name:</td>
                  <td>AXIS Bank</td>
                </tr>
                <tr>
                  <td>Account Number:</td>
                  <td>26637662777276762</td>
                </tr>
                <tr>
                  <td>Account Type:</td>
                  <td>Current Account</td>
                </tr>
                <tr>
                  <td>IFSC Code:</td>
                  <td>AXIS000190290</td>
                </tr>
                <tr>
                  <td>Beneficiary Name:</td>
                  <td>M. Shanshudeen</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
      </WishModal>
    </PageLayout>
  );
}
