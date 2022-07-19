import React from "react";

// components

import BuyAntiquesTable from "components/Cards/BuyAntiquesTable.js";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <BuyAntiquesTable />
        </div>
        <div className="w-full mb-12 px-4">
          <BuyAntiquesTable color="dark" />
        </div>
      </div>
    </>
  );
}
