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

  const transactions = function () {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="bg-primary white">
            <tr>
              <th>Transactions</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ lineHeight: "5px" }}>
                <p>Added to wallet</p>
                <p>10 Feb 22 22:10 PM</p>
                <p style={{ lineHeight: "10px" }}>&nbsp;</p>
                <p style={{ lineHeight: "1em" }}>Order ID: 7267637762776287</p>
                <p style={{ lineHeight: "1em" }}>Transaction ID: 83787387</p>
              </td>
              <td>+1500</td>
              <td>SUCCESS</td>
              <td>Bank Txn ID: 8378791872878929</td>
            </tr>
            <tr>
              <td style={{ lineHeight: "5px" }}>
                <p>Paid for Order</p>
                <p>10 Feb 22 22:10 PM</p>
                <p style={{ lineHeight: "10px" }}>&nbsp;</p>
                <p style={{ lineHeight: "1em" }}>Order ID: 7267637762776287</p>
                <p style={{ lineHeight: "1em" }}>Transaction ID: 83787387</p>
              </td>
              <td>-3500</td>
              <td>SUCCESS</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <PageLayout pageTitle="Wallet Transactions">
      <WishSimpleCard
        header={transactionsHeader()}
        body={transactions()}
      ></WishSimpleCard>
    </PageLayout>
  );
}
