import React, { useEffect, useState } from "react";

// components

import BuyAntiquesTable from "components/Cards/BuyAntiquesTable.js";
import { api } from "lib/api";

export default function Dashboard() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await api.getAllProducts();
      if(data && data.status === 200 && data.data.success === true && data.data.data){
        setProducts(data.data?.data?.Items);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <BuyAntiquesTable title="Buy Antiques" products={products} />
        </div>
      </div>
    </>
  );
}
