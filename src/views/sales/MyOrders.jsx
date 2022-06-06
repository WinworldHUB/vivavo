import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";
import { SalesOrder } from "./data/SalesDataModels";
import Moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const SalesOrders = [];
  const [filterDelivered, setFilerDelivered] = useState(false);
  const [filterCancelled, setFilerCancelled] = useState(false);
  const [filterReturned, setFilerReturned] = useState(false);
  const [filter30Days, setFilter30Days] = useState(false);
  const [filter2021, setFilter2021] = useState(false);
  const [filter2020, setFilter2020] = useState(false);
  const [filterOlder, setFilterOlder] = useState(false);
  const [filterText, setFilterText] = useState("");

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
        background={
          order.Status === "Delivered"
            ? "bg-success soft-success"
            : order.Status === "Cancelled"
            ? "bg-danger soft-danger"
            : ""
        }
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
                    <Link to="/" className="card-link text-primary">
                      {order.OrderNo}
                    </Link>
                  </h6>
                </div>
                <div className="col-6 text-right">
                  {order.Status === "Delivered"
                    ? "Delivered on: "
                    : order.Status === "Cancelled"
                    ? "Cancelled on: "
                    : ""}
                  {Moment(order.DeliveredOn).format("ddd MM, yyyy")}
                </div>
              </div>
              <h6>
                Items:{" "}
                <span>
                  {order.Items.map(
                    (item, index) =>
                      item + (index < order.Items.length - 1 ? ", " : "")
                  )}
                </span>
              </h6>
              <br />
              <div className="row">
                <div className="col-4">
                  Price: <span>{order.Price}</span>
                </div>
                <div className="col-4 text-center">
                  Quantity: <span>{order.Quantity}</span>
                </div>
                <div className="col-4 text-right">
                  PV: <span>{order.PV}</span>
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

        <div className="lead pt-2">Order Time</div>
        <div className="form-group row">
          <div className="col-12">
            <div className="custom-controls-stacked pt-1">
              <div className="custom-control custom-checkbox">
                <input
                  name="checkbox"
                  id="checkbox_3"
                  type="checkbox"
                  className="custom-control-input"
                  value="30"
                  checked={filter30Days}
                  onChange={() => {
                    setFilter30Days(!filter30Days);
                  }}
                />
                <label htmlFor="checkbox_3" className="custom-control-label">
                  Last 30 days
                </label>
              </div>
            </div>
            <div className="custom-controls-stacked pt-1">
              <div className="custom-control custom-checkbox">
                <input
                  name="checkbox"
                  id="checkbox_4"
                  type="checkbox"
                  className="custom-control-input"
                  value="2021"
                  checked={filter2021}
                  onChange={() => {
                    setFilter2021(!filter2021);
                  }}
                />
                <label htmlFor="checkbox_4" className="custom-control-label">
                  2021
                </label>
              </div>
            </div>
            <div className="custom-controls-stacked pt-1">
              <div className="custom-control custom-checkbox">
                <input
                  name="checkbox"
                  id="checkbox_5"
                  type="checkbox"
                  className="custom-control-input"
                  value="2020"
                  checked={filter2020}
                  onChange={() => {
                    setFilter2020(!filter2020);
                  }}
                />
                <label htmlFor="checkbox_5" className="custom-control-label">
                  2020
                </label>
              </div>
            </div>
            <div className="custom-controls-stacked pt-1">
              <div className="custom-control custom-checkbox">
                <input
                  name="checkbox"
                  id="checkbox_6"
                  type="checkbox"
                  className="custom-control-input"
                  value="older"
                  checked={filterOlder}
                  onChange={() => {
                    setFilterOlder(!filterOlder);
                  }}
                />
                <label htmlFor="checkbox_6" className="custom-control-label">
                  Older
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const searchOrder = function (order) {
    if (filterText === "") {
      return filterByDate(order);
    } else {
      var pv = order.PV + "";
      var price = order.Price + "";
      var quantity = order.Quantity + "";
      var searchText = filterText;
      var itemFound = order.Items.includes(searchText);

      if (
        order.OrderNo.toLowerCase().includes(searchText) ||
        itemFound === true ||
        pv.includes(searchText) ||
        price.includes(searchText) ||
        quantity.includes(searchText)
      ) {
        return filterByDate(order);
      }
    }
  };

  const filterByDate = function (order) {
    var orderDate = Moment(order.DeliveredOn).format("DD-MM-YYYY");
    var lastMonth = Moment().subtract(1, "months").format("DD-MM-YYYY");
    var orderYear = Number(Moment(order.DeliveredOn).format("yyyy"));

    console.log(
      filter30Days + " " + filter2021 + " " + filter2020 + " " + filterOlder
    );

    if (
      filter30Days === false &&
      filter2021 === false &&
      filter2020 === false &&
      filterOlder === false
    ) {
      return renderOrder(order);
    } else if (filter30Days === true && orderDate > lastMonth) {
      return renderOrder(order);
    } else if (filter2021 === true && orderYear === 2021) {
      return renderOrder(order);
    } else if (filter2020 === true && orderYear === 2020) {
      return renderOrder(order);
    } else if (filterOlder === true && orderYear < 2020) {
      return renderOrder(order);
    }
  };

  return (
    <PageLayout activeSideMenu="2" pageTitle="My Orders">
      <div className="row">
        <div className="col-12">
          <WishSimpleCard
            body={
              <div className="form-group row">
                <div className="col-12">
                  <h3>Search Orders</h3>
                  <input
                    id="txtSearch"
                    name="txtSearch"
                    placeholder="Search orders"
                    type="text"
                    className="form-control"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>
              </div>
            }
          ></WishSimpleCard>
        </div>
        <div className="col-sm-9">
          {SalesOrders.map((order) => {
            if (
              filterDelivered === false &&
              filterCancelled === false &&
              filterReturned === false
            ) {
              return searchOrder(order);
            } else {
              if (filterDelivered === true && order.Status === "Delivered") {
                return searchOrder(order);
              } else if (
                filterCancelled === true &&
                order.Status === "Cancelled"
              ) {
                return searchOrder(order);
              } else if (
                filterReturned === true &&
                order.Status === "Returned"
              ) {
                return searchOrder(order);
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
