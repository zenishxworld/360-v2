import React, { useState, useEffect } from "react";
import { useFormContext } from "./FormContext";
import { useNavigate } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_MESSAGES = [
  "Matching universities...",
  "Finding scholarships...",
  "Comparing programs...",
  "Evaluating eligibility...",
];

export default function Step8OTP() {
  const { data } = useFormContext();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !isVerifying) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, isVerifying]);

  useEffect(() => {
    if (isVerifying) {
      const msgInterval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1000);
      
      const finishTimeout = setTimeout(() => {
        navigate("/ai-profile-evaluation/results");
      }, 4000);

      return () => {
        clearInterval(msgInterval);
        clearTimeout(finishTimeout);
      };
    }
  }, [isVerifying, navigate]);

  const handleComplete = (value: string) => {
    if (value.length === 6) {
      setIsVerifying(true);
    }
  };

  const handleResend = () => {
    setTimer(60);
    // Simulate sending OTP
  };

  if (isVerifying) {
    return (
      <div className="fixed inset-0 bg-[#8B6AE8] z-[100] flex flex-col items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border border-white/20 relative shadow-2xl">
            <Sparkles className="w-16 h-16 text-white animate-pulse" />
            <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="300" strokeDashoffset="150" />
            </svg>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Analyzing your profile...</h2>
          
          <div className="h-8 relative overflow-hidden w-64 text-center flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={loadingMsgIdx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg text-white/80 absolute"
              >
                {LOADING_MESSAGES[loadingMsgIdx]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full items-center text-center pt-8 pb-32">
      <h2 className="text-3xl font-bold text-[#111827] mb-4">Almost there!</h2>
      <p className="text-gray-500 mb-10 text-lg max-w-sm">
        Enter the 6-digit OTP sent to <br/>
        <span className="font-semibold text-gray-800">{data.countryCode} {data.phone}</span>
      </p>
      
      <div className="mb-10">
        <InputOTP 
          maxLength={6} 
          value={otp}
          onChange={(val) => {
            setOtp(val);
            if (val.length === 6) handleComplete(val);
          }}
          autoFocus
        >
          <InputOTPGroup className="gap-3">
            <InputOTPSlot index={0} className="w-14 h-14 text-2xl rounded-xl border-gray-300 shadow-sm" />
            <InputOTPSlot index={1} className="w-14 h-14 text-2xl rounded-xl border-gray-300 shadow-sm" />
            <InputOTPSlot index={2} className="w-14 h-14 text-2xl rounded-xl border-gray-300 shadow-sm" />
            <InputOTPSlot index={3} className="w-14 h-14 text-2xl rounded-xl border-gray-300 shadow-sm" />
            <InputOTPSlot index={4} className="w-14 h-14 text-2xl rounded-xl border-gray-300 shadow-sm" />
            <InputOTPSlot index={5} className="w-14 h-14 text-2xl rounded-xl border-gray-300 shadow-sm" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="text-gray-500 font-medium">
        {timer > 0 ? (
          <p>Resend OTP in <span className="text-[#8B6AE8] font-bold">{timer} sec</span></p>
        ) : (
          <button 
            onClick={handleResend}
            className="text-[#8B6AE8] font-bold hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>

      {/* Manual continue button for testing or if auto-move fails */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto flex justify-end">
          <Button 
            onClick={() => handleComplete(otp)} 
            disabled={otp.length !== 6}
            className="bg-[#8B6AE8] hover:bg-[#7251d1] text-white px-10 py-6 rounded-full text-lg shadow-lg font-medium transition-all"
          >
            Verify & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
