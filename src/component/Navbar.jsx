import React from "react";
import WestAvelogo from "../assets/WestAvelogo.png";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isContactPage = location.pathname === "/contact";
  // const isPayNowPage = location.pathname === "/paynow";
  const isTicketsPage = location.pathname === "/tickets";

  
  const getLink = () => {
    if (isContactPage || isTicketsPage) {
      return {
        href: "/",
        text: "Exit Window"
      };
    } else {
      return {
        href: "/contact",
        text: "Contact"
      };
    }
  };

  const { href, text } = getLink();

  return (
    <nav className="fixed justify-between items-center top-0 left-0 w-full bg-white/10 backdrop-blur-sm z-50 px-6 py-4 flex gap-6 shadow-sm border-b border-gray-100">
      <a href="/" className="text-black hover:text-blue-600 font-semibold">
        <div className="text-4xl text-white ">
          {/* <BsFillBarChartFill /> */}
          <img src={WestAvelogo} alt="West Ave Logo" className="w-16 h-auto" />

        </div>
      </a>

      <div className=" flex gap-10 items-center justify-center">
        <p className="uppercase text-bold text-center  text-white relative group w-fit cursor-pointer">
          {/* +1 305 924 7382 */}
          <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
        </p>
        
        {/* PayNow Link - only show if not on PayNow page */}
        {/* {!isPayNowPage && (
          <a
            href="/paynow"
            className="text-black hover:text-blue-600 font-semibold"
          >
            <div className="text-white bg-black flex justify-center items-center">
              [<span className="px-6 animate-fadeInOut">Talib Kweli Tickets</span>]
            </div>
          </a>
        )} */}
        {!isTicketsPage && (
  <a
    href="/tickets"
    className="text-black hover:text-blue-600 font-semibold"
  >
    <div className="text-white bg-black flex justify-center items-center">
      [<span className="px-6 animate-fadeInOut">Coming Soon</span>]
    </div>
  </a>
)}

        {/* Contact Link - show except when on the contact page */}
        {!isContactPage && (
          <a
            href={href}
            className="text-black hover:text-blue-600 font-semibold"
          >
            <div className="text-white bg-black flex justify-center items-center">
              [<span className="px-6 animate-fadeInOut">{text}</span>]
            </div>
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
