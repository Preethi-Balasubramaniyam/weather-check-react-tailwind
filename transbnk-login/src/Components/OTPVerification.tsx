import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Frame8 from '../assets/Frame 8.png';
import BackgroundImage from '../assets/pexels-elīna-arāja-3334452 1.png';

interface LocationState {
  email: string;
  phoneNumber: string;
}

function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [emailOTP, setEmailOTP] = useState(['', '', '', '', '']);
  const [phoneOTP, setPhoneOTP] = useState(['', '', '', '', '']);
  
  // Get email and phone from navigation state
  const { email = '', phoneNumber = '' } = (location.state as LocationState) || {};

  // Redirect to login if no data
  useEffect(() => {
    if (!email || !phoneNumber) {
      navigate('/');
    }
  }, [email, phoneNumber, navigate]);

  const handleEmailOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOTP = [...emailOTP];
      newOTP[index] = value;
      setEmailOTP(newOTP);
      
      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`email-otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handlePhoneOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOTP = [...phoneOTP];
      newOTP[index] = value;
      setPhoneOTP(newOTP);
      
      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`phone-otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = () => {
    // Navigate to annexure form without OTP verification
    navigate('/annexure-form');
  };

  const handleBack = () => {
    navigate('/');
  };

  // Mask email and phone for security display
  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');
  const maskedPhone = phoneNumber.replace(/(.{2})(.*)(.{2})/, '$1****$3');

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left brand panel */}
     
      <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center " 
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        />
        <div className="relative z-10 max-w-md px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="">
              <img src={Frame8} alt="TransBnk Logo" className=" w-350 object-contain" />
            </div>
            
          </div>
          <p className="text-xl/7 text-white/90 font-medium text-center">
            Elevating Banking Journeys,<br/>Redefining Possibilities
          </p>
          <div className="mt-24 flex gap-10 text-sm text-white/70">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center py-16 px-6 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold py-2 rounded-lg mb-6" style={{ color: '#66BB94' }}>Request HUB</h2>
          <div className="rounded-2xl border border-slate-200 p-6 shadow-soft">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Enter OTP</h3>
            <p className="text-sm text-slate-500 mb-1">
              We have sent OTP codes sent to <span className="font-medium">"{maskedEmail}"</span> &
            </p>
            <p className="text-sm text-slate-500 mb-6">
              <span className="font-medium">"{maskedPhone}"</span>
            </p>

            <div className="space-y-6">
              {/* Email OTP */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Email OTP</label>
                <div className="flex gap-2 justify-center">
                  {emailOTP.map((digit, index) => (
                    <input
                      key={index}
                      id={`email-otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleEmailOTPChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2 text-center">Not received code? <span className="underline cursor-pointer" style={{ color: '#66BB94' }}>Resend</span></p>
              </div>

              {/* Phone OTP */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Phone OTP</label>
                <div className="flex gap-2 justify-center">
                  {phoneOTP.map((digit, index) => (
                    <input
                      key={index}
                      id={`phone-otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handlePhoneOTPChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2 text-center">Not received code? <span className="underline cursor-pointer" style={{ color: '#66BB94' }}>Resend</span></p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-8">
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 text-sm font-semibold text-white rounded-lg transition-colors"
                  style={{ backgroundColor: '#66BB94' }}
                >
                  Submit
                </button>
                
                <button
                  onClick={handleBack}
                  className="w-full py-3 text-sm font-semibold bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-slate-400">TransBnk © 2023</p>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;