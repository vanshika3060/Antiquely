import React, { useEffect, useState } from "react";

// components

import MyAntiquesTable from "components/Cards/MyAntiquesTable.js";
import { api } from "lib/api";

export default function MyAntiques() {

  const [products, setProducts] = useState([]);
  const user_id = localStorage.getItem('USER_ID') || 1;

  useEffect(() => {
    (async () => {
      const data = await api.getUserSpecificProducts({user_id});
      if(data && data.status === 200 && data.data.success === true && data.data.data){
        setProducts(data.data?.data?.Items?.filter((product)=> product.user_id == user_id));
      }
    })();
  }, []);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <MyAntiquesTable title="My Antiques" products={products} color="dark" />
        </div>
      </div>
    </>
  );
}