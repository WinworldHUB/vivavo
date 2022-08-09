import React from "react";
import PageLayout from "../../../components/PageLayout";
import WishSimpleCard from "../../../components/WishSimpleCard";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import WishSelect from "../../../components/WishFormComponents/WishSelect";

import Chart from "react-apexcharts";

export default function SalesAnalysis() {
  const breadcrumbs = [];
  breadcrumbs.push({ title: "Home", linkTo: "/" });
  breadcrumbs.push({ title: "Analysis", linkTo: "/analysis" });
  breadcrumbs.push({ title: "Sales Analysis", linkTo: "/" });

  const weeksFilter = ["This week", "Past 4 weeks", "Past 8 weeks"];
  const animatedComponents = makeAnimated();

  const organizationsFilter = [
    { label: "All", value: 0 },
    { label: "Left", value: 1 },
    { label: "Right", value: 2 },
    { label: "3rd Organization", value: 3 },
    { label: "4th Organization", value: 4 },
    { label: "5th Organization", value: 5 },
  ];

  const ordersFilter = ["All Orders", "First Orders", "Re-Orders"];

  const renderFilters = function () {
    return (
      <WishSimpleCard
        body={
          <div className="row">
            <div className="col-12 pb-2">
              <h5>
                <i className="las la-filter"></i> Filters
              </h5>
            </div>
            <div className="col-sm-3">
              <WishSelect data={weeksFilter} />
            </div>
            <div className="col-2"></div>
            <div className="col-sm-4">
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[]}
                isMulti
                options={organizationsFilter}
              />
            </div>
            <div className="col-sm-3">
              <WishSelect data={ordersFilter}></WishSelect>
            </div>
          </div>
        }
      ></WishSimpleCard>
    );
  };

  const series = [
    {
      name: "Orders - John Doe",
      data: [200, 220, 769, 890, 910],
    },
    {
      name: "Orders - Sima Boo",
      data: [400, 420, 240, 650, 490],
    },
  ];
  const options = {
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [418, 419, 420, 421, 422, 423, 424],
    },
  };

  const renderGraph = function () {
    return (
      <WishSimpleCard
        body={
          <Chart
            options={options}
            series={series}
            type="line"
            width={"100%"}
            height={320}
          />
        }
      ></WishSimpleCard>
    );
  };

  return (
    <PageLayout
      activeSideMenu="5"
      pageTitle="Analysis"
      header="TEAMS ANALYSIS"
      breadcrumbs={breadcrumbs}
    >
      {renderFilters()}
      {renderGraph()}
    </PageLayout>
  );
}
