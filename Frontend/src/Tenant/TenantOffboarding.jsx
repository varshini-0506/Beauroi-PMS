import { useState } from "react";

const TenantOffboarding = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    propertyAddress: "",
    moveOutDate: "",
    reason: "",
    feedback: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await fetch("/api/tenant/offboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMsg("Offboarding request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          propertyAddress: "",
          moveOutDate: "",
          reason: "",
          feedback: "",
        });
      } else {
        setErrorMsg(result.message || "Failed to submit request.");
      }
    } catch (error) {
      setErrorMsg("Server error. Please try again later.");
      console.error("❌ Offboarding Error:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Tenant Offboarding Form</h2>

      {successMsg && <p className="text-green-600 mb-4">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="propertyAddress"
          placeholder="Property Address"
          value={formData.propertyAddress}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="date"
          name="moveOutDate"
          value={formData.moveOutDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="reason"
          placeholder="Reason for Leaving"
          value={formData.reason}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <textarea
          name="feedback"
          placeholder="Additional Feedback (optional)"
          value={formData.feedback}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md resize-none"
          rows="4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
        >
          Submit Offboarding Request
        </button>
      </form>
    </div>
  );
};

export default TenantOffboarding;
