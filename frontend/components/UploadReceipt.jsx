import React, { useState } from "react";
import axios from "axios";
import {
  UploadCloud,
  FileImage,
  Receipt,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function UploadReceipt() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadReceipt = async () => {
    if (!file) {
      setError("Please select a receipt image.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setData(null);

      const formData = new FormData();
      formData.append("receipt", file);

      const res = await axios.post(
        "http://localhost:4000/scan-receipt",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      setData(res.data.extracted);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Receipt scanning failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in duration-700">
      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 rounded-3xl bg-slate-950 text-white shadow-lg">
            <Receipt size={28} strokeWidth={1.5} />
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Receipt Scanner
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Upload a bill or receipt to extract transaction data
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-100 text-rose-600 px-5 py-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top duration-300">
            <AlertCircle size={18} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* FILE UPLOAD */}
        <div className="space-y-5">
          <label className="block">
            <div className="border-2 border-dashed border-slate-200 hover:border-slate-400 transition-all rounded-[2rem] p-10 bg-slate-50/50 cursor-pointer group">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm mb-5 group-hover:scale-105 transition-transform">
                  <UploadCloud
                    size={32}
                    className="text-slate-700"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-slate-900 font-semibold text-lg">
                  Upload Receipt Image
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  PNG, JPG or JPEG supported
                </p>

                {file && (
                  <div className="mt-5 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium">
                    <FileImage size={16} />
                    {file.name}
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];

                  if (selectedFile) {
                    setFile(selectedFile);
                    setError("");
                  }
                }}
              />
            </div>
          </label>

          {/* BUTTON */}
          <button
            onClick={uploadReceipt}
            disabled={loading}
            className="w-full bg-slate-950 text-white py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Scanning Receipt...</span>
              </>
            ) : (
              <>
                <UploadCloud size={18} />
                <span>Scan Receipt</span>
              </>
            )}
          </button>
        </div>

        {/* RESULTS */}
        {data && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Extracted Data
                </h2>

                <p className="text-sm text-slate-400">
                  OCR scan completed successfully
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <p className="text-[11px] font-bold uppercase tracking-[2px] text-slate-400 mb-2">
                  Vendor
                </p>

                <h3 className="text-lg font-semibold text-slate-900">
                  {data.vendor || "Unknown Vendor"}
                </h3>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <p className="text-[11px] font-bold uppercase tracking-[2px] text-slate-400 mb-2">
                  Amount
                </p>

                <h3 className="text-lg font-semibold text-emerald-600">
                  ₹{Number(data.amount || 0).toLocaleString("en-IN")}
                </h3>
              </div>

              {data.date && (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 md:col-span-2">
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-slate-400 mb-2">
                    Date
                  </p>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {new Date(data.date).toLocaleDateString("en-IN")}
                  </h3>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}