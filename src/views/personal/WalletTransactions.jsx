/* eslint-disable jsx-a11y/anchor-is-valid */
import PageLayout from "../../components/PageLayout";
import WishSimpleCard from "../../components/WishSimpleCard";

export default function WalletTransactions() {
  const transactionsHeader = function () {
    return (
      <div className="row">
        <div className="col-10">
          <h3>Wallet Transactions</h3>
        </div>
        <div className="col-2 text-right">
          <a className="card-link text-primary">
            <i className="las la-sync la-2x"></i>
          </a>
        </div>
      </div>
    );
  };

  function TransactionsTitles() {
    return (
      <div className="container">
        <div className="row bg-primary p-1 font-weight-bold">
          <div className="col-sm-4">Transactions</div>
          <div className="col-sm-2">Amount (INR)</div>
          <div className="col-sm-2">Status</div>
          <div className="col-sm-4">Comments</div>
        </div>
      </div>
    );
  }

  const transactions = function () {
    return (
      <div className="container">
        <WishSimpleCard cardBodyClassName="">
          <div className="row pt-1">
            <div className="col-sm-4" style={{ lineHeight: "5px" }}>
              <p>Added to wallet</p>
              <p>10 Feb 22 22:10 PM</p>
              <p style={{ lineHeight: "10px" }}>&nbsp;</p>
              <p style={{ lineHeight: "1em" }}>Order ID: 7267637762776287</p>
              <p style={{ lineHeight: "1em" }}>Transaction ID: 83787387</p>
            </div>
            <div className="col-sm-2 text-center">+1500</div>
            <div className="col-sm-2 text-uppercase">Success</div>
            <div className="col-sm-4">Bank Txn ID: 8378791872878929</div>
          </div>
        </WishSimpleCard>
        <WishSimpleCard cardBodyClassName="">
          <div className="row pt-1">
            <div className="col-sm-4" style={{ lineHeight: "5px" }}>
              <p>Paid for Order</p>
              <p>10 Feb 22 22:10 PM</p>
              <p style={{ lineHeight: "10px" }}>&nbsp;</p>
              <p style={{ lineHeight: "1em" }}>Order ID: 7267637762776287</p>
              <p style={{ lineHeight: "1em" }}>Transaction ID: 83787387</p>
            </div>
            <div className="col-sm-2 text-center">-3500</div>
            <div className="col-sm-2 text-uppercase">Success</div>
            <div className="col-sm-4"></div>
          </div>
        </WishSimpleCard>
      </div>
    );
  };

  return (
    <PageLayout pageTitle="Wallet Transactions">
      <WishSimpleCard
        header={transactionsHeader()}
        body={<TransactionsTitles />}
      ></WishSimpleCard>
      {transactions()}
    </PageLayout>
  );
}
