import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";

export default function MyAntiques() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable title="My Antiques" />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div>
      </div>
    </>
  );
}