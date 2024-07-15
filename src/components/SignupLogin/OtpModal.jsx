import React, { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { login, sendOtp } from '../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OtpModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyPhone = async () => {
    if (!phone) {
      setError('Phone number is required');
      return;
    }

    try {
      await dispatch(sendOtp(phone));
      setIsOtpSent(true);
      setError('');
    } catch (err) {
      setIsOtpSent(false);
      setError('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!verificationCode) {
      setError('OTP is required');
      return;
    }

    try {
      await dispatch(login(phone, verificationCode, navigate))
      setError('');
      // Proceed with the next step after OTP verification
    } catch (err) {
      setError('Failed to verify OTP');
    }
  };

  const handleReturnBack = () => {
    setIsOtpSent(false);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <main className="flex flex-col justify-center items-center px-4 py-11 bg-white rounded-xl shadow-sm max-w-[369px] transform transition-transform duration-300 scale-100">
        {!isOtpSent ? (
          <>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c99b1c2a0c946d98b1f354c5550a09987afdea226283a80fcd6d00b6b55034d?apiKey=bf7f544620754582b27788a15db44c36&"
              className="w-6 aspect-[0.65]"
              alt="Company logo"
            />
            <h1 className="mt-5 text-2xl text-emerald-900">Sign-Up with Phone</h1>
            <p className="mt-5 text-base text-emerald-700">To Continue to Phone Email</p>
            <div className="flex flex-col items-center gap-5 p-2.5 mt-5 bg-white rounded-md shadow-sm w-full">
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={setPhone}
                inputStyle={{
                  width: '100%',
                  height: '40px',
                  fontSize: '1.25rem',
                  color: '#4a4a4a',
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db',
                }}
                buttonStyle={{
                  border: 'none',
                  background: 'transparent',
                  padding: '0',
                  marginRight: '0.5rem',
                }}
                dropdownStyle={{
                  borderRadius: '0.375rem',
                  border: '1px solid #d1d5db',
                }}
              />
            </div>
            {error && <p className="mt-2 text-red-500">{error}</p>}
            <button
              className="justify-center items-center self-stretch p-2.5 mt-5 text-xl text-white whitespace-nowrap bg-emerald-600 rounded-md shadow-sm"
              onClick={handleVerifyPhone}
            >
              Verify
            </button>
            <p className="self-stretch mt-5 text-base text-center text-neutral-500">
              Lorem ipsum dolor sit amet consectetur. Mauris gravida tristique nunc egestas ornare felis.
            </p>
            <button onClick={onClose} className="mt-5 text-base text-center text-red-500">
              Close
            </button>
          </>
        ) : (
          <>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c99b1c2a0c946d98b1f354c5550a09987afdea226283a80fcd6d00b6b55034d?apiKey=bf7f544620754582b27788a15db44c36&"
              className="self-center w-6 aspect-[0.65]"
              alt="Company logo"
            />
            <h1 className="self-center mt-5 text-2xl text-emerald-900">Sign-Up with Phone</h1>
            <p className="mt-5 text-emerald-700">6 digit code has been sent to {phone}</p>
            <div className="mt-5 w-full">
              <label htmlFor="verificationCode" className="sr-only">
                Enter 6 digit
              </label>
              <input
                id="verificationCode"
                type="text"
                className="w-full justify-center items-start p-2.5 text-xl bg-white rounded-md shadow-sm"
                placeholder="Enter 6 digit"
                aria-label="Enter 6 digit"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            {error && <p className="mt-2 text-red-500">{error}</p>}
            <button
              className="justify-center items-center p-2.5 mt-5 text-xl text-white whitespace-nowrap bg-emerald-600 rounded-md shadow-sm self-stretch"
              onClick={handleVerifyOtp}
            >
              Verify
            </button>
            <button className="self-center mt-5 underline" onClick={handleReturnBack}>
              Return Back
            </button>
            <p className="mt-5 text-center">
              Lorem ipsum dolor sit amet consectetur. Mauris gravida tristique nunc egestas ornare felis.
            </p>
          </>
        )}
      </main>
    </div>
  );
};

export default OtpModal;
