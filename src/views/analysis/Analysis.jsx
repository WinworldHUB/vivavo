import React, { Component } from "react";
import PageLayout from "../../components/PageLayout";
import WishCard from "../../components/WishCard";

export default class Analysis extends Component {
  render() {
    return (
      <PageLayout
        activeSideMenu="5"
        pageTitle="Analysis"
        header="TEAMS ANALYSIS"
      >
        <section className="row">
          <div className="col-md-4 col-sm-6">
            <WishCard
              bgColor="bg-primary"
              textWhite={true}
              title="Sales Analysis"
              icon="la-chart-bar"
              line1="Analyze your and your team's product sales details here."
              line2={[
                "You can analyze ",
                <code>sales frequency</code>,
                " and other details from here",
              ]}
              linkTo="/salesanalysis"
            ></WishCard>
          </div>

          <div className="col-md-4 col-sm-6">
            <WishCard
              title="Profile Analysis"
              icon="la-chart-pie"
              line1="View your team's profile completion status using this option."
              line2={[
                "You can also manage team's ",
                <code>profile related </code>,
                " details from here.",
              ]}
              linkTo="/"
            ></WishCard>
          </div>
        </section>

        <div className="content-header-left col-12 mb-2 pt-5">
          <h3 className="content-header-title text-muted">SELF ANALYSIS</h3>
        </div>
        <section className="row">
          <div className="col-md-4 col-sm-6">
            <WishCard
              bgColor="bg-blue-grey bg-lighten-4 box-shadow-0 onhover-shadow onhover-change-border"
              title="Rank Analysis"
              icon="la-chart-bar"
              line1="Analyze details for yor rank, PV, income, etc. using this option."
              line2={[
                "You can analyze ",
                <code>Rank, PV, Income</code>,
                " and other details from here.",
              ]}
              linkTo="/"
            ></WishCard>
          </div>

          <div className="col-md-4 col-sm-6">
            <WishCard
              title="Commission Analysis"
              icon="la-chart-pie"
              line1="Analyze your commissions using this option."
              line2={[
                "Commission related details can be ",
                <code>analyzed</code>,
                " from here.",
              ]}
              linkTo="/"
            ></WishCard>
          </div>

          <div className="col-md-4 col-sm-6">
            <WishCard
              title="Order Report Analysis"
              icon="la-chart-pie"
              line1="Analyze your sales and orders related details using this option."
              line2={[
                "You can also analyze ",
                <code>sales</code>,
                " and ",
                <code>order</code>,
                " related details from here.",
              ]}
              linkTo="/"
            ></WishCard>
          </div>
        </section>
      </PageLayout>
    );
  }
}
