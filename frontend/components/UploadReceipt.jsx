import React, { useState } from "react";
import axios from "axios";

export default function UploadReceipt() {

  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const uploadReceipt = async () => {

    console.log("BUTTON CLICKED");

    if (!file) {
      alert("Please select file");
      return;
    }

    try {

      const formData = new FormData();

      formData.append("receipt", file);

      console.log("Sending API request");

      const res = await axios.post(
        "http://localhost:4000/scan-receipt",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("API RESPONSE:", res.data);

      setData(res.data.extracted);

    } catch (err) {

      console.log("UPLOAD ERROR");

      console.log(err);

      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <div className="p-5">

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />

      <button
        onClick={uploadReceipt}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Upload Receipt
      </button>

      {data && (
        <div className="mt-5">
          <h2>Vendor: {data.vendor}</h2>
          <h2>Amount: ₹{data.amount}</h2>
          <h2>Date: {data.date}</h2>
        </div>
      )}

    </div>
  );
}