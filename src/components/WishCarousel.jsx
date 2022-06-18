/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import WishSimpleCard from "./WishSimpleCard";

export default function WishCarousel({
  children,
  nextLinkTitle,
  prevLinkTitle,
  title,
  action,
  selectedPageIndex,
  headers,
  showArrows,
}) {
  const currentPageIndex =
    selectedPageIndex === undefined ? 0 : selectedPageIndex;

  const totalPages = children === undefined ? 0 : children.length;

  const [currentPage, setCurrentPage] = useState(currentPageIndex);

  const calcHeader = function () {
    var value = null;

    if (headers === undefined) {
      value = title ?? null;
    } else {
      value = headers[currentPage] ?? title ?? null;
    }

    return value;
  };

  const renderHeader = function () {
    const tmpHeader = calcHeader();

    if (tmpHeader !== null || action !== undefined) {
      return (
        <div className="d-flex justify-content-between">
          {tmpHeader}
          {action ?? ""}
        </div>
      );
    } else return null;
  };

  const renderFooter = function () {
    return (
      <div className="d-flex">
        <a
          className={
            "card-link link-dotted mr-auto d-flex align-items-center " +
            (currentPage === 0 ? " hidden " : " ")
          }
          onClick={(e) => {
            e.stopPropagation();
            if (currentPage > 0) setCurrentPage(currentPage - 1);
          }}
        >
          {showArrows && <i className="las la-angle-left"></i>}{" "}
          {prevLinkTitle ?? "BACK"}
        </a>
        <a
          className={
            "card-link link-dotted ml-auto d-flex align-items-center " +
            (currentPage === totalPages - 1 ? " hidden " : "")
          }
          onClick={(e) => {
            e.stopPropagation();
            if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
          }}
        >
          {nextLinkTitle ?? "NEXT"}{" "}
          {showArrows && <i className="las la-angle-right"></i>}
        </a>
      </div>
    );
  };

  return (
    <WishSimpleCard
      header={renderHeader()}
      body={children[currentPage] ?? ""}
      footer={renderFooter()}
    ></WishSimpleCard>
  );
}
