"use client"
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { IoChevronBackOutline } from "react-icons/io5";

const Signup = () => {
  const router = useRouter()
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
    role:'USER'
  });
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false); // State to toggle between Signup and OTP
  const [otp, setOtp] = useState(new Array(6).fill("")); // OTP inputs
  const [actualOtp, setActualOtp] = useState(''); // Actual OTP
  const [otpExpiry, setOtpExpiry] = useState(false); // OTP expiry status
  const [timer, setTimer] = useState(49); // OTP timer
  const [passwordStrength,setPasswordStrength] = useState({});

  useEffect(() => {
    let countdown;
    if (showOTP && timer > 0) {
      countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtpExpiry(true); // OTP expired
    }

    return () => clearInterval(countdown);
  }, [showOTP, timer]);

  const handleChange = async (e) => {
    const { id, value } = e.target;
    setSignup({ ...signup, [id]: value });
    if(id==='password' && value!==''){
      setPasswordStrength({})
      await AuthService.checkPasswordStrength(value).then((response)=>{
        setPasswordStrength(response.data);
        return;
      }).catch((err)=>{
        console.log(err);
      })
    }
    if(id==='password' && value===''){
      setPasswordStrength({})
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!signup.name || !signup.email || !signup.password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(signup.email)) {
      setError('Please enter a valid email.');
      return;
    }

    // if (signup.password !== signup.confirmPassword) {
    //   setError('Passwords do not match.');
    //   return;
    // }

    // if (signup.password.length < 6) {
    //   setError('Password should be at least 6 characters long.');
    //   return;
    // }

    // Clear error
    if(passwordStrength.password_strength!==2){
      // alert("Password must to be strong!");
      toast.error("Password must to be strong!")
      return;
    }
    setError('');


    // Send OTP
    await AuthService.sendOTPtoEmail(signup).then((response) => {
      setActualOtp(response.data.otp);
      setShowOTP(true);
    }).catch((error) => {
      console.log(error);
    })
  };

  const handleOTPChange = (element, index, isBackspace) => {
    if (isBackspace) {
      setOtp([...otp.map((data, i) => (i === index ? "" : data))])
      if (index > 0 && element.previousSibling) {
        element.previousSibling.focus();
      }
    } else if (!isNaN(element.value)) {
      setOtp([...otp.map((data, i) => (i === index ? element.value : data))])
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      return;
    }
    if (actualOtp == enteredOtp) {
      await AuthService.signUp(signup).then(async (response) => {
        await AuthService.login({ email: signup.email, password: signup.password }).then((response) => {
          const data = response.data;
          localStorage.setItem("uid",data.user.uid);
          localStorage.setItem("token",data.token);
          router.push("/")
        })
      }).catch((error) => {
        console.log(error);
      })
    } else {
      alert('Incorrect OTP');
    }
  };

  const resendOtp = async() => {
    setOtpExpiry(false); // Reset OTP expiry status
    setTimer(49); // Reset timer to 49 seconds
    setOtp(new Array(6).fill("")); // Clear OTP inputs
    // Send OTP
    await AuthService.sendOTPtoEmail(signup).then((response) => {
      setActualOtp(response.data.otp);
      setShowOTP(true);
    }).catch((error) => {
      console.log(error);
    })
  };

  return (
    <div
    className={`fixed top-0 left-0 w-full z-50  border-b  border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${"bg-n-8/90 backdrop-blur-sm"
    }`}
  >
    <div className="flex items-center justify-center min-h-screen">
      <Toaster position='top-right'  />
      <div className="w-full max-w-md p-8 bg-n-11/100 rounded-lg shadow-md text-white">
        {/* Conditional Content: Show Signup or OTP form */}
        {!showOTP ? (
          <>
            <h2 className="mb-6 text-3xl font-bold text-center ">
              Sign Up
            </h2>

            {/* Display Error Message */}
            {error && (
              <div className="mb-4 text-sm text-red-600 absolute right-0 top-0 w-full bg-red-100 p-2 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={signup.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium "
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={signup.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={signup.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                />
              </div>

              {/* Confirm Password Field */}
              {/* <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium "
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={signup.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Confirm your password"
                />
              </div> */}
              <div className={`mb-6 ${passwordStrength.password_description==="Password Strength is strong, you are good to go!" ? "text-green-500" : "text-red-500"}  h-16`}>
                {passwordStrength.password_description}
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Sign Up
              </button>
            </form>

            {/* Extra Links */}
            <div className="mt-4 text-center">
              <p onClick={() => router.push("/login")} className="text-sm text-blue-500 hover:underline cursor-pointer">
                Already have an account? Login
              </p>
            </div>
          </>
        ) : (
          <>
            {/* OTP Form */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => { setShowOTP(false); setActualOtp("") }}
                className="text-xl  hover:underline"
              >
                <IoChevronBackOutline />
              </button>
              <h2 className="text-2xl font-bold text-center ">
                OTP Verification
              </h2>
              <div />
            </div>

            <form onSubmit={handleOTPSubmit}>
              <div className="flex justify-center my-10">
                {otp.map((data, i) => {
                  return (
                    <input
                      className={`border-gray text-black text-center flex justify-center items-center focus:border-blue focus:placeholder:text-[#9ca3af] text-darkGray m-[2.5px] h-[50px] text-lg max-w-[45px] rounded-lg outline-none border-[2.0px] `}
                      key={i}
                      type="text"
                      name="otp"
                      onChange={(e) => handleOTPChange(e.target, i, e.target.value === "")}
                      id={`otp${i}`}
                      onFocus={(e) => e.target.select()}
                      maxLength={1}
                      value={data}
                    />
                  )
                })}
              </div>
              {/* Resend OTP Option */}
              <div className="my-4 text-right ">
                <button
                  onClick={resendOtp}
                  className={`text-sm px-4 py-2 rounded-lg cursor-pointer ${!otpExpiry ? "bg-gray-500" : "bg-blue-500"}`}
                  disabled={!otpExpiry}
                >
                  Resend OTP {timer !== 0 && <span>{timer}</span>}
                </button>
              </div>
              {/* Verify Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Verify OTP
              </button>
            </form>

          </>
        )}
      </div>
    </div>
    </div>
  );
}

export default Signup;
