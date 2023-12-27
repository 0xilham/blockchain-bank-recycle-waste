import React, { useState, useEffect } from "react";
import { Link as LinkScroll } from "react-scroll";
import LogoBRW from "../../public/assets/Title_Ic.svg";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          "fixed top-0 w-full bg-white z-50 transition-all " +
          (scrollActive ? " shadow-md pt-0" : " pt-4")
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Link href="/">
              <LogoBRW className="h-8 w-auto cursor-pointer" />
            </Link>
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-10 text-black-500 items-center justify-end">
            <LinkScroll
              activeClass="active"
              to="Hero"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("Hero");
              }}
              onClick={() => {
                if (window.location.pathname !== "/") {
                  if (window.location.pathname === "/") {
                  } else {
                    window.location.href = ".";
                  }
                }
              }}
              className={
                "px-7 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "Hero"
                  ? " text-green-500 animation-active "
                  : " text-black-500 hover:text-green-500 a")
              }
            >
              Home
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="Explore"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("Explore");
              }}
              onClick={() => {
                if (window.location.pathname !== "/") {
                  if (window.location.pathname === "/pages/ExploreNFT") {
                  } else {
                    window.location.href = ".";
                  }
                }
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "Explore"
                  ? " text-green-500 animation-active "
                  : " text-black-500 hover:text-green-500 ")
              }
            >
              Explore
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="Create"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("Create");
              }}
              onClick={() => {
                if (window.location.pathname !== "/") {
                  if (window.location.pathname === "/pages/CreateNFT") {
                  } else {
                    window.location.href = ".";
                  }
                }
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "Create"
                  ? " text-green-500 animation-active "
                  : " text-black-500 hover:text-green-500 ")
              }
            >
              Create
            </LinkScroll>
          </ul>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
            <ConnectButton
              label="Sign In"
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
            />
          </div>
        </nav>
      </header>
      {/* Mobile Navigation */}

      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
        <div className="bg-white sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            <LinkScroll
              activeClass="active"
              to="Hero"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("Hero");
              }}
              onClick={() => {
                if (window.location.pathname !== "/") {
                  if (window.location.pathname === "/") {
                  } else {
                    window.location.href = ".";
                  }
                }
              }}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "Hero"
                  ? "  border-green-500 text-green-500"
                  : " border-transparent")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9 M9 22V12h6v10M2 10.6L12 2l10 8.6"
                />
              </svg>
              Home
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="Explore"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("Explore");
              }}
              onClick={() => {
                if (window.location.pathname !== "/") {
                  if (window.location.pathname === "/pages/ExploreNFT") {
                  } else {
                    window.location.href = ".";
                  }
                }
              }}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "Explore"
                  ? "  border-green-500 text-green-500"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Explore
            </LinkScroll>
            <LinkScroll
              activeClass="active"
              to="Create"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("Create");
              }}
              onClick={() => {
                if (window.location.pathname !== "/") {
                  if (window.location.pathname === "/pages/CreateNFT") {
                  } else {
                    window.location.href = ".";
                  }
                }
              }}
              className={
                "mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "Create"
                  ? "  border-green-500 text-green-500"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Create
            </LinkScroll>
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
};

export default Header;
