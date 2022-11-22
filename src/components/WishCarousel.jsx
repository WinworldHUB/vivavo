/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import WishSimpleCard from "./WishSimpleCard";

export default function WishCarousel({
  children,
  nextLinkTitle,
  prevLinkTitle,
  title,
  action,
  selectedPageIndex = 0,
  headers,
  showArrows = false,
  showNextPrev = true,
  onNextClicked,
  onPreviousClicked,
  onPageChange,
  onPageLoad,
}) {
  const currentPageIndex =
    selectedPageIndex === undefined ? 0 : selectedPageIndex;

  const totalPages = children === undefined ? 0 : children.length;

  const [previousPage, setPreviousPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(currentPageIndex);

  useEffect(() => {
    setCurrentPage(selectedPageIndex);
  }, [selectedPageIndex]);

  useEffect(() => {
    onPageChange && onPageChange(previousPage, currentPage);
    setPreviousPage(currentPage);
    onPageLoad && onPageLoad(currentPage);
  }, [currentPage]);

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
      <>
        <a
          className={
            "card-link lead link-dotted mr-auto d-flex align-items-center text-primary " +
            (currentPage === 0 ? " hidden " : " ")
          }
          onClick={(e) => {
            e.stopPropagation();
            if (onPreviousClicked) {
              onPreviousClicked(currentPage);
              return;
            }

            if (currentPage > 0) setCurrentPage(currentPage - 1);
          }}
        >
          {showArrows && <i className="las la-angle-left"></i>}{" "}
          {prevLinkTitle ?? "BACK"}
        </a>
        <a
          className={
            "card-link lead link-dotted ml-auto d-flex align-items-center text-primary " +
            (currentPage === totalPages - 1 ? " hidden " : "")
          }
          onClick={(e) => {
            e.stopPropagation();
            if (onNextClicked) {
              onNextClicked(currentPage);
              return;
            }

            if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
          }}
        >
          {nextLinkTitle ?? "NEXT"}{" "}
          {showArrows && <i className="las la-angle-right"></i>}
        </a>
      </>
    );
  };

  return (
    <WishSimpleCard
      header={renderHeader()}
      body={children[currentPage] ?? ""}
      footer={showNextPrev && renderFooter()}
    ></WishSimpleCard>
  );
}
