// import React, { useRef, useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";

// const ContactForm = () => {
//   const recaptchaRef = useRef();
//   const [captchaValue, setCaptchaValue] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!captchaValue) {
//       alert("Please verify you are not a robot.");
//       return;
//     }

  
//     alert("Form submitted successfully!");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
//       <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full uppercase bg-transparent text-white  border-white  outline-none placeholder-gray-400 py-2"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full uppercase bg-transparent text-white border-t-2 border-white  outline-none placeholder-gray-400 py-2"
//         />
//         <input
//           type="tel"
//           placeholder="Phone"
//           className="w-full uppercase bg-transparent text-white border-t-2 border-white  outline-none placeholder-gray-400 py-2"
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           className="w-full uppercase  bg-transparent text-white border-t-2 border-white  outline-none placeholder-gray-400 py-2"
//         />
//         <input
//           type="text"
//           placeholder="Date of Event"
//           className="w-full uppercase  bg-transparent text-white border-t-2 border-white  outline-none placeholder-gray-400 py-2"
//         />
//         <textarea
//           placeholder="Message"
//           rows="4"
//           className="w-full uppercase bg-transparent text-white border-t-2 border-b-2 border-white outline-none placeholder-gray-400 py-2 resize-none"
//         ></textarea>

//         <div className="flex ">
//           <ReCAPTCHA
//             ref={recaptchaRef}
//             sitekey="6LcsrBgrAAAAAPUdsU7SvUePGn248qAo1sfE_O_e"
//             onChange={(value) => setCaptchaValue(value)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all py-2 font-semibold"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
// import React, { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";

// const ContactForm = () => {
//   const formRef = useRef();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setIsSubmitting(true);

//     emailjs
//       .sendForm(
//         "service_n93o0v8",
//         "template_mngqvo1",
//         formRef.current,
//         "wz-JWWkqqkcQOOh0c"
//       )
//       .then(() => {
//         alert("Form submitted successfully!");
//         formRef.current.reset();
//       })
//       .catch((error) => {
//         console.error("EmailJS Error:", error);
//         alert("An error occurred. Please try again.");
//       })
//       .finally(() => setIsSubmitting(false));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
//       <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           className="w-full uppercase bg-transparent text-white border-white outline-none placeholder-gray-400 py-2"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
//           required
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone"
//           className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
//         />
//         <input
//           type="text"
//           name="date"
//           placeholder="Date of Event"
//           className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
//         />
//         <textarea
//           name="message"
//           placeholder="Message"
//           rows="4"
//           className="w-full uppercase bg-transparent text-white border-t-2 border-b-2 border-white outline-none placeholder-gray-400 py-2 resize-none"
//         ></textarea>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all py-2 font-semibold"
//         >
//           {isSubmitting ? "Sending..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;


import React from "react";

const ContactForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
      <form
        action="mailto:westavenuemusicmiami@gmail.com"
        method="POST"
        encType="text/plain"
        className="w-full max-w-lg space-y-6"
      >
        <input
          type="text"
          name="Name"
          placeholder="Name"
          className="w-full uppercase bg-transparent text-white border-white outline-none placeholder-gray-400 py-2"
          required
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
          required
        />
        <input
          type="tel"
          name="Phone"
          placeholder="Phone"
          className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
        />
        <input
          type="text"
          name="Location"
          placeholder="Location"
          className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
        />
        <input
          type="text"
          name="Event Date"
          placeholder="Date of Event"
          className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
        />
        <textarea
          name="Message"
          placeholder="Message"
          rows="4"
          className="w-full uppercase bg-transparent text-white border-t-2 border-b-2 border-white outline-none placeholder-gray-400 py-2 resize-none"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all py-2 font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
