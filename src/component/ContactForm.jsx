import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_b1nhkup",
        "template_vvxrx4f",
        formRef.current,
        "zGbTtUsh87tzsK45h"
      )
      .then(() => {
        alert("Form submitted successfully!");
        formRef.current.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("An error occurred. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
      <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full  bg-transparent text-white border-white outline-none placeholder-gray-400 py-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full  bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="w-full  bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full  bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
        />
        <input
          type="text"
          name="date_of_event"
          placeholder="Date of Event"
          className="w-full  bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
        />
        <textarea
          name="message"
          placeholder="Message"
          rows="4"
          className="w-full  bg-transparent text-white border-t-2 border-b-2 border-white outline-none placeholder-gray-400 py-2 resize-none"
        ></textarea>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all py-2 font-semibold"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;