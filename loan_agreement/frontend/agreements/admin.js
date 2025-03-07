// Admin Panel: View Signed Agreements
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [agreements, setAgreements] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/agreements")
      .then((response) => setAgreements(response.data))
      .catch((error) => console.error("Error fetching agreements", error));
  }, []);

  const filteredAgreements = agreements.filter((agreement) =>
    agreement.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Signed Agreements</h1>
      <input 
        type="text" 
        placeholder="Search by name" 
        onChange={(e) => setSearch(e.target.value)} 
        className="border p-2 w-full mb-4"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Full Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Loan Amount</th>
            <th className="border p-2">Signature</th>
          </tr>
        </thead>
        <tbody>
          {filteredAgreements.map((agreement) => (
            <tr key={agreement.id} className="text-center border">
              <td className="border p-2">{agreement.full_name}</td>
              <td className="border p-2">{agreement.email}</td>
              <td className="border p-2">{agreement.phone}</td>
              <td className="border p-2">{agreement.loan_amount}</td>
              <td className="border p-2">
                {agreement.signature_type === "hand" ? (
                  <img src={agreement.signature} alt="Signature" className="w-24 h-12 mx-auto border" />
                ) : (
                  <span className="italic">{agreement.signature}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
