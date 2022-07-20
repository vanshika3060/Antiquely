import React, { useEffect, useState } from "react";

// components

import PastBiddingsTable from "components/Cards/PastBiddingsTable";
import { api } from "lib/api";

export default function MyPastBiddings() {
  const [bids, setBids] = useState([]);
  const user_id = "1"; // TODO: Fetch from context;

  useEffect(() => {
    (async () => {
      const data = await api.getUserSpecificBids({ user_id });
      if (
        data &&
        data.status === 200 &&
        data.data.success === true &&
        data.data.data
      ) {
        var updatedBids = data.data?.data?.Items?.filter(
          (bid) => bid.user_id == user_id
        );
        for (let i = 0; i < updatedBids.length; i++) {
          const updatedBid = updatedBids[i];
          const product = await api.getProductById({
            product_id: updatedBid.product_id,
          });
          if (product && product.status === 200 && product.data.success === true && product.data.data) {
            updatedBid.product = product.data?.data?.Item || {};
          }
        }
        setBids(updatedBids);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <PastBiddingsTable title="My Past Biddings" bids={bids} />
        </div>
      </div>
    </>
  );
}
