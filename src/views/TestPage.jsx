import React from "react";
import PageLayout from "../components/PageLayout";
import { useState } from "react";
import { Action, Fab } from "react-tiny-fab";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function TestPage() {
  const items = [
    { id: "1", title: "Item 1", subtitle: "This is item 1" },
    { id: "2", title: "Item 2", subtitle: "This is item 2" },
    { id: "3", title: "Item 3", subtitle: "This is item 3" },
    { id: "4", title: "Item 4", subtitle: "This is item 4" },
    { id: "5", title: "Item 5", subtitle: "This is item 5" },
  ];

  return (
    <PageLayout>
      <div>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
        {items.map((item) => {
          return (
            <>
              <Fab
                alwaysShowTitle={false}
                mainButtonStyles={{ backgroundColor: "var(--primary)" }}
                icon={<i className="las la-plus"></i>}
              >
                <Action
                  text="Email"
                  style={{ backgroundColor: "var(--success)" }}
                >
                  <i className="las la-plus" />
                </Action>
                <Action text="Help">
                  <i className="las la-user" />
                </Action>
              </Fab>
            </>
          );
        })}
      </div>
    </PageLayout>
  );
}
