import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </>
  );
}
