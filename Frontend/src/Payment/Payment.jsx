/*import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaCreditCard, FaUser, FaCalendarAlt, FaLock, FaDollarSign } from "react-icons/fa";

const Payment = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Payment processed successfully!");
  };

  return (
    <div className="bg-white shadow-lg rounded-3xl ml-104 p-8 w-full transition-all transform hover:scale-105">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-9 transition-all transform hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Secure Payment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name on Card</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="max-w-xs">
             <label className="block text-gray-600 font-medium mb-1">Amount</label>
             <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500">
             <FaDollarSign className="text-gray-400 mr-2" />
         <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            placeholder="Enter amount"
         />
        </div>
       </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Card Number</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500">
              <FaCreditCard className="text-gray-400 mr-2" />
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                maxLength={16}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Expiry Date</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500">
                <FaCalendarAlt className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">CVV</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  maxLength={3}
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;*/

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaCreditCard, FaUser, FaCalendarAlt, FaLock, FaDollarSign } from "react-icons/fa";

const Payment = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Payment processed successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-3xl ml-64 p-8 w-full bg-cover bg-center flex justify-center items-center px-4 backdrop-blur-md">
      <div className="w-full max-w-lg bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 transition-all transform hover:scale-[1.02]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Secure Payment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name on Card</label>
            <div className="flex items-center bg-white/60 border border-gray-300 rounded-xl px-4 py-2 shadow-inner">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Amount Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Amount</label>
            <div className="flex items-center bg-white/60 border border-gray-300 rounded-xl px-4 py-2 shadow-inner max-w-xs">
              <FaDollarSign className="text-gray-500 mr-3" />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Card Number Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Card Number</label>
            <div className="flex items-center bg-white/60 border border-gray-300 rounded-xl px-4 py-2 shadow-inner">
              <FaCreditCard className="text-gray-500 mr-3" />
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                maxLength={16}
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                placeholder="1234 5678 9012 3456"
              />
            </div>
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Expiry Date</label>
              <div className="flex items-center bg-white/60 border border-gray-300 rounded-xl px-4 py-2 shadow-inner">
                <FaCalendarAlt className="text-gray-500 mr-3" />
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">CVV</label>
              <div className="flex items-center bg-white/60 border border-gray-300 rounded-xl px-4 py-2 shadow-inner">
                <FaLock className="text-gray-500 mr-3" />
                <input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  maxLength={3}
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition duration-300"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;


