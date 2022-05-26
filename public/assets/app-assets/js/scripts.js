/* eslint-disable no-undef */
$(window).scroll(function () {
  if ($(window).scrollTop() > 10) {
    $("#navBar").addClass("navbar-shadow");
  } else {
    $("#navBar").removeClass("navbar-shadow");
  }
});

$("#login").on("click", function () {
  toastr.error("Invalid credentials, please try again.", "Login Failed", {
    closeButton: true,
    timeOut: "0",
  });
});

$(document).ready(function () {
  // Code for managing self purchase on product order screen
  $("#chkSelf").on("click", function () {
    if (this.checked) {
      $("#chkSelfLabel").text("Buying for self");
      $("#txtCustomerName").val("John Doe");
      $("#txtCustomerName").prop("disabled", true);
      $("#txtDeliveryLocation").val(
        "Toshani Villa, Govardhan Vilas, Near Technoy Motor Service Center, Behind Jeevantara Resort"
      );
      $("#txtDemographicDetails").val("Udaipur, Rajasthan, India");
    } else {
      $("#chkSelf").text("Buying for others");
      $("#txtCustomerName").val("");
      $("#txtCustomerName").prop("disabled", false);
      $("#txtDeliveryLocation").val("");
      $("#txtDemographicDetails").val("");
      //$("#deliveryLocation").prop("disabled", false);
    }
  });

  $("#btnAccept").on("click", function () {
    if (this.innerText === "Search") {
      this.innerText = "Select";
    } else {
      this.innerText = "Search";
    }
  });

  $(".list-group a").on("click", function (e) {
    $(".list-group a").removeClass("active");
    $(".list-group a").find("h5").removeClass("white");

    $(this).addClass("active");
    $(this).find("h5").addClass("white");
  });

  $("#baseVerticalLeft2-tab1").click(function () {
    $("#txtFilterInboxItems").val("");
    $("#lstInboxItems > a").show();
  });

  $("#baseVerticalLeft2-tab2").click(function () {
    $("#txtFilterInboxItems").val("");
    $("#lstSentItems > a").show();
  });

  $("#txtFilterInboxItems").on("input", function () {
    var value = $(this).val();

    if ($("#baseVerticalLeft2-tab1").hasClass("active")) {
      $("#lstInboxItems > a:not(:contains(" + value + "))").hide();
      $("#lstInboxItems > a:contains(" + value + ")").show();
    }

    if ($("#baseVerticalLeft2-tab2").hasClass("active")) {
      $("#lstSentItems > a:not(:contains(" + value + "))").hide();
      $("#lstSentItems > a:contains(" + value + ")").show();
    }
  });
});
