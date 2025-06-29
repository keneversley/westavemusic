import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import logo from '../assets/squarelogo.png';

const Tickets = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [card, setCard] = useState(null);
  const [cardTokenizer, setCardTokenizer] = useState(null);
  const cardContainerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "30.00"
  });

  useEffect(() => {
    const loadSquareSdk = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://web.squarecdn.com/v1/square.js';
        script.async = true;
        script.onload = initializeSquare;
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        };
      } catch (error) {
        console.error('Failed to load Square SDK:', error);
        setError('Failed to load payment system');
      }
    };

    loadSquareSdk();
  }, []);

  const initializeSquare = async () => {
    if (!window.Square) {
      setError('Square SDK failed to load');
      return;
    }

    try {
      const payments = window.Square.payments('sq0idp-ery01LHxGe9EEsF-ghfW1w', 'L6NVYSZTQZH8R');
      const card = await payments.card();
      await card.attach('#card-container');
      setCard(card);
      setCardTokenizer(payments);
    } catch (error) {
      console.error('Square initialization failed:', error);
      setError('Payment system initialization failed');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!card) {
      setError('Payment system not initialized');
      setLoading(false);
      return;
    }

    try {
      const result = await card.tokenize();
      if (result.status === 'OK') {
        const sourceId = result.token;

        const response = await fetch("https://testexpress-one.vercel.app/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourceId: sourceId,
            amount: parseFloat(formData.amount) * 100,
            currency: "USD",
            customerDetails: {
              name: formData.name,
              email: formData.email
            }
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          emailjs
            .send(
              "service_b1nhkup",
              "template_uisz8mv",
              {
                customer_name: formData.name,
                customer_email: formData.email,
                payment_amount: formData.amount,
                payment_id: data.paymentId,
                payment_status: data.status,
                payment_receipt_url: data.receiptUrl
              },
              "zGbTtUsh87tzsK45h"
            )
            .then(() => {
              console.log("Email sent successfully!");
            })
            .catch((error) => {
              console.error("EmailJS Error:", error);
            });
           // want to sent another mail to customer with payment details
           emailjs
           .send(
             "service_b1nhkup",
             "template_grq0olu",
             {
               customer_name: formData.name,
               customer_email: formData.email,
               payment_amount: formData.amount,
               payment_id: data.paymentId,
               payment_status: data.status,
               payment_receipt_url: data.receiptUrl
             },
             "zGbTtUsh87tzsK45h"
           )
           .then(() => {
             console.log("Email sent successfully!");
           })
           .catch((error) => {
             console.error("EmailJS Error:", error);
           });

          setSuccess(true);
        } else {
          setError(data.message || "Payment processing failed");
        }
      } else {
        setError(result.errors[0].message || 'Card tokenization failed');
      }
    } catch (err) {
      setError("Payment processing failed: " + (err.message || "Unknown error"));
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 px-4 flex flex-col items-center justify-center">
        {/* Image directly below nav */}
        <div className="mb-10">
          <img
            src="/images/talib.PNG"
            alt="Talib"
            className="w-48 h-auto mx-auto rounded shadow-lg"
          />
        </div>

        <div className="bg-green-100 text-green-800 p-6 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Payment Successful!</h2>
          <p>Thank you for your payment. A receipt has been sent to your email.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-900 pt-24 px-4 flex flex-col items-center">
      {/* Image directly below nav */}
      <div className="mb-10">
        {/* <img
          src="/images/talib.PNG"
          alt="Talib"
          className="w-96 h-auto mx-auto rounded shadow-lg"
        /> */}
      </div>
{/* 
      <h1 className="text-3xl font-bold text-black mb-10">Get Your Talib Kweli Tickets Now</h1> */}
 <div className="flex flex-col items-center mb-10">
  <h1 className="text-3xl font-bold text-black mb-4">
    Updates are coming soon
  </h1>
{/* <small>ALL SALES FINAL AND NO RE-ENTRY DAY OF THE EVENT</small>  */}
</div>


      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <img src={logo} alt="Logo" className="w-24 h-auto mb-6 mx-auto" />

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            {/* <label className="block text- text-sm font-medium">Full Name</label> */}
            <label className="block text-black text-sm font-medium">Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent text-black border border-black p-2 rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-black text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent text-black border border-black p-2 rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-black text-sm font-medium">Amount</label>
            <div className="flex items-center border border-black rounded-md overflow-hidden">
              <span className="bg-black/20 text-black px-3 py-2">$</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="1"
                step="0.01"
                className="w-full bg-transparent text-black border-0 p-2"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-black text-sm font-medium">Card Details</label>
            <div id="card-container" ref={cardContainerRef} className="p-3 border border-black rounded-md min-h-[40px]" />
            {!card && <p className="text-black text-xs mt-2">Loading payment form...</p>}
          </div>

          <button
            type="submit"
            disabled={loading || !card}
            className="w-full border border-black text-black bg-transparent hover:bg-black hover:text-black transition-all py-2 font-semibold disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tickets;
