import React, { useState } from "react";

const Alert = ({ message }) => {
   
  const [show, setShow] = useState(true); 

  return (
    <>
    {show &&<div className="text-white px-6 py-4 border-0 rounded relative m-4 bg-red-500">
      <span className="text-xl inline-block align-middle" style={{marginRight: 8}}>
        <i className="fas fa-exclamation-triangle"></i>
      </span>
      <span className="inline-block align-middle" style={{marginRight: 10}}>
        <b className="capitalize">ERROR! </b> {message}
      </span>
      <button onClick={() => {setShow(!show)}} className="absolute bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none" style={{marginRight: 20, right: 0, top: 0, marginTop:15}}>
        <span>×</span>
      </button>
    </div>}
    </>
  );
};

export default Alert;