import React from "react";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="bg-gray-900 min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-2 md:px-8">
      <div className="flex justify-start mt-24 w-full md:w-96">
        <p className="text-white">
          Our DJ's are nightLife veterans who work in a diverse array of clubs
          and nenues, bringing their talent and years of experience to our
          clients' events.
        </p>
      </div>
      <div>
        <ContactForm />
      </div>
      <div className="flex w-full justify-center">
        <div className="flex flex-col  gap-20 mt-24 w-full md:w-56">
          <div>
            <a href="https://www.instagram.com/">
              <p className="uppercase text-center text-white relative group w-fit cursor-pointer">
                Instagram
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </p>
            </a>

            <a href="https://mail.google.com/">
              <p className="uppercase text-center mt-6 text-white relative group w-fit cursor-pointer">
                Email
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
              </p>
            </a>
          </div>
          <div>hello</div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
