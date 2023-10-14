import React from "react";
import Notfound from "../../Assets/Images/error.svg";
export default function NotFound() {
  return (
    <div className="text-center">
      <img className="w-50" src={Notfound} alt="" />
    </div>
  );
}
