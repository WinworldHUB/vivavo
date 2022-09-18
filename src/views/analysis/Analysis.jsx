import React from "react";
import PageLayout from "../../components/PageLayout";
import pageConfig from "../../data/config.json";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import WishFlexBox from "../../components/WishFlexBox";
import WishSimpleCard from "../../components/WishSimpleCard";
import EmptyBox from "../../components/EmptyBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Active Members", "Inactive Members", "Expired Members"],
  datasets: [
    {
      data: [15, 4, 1],
      backgroundColor: ["green", "orange", "red"],
      borderColor: ["green", "orange", "red"],
      borderWidth: 0,
      cutout: "70%",
    },
  ],
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

function RenderGroupVolumeTile({ details, addTopPadding = false }) {
  return (
    <div className="px-1">
      <WishFlexBox>
        <label className="text-primary">{details.title}</label>
        <WishFlexBox>
          <span className="lead font-weight-bold d-flex align-items-center">
            <i
              className={
                "las " +
                (details.direction === "up"
                  ? "la-long-arrow-alt-up text-success"
                  : "la-long-arrow-alt-down text-danger")
              }
            ></i>{" "}
          </span>
          <span
            className={
              "lead font-weight-bold " +
              (details.direction === "up" ? "text-success" : "text-danger")
            }
          >
            3500
          </span>
        </WishFlexBox>
      </WishFlexBox>
    </div>
  );
}

