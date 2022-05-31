import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";
import { SalesOrder } from "./data/SalesDataModels";
import Moment from "moment";
import { useState } from "react";

export default function MyOrders() {
  const SalesOrders = [];
  const [filterDelivered, setFilerDelivered] = useState(false);
  const [filterCancelled, setFilerCancelled] = useState(false);
  const [filterReturned, setFilerReturned] = useState(false);

  var newOrder = new SalesOrder();
  newOrder.OrderNo = "OD546563564566357";
  newOrder.Items = ["iSlim", "iCoffee"];
  newOrder.Quantity = 2;
  newOrder.PV = 100;
  newOrder.Price = 2500;
  newOrder.Status = "Delivered";
  newOrder.DeliveredOn = Date();
  SalesOrders.push(newOrder);

  newOrder = new SalesOrder();
  newOrder.OrderNo = "PD546563564566357";
  newOrder.Items = ["iSlim", "iCoffee", "iGlow"];
  newOrder.Quantity = 3;
  newOrder.PV = 150;
  newOrder.Price = 3500;
  newOrder.Status = "Cancelled";
  newOrder.DeliveredOn = Date();
  SalesOrders.push(newOrder);

  const renderOrder = function (order) {
    return (
      <WishSimpleCard
        // background={
        //   order.Status === "Delivered"
        //     ? "bg-success bg-lighten-4"
        //     : order.Status === "Cancelled"
        //     ? "bg-danger bg-lighten-4"
        //     : ""
        // }
        body={
          <div className="row d-flex align-items-center">
            <div className="col-sm-2 text-center">
              <img
                src="../../assets/app-assets/images/gallery/islim-new.png"
                alt="Items"
                className="salesorder-img"
              />
            </div>
            <div className="col-sm-10">
              <div className="row">
                <div className="col-6">
                  <h6>
                    Order No:{" "}
                    <span className="text-primary">{order.OrderNo}</span>
                  </h6>
                </div>
                <div className="col-6 text-right">
                  {order.Status === "Delivered"
                    ? "Delivered on: "
                    : order.Status === "Cancelled"
                    ? "Cancelled on: "
                    : ""}
                  {Moment(order.DeliveredOn).format("ddd mm, yyyy")}
                </div>
              </div>
              <h6>
                Items:{" "}
                <span className="text-primary">
                  {order.Items.map(
                    (item, index) =>
                      item + (index < order.Items.length - 1 ? ", " : "")
                  )}
                </span>
              </h6>
              <br />
              <div className="row">
                <div className="col-4">
                  Price: <span className="text-primary">{order.Price}</span>
                </div>
                <div className="col-4 text-center">
                  Quantity:{" "}
                  <span className="text-primary">{order.Quantity}</span>
                </div>
                <div className="col-4 text-right">
                  PV: <span className="text-primary">{order.PV}</span>
                </div>
              </div>
            </div>
          </div>
        }
      ></WishSimpleCard>
    );
  };

  const sideFilters = function () {
    return (
      <div>
        <div className="border-bottom">
          <h5>Filters</h5>
        </div>
        <div className="lead pt-2">Order Status</div>
        <div className="form-group row">
          <div className="col-12">
            <div className="custom-controls-stacked pt-1">
              <div className="custom-control custom-checkbox">
                <input
                  name="checkbox"
                  id="checkbox_0"
                  type="checkbox"
                  className="custom-control-input"
                  value="Delivered"
                  checked={filterDelivered}
                  onChange={() => {
                    setFilerDelivered(!filterDelivered);
                  }}
                />
                <label htmlFor="checkbox_0" className="custom-control-label">
                  Delivered
                </label>
              </div>
            </div>
            <div className="custom-controls-stacked pt-1">
              <div className="custom-control custom-checkbox">
                <input
                  name="checkbox"
                  id="checkbox_1"
                  type="checkbox"
                  className="custom-control-input"
                  value="Cancelled"
                  checked={filterCancelled}
                  onChange={() => {
                    setFilerCancelled(!filterCancelled);
                  }}
                />
                <label htmlFor="checkbox_1" className="custom-control-label">
                  Cancelled
                </label>
              </div>
            </div>
            <div className="custom-controls-stacked pt-1">
              <div className="custom-control custom-checkbox">
                <input
                  name="checkbox"
                  id="checkbox_2"
                  type="checkbox"
                  className="custom-control-input"
                  value="Returned"
                  checked={filterReturned}
                  onChange={() => {
                    setFilerReturned(!filterReturned);
                  }}
                />
                <label htmlFor="checkbox_2" className="custom-control-label">
                  Returned
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PageLayout activeSideMenu="2" pageTitle="My Orders">
      <div className="row">
        <div className="col-sm-9">
          {SalesOrders.map((order) => {
            if (
              filterDelivered === false &&
              filterCancelled === false &&
              filterReturned === false
            ) {
              return renderOrder(order);
            } else {
              if (filterDelivered === true && order.Status === "Delivered") {
                return renderOrder(order);
              } else if (
                filterCancelled === true &&
                order.Status === "Cancelled"
              ) {
                return renderOrder(order);
              } else if (
                filterReturned === true &&
                order.Status === "Returned"
              ) {
                return renderOrder(order);
              }
            }

            return true;
          })}
        </div>
        <div className="col-sm-3">
          <WishSimpleCard
            background={"bg-light"}
            body={sideFilters()}
          ></WishSimpleCard>
        </div>
      </div>
    </PageLayout>
  );
}
