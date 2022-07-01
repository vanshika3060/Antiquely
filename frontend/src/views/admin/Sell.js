import React from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

export default function Sell() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12 px-4">
          <CardSettings />
        </div>
      </div>
    </>
  );
}