import moment from "moment";
import React from "react";
import PageLayout from "../../components/PageLayout";
import WishColoredBar from "../../components/WishColoredBar";
import WishFlexBox from "../../components/WishFlexBox";
import data from "../../data/Data.json";

export default function OrderDetails() {
  const currentOrder = data.Orders[0];

  return (
    <PageLayout
      activeSideMenu="2"
      pageTitle={"Order No.: " + currentOrder.orderNo}
    >
      <section className="card">
        <div id="invoice-template" className="card-body">
          <div id="invoice-company-details" className="row">
            <div className="col-md-6 col-sm-12 text-left text-md-left">
              <img
                src="./assets/app-assets/images/logo/logo-80x80.png"
                alt="company logo"
                className="mb-2"
                width="70"
              />
              <ul className="px-0 list-unstyled">
                <li className="text-bold-700">
                  Shipping Address: {currentOrder.customer.name}
                </li>
                <li>{currentOrder.deliveryAddress}</li>
              </ul>
            </div>
            <div className="col-md-6 col-sm-12 text-center text-md-right">
              <h2>Order#</h2>
              <p>{currentOrder.orderNo}</p>
              <p>Order Date: {moment(currentOrder.date).format("DD-MMM-YY")}</p>
              <p className="text-muted">(123) 456 789</p>
              <p className="text-muted">email@yourcompany.com</p>
            </div>
          </div>

          <div id="invoice-customer-details" className="row pt-2">
            <div className="col-12">
              <hr />
              <p className="text-muted text-bold-700">Distributor details:</p>
            </div>
            <div className="col-12 d-flex justify-content-between">
              <p className="">
                {currentOrder.otherInformation.distributor} (
                {currentOrder.otherInformation.distributorId})
              </p>
              <p>Week: {currentOrder.otherInformation.week}</p>
              <p>Delivery mode: {currentOrder.otherInformation.deliveryMode}</p>
              <p>Warehouse: {currentOrder.otherInformation.warehuose}</p>
              <p>
                {currentOrder.orderType}: {currentOrder.otherInformation.votm} (
                {currentOrder.otherInformation.votmId})
              </p>
            </div>
            <div className="col-12">
              <hr />
            </div>
            {/* <div className="col-md-6 col-sm-12 text-center text-md-right">
              <p className="text-muted">Distributor details:</p>
              <ul className="px-0 list-unstyled">
                <li className="text-bold-700">
                  {currentOrder.otherInformation.distributor} (
                  {currentOrder.otherInformation.distributorId})
                </li>
                <li>Week: {currentOrder.otherInformation.week}</li>
                <li>
                  Delivery mode: {currentOrder.otherInformation.deliveryMode}
                </li>
                <li>Warehouse: {currentOrder.otherInformation.warehuose}</li>
                <li>
                  {currentOrder.orderType}: {currentOrder.otherInformation.votm}{" "}
                  ({currentOrder.otherInformation.votmId})
                </li>
              </ul>
            </div> */}
          </div>

          <div id="invoice-items-details" className="pt-2">
            <div className="row">
              <div className="table-responsive col-sm-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item & Description</th>
                      <th className="text-right">Quantity</th>
                      <th className="text-right">PV</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrder.items.map((item, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <p>{item.name}</p>
                            <p className="text-muted">{item.description}</p>
                          </td>
                          <td className="text-right">{item.quantity}</td>
                          <td className="text-right">{item.PV}</td>
                          <td className="text-right">
                            INR.{" "}
                            {parseInt(item.unitPrice) * parseInt(item.quantity)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-md-7 col-sm-12 text-center text-md-left">
                <p className="lead">Payment Details:</p>
                <div className="row">
                  <div className="col-md-8">
                    <table className="table table-borderless table-sm">
                      <tbody>
                        <tr>
                          <td>Payment Date:</td>
                          <td className="text-right">
                            {moment(currentOrder.paymentDetails.date).format(
                              "DD-MMM-YY"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Transaction#:</td>
                          <td className="text-right">
                            {currentOrder.paymentDetails.transactionId}
                          </td>
                        </tr>
                        <tr>
                          <td>Amount Paid:</td>
                          <td className="text-right">
                            INR {currentOrder.paymentDetails.amount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-sm-12">
                <p className="lead">Order Status</p>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Order Placed On</td>
                        <td className="text-right">
                          {moment(currentOrder.paymentDetails.date).format(
                            "DD-MMM-YY"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Order Status</td>
                        <td className="text-right">{currentOrder.status}</td>
                      </tr>
                      <tr>
                        <td className="text-bold-800">Delivered On</td>
                        <td className="text-bold-800 text-right">
                          {moment(currentOrder.date).format("DD-MMM-YY")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <WishColoredBar bgcolor="success">
                  <WishFlexBox>
                    <span>
                      Order was delivered on{" "}
                      {moment(currentOrder.date).format("DD-MMM-YY")}
                    </span>
                    <button className="btn btn-primary shadow text-uppercase">
                      Download Invoice
                    </button>
                  </WishFlexBox>
                </WishColoredBar>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