export default function Analysis() {
  const plugin = {
    id: "custom_text",
    beforeDraw: (chart) => {
      const { ctx } = chart;
      ctx.save();
      ctx.font = "22px comfortaa";
      ctx.fillStyle = "grey";

      var line1 = "300",
        line1X = Math.round((chart.width - ctx.measureText(line1).width) / 2),
        line1Y = chart.height / 2 - 25;
      ctx.fillText(line1, line1X, line1Y + 2);

      ctx.font = "14px comfortaa";
      var line2 = "Active members",
        line2X = Math.round((chart.width - ctx.measureText(line2).width) / 2),
        line2Y = chart.height / 2;
      ctx.fillText(line2, line2X, line2Y + 2);

      ctx.font = "14px comfortaa";
      var line3 = "of 4500",
        line3X = Math.round((chart.width - ctx.measureText(line3).width) / 2),
        line3Y = chart.height / 2 + 25;
      ctx.fillText(line3, line3X, line3Y + 2);
      ctx.restore();
    },
  };

  return (
    <PageLayout {...pageConfig.analysisdashboard}>
      <div className="row">
        <div className="col-sm-8">
          <WishSimpleCard header={<h5>Team Member Status</h5>} className="">
            <div className="row">
              <div className="col-sm-6">
                <WishFlexBox className="pb-1">
                  <WishFlexBox>
                    <i className="las la-square" style={{ color: "green" }}></i>
                    <small>Active</small>
                  </WishFlexBox>

                  <WishFlexBox>
                    <i
                      className="las la-square"
                      style={{ color: "orange" }}
                    ></i>
                    <small>Inactive</small>
                  </WishFlexBox>

                  <WishFlexBox>
                    <i className="las la-square" style={{ color: "red" }}></i>
                    <small>Expired</small>
                  </WishFlexBox>
                </WishFlexBox>
                <Doughnut data={data} options={options} plugins={[plugin]} />
              </div>
              <div className="col-sm-6">
                <div className="bg-primary p-1 rounded-lg">
                  <WishFlexBox>
                    <h4 className="font-weight-bold m-0">250 PV</h4>
                    <h6 className="m-0">Retail PV</h6>
                  </WishFlexBox>
                </div>
                <EmptyBox height="20px" />
                <div className="bg-primary p-1 rounded-lg">
                  <WishFlexBox>
                    <h4 className="font-weight-bold m-0">30</h4>
                    <h6 className="m-0">New Enrollees</h6>
                  </WishFlexBox>
                </div>
                <EmptyBox height="20px" />
                <div className="bg-primary p-1 rounded-lg">
                  <WishFlexBox>
                    <h4 className="font-weight-bold m-0">15,000</h4>
                    <h6 className="m-0">Estimated Income</h6>
                  </WishFlexBox>
                </div>
                <EmptyBox height="20px" />
                <div className="bg-primary p-1 rounded-lg">
                  <WishFlexBox>
                    <h4 className="font-weight-bold m-0">30</h4>
                    <h6 className="m-0">New Enrollees</h6>
                  </WishFlexBox>
                </div>
              </div>
            </div>
          </WishSimpleCard>
        </div>
        <div className="col-sm-4 text-center">
          <WishSimpleCard className="">
            <div className="text-center">
              <img
                src="../../assets/app-assets/images/badges/Emerald Executive.png"
                alt=""
                style={{ width: "50px" }}
              />
              <EmptyBox height="10px" />
              <h3>M. Shamshudeen</h3>
              <p style={{ lineHeight: "1.0" }}>
                <label className="d-block">1001</label>
                <small>Black Diamond Ambassador</small>
              </p>
              <div className="row">
                <div className="col">
                  <label className="font-weight-bold">Paid as rank: </label>
                </div>
                <div className="col-auto">
                  <label>Diamond Executive </label>
                </div>
              </div>
              <div className="row pt-1 pb-1">
                <div className="col-auto">
                  <label className="font-weight-bold">Activation PV: </label>
                </div>
                <div className="col">
                  <h4>100</h4>
                </div>
              </div>
              <WishFlexBox className="row-fluid bg-danger bg-lighten-4 rounded-lg border-light">
                <div className="col-6 border-right text-center">
                  <label className="fs-2 d-block">150</label>
                  <label>Retail PV</label>
                </div>
                <div className="col-6 text-center">
                  <label className="fs-2 d-block">50</label>
                  <label>Sponsor PV</label>
                </div>
              </WishFlexBox>
              <div className="row pt-2 pb-1">
                <div className="col-auto">
                  <label className="font-weight-bold text-info">
                    Next activation week:{" "}
                  </label>
                </div>
                <div className="col">
                  <h4>235</h4>
                </div>
              </div>
              <WishFlexBox>
                <label className="font-weight-bold text-danger">
                  2 days left
                </label>
                <button className="btn btn-primary btn-sm">Order Now</button>
              </WishFlexBox>
            </div>
          </WishSimpleCard>
        </div>
        <div className="col-6">
          <WishSimpleCard header={<h3>Group Volume Details</h3>}>
            <h5>Week 456</h5>
            <WishSimpleCard cardBodyClassName="py-1">
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                modules={[Navigation]}
                navigation={true}
                grabCursor={true}
              >
                {pageConfig.mygenealogy.topStats.map((info, index) => {
                  return (
                    <SwiperSlide>
                      <RenderGroupVolumeTile details={info} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </WishSimpleCard>
            <hr className="pt-2" />
            <h5>Week 455</h5>
            <WishSimpleCard>
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                modules={[Navigation]}
                navigation={true}
                grabCursor={true}
              >
                {pageConfig.mygenealogy.topStats.map((info, index) => {
                  return (
                    <SwiperSlide>
                      <RenderGroupVolumeTile details={info} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </WishSimpleCard>
            <hr className="pt-2" />
            <h5>Week 454</h5>
            <WishSimpleCard>
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                modules={[Navigation]}
                navigation={true}
                grabCursor={true}
              >
                {pageConfig.mygenealogy.topStats.map((info, index) => {
                  return (
                    <SwiperSlide>
                      <RenderGroupVolumeTile details={info} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </WishSimpleCard>
          </WishSimpleCard>
        </div>
        <div className="col-6">
          <WishSimpleCard header={<h3>Reports</h3>}>
            <WishFlexBox className="clickable pb-2">
              <h6 className="text-primary">Sales Analysis</h6>
              <i className="las la-angle-right"></i>
            </WishFlexBox>
            <WishFlexBox className="clickable pb-2">
              <h6 className="text-primary">Commission Reports</h6>
              <i className="las la-angle-right"></i>
            </WishFlexBox>
            <WishFlexBox className="clickable pb-2">
              <h6 className="text-primary">Order Reports</h6>
              <i className="las la-angle-right"></i>
            </WishFlexBox>
            <WishFlexBox className="clickable pb-2">
              <h6 className="text-primary">New Distributor Reports</h6>
              <i className="las la-angle-right"></i>
            </WishFlexBox>
          </WishSimpleCard>
        </div>
      </div>
    </PageLayout>
  );
}
