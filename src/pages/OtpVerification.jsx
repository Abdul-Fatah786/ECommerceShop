/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { ShieldCheck, ShoppingCart } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function OtpVerification() {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(30);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!timeLeft) return;
        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleInputChange = (index, value) => {
        if (/^\d+$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text/plain").slice(0, 6); // Fixed to 6 digits
        if (/^\d{6}$/.test(pasteData)) { // Validate exactly 6 digits
            const newOtp = pasteData.split("").slice(0, 6);
            setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]); // Fixed to 6 elements
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submit clicked");

        if (otp.join("").length !== 6) {
            setError("Please enter a 6-digit code");
            return;
        }

        console.log("Setting isSubmitting to true");
        setIsSubmitting(true);

        const otpString = otp.join("");
        const userEmail = localStorage.getItem("userEmail");

        try {
            const response = await axios.post("http://localhost:3001/users/verify", {
                email: userEmail,
                otp: otpString
            });

            console.log("Response received:", response.data);
            console.log("response success", response.data.success)

            if (response.data && response.data.message === "OTP verified successfully. Account activated.") {
                localStorage.removeItem("userEmail");
                console.log("Navigating to home...");
                navigate("/");
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error during request:", error);
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            console.log("Setting isSubmitting to false");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 lg:p-12">
                <div className="mb-8 text-center">
                    <ShoppingCart className="mx-auto h-12 w-12 text-orange-600 mb-4" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                        Verify Your Account
                    </h1>
                    <p className="text-gray-600">We&apos;ve sent a 6-digit code to your email</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center space-x-3">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                value={value}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="w-16 h-16 text-3xl text-center border-2 border-gray-200 rounded-xl
                                    focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none
                                    transition-all caret-transparent"
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        {timeLeft > 0 ? (
                            <span>Resend code in {timeLeft} seconds</span>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setTimeLeft(30)}
                                className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                            >
                                Resend Code
                            </button>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || otp.some(digit => digit === "")}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 px-6
                            rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all
                            duration-300 transform hover:scale-[1.01] shadow-lg hover:shadow-orange-200
                            disabled:opacity-80 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <ShieldCheck className="w-5 h-5" />
                                Verify Account
                            </span>
                        )}
                    </button>

                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Having trouble?</span>
                        </div>
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Contact our support team at{' '}
                        <a href="mailto:support@example.com" className="font-medium text-orange-600 hover:text-orange-700">
                            support@example.com
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default OtpVerification;