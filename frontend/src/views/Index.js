/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  return (
    <>
     <IndexNavbar />
      {/* TODO: @Vanshika Fix this content to align with Antiquely */}
      {/* Done */}
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Antiquely: One stop destination for valuable antiques
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Antiquely is a free online retail platform where retailers can advertise their vintage/antique products for auction and buyers can bid and buy it and mark it for their own at a fair market price .
                
              </p>
              <div className="mt-12">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index"
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern_react.png").default}
          alt="..."
        />
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <img
                  alt="..."
                  src="https://images.unsplash.com/photo-1635719921169-288afcd9b128?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      className="text-lightBlue-500 fill-current"
                    ></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-white">
                    Buy antiques for you and your loved ones
                  </h4>
                  <p className="text-md font-light mt-2 text-white">
                    Having a variety of valuables at one destination has never been found easier. Here, we help you find the perfect selection of anything you want at a good market price.
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="w-full md:w-6/12 px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-sitemap"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Advertising products
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Antiquely comes with a huge number of sellers advertising their products. Join the team of sellers if you want to make money by selling your loved valuables.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-drafting-compass"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        Bidding never became this easy
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        Shopping can become burdensome for pickers when looking for antiques where bargaining becomes a major part. Here, we make it easy for you by letting you bid on products online making it quick and simple for anyone to get things for a fair price.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 mt-4">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <i className="fas fa-newspaper"></i>
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">Buying products</h6>
                      <p className="mb-4 text-blueGray-500">
                        We provide you with a huge variety of antiques to satisfy your shoppping cravings all at one stop.
                      </p>
                    </div>
                  </div>
            
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto overflow-hidden pb-20">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-sitemap text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Advertising products
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Just upload the products that you want to sell with a minimum bidding price and a start time. Take the advertisement off when you feel satisfied with the offered price.
              </p>
              <div className="block pb-6">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Paintings
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Jewellwery
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Crockery
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Show-piece
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Vases
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Costumes
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Coins & Money
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Memorabilia
                </span>
              </div>
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=nr-index"
                target="_blank"
                className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
              >
                View All{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </a>
            </div>

            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
            
                <img
                  alt="..."
                  src={require("assets/img/seller.jpg").default}
                  className="w-full align-middle rounded-lg absolute shadow-lg -top-160-px left-260-px max-w-210-px"
                />
                <img
                  alt="..."
                  src={require("assets/img/auction.jpg").default}
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px -top-225-px left-40-px z-2"
                />
                <img
                  alt="..."
                  src={require("assets/img/paintings.jpg").default}
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                />
                <img
                  alt="..."
                  src={require("assets/img/place-bid2.jpg").default}
                  className="w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center pt-32">
            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
              <div className="justify-center flex flex-wrap relative">
                <div className="my-4 w-full lg:w-6/12 px-4">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://previews.123rf.com/images/powerart/powerart1708/powerart170805746/84860645-isolated-drawing-outline-symbol-on-clean-background-vector-painting-element-in-trendy-style-.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Paintings
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://thumbs.dreamstime.com/b/ring-icon-line-pixel-perfect-style-jewellery-symbol-web-design-vector-pictogram-fortuneteller-fashion-wedding-171477157.jpg"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Jewellwery
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://media.istockphoto.com/vectors/vector-image-of-a-flat-isolated-icon-dollar-sign-currency-exchange-vector-id1151557689?k=20&m=1151557689&s=612x612&w=0&h=SgftvPGhI2jYVS02mC65yWuff_SDNNrTM1wcV6Cpln8="
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Coins & Money
                      </p>
                    </div>
                  </a>
                </div>
                <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-yellow-500 shadow-lg rounded-lg text-center p-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="data:image/jpeg;base64,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"
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Home-Decor
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/angular/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="bg-red-700 shadow-lg rounded-lg text-center p-8 mt-8">
                      <img
                        alt="..."
                        className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                        src="https://media.istockphoto.com/vectors/chef-hat-icon-flat-vector-template-design-trendy-vector-id1222860305?k=20&m=1222860305&s=612x612&w=0&h=Y_defoWFhcRU6k5rDLAVyPYgWbAM94qB4zV5zenUlBM="
                      />
                      <p className="text-lg text-white mt-4 font-semibold">
                        Costumes
                      </p>
                    </div>
                  </a>
                 
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-drafting-compass text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Bidding for Products
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
    
                We have a variety of products on which the pickers can place bids on any product they like. 
                The process of auction takes place for a specfic duration of time where bidders can place bids on
                any products available for bidding. The bidding results are then declared by the seller after closing the 
                auction.
              </p>
             
              
            </div>
          </div>
        </div>

        <div className="justify-center text-center flex flex-wrap mt-24">
          <div className="w-full md:w-6/12 px-12 md:px-4">
            <h2 className="font-semibold text-4xl">About Antiquely</h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-500">
              Antiquley is all about providing a platform for it users for buying, selling and bidding for 
              vintage/antique products.
            </p>
          </div>
        </div>
      </section>

      <section className="block relative z-1 bg-blueGray-600">
        <div className="container mx-auto">
          <div className="justify-center flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4  -mt-24">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Buying
                  </h5>
                  <Link to="/auth/login">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/buying.jpg").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                  Selling
                  </h5>
                  <Link to="/profile">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/selling.jpg").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Bidding
                  </h5>
                  <Link to="/landing">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/bidding.jpg").default}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blueGray-600 overflow-hidden">
        <div className="container mx-auto pb-64">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-code-branch text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                Online free platform
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">
               
              Antiquely is a free online plaform where no buyers or sellers need to pay for using this platform.
              You can give this application a try to feel the experience of shopping antiques online and also
              buy them at a good market price and sell them reasonalby if you want.


              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400">
                Please help us spread the news with a
                Star!
              </p>
            
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative">
              <i className="fab fa-github text-blueGray-700 absolute -top-150-px -right-100 left-auto opacity-80 text-55"></i>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
