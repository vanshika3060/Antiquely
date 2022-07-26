import Alert from "components/Others/Alert";
import Modal from "components/Others/Modal";
import { api } from "lib/api";
import React, { useState } from "react";

// components

export default function CardSettings() {
  const [name, setName] = useState("Vase");
  const [type, setType] = useState("Home-decor");
  const [bidAmount, setBidAmount] = useState(150);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  const [message, setMessage] = useState("");
  const [submitResp, setSubmitResp] = useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const hiddenFileInput = React.useRef(null);

  const handleFileUploadBtnClick = (event) => {
    hiddenFileInput.current.click();
  };

  const validateForm = () => {
    if (name == "") {
      setErrorFields(...errorFields, "ITEM NAME");
    }
    if (type == "") {
      setErrorFields(...errorFields, "ITEM TYPE");
    }
    if (bidAmount <= 0) {
      setErrorFields(...errorFields, "BID AMOUNT");
    }
    if (startDate == "") {
      setErrorFields(...errorFields, "START DATE");
    }
    if (endDate == "") {
      setErrorFields(...errorFields, "END DATE");
    }
    if (description == "") {
      setErrorFields(...errorFields, "DESCRIPTION");
    }
    if (
      name == "" ||
      type == "" ||
      endDate == 0 ||
      startDate == "" ||
      description == "" ||
      imageURL == ""
    ) {
      setMessage(
        " You would need to fill the fill all the fields to submit the form."
      );
      console.log("Message1", message);
    }
  };

  const handleFileButtonChange = async (event) => {
    const fileUploaded = event.target.files[0];
    let preSignedURL = null;
    try {
      preSignedURL = await api.generatePreSignedURLProducts({
        product_image_file_name: fileUploaded.name,
      });
    } catch (err) {
      console.error("Unable to generate pre-signed URL.");
    }
    try {
      let s3ProductsURL = process.env.REACT_APP_S3_IMAGES_BUCKET ? `https://${process.env.REACT_APP_S3_IMAGES_BUCKET}.s3.amazonaws.com/images/`: "https://csci5409-products.s3.amazonaws.com/images/";
      const response = await api.uploadFileToS3({
        url: preSignedURL?.data?.data,
        data: fileUploaded,
      });
      console.log("file uploaded response ", response);
      setImageURL(s3ProductsURL + fileUploaded.name);
    } catch (err) {
      console.error("Unable to upload file to S3.");
    }
  };

  const handleSubmitForm = async () => {
    validateForm();
      try {
        const data = await api.createProducts({
          data: {
            product_name: name,
            product_type: type,
            product_minimum_bid_amount: bidAmount,
            product_image_url: imageURL,
            product_description: description,
            product_auction_start_date_time: startDate,
            product_auction_end_date_time: endDate,
          },
        });
        console.log(
          "SUCCESS created a new product for auction. " + JSON.stringify(data)
        );
        setSubmitResp(true);
        setShowModal(true);
      } catch (err) {
        console.error("ERROR creating a new product for auction. ", err);
        setSubmitResp(false);
        setShowModal(true);
      }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {showModal && submitResp && (
          <Modal
            style={{ margin: "auto", width: "100%", textAlign: "center" }}
            message="Successfully created a new product for auction."
            title="Success"
            setShowModal={setShowModal}
          />
        )}
        {showModal && !submitResp && (
          <Modal
            message="Failed to create a new product for auction."
            title="Failure"
            setShowModal={setShowModal}
          />
        )}
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Sell an Antique Product
            </h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleSubmitForm}
            >
              SUBMIT
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {message && <Alert message={message} />}
          <form>
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Item Information
            </h6>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Antique Picture
                  </label>
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleFileUploadBtnClick}
                  >
                    <i className="fas fa-upload"></i> Upload
                  </button>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleFileButtonChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="w-6/12 sm:w-4/12 px-4">
                <img
                  src={
                    imageURL ||
                    "https://tonsmb.org/wp-content/uploads/2014/03/default-placeholder.png"
                  }
                  alt="..."
                  className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
                />
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Vase"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Item type
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Home-decor"
                    onChange={(e) => setType(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Minimum Bidding Rate
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="150"
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              About Auction Time
            </h6>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Auction start time:
                </label>
                <input
                  type="datetime-local"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={(e) => {
                    if (
                      startDate != "" &&
                      endDate != "" &&
                      new Date(e.target.value) >= new Date(endDate)
                    ) {
                      setMessage("Start date cannot be greater than end date.");
                    } else {
                      setMessage("");
                    }
                    setStartDate(new Date(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Auction end time:
                </label>
                <input
                  type="datetime-local"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={(e) => {
                    if (
                      startDate != "" &&
                      endDate != "" &&
                      new Date(startDate) >= new Date(e.target.value)
                    ) {
                      setMessage("Start date cannot be greater than end date.");
                    } else {
                      setMessage("");
                    }
                    setEndDate(new Date(e.target.value));
                  }}
                />
              </div>
            </div>

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              About Item
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    About Item
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    // defaultValue="Tell users about the product."
                    rows="4"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
