import { MailIcon, LockClosedIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import authContext from "./../context/authContext";
import axios from "axios";
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { getLoggedIn } = useContext(authContext);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/api/v1/auth/login", form, {
        withCredentials: true,
      })
      .then((res) => {
        getLoggedIn();
      });
  };
  return (
    <div className="flex">
      <div
        className="h-screen w-2/6 bg-black flex items-center justify-center"
        style={{
          background: "url(kido2.jpeg) no-repeat fixed",
          height: "100vh",
          backgroundSize: "60% 50%",
          backgroundColor: "black",
        }}
      >
        <div>
          <Link to="/">
            {" "}
            <div className="flex items-center justify-center">
              <div className="px-1 h-12 bg-yellow-600"></div>
              <div className="px-0.5 h-6 ml-1  bg-red-400"></div>
              <div className="text-white ml-2 font-semibold text-2xl text-center">
                Nahi
              </div>
            </div>
          </Link>

          <div className=" text-white text-center mt-2">
            <span className="text-lg font-bold">MERN</span>
            <span className="font-thin">boilerplate</span>
          </div>
          <div className=" text-center mt-6 mx-10 text-sm font-thin text-gray-100">
            this is a <span>MERN</span> stack boilerplate. the aim of this
            project is to implement a more secure authentication method with
            consideration of a clean ui and to make this project ready to use
            for other projects
          </div>
        </div>
      </div>
      <div className=" w-4/6 pt-2 px-2">
        <div className="flex justify-end items-center">
          <div className="text-sm font-semibold text-gray-600">
            Don't have have an account?
          </div>
          <a
            href="/register"
            className="px-5 py-1 bg-gradient-to-br from-yellow-500 to-red-400 hover:from-yellow-600 hover:to-red-500  ml-2 rounded-md text-white text-sm"
          >
            Sign Up
          </a>
        </div>
        <div className="mx-16   h-5/6 flex items-center">
          <div>
            <div className="flex items-center">
              <div className="text-lg font-semibold text-gray-900">
                Log into
              </div>
              <div className=" text-black text-center ml-1">
                <span className="text-lg font-bold"> MERN</span>
                <span className="font-normal text-yellow-600">boilerplate</span>
              </div>
            </div>
            <form className="mt-6">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-600 mt-2"
              >
                Email
              </label>
              <div className="flex border px-2 py-1 mt-1 rounded-sm w-80 mb-2">
                <MailIcon className="h-6 px-1" />
                <input
                  className="focus:outline-none w-60"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  placeholder="example@gmail.com"
                />
              </div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-600 mt-2"
              >
                Password
              </label>
              <div className="flex border px-2 py-1 mt-1 rounded-sm w-80">
                <LockClosedIcon className="h-6 px-1" />
                <input
                  className="focus:outline-none w-60"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  placeholder="********"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="px-5 py-1 mt-4 bg-gray-900 text-white text-sm font-semibold"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
