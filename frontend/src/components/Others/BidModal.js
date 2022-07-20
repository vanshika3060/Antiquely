import React, { useState } from "react";
import Alert from "./Alert";

const BidModal = ({setShowModal, title, submitBid, minBidAmount}) => {

    const [bidAmount, setBidAmount] = useState(150);
    
    return (<>
        <div
          className="items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" style={{marginLeft: "20%", marginRight: "20%"}}
        >
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {title}
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto" style={{padding: 20}}>
                {(parseInt(bidAmount) < parseInt(minBidAmount)) || bidAmount == null || bidAmount == undefined || bidAmount == ""  ? <Alert message={"Your bid amount must be greater than the minimum bid amount " + minBidAmount}/> : ""}
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  {"What is the amount that you wish to bid this item for ?"}
                </p>
                <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="150"
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b" style={{padding:10}}>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className={(parseInt(bidAmount) < parseInt(minBidAmount)) || bidAmount == null || bidAmount == undefined || bidAmount == ""  ? "bg-blueGray-200 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150" :"bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
                  type="button"
                  onClick={() => submitBid(bidAmount)}
                >
                  Bid
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>)
}

export default BidModal;