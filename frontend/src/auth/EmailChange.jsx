import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestEmailChangeOtp, verifyEmailChangeOtp, changeEmail } from "../store/actions/userActions";

function EmailChange() {
  const dispatch = useDispatch();
  const currentEmail = useSelector((s) => s.user?.user?.email) || "";
  const loading = useSelector((s) => s.user?.loading);
  const error = useSelector((s) => s.user?.error);
  const [step, setStep] = useState("confirm"); // confirm → otp → newEmail → done
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const sendOtp = async () => {
    const result = await dispatch(requestEmailChangeOtp());
    if (requestEmailChangeOtp.fulfilled.match(result)) {
      setStep("otp");
    }
  };

  const verifyOtp = async () => {
    const otp = enteredOtp.trim();
    if (!otp) return;
    const result = await dispatch(verifyEmailChangeOtp({ otp }));
    if (verifyEmailChangeOtp.fulfilled.match(result)) {
      setStep("newEmail");
    }
  };

  const updateEmail = async () => {
    const email = newEmail.trim();
    const otp = enteredOtp.trim();
    if (!email || !email.includes("@") || !otp) return;
    const result = await dispatch(changeEmail({ newEmail: email, otp }));
    if (changeEmail.fulfilled.match(result)) {
      setStep("done");
      setEnteredOtp("");
      setNewEmail("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Change Email
        </h2>

        {step === "confirm" && (
          <>
            <p className="text-gray-600 mb-4">
              Your current email: <strong>{currentEmail}</strong>
            </p>
            <p className="mb-4">Do you want to change your email?</p>
            <button
              onClick={sendOtp}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </>
        )}

        {step === "otp" && (
          <>
            <p className="text-gray-600 mb-4">
              An OTP has been sent to your email: <strong>{currentEmail}</strong>
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
            />
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </>
        )}

        {step === "newEmail" && (
          <>
            <p className="text-gray-600 mb-4">Enter your new email address:</p>
            <input
              type="email"
              placeholder="New email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4"
            />
            <button
              onClick={updateEmail}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
            >
              {loading ? "Updating..." : "Update Email"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </>
        )}

        {step === "done" && (
          <>
            <p className="text-green-600 font-semibold mb-4">
              🎉 Your email has been changed successfully!
            </p>
            <button
              onClick={() => setStep("confirm")}
              className="text-blue-600 underline"
            >
              Change again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailChange;
