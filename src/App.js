//import logo from './logo.svg';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import SignIn from "./views/authentication/signin";
import Sales from "./views/sales/Sales";
import Enrollment from "./views/enrollment/Enrollment";
import MyGeneology from "./views/MyGeneology";
import Announcements from "./views/Announcements";
import VMail from "./views/VMail";
//import MyProfile from "./views/personal/MyProfile";
import DistributorProfile from "./views/personal/DistributorProfile";
import TestPage from "./views/TestPage";
import CoApplicantProfile from "./views/personal/CoApplicantProfile";
import ChangeCoApplicant from "./views/personal/ChangeCoApplicant";
//import React, { useEffect, useState } from "react";
import KYC from "./views/personal/KYC";
import MyCards from "./views/personal/MyCards";
import PCMMembership from "./views/personal/PCMMembership";
import VOTMMembership from "./views/personal/VOTMMembership";
import Wallet from "./views/personal/wallet";
import Settings from "./views/personal/Settings";
import Analysis from "./views/analysis/Analysis";
import ProfileDashboard from "./views/personal/ProfileDashboard";
import PlaceOrder from "./views/sales/PlaceOrder";
import WalletTransactions from "./views/personal/WalletTransactions";
import MyOrders from "./views/sales/MyOrders";
import EnrollUser from "./views/enrollment/EnrollUser";
import OngoingEnrollments from "./views/enrollment/OngoingEnrollments";
import GenerateLink from "./views/enrollment/GenerateLink";
import SalesAnalysis from "./views/analysis/TeamsAnalysis/SalesAnalysis";
import OrderDetails from "./views/sales/OrderDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="sales" element={<Sales />} />
        <Route path="placeorder" element={<PlaceOrder />} />
        <Route path="myorders" element={<MyOrders />} />
        <Route path="orderdetails" element={<OrderDetails />} />
        <Route path="enrollment" element={<Enrollment />} />
        <Route path="enrolluser" element={<EnrollUser />} />
        <Route path="ongoingenrollments" element={<OngoingEnrollments />} />
        <Route path="generatelink" element={<GenerateLink />} />
        <Route path="mygeneology" element={<MyGeneology />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="salesanalysis" element={<SalesAnalysis />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="vmail" element={<VMail />} />
        <Route path="myprofile" element={<ProfileDashboard />} />
        <Route path="distributorprofile" element={<DistributorProfile />} />
        <Route path="coapplicantprofile" element={<CoApplicantProfile />} />
        <Route path="changecoapplicant" element={<ChangeCoApplicant />} />
        <Route path="kyc" element={<KYC />} />
        <Route path="mycards" element={<MyCards />} />
        <Route path="pcmmembership" element={<PCMMembership />} />
        <Route path="votmmembership" element={<VOTMMembership />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="wallettransactions" element={<WalletTransactions />} />
        <Route path="settings" element={<Settings />} />
        <Route path="test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}
