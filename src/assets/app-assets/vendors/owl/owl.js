var slider;
var pageIndex = 1;
var totalPages = 0;
var progressTiles;
var totalProgressTiles = 0;

$(document).ready(function () {
  slider = $(".owl-carousel").owlCarousel({
    autoHeight: true,
    margin: 10,
    items: 1,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    callbacks: true,
    info: true,
  });

  totalPages = $(".owl-carousel .item").length;

  progressTiles = $("#progressTiles .card");

  totalProgressTiles = progressTiles.length;

  slider.on("changed.owl.carousel", function (e) {
    console.log(e);
  });

  $("#nextPage").on("click", function (e) {
    if (pageIndex < totalPages) {
      if ($("#prevPage").hasClass("d-none"))
        $("#prevPage").removeClass("d-none");

      // if (pageIndex < totalProgressTiles) {
      //   $(proggressTiles[pageIndex - 1]).removeClass("box-shadow-1");
      //   $(proggressTiles[pageIndex - 1]).addClass("box-shadow-0");
      //   $(proggressTiles[pageIndex]).removeClass("box-shadow-0");
      //   $(proggressTiles[pageIndex]).addClass("box-shadow-1");
      // }

      pageIndex++;

      if (pageIndex == totalPages) $("#nextPage").addClass("d-none");
    }
    toPage(pageIndex, e);

    updateProgress((pageIndex / totalPages) * 100);
  });

  $("#prevPage").on("click", function (e) {
    if (pageIndex > 1) {
      if ($("#nextPage").hasClass("d-none"))
        $("#nextPage").removeClass("d-none");

      // if (pageIndex > 1) {
      //   $(proggressTiles[pageIndex - 2]).removeClass("box-shadow-0");
      //   $(proggressTiles[pageIndex - 2]).addClass("box-shadow-1");
      //   $(proggressTiles[pageIndex - 1]).removeClass("box-shadow-1");
      //   $(proggressTiles[pageIndex - 1]).addClass("box-shadow-0");
      // }

      pageIndex--;

      if (pageIndex == 1) $("#prevPage").addClass("d-none");
    }
    toPage(pageIndex, e);
  });
});

var nextPage = function (e) {
  pageIndex++;
  slider.trigger("next.owl.carousel");
};

var previousPage = function (e) {
  pageIndex--;
  slider.trigger("prev.owl.carousel");
};

var toPage = function (pageId, e) {
  //console.log(e);
  slider.trigger("to.owl.carousel", [pageId - 1]);

  updateProgress((pageIndex / totalPages) * 100);
};

var navigateTo = function (pageId) {
  if (pageIndex < pageId) {
    do {
      $("#nextPage").click();
    } while (pageIndex < pageId);
  }

  if (pageIndex > pageId) {
    do {
      $("#prevPage").click();
    } while (pageIndex > pageId);
  }
};

var updateProgress = function (percent) {
  $("#pbProgress").attr("aria-valuenow", percent);
  $("#pbProgress").attr("style", "width:" + percent + "%;");

  $("#progressTiles .card").removeClass("box-shadow-1");
  $("#progressTiles .card").addClass("box-shadow-0");
  $(progressTiles[pageIndex - 1]).removeClass("box-shadow-0");
  $(progressTiles[pageIndex - 1]).addClass("box-shadow-1");
};
