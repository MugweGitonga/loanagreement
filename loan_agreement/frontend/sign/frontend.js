// Frontend: React + Tailwind UI
import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";

const LoanAgreement = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    loan_amount: "",
    signature: "",
    signature_type: "typed",
  });
  const [sigPad, setSigPad] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    sigPad.clear();
    setFormData({ ...formData, signature: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.signature_type === "hand" && sigPad) {
      setFormData({ ...formData, signature: sigPad.getTrimmedCanvas().toDataURL("image/png") });
    }
    
    try {
      const response = await axios.post("http://localhost:5000/sign", formData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error submitting agreement");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Loan Agreement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="loan_amount" placeholder="Loan Amount" onChange={handleChange} className="border p-2 w-full" required />
        
        <label className="block font-bold">Signature Type:</label>
        <select name="signature_type" onChange={handleChange} className="border p-2 w-full">
          <option value="typed">Typed Signature</option>
          <option value="hand">Hand-drawn Signature</option>
        </select>
        
        {formData.signature_type === "typed" && (
          <input type="text" name="signature" placeholder="Type your name" onChange={handleChange} className="border p-2 w-full" required />
        )}
        
        {formData.signature_type === "hand" && (
          <div>
            <SignatureCanvas ref={(ref) => setSigPad(ref)} penColor="black" canvasProps={{ width: 500, height: 200, className: "border" }} />
            <button type="button" onClick={handleClear} className="bg-red-500 text-white px-4 py-2 mt-2">Clear</button>
          </div>
        )}
        
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
      </form>
    </div>
  );
};

export default LoanAgreement;
