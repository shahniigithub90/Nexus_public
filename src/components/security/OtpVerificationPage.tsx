import { useState } from "react";import { useNavigate } from "react-router-dom";

function OtpVerificationPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const verifyOtp = () => {
    if (otp === "1234") {
      alert("OTP Verified!");
      navigate("/dashboard/entrepreneur");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">

      <div className="border p-6 rounded w-96">

        <h1 className="text-xl font-bold mb-4 text-center">
          Two-Factor Authentication
        </h1>

        <p className="text-sm text-gray-600 mb-4 text-center">
          Enter the 4-digit code sent to your device
        </p>

        <input
          type="text"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border w-full p-2 text-center text-xl tracking-widest"
          placeholder="----"
        />

        <button
          onClick={verifyOtp}
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded"
        >
          Verify OTP
        </button>

      </div>

    </div>
  );
}

export default OtpVerificationPage;