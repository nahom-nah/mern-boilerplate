import React, { useContext, useState } from "react";
import authContext from "./../context/authContext";
import { LogoutIcon } from "@heroicons/react/outline";
import axios from "axios";

const Home = () => {
  const { loggedInState, getLoggedIn } = useContext(authContext);

  const handleLogout = async () => {
    await axios.get("http://localhost:9000/api/v1/auth/logout", {
      withCredentials: true,
    });
    getLoggedIn();
  };
  return (
    <div>
      <div className="h-14 py-2 px-8 flex justify-between items-center bg-black">
        <div className="flex items-center justify-center">
          <div className="px-1 h-6 bg-yellow-600"></div>
          <div className="px-0.5 h-4 ml-1  bg-red-400"></div>
          <div className="text-white ml-2 font-semibold text-xl text-center">
            Nahi
          </div>
        </div>
        <ul className="flex items-center justify-between w-1/4">
          <li className="text-white font-semibold">About</li>
          <li className="text-white font-semibold">Contact</li>
          <li className="text-white">
            {loggedInState.isLoggedIn === true ? (
              <div className="flex items-center ">
                <button
                  onClick={handleLogout}
                  className="flex hover:bg-gray-800 px-2 py-1 rounded-sm"
                >
                  <span>
                    <LogoutIcon className="h-6" />
                  </span>
                  <span className=" font-semibold ">Log out</span>
                </button>

                <div className="rounded-full ml-2 w-12 h-12">
                  <img
                    // onClick={handleDropDownOpen}
                    src="pro3.jpg"
                    alt="account Profile"
                    className=" w-10 rounded-full"
                  />
                </div>
              </div>
            ) : loggedInState.isLoggedIn === false ? (
              <>
                {" "}
                <a
                  href="/register"
                  className="px-8 py-2 text-sm rounded-lg bg-gradient-to-br from-yellow-600 hover:from-yellow-700 hover:to-red-700 to-red-500"
                >
                  Sign Up
                </a>
              </>
            ) : (
              <></>
            )}
          </li>
        </ul>
      </div>
      <div className="flex text-white absolute top-28 right-96">
        <div className="px-1 h-6 bg-yellow-500"></div>
        <div className="text-white text-sm font-semibold pl-2">
          Nahom Balcha
        </div>
      </div>
      <div className="flex">
        <div className="h-96 pt-32 pb-16  flex items-center  bg-black w-screen px-8">
          <div>
            <div className=" text-white  mt-2 ml-10 ">
              <span className="text-4xl font-bold">MERN</span>
              <span className="font-thin text-2xl text-yellow-500">
                boilerplate
              </span>
            </div>
            <div className="text-white ml-10 w-2/6 mt-2 font-light text-sm">
              this is a MERN stack boilerplate. the aim of this project is to
              implement a more secure authentication method with consideration
              of a clean ui and to make this project ready to use for other
              projects
            </div>
            <button className="ml-10 mt-6 px-8 py-2 text-sm text-white rounded-lg bg-gradient-to-br from-yellow-600 hover:from-yellow-700 hover:to-red-700 to-red-500">
              Click Me
            </button>
          </div>
        </div>

        <img
          src="dev.png"
          alt="dev"
          className="right-0 absolute h-5/6 bottom-0 "
        />
      </div>{" "}
      <div className="ml-10 pl-10 w-96">
        <div className="text-2xl font-bold text-gray-900 mt-8">About Me</div>
        <div className="text-sm font-semibold text-gray-900">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          ea voluptatum, quas facilis quod error! Aperiam, recusandae nisi
          excepturi perferendis similique enim nemo libero ex magnam
          perspiciatis. Quam, labore molestiae.
        </div>
        <button className="mt-6 px-12 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-gray-900 hover:from-yellow-700 hover:to-red-700 to-gray-600">
          Click Me
        </button>
      </div>
    </div>
  );
};

export default Home;
