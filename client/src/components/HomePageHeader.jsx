import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePageHeader = ({ openPopup }) => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // To programmatically redirect

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the sign-in page
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchCurrentUser = async () => {
      try {
        const useRes = await axios.get("/me", {
          headers: {
            token: token,
          },
        });

        console.log(`name : ${useRes.data.user.username}`);

        setUserName(useRes.data.user.username);
      } catch (err) {
        console.log(err);
        setUserName("Guest");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <header className="bg-teal-700 text-white sticky top-0 z-10">
      <section className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-medium">
          <a href="#hero" className="inline-flex items-center space-x-0">
            <span className="mr-[-2px]">💲</span>plitwise
          </a>
        </h1>

        <div>
          <button
            id="mobile-open-button"
            className="text-3xl sm:hidden focus:outline-none"
          >
            ☰
          </button>
          <nav className="hidden sm:block space-x-8 text-xl" aria-label="main">
            <Link to="#groups" className="hover:opacity-90">
              Groups
            </Link>
            <Link to="#" onClick={openPopup} className="hover:opacity-90">
              Friends
            </Link>
            <Link to="#activity" className="hover:opacity-90">
              Activity
            </Link>
            <Link
              to="#account"
              className="relative border-2 border-teal-400 rounded-full hover:opacity-90 p-4"
            >
              👤
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 hover:opacity-100 transition-opacity">
                {loading ? "Loading..." : userName}
              </span>
            </Link>
            {/* <Link to="#account" className="border-2 border-teal-400 rounded-full hover:opacity-90 p-4">👤</Link> */}
          </nav>
        </div>

        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default navigation
            handleLogout();
          }}
          className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
        >
          Logout
        </Link>
      </section>
    </header>
  );
};

export default HomePageHeader;
