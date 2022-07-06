import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import PastBiddingsTable from "components/Cards/PastBiddingsTable";

export default function MyPastBiddings() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <PastBiddingsTable title="My Past Biddings" />
        </div>
      </div>
    </>
  );
}
