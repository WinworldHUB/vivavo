/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import WishModal from "../../components/WishModal";
import WishSimpleCard from "../../components/WishSimpleCard";
import WishUploadFiles from "../../components/WishUploadFiles";
import WishToaster from "../../components/WishToaster";
import WishColoredBar from "../../components/WishColoredBar";

export default function PlaceOrder() {
  const location = useLocation();

  const [pageNumber, setPageNumber] = useState(0);
  const [orderType, setOrderType] = useState(location.state.typeOfOrder);
  const [forSelf, setForSelf] = useState(false);
  const [validPincode, setValidPincode] = useState(0);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const amount = 11654;
  const walletBalance = 2500;
  const paymentDue = 9737;
  const mySelf = {
    Name: "John Doe",
    Address1: "Viva Tower, No.36",
    Address2: "V P Deendayal Road, Jayamahal Extension",
    City: "Bangaluru",
    State: "Karnataka",
    Country: "India",
  };

  const addresses = [
    "Postmaster 1, Post Office BENSON TOWN (SUB OFFICE)",
    "Postmaster 2, Post Office BENSON TOWN (SUB OFFICE)",
    "Postmaster 3, Post Office BENSON TOWN (SUB OFFICE)",
    "Postmaster 4, Post Office BENSON TOWN (SUB OFFICE)",
    "Postmaster 5, Post Office BENSON TOWN (SUB OFFICE)",
    "Postmaster 6, Post Office BENSON TOWN (SUB OFFICE)",
  ];

  useEffect(() => {
    $("#dlgOrderType").modal("show");
  }, [orderType]);

  const increasePageNumber = function () {
    if (pageNumber < 3) {
      setPageNumber(pageNumber + 1);
    }
  };

  const decreasePageNumber = function () {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const pageHeader = function (pageIndex) {
    return (
      <div className="row">
        <div className="col-8">
          <h2>New Order</h2>
        </div>
        <div className="col-4 text-right">
          Order Type:{" "}
          <a
            className="card-link text-primary"
            data-toggle="modal"
            data-target="#dlgOrderType"
          >
            {orderType === 0
              ? "Normal Order"
              : orderType === 1
              ? "VOTM Order"
              : orderType === 2
              ? "PCM Order"
              : "Normal Order"}
          </a>
        </div>
        <div className="col-12">
          <small className="d-flex align-items-center">
            <a
              className={
                "clickable " +
                (pageIndex === 0
                  ? "text-primary text-bold-600"
                  : pageIndex > 0
                  ? "text-success"
                  : "text-muted")
              }
              onClick={() => {
                if (pageIndex > 0) {
                  setPageNumber(0);
                }
              }}
            >
              Customer Details
            </a>
            &nbsp;
            <i className="las la-angle-right"></i>&nbsp;
            <a
              className={
                "clickable " +
                (pageIndex === 1
                  ? "text-primary text-bold-600"
                  : pageIndex > 1
                  ? "text-success"
                  : "text-muted")
              }
              onClick={() => {
                if (pageIndex > 1) {
                  setPageNumber(1);
                }
              }}
            >
              Select Products
            </a>
            &nbsp;
            <i className="las la-angle-right"></i>&nbsp;
            <a
              className={
                "clickable " +
                (pageIndex === 2
                  ? "text-primary text-bold-600"
                  : pageIndex > 2
                  ? "text-success"
                  : "text-muted")
              }
              onClick={() => {
                if (pageIndex > 2) {
                  setPageNumber(2);
                }
              }}
            >
              Shipping Details
            </a>
            &nbsp;
            <i className="las la-angle-right"></i>&nbsp;
            <a
              className={
                "clickable " +
                (pageIndex === 3
                  ? "text-primary text-bold-600"
                  : pageIndex > 3
                  ? "text-success"
                  : "text-muted")
              }
              onClick={() => {
                if (pageIndex > 3) {
                  setPageNumber(3);
                }
              }}
            >
              Make Payment
            </a>
          </small>
        </div>
      </div>
    );
  };

  const pageFooter = function () {
    return (
      <>
        <a
          className={
            "card-link lead d-flex align-items-baseline text-muted mr-auto " +
            (pageNumber === 0 ? " hidden " : "")
          }
          onClick={() => decreasePageNumber()}
        >
          <i className="las la-angle-left"></i> BACK
        </a>
        <a
          className={
            "card-link lead d-flex align-items-baseline text-primary ml-auto " +
            (pageNumber === 3 ? " hidden " : "")
          }
          onClick={() => increasePageNumber()}
        >
          PROCEED <i className="las la-angle-right"></i>
        </a>
      </>
    );
  };

  const pageBody = function (pageIndex) {
    switch (pageIndex) {
      case 0:
        return page1();

      case 1:
        return page2();

      case 2:
        return page3();

      case 3:
        return page4();

      default:
        return page1();
    }
  };

  const page1 = function () {
    return (
      <section className={"row"}>
        <div className="col-sm-8">
          <label className="h6">
            Toggle the switch to buy for self or others
          </label>
          <h4 className="card-title">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="chkSelf"
                defaultChecked={forSelf}
                onClick={() => setForSelf(!forSelf)}
              />
              <label
                className="custom-control-label"
                id="chkSelfLabel"
                htmlFor="chkSelf"
              >
                Buying for self
              </label>
            </div>
          </h4>

          <form>
            <div className="form-group">
              <label htmlFor="txtCustomerName">Customer Name</label>
              <input
                id="txtCustomerName"
                name="txtCustomerName"
                placeholder="Customer Name"
                type="text"
                className="form-control"
                disabled={forSelf}
                defaultValue={forSelf === true ? mySelf.Name : ""}
              />
            </div>
            <div className="form-group">
              <label htmlFor="txtDeliveryLocation">Delivery Location</label>
              <div className="input-group">
                <input
                  id="txtDeliveryLocation"
                  name="txtDeliveryLocation"
                  placeholder="Delivery Location"
                  type="text"
                  className="form-control"
                  disabled={forSelf}
                  defaultValue={
                    forSelf === true
                      ? mySelf.Address1 + ", " + mySelf.Address2
                      : ""
                  }
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <a data-toggle="modal" data-target="#dlgSelectLocation">
                      <i className="las la-map-marker"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="txtDemographicDetails">Demographic Details</label>
              <input
                id="txtDemographicDetails"
                name="txtDemographicDetails"
                placeholder="(City, State / Province, Country)"
                type="text"
                className="form-control"
                disabled={forSelf}
                defaultValue={
                  forSelf === true
                    ? mySelf.City + ". " + mySelf.State + ". " + mySelf.Country
                    : ""
                }
              />
            </div>
          </form>
        </div>
        <div className="col-sm-4">
          <div className="card pull-up bg-blue-grey bg-lighten-4">
            <div className="card-content collapse show">
              <div className="card-header">
                <p className="badge badge-lg badge-primary">Daily PV Limits</p>
                <p className="lead pt-1">Total Available PVs for today</p>
                <p className="lead">
                  <code>150</code>
                </p>
              </div>
              <div className="card-body pt-2">
                <h5>PV Details</h5>
                <table className="border-top" width="100%">
                  <tbody>
                    <tr>
                      <td className="pt-1 pb-1">Available Daily</td>
                      <td className="pt-1 pb-1 text-right">200</td>
                    </tr>
                    <tr>
                      <td className="pt-1 pb-1">Used Today</td>
                      <td className="pt-1 pb-1 text-right">50</td>
                    </tr>
                  </tbody>
                  <tfoot className="border-top">
                    <tr>
                      <td className="pt-1 pb-1">
                        <strong>Balance</strong>
                      </td>
                      <td className="pt-1 pb-1 text-right">
                        <strong>150</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const page2 = function () {
    return (
      <section className={"row"}>
        <div className="col-sm-8">
          <div className="card-columns">
            <div className="card text-center border-primary pull-up">
              <div className="card-content">
                <div className="card-body">
                  <img
                    src="./assets/app-assets/images/products/ipulse.png"
                    alt="element 02"
                    width="225"
                    className="mb-1 img-fluid"
                  />
                  <h3 className="card-title">iPulse</h3>
                  <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                      <button
                        title="remove"
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        <i className="las la-minus"></i>
                      </button>
                    </div>
                    <input
                      id="txtiPulseQuantity"
                      name="txtiPulseQuantity"
                      placeholder="0"
                      type="text"
                      className="form-control text-center"
                    />
                    <div className="input-group-append">
                      <button
                        title="add"
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        <i className="las la-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card text-center border-primary pull-up">
              <div className="card-content">
                <div className="card-body">
                  <img
                    src="./assets/app-assets/images/products/ipulse.png"
                    alt="element 02"
                    width="225"
                    className="mb-1 img-fluid"
                  />
                  <h3 className="card-title">iPulse</h3>
                  <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                      <button
                        title="remove"
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        <i className="las la-minus"></i>
                      </button>
                    </div>
                    <input
                      id="txtiCareQuantity"
                      name="txtiCareQuantity"
                      placeholder="0"
                      type="text"
                      className="form-control text-center"
                    />
                    <div className="input-group-append">
                      <button
                        title="add"
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        <i className="las la-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card text-center border-primary pull-up">
              <div className="card-content">
                <div className="card-body">
                  <img
                    src="./assets/app-assets/images/products/ipulse.png"
                    alt="element 02"
                    width="225"
                    className="mb-1 img-fluid"
                  />
                  <h3 className="card-title">iPulse</h3>
                  <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                      <button
                        title="remove"
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        <i className="las la-minus"></i>
                      </button>
                    </div>
                    <input
                      id="txtiGlowQuantity"
                      name="txtiGlowQuantity"
                      placeholder="0"
                      type="text"
                      className="form-control text-center"
                    />
                    <div className="input-group-append">
                      <button
                        title="add"
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        <i className="las la-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card text-center border-primary pull-up">
              <div className="card-content">
                <div className="card-body">
                  <img
                    src="./assets/app-assets/images/products/ipulse.png"
                    alt="element 02"
                    width="225"
                    className="mb-1 img-fluid"
                  />
                  <h3 className="card-title">iPulse</h3>
                  <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                      <button
                        title="remove"
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        <i className="las la-minus"></i>
                      </button>
                    </div>
                    <input
                      id="txtiCoffeeQuantity"
                      name="txtiCoffeeQuantity"
                      placeholder="0"
                      type="text"
                      className="form-control text-center"
                    />
                    <div className="input-group-append">
                      <button
                        title="add"
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        <i className="las la-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card text-center border-primary pull-up">
              <div className="card-content">
                <div className="card-body">
                  <img
                    src="./assets/app-assets/images/products/ipulse.png"
                    alt="element 02"
                    width="225"
                    className="mb-1 img-fluid"
                  />
                  <h3 className="card-title">iPulse</h3>
                  <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                      <button
                        title="remove"
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        <i className="las la-minus"></i>
                      </button>
                    </div>
                    <input
                      id="txtQuantity"
                      name="txtQuantity"
                      placeholder="0"
                      type="text"
                      className="form-control text-center"
                    />
                    <div className="input-group-append">
                      <button
                        title="remove"
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        <i className="las la-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card pull-up bg-blue-grey bg-lighten-4">
            <div className="card-content collapse show">
              <div className="card-header">
                <p className="badge badge-lg badge-primary">Order Total</p>
                <p className="lead pt-1">Total Available PVs for today</p>
                <p className="lead">
                  <code>0/150</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const page3 = function () {
    return (
      <section className="row row-eq-height">
        <div className="col-sm-8">
          <div className="row h-100 pb-0">
            <div className="col-12">
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
                    Shipping Address
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
                    Billing Address
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
                  <form>
                    <div className="form-group">
                      <label for="ddShipping">Shipping Method</label>
                      <select
                        title="Shipping Method"
                        data-placeholder="Select a Shipping Method"
                        className="select2 form-control"
                        id="ddShipping"
                      >
                        <option defaultValue="1" selected>
                          Store Pickup
                        </option>
                        <option defaultValue="2">Courier</option>
                        <option defaultValue="3">VOTM</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label for="txtCustomerName">Customer Name</label>
                      <input
                        id="txtCustomerName"
                        name="txtCustomerName"
                        placeholder="Customer Name"
                        type="text"
                        className="form-control"
                        defaultValue="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label for="txtDeliveryLocation">Delivery Location</label>
                      <div className="input-group">
                        <input
                          id="txtDeliveryLocation"
                          name="txtDeliveryLocation"
                          placeholder="Delivery Location"
                          type="text"
                          className="form-control"
                          disabled={true}
                          defaultValue="Toshani Villa, Govardhan Vilas, Near Technoy Motor Service Center, Behind Jeevantara Resort"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#dlgSelectLocation"
                            >
                              <i className="las la-map-marker"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="txtDemographicDetails">
                        Demographic Details
                      </label>
                      <input
                        id="txtDemographicDetails"
                        name="txtDemographicDetails"
                        placeholder="(City, State / Province, Country)"
                        type="text"
                        className="form-control"
                        disabled={true}
                        defaultValue="Udaipur, Rajasthan, India"
                      />
                    </div>
                  </form>
                </div>
                <div className="tab-pane" id="tab2" aria-labelledby="base-tab2">
                  <form>
                    <div className="form-group">
                      <label for="txtCustomerName">Customer Name</label>
                      <input
                        id="txtCustomerName"
                        name="txtCustomerName"
                        placeholder="Customer Name"
                        type="text"
                        className="form-control"
                        defaultValue="John Doe"
                      />
                    </div>
                    <div className="form-group">
                      <label for="txtDeliveryLocation">Billing Address</label>
                      <div className="input-group">
                        <input
                          id="txtDeliveryLocation"
                          name="txtDeliveryLocation"
                          placeholder="Delivery Location"
                          type="text"
                          className="form-control"
                          defaultValue="Toshani Villa, Govardhan Vilas, Near Technoy Motor Service Center, Behind Jeevantara Resort"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#dlgSelectLocation"
                            >
                              <i className="las la-map-marker"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="txtDemographicDetails">
                        Demographic Details
                      </label>
                      <input
                        id="txtDemographicDetails"
                        name="txtDemographicDetails"
                        placeholder="(City, State / Province, Country)"
                        type="text"
                        className="form-control"
                        defaultValue="Udaipur, Rajasthan, India"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-12">
              <WishColoredBar
                message="Delivery estimated in 7 days from"
                bgcolor="info"
              ></WishColoredBar>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card pull-up bg-blue-grey bg-lighten-4">
            <div className="card-content collapse show">
              <div className="card-header">
                <p className="badge badge-lg badge-primary">Order Total</p>
              </div>
              <div className="card-body pt-2">
                <h5>Order Details</h5>
                <table className="border-top" width="100%">
                  <tbody>
                    <tr>
                      <td className="pt-1">Total Proucts</td>
                      <td className="pt-1 text-right">1</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Total Items</td>
                      <td className="pt-1 text-right">2</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Cart Total PV</td>
                      <td className="pt-1 text-right">75</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Cart Total</td>
                      <td className="pt-1 text-right">9440</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Discount/Cart savings</td>
                      <td className="pt-1 text-right">0</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Voucher savings</td>
                      <td className="pt-1 text-right">0</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Handling Charge</td>
                      <td className="pt-1 text-right">297</td>
                    </tr>
                  </tbody>
                  <tfoot className="border-top">
                    <tr>
                      <td className="pt-1">
                        <strong>Total</strong>
                      </td>
                      <td className="pt-1 text-right">
                        <strong>9737</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <h5 className="pt-3">Apply Vouchers / Cupons</h5>
                <select
                  title="Vouchers / Cupons"
                  data-placeholder="Select a Voucher / Coupon"
                  className="select2 form-control"
                  id="ddVouchers"
                >
                  <optgroup label="Vouchers">
                    <option value="V12345" selected>
                      V122345
                    </option>
                    <option value="V123456" selected>
                      V1223456
                    </option>
                  </optgroup>
                  <optgroup label="Coupons">
                    <option value="C12345" selected>
                      C122345
                    </option>
                    <option value="C123456" selected>
                      C1223456
                    </option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const page4 = function () {
    return (
      <section className={"row"}>
        <div className="col-sm-8">
          <h4>Order Payment</h4>
          <ul className="nav nav-tabs pt-2">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="main-tab1"
                data-toggle="tab"
                aria-controls="maintab1"
                href="#maintab1"
                aria-expanded="true"
              >
                Indusviva Wallet
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="main-tab2"
                data-toggle="tab"
                aria-controls="maintab2"
                href="#maintab2"
                aria-expanded="false"
              >
                Online Payment (PayU)
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="main-tab3"
                data-toggle="tab"
                aria-controls="maintab3"
                href="#maintab3"
                aria-expanded="false"
              >
                Wire Transfer
              </a>
            </li>
          </ul>
          <div className="tab-content px-1 pt-1">
            <div
              role="tabpanel"
              className="tab-pane pt-2 active"
              id="maintab1"
              aria-labelledby="main-tab1"
            >
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card text-white box-shadow-3 bg-gradient-x-purple-blue">
                    <div className="card-content collapse show">
                      <div className="card-header bg-gradient-x-purple-blue">
                        <h4 className="card-title text-white">VivaWallet</h4>
                        <div className="heading-elements bg-transparent">
                          <img
                            src="./assets/app-assets/images/logo/logo.png"
                            alt="VIVA Wallet"
                            width="50px"
                          />
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          <label className="lead pb-2">John Doe</label>
                          <br />
                          Your wallet balance is &nbsp;
                          <code>Rs. {walletBalance}</code>
                        </p>
                      </div>
                      <div className="card-footer border-top-lighten-5 clearfix bg-gradient-x-purple-blue">
                        <a
                          className="card-link text-white float-left"
                          data-toggle="modal"
                          data-target="#dlgAddMoney"
                        >
                          ADD MONEY
                        </a>
                        <a
                          className="card-link text-white float-right"
                          onClick={() => validateWalletPayment()}
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
            <div
              className="tab-pane pt-2"
              id="maintab2"
              aria-labelledby="main-tab2"
            >
              <div className="row justify-content-center">
                <div className="col-md-8">
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
                          <h5 className="text-white">Total amount payable:</h5>
                        </div>
                        <div className="col-3 text-right">
                          <h5 className="text-white">500</h5>
                        </div>
                      </div>
                      <div className="card-footer border-top-lighten-5 text-right">
                        <Link to="/" className="card-link text-white">
                          PAY NOW
                          <i className="la la-angle-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane pt-2"
              id="maintab3"
              aria-labelledby="main-tab3"
            >
              <p>
                For wire transfer or bank transfer you can use following
                details:
              </p>
              <table className="border-top" width="100%">
                <tbody>
                  <tr>
                    <td className="pt-1" width="20%">
                      Name
                    </td>
                    <td className="pt-1">Indusviva Lifesciences Pvt. Ltd.</td>
                  </tr>
                  <tr>
                    <td className="pt-1" width="20%">
                      Bank Name
                    </td>
                    <td className="pt-1">ICICI Bank</td>
                  </tr>
                  <tr>
                    <td className="pt-1" width="20%">
                      Account#
                    </td>
                    <td className="pt-1">00000000000000</td>
                  </tr>
                  <tr>
                    <td className="pt-1" width="20%">
                      IFSC Code
                    </td>
                    <td className="pt-1">ICIC00199209</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div className="row d-flex align-items-center">
                <div className="col-sm-4">
                  <strong>Upload Receipts:</strong>
                </div>
                <div className="col-sm-8">
                  <WishUploadFiles></WishUploadFiles>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card pull-up bg-blue-grey bg-lighten-4">
            <div className="card-content collapse show">
              <div className="card-header">
                <p className="badge badge-lg badge-primary">
                  Order ID: VIVA07289289309
                </p>
                <p className="lead pt-1">
                  <code>Shipping To:</code> John Doe
                </p>
                <p className="lead pt-1">
                  <code>Shipping Address:</code>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
                  <br />
                  Udaipur, Rajasthan, India
                </p>
                <p className="lead pt-1">
                  <code>Shipping Method:</code>
                  Courier
                </p>
              </div>
              <div className="card-body pt-2">
                <h5>Order Details</h5>
                <table className="border-top" width="100%">
                  <tbody>
                    <tr>
                      <td className="pt-1">Total Proucts</td>
                      <td className="pt-1 text-right">1</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Total Items</td>
                      <td className="pt-1 text-right">2</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Cart Total PV</td>
                      <td className="pt-1 text-right">75</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Cart Total</td>
                      <td className="pt-1 text-right">9440</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Discount/Cart savings</td>
                      <td className="pt-1 text-right">0</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Voucher savings</td>
                      <td className="pt-1 text-right">0</td>
                    </tr>
                    <tr>
                      <td className="pt-1">Handling Charge</td>
                      <td className="pt-1 text-right">297</td>
                    </tr>
                  </tbody>
                  <tfoot className="border-top">
                    <tr>
                      <td className="pt-1">
                        <strong>Total</strong>
                      </td>
                      <td className="pt-1 text-right">
                        <strong>9737</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <h5 className="pt-3">Vouchers / Cupons applied:</h5>
                <label for="">V1223456</label>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  /* Vaidations =======================================================================  */
  const validateWalletPayment = function () {
    if (walletBalance < paymentDue) {
      WishToaster({
        toastTitle: "Insufficient Balance",
        toastMessage:
          "Your wallet has insufficient balance to make this payment.",
      });
    } else {
      WishToaster({
        toastMessage: "Payment successfull.",
        toastType: "success",
      });
    }
  };

  const validatePincode = function (pincode) {
    if (pincode !== "") {
      const regex = new RegExp("^\\d{6}$");
      console.log(pincode + ", " + regex.test(pincode));
      setValidPincode(regex.test(pincode) === true ? 2 : 1);
    } else {
      setValidPincode(0);
      setShowSearchResults(false);
    }

    return validPincode;
  };

  const displaySearchResults = function (e) {
    e.stopPropagation();

    if (validPincode === 2) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };
  /* END: Vaidations ==================================================================  */

  return (
    <PageLayout activeSideMenu="2" pageTitle="Place Order">
      <WishSimpleCard
        header={pageHeader(pageNumber)}
        footer={pageFooter()}
        body={pageBody(pageNumber)}
      ></WishSimpleCard>
      <WishModal
        id="dlgOrderType"
        title="Select Order Type"
        finishTitle="Select"
      >
        <div className="form-group row">
          <div className="col-12 text-center">
            <div className="btn-group btn-block" id="btnOrderTypes">
              <a
                className={
                  "btn " +
                  (orderType === 0 ? "btn-primary active" : "btn-light")
                }
                aria-current="page"
                onClick={() => setOrderType(0)}
              >
                Normal
              </a>
              <a
                className={
                  "btn " +
                  (orderType === 1 ? "btn-primary active" : "btn-light")
                }
                aria-current="page"
                onClick={() => setOrderType(1)}
              >
                VOTM
              </a>
              <a
                className={
                  "btn " +
                  (orderType === 2 ? "btn-primary active" : "btn-light")
                }
                aria-current="page"
                onClick={() => setOrderType(2)}
              >
                PCM
              </a>
            </div>
          </div>
        </div>
      </WishModal>
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
      <WishModal id="dlgSelectLocation" title="Select Location">
        <div className="row">
          <div className="col-12">
            <div className="form-row">
              <div className="col-9">
                <input
                  id="txtPincode"
                  name="txtPincode"
                  type="text"
                  className="form-control"
                  placeholder="Pincode"
                  defaultValue=""
                  onChange={(e) => validatePincode(e.target.value)}
                />
                <small
                  className={
                    validPincode === 0 || validPincode === 2
                      ? "hidden"
                      : "text-danger"
                  }
                >
                  Invalid pincode
                </small>
              </div>
              <div className="col-3">
                <button
                  className="btn btn-block btn-primary"
                  onClick={(e) => displaySearchResults(e)}
                >
                  Search
                </button>
              </div>
              <div className="col-12 pt-2">
                <div
                  class={
                    "list-group file-list " +
                    (showSearchResults === true ? "" : "hidden")
                  }
                >
                  {addresses.map((address) => {
                    return (
                      <a
                        href="#"
                        class="list-group-item list-group-item-action"
                      >
                        {address}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </WishModal>
    </PageLayout>
  );
}
