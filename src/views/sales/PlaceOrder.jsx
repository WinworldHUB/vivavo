/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";
import WishUploadFiles from "../../components/WishUploadFiles";

export default function PlaceOrder() {
  const [pageNumber, setPageNumber] = useState(0);

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
    var value = "";

    switch (pageIndex) {
      case 0:
        value = (
          <>
            <h2>New Order</h2>
            <small className="d-flex align-items-center">
              <span className="text-primary text-bold-600">
                Customer Details
              </span>
              &nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-muted">Select Products</span>&nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-muted">Shipping Details</span>&nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-muted">Make Payment</span>
            </small>
          </>
        );
        break;

      case 1:
        value = (
          <>
            <h2>New Order</h2>
            <small className="d-flex align-items-center">
              <span className="text-success">Customer Details</span>
              &nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-primary text-bold-600">
                Select Products
              </span>
              &nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-muted">Shipping Details</span>&nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-muted">Make Payment</span>
            </small>
          </>
        );
        break;

      case 2:
        value = (
          <>
            <h2>New Order</h2>
            <small className="d-flex align-items-center">
              <span className="text-success">Customer Details</span>
              &nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-success">Select Products</span>&nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-primary text-bold-600">
                Shipping Details
              </span>
              &nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-muted">Make Payment</span>
            </small>
          </>
        );
        break;

      case 3:
        value = (
          <>
            <h2>New Order</h2>
            <small className="d-flex align-items-center">
              <span className="text-success">Customer Details</span>
              &nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-success">Select Products</span>&nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-success">Shipping Details</span>&nbsp;
              <i className="las la-angle-right"></i>&nbsp;
              <span className="text-primary text-bold-600">Make Payment</span>
            </small>
          </>
        );
        break;

      default:
        break;
    }

    return value;
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
          <i className="las la-angle-left"></i> Back
        </a>
        <a
          className="card-link lead d-flex align-items-baseline text-primary ml-auto "
          onClick={() => increasePageNumber()}
        >
          Next <i className="las la-angle-right"></i>
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
                checked=""
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
                disabled="true"
                defaultValue="John Doe"
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
                  disabled="true"
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
              <label htmlFor="txtDemographicDetails">Demographic Details</label>
              <input
                id="txtDemographicDetails"
                name="txtDemographicDetails"
                placeholder="(City, State / Province, Country)"
                type="text"
                className="form-control"
                disabled="true"
                defaultValue="Udaipur, Rajasthan, India"
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
      <section className={"row"}>
        <div className="col-sm-8">
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
                      disabled="true"
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
                  <label for="txtDemographicDetails">Demographic Details</label>
                  <input
                    id="txtDemographicDetails"
                    name="txtDemographicDetails"
                    placeholder="(City, State / Province, Country)"
                    type="text"
                    className="form-control"
                    disabled="true"
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
                  <label for="txtDemographicDetails">Demographic Details</label>
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
                id="base-tab1"
                data-toggle="tab"
                aria-controls="tab1"
                href="#tab1"
                aria-expanded="true"
              >
                Indusviva Wallet
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
                Online Payment (PayU)
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="base-tab3"
                data-toggle="tab"
                aria-controls="tab3"
                href="#tab3"
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
              id="tab1"
              aria-labelledby="base-tab1"
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
                          <code>Rs. 2,500</code>
                        </p>
                      </div>
                      <div className="card-footer border-top-lighten-5 clearfix bg-gradient-x-purple-blue">
                        <a
                          href="payment-success.html"
                          className="card-link text-white float-left"
                        >
                          ADD MONEY
                        </a>
                        <a
                          href="payment-success.html"
                          className="card-link text-white float-right"
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
              id="tab2"
              aria-labelledby="base-tab2"
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
                        <a
                          href="payment-success.html"
                          className="card-link text-white"
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
              id="tab3"
              aria-labelledby="base-tab3"
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
          <div class="card pull-up bg-blue-grey bg-lighten-4">
            <div class="card-content collapse show">
              <div class="card-header">
                <p class="badge badge-lg badge-primary">
                  Order ID: VIVA07289289309
                </p>
                <p class="lead pt-1">
                  <code>Shipping To:</code> John Doe
                </p>
                <p class="lead pt-1">
                  <code>Shipping Address:</code>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,{" "}
                  <br />
                  Udaipur, Rajasthan, India
                </p>
                <p class="lead pt-1">
                  <code>Shipping Method:</code>
                  Courier
                </p>
              </div>
              <div class="card-body pt-2">
                <h5>Order Details</h5>
                <table class="border-top" width="100%">
                  <tbody>
                    <tr>
                      <td class="pt-1">Total Proucts</td>
                      <td class="pt-1 text-right">1</td>
                    </tr>
                    <tr>
                      <td class="pt-1">Total Items</td>
                      <td class="pt-1 text-right">2</td>
                    </tr>
                    <tr>
                      <td class="pt-1">Cart Total PV</td>
                      <td class="pt-1 text-right">75</td>
                    </tr>
                    <tr>
                      <td class="pt-1">Cart Total</td>
                      <td class="pt-1 text-right">9440</td>
                    </tr>
                    <tr>
                      <td class="pt-1">Discount/Cart savings</td>
                      <td class="pt-1 text-right">0</td>
                    </tr>
                    <tr>
                      <td class="pt-1">Voucher savings</td>
                      <td class="pt-1 text-right">0</td>
                    </tr>
                    <tr>
                      <td class="pt-1">Handling Charge</td>
                      <td class="pt-1 text-right">297</td>
                    </tr>
                  </tbody>
                  <tfoot class="border-top">
                    <tr>
                      <td class="pt-1">
                        <strong>Total</strong>
                      </td>
                      <td class="pt-1 text-right">
                        <strong>9737</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <h5 class="pt-3">Vouchers / Cupons applied:</h5>
                <label for="">V1223456</label>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <PageLayout activeSideMenu="2" pageTitle="Place Order">
      <WishSimpleCard
        header={pageHeader(pageNumber)}
        footer={pageFooter()}
        body={pageBody(pageNumber)}
      ></WishSimpleCard>
      {/* <WishSimpleCard
        body={page1()}
        header={pageHeader(0)}
        className={"fade"}
      ></WishSimpleCard>
      <WishSimpleCard body={page1()} header={pageHeader(1)}></WishSimpleCard>
      <WishSimpleCard body={page1()} header={pageHeader(2)}></WishSimpleCard>
      <WishSimpleCard body={page1()} header={pageHeader(3)}></WishSimpleCard> */}
    </PageLayout>
  );
}
