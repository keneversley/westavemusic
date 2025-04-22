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
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const siteKey = "6Lfr9R8rAAAAAKAKLJLvTt6quzJjMPaWnxN9Kqlr"; // Your reCAPTCHA Enterprise site key

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Trigger reCAPTCHA Enterprise and get token
    window.grecaptcha.enterprise.ready(() => {
      window.grecaptcha.enterprise
        .execute(siteKey, { action: "submit" })
        .then((token) => {
          setRecaptchaToken(token);

          // Use EmailJS to send form after getting token
          emailjs
            .sendForm(
              "service_n93o0v8", // EmailJS service ID
              "template_mngqvo1", // EmailJS template ID
              formRef.current,
              "LJzkDFZaZVLa_6ww2" // EmailJS public key
            )
            .then(() => {
              alert("Form submitted successfully!");
              formRef.current.reset();
              setRecaptchaToken("");
            })
            .catch((error) => {
              console.error("EmailJS Error:", error);
              alert("An error occurred. Please try again.");
            })
            .finally(() => setIsSubmitting(false));
        });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-10">
      <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full uppercase bg-transparent text-white border-white outline-none placeholder-gray-400 py-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
        />
        <input
          type="text"
          name="date"
          placeholder="Date of Event"
          className="w-full uppercase bg-transparent text-white border-t-2 border-white outline-none placeholder-gray-400 py-2"
        />
        <textarea
          name="message"
          placeholder="Message"
          rows="4"
          className="w-full uppercase bg-transparent text-white border-t-2 border-b-2 border-white outline-none placeholder-gray-400 py-2 resize-none"
        ></textarea>

        {/* Hidden field to include reCAPTCHA token in EmailJS form */}
        <input type="hidden" name="recaptchaToken" value={recaptchaToken} />

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
