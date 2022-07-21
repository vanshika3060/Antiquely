import UserPool from "./UserPool";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const { default: axios } = require('axios')




export default function Register() {


  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  var uuid = require('uuid');


  const onSubmit = (event) => {

    event.preventDefault();
    UserPool.signUp(email,password, [], null, (err, data) =>
    {
      if(err)
      {
        console.error(err);
      }
      console.log(data);
    });
    try {
      const user_id = uuid.v4();
      axios({
        url: 'https://ke0q79ybf5.execute-api.us-east-1.amazonaws.com/userOperations',
        method: 'POST',
        data: {
          
            "table": "users",
            "action": "CREATE_NEW_USER",
            "data": {
              "user_id": user_id,
              "email_id": email
            }
        },
      }).then(
        (response) => {
          console.log(response)
          localStorage.setItem("USER_ID", user_id.toString());

        },
        (error) => {
          console.log(error)
        }
      )
    } catch (err) {
      console.log(err)
    }
  }



  const handleChange = (event) => {
    // console.log(event.target)
    if (event.target.id === "firstname") {
      // console.log("fname", event.target.value)
      setFirstName(event.target.value);
    }
    else if (event.target.id === "lastname") {
      setLastName(event.target.value);
    }
    else if (event.target.id === "email") {
      setEmail(event.target.value);
    } 
    else if (event.target.id === "password") {
      setPassword(event.target.value);
    } 
    else if (event.target.id === "confirm_pass") {
      setConfirmPassword(event.target.value);
    }
  }


  useEffect(() => {
    if (firstname.match("^[A-Za-z]*$") === null) {
      setErrorFirstName("First name can only contain letters");
    } else if (firstname == "") {
      setErrorFirstName("First name cannot be blank");
    } else {
      setErrorFirstName("");
    }
    
    if (lastname.match("^[A-Za-z]*$") === null) {
      setErrorLastName("Last name can only contain letters");
    } else if (lastname == "") {
      setErrorLastName("Last name cannot be blank");
    } else {
      setErrorLastName("");
    }

    if (email == "") {
      setErrorEmail("Email cannot be blank");
    } else if (/\S+@\S+\.\S+/.test(email) == false) {
      setErrorEmail("Enter a valid email");
    } else {
      setErrorEmail("");
    }

    if (password.length < 8) {
      setErrorPassword("Password cannot be less than 8 letters");
    } else if (password == "") {
      setErrorPassword("Password cannot be blank");
    } else {
      setErrorPassword("");
    }

    if (confirmPassword !== password) {
      setErrorConfirmPassword("Confirm password should be same as password");
    } else if (confirmPassword === "") {
      setErrorConfirmPassword("Confirm password cannot be blank");
    } else {
      setErrorConfirmPassword("");
    }
  }, [firstname, lastname, password, email, confirmPassword]);

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h1 className="text-blueGray-500 text-sm font-bold">
                    Antiquely
                  </h1>
                </div>

               
                <form onSubmit={onSubmit}>

                <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="First Name"
                      value={firstname}
                      onChange={handleChange}
                      required
                    />
                    <p>{errorFirstName}</p>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Last Name"
                      value={lastname}
                      onChange={handleChange}
                      required
                    />
                    <p>{errorLastName}</p>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                    <p>{errorEmail}</p>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={handleChange}
                      required
                    />
                    <p>{errorPassword}</p>

                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirm_pass"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={confirmPassword}
                      onChange={handleChange}
                
                      required
                    />
                    <p>{errorConfirmPassword}</p>

                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={handleChange}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">

                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={onSubmit}
                    >
                      Create Account
                    </button>

                    {/* <Link to="/admin/dashboard" className="text-blueGray-200">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                      >
                        Create Account
                      </button>
                    </Link> */}

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
