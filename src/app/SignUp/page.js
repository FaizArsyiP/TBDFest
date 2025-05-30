'use client';
import Link from 'next/link';
import { DM_Serif_Display, Plus_Jakarta_Sans, Work_Sans } from 'next/font/google';
import { useState } from 'react';
import Image from 'next/image';

// Load fonts
const dmSerifDisplay = DM_Serif_Display({ 
  subsets: ['latin'],
  weight: '400' 
});

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: '400' 
});

const workSans = Work_Sans({ 
  subsets: ['latin'],
  weight: '400' 
});

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // Here you would typically handle form submission
        // For demo, we'll just show the popup
        setShowSuccessPopup(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
            <div className="absolute inset-0 bg-[url('/image/bgfestival.jpg')] bg-cover bg-center blur-sm opacity-90 -z-10"/>
            
            <div 
                className="w-full max-w-2xl p-15 rounded-[40px] shadow-lg relative"
                style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(8px)'
                }}
            >
                {/* Success Popup */}
                {showSuccessPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div 
                            className="bg-white p-8 rounded-[40px] text-center max-w-md mx-4"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(8px)'
                            }}
                        >
                            <h2 
                                className={`text-3xl font-bold mb-4 ${dmSerifDisplay.className}`}
                                style={{ color: '#000000' }}
                            >
                                Selamat, Anda telah terdaftar
                            </h2>
                            <Link 
                                href="/login"
                                className={`inline-block px-6 py-3 ${plusJakartaSans.className} font-bold mt-4`}
                                style={{
                                    color: '#FFFFFF',
                                    backgroundColor: '#000000',
                                    borderRadius: '15px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textDecoration: 'none'
                                }}
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                )}

                {/* Sign Up Form */}
                <form onSubmit={handleSignUp}>
                    {/* Sign Up Title */}
                    <h1 
                        className={`text-5xl font-bold text-center mb-8 ${dmSerifDisplay.className}`}
                        style={{ color: '#000000' }}
                    >
                        Sign Up
                    </h1>

                    {/* Username Field */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Username"
                            className={`w-full p-4 ${plusJakartaSans.className}`}
                            style={{
                                color: '#000000',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                borderRadius: '20px',
                                border: '1px solid #000000'
                            }}
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-6">
                        <input
                            type="email"
                            placeholder="Email"
                            className={`w-full p-4 ${plusJakartaSans.className}`}
                            style={{
                                color: '#000000',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                borderRadius: '20px',
                                border: '1px solid #000000'
                            }}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-8 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className={`w-full p-4 pr-12 ${plusJakartaSans.className}`}
                            style={{
                                color: '#000000',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                borderRadius: '20px',
                                border: '1px solid #000000'
                            }}
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <Image
                                src={showPassword ? "/image/eyeview.png" : "/image/eyehide.png"}
                                alt={showPassword ? "Hide password" : "Show password"}
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className={`w-full py-3 ${plusJakartaSans.className} font-bold mb-6`}
                        style={{
                            color: '#FFFFFF',
                            backgroundColor: '#000000',
                            borderRadius: '15px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Sign Up
                    </button>

                    {/* Login Link */}
                    <div className={`text-center ${workSans.className}`} style={{ color: '#000000' }}>
                        Already have an account?{' '}
                        <Link 
                            href="/login" 
                            className="hover:underline text-white hover:text-[#0979FC] font-bold" 
                        >
                            Login here.
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}