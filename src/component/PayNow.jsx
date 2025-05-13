import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
const PayNow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [card, setCard] = useState(null);
  const [cardTokenizer, setCardTokenizer] = useState(null);
  const cardContainerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "100.00" // Default amount $100
  });

  // Load Square Web Payments SDK
  useEffect(() => {
    // Load the Square Web Payments SDK script
    const loadSquareSdk = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
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

  // Initialize Square Web Payments SDK
  const initializeSquare = async () => {
    if (!window.Square) {
      setError('Square SDK failed to load');
      return;
    }

    try {
      const payments = window.Square.payments('sandbox-sq0idb-wETAJ3Vhq3ljWtBn0xoB8Q', 'LC9S6PK7ZRWHR');
      const card = await payments.card();
      await card.attach('#card-container');
      setCard(card);
      setCardTokenizer(payments);
    } catch (error) {
      console.error('Square initialization failed:', error);
      setError('Payment system initialization failed');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
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
      // Tokenize the card
      const result = await card.tokenize();
      if (result.status === 'OK') {
        const sourceId = result.token;
        
        // Send the token to your backend
        const response = await fetch("https://testexpress-one.vercel.app/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sourceId: sourceId,
            amount: parseFloat(formData.amount) * 100, // Convert to cents
            currency: "USD",
            // Include other data like customer name, email, etc.
            customerDetails: {
              name: formData.name, 
              email: formData.email
            }
          }),
        });

        const data = await response.json();
        
        if (response.ok && data.success) {
          //sent email to westavemusic@gmail.com
          emailjs
          .send(
            "service_b1nhkup",
            "template_uisz8mv", //this template id for payment related mail
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
          // You might redirect to a receipt page or clear the form
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
    <div className="min-h-screen bg-gray-900 pt-24 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-10">Make a Payment</h1>
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent text-white border border-white p-2 rounded-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent text-white border border-white p-2 rounded-md"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">
              Amount
            </label>
            <div className="flex items-center border border-white rounded-md overflow-hidden">
              <span className="bg-white/20 text-white px-3 py-2">$</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="1"
                step="0.01"
                className="w-full bg-transparent text-white border-0 p-2"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">
              Card Details
            </label>
            <div id="card-container" ref={cardContainerRef} className="p-3 border border-white rounded-md min-h-[40px]" />
            {!card && <p className="text-white text-xs mt-2">Loading payment form...</p>}
          </div>
          
          <button
            type="submit"
            disabled={loading || !card}
            className="w-full border border-white text-white bg-transparent hover:bg-white hover:text-black transition-all py-2 font-semibold disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PayNow; 