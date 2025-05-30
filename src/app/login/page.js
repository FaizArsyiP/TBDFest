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

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);};

return (
    <div className="min-h-screen flex items-center justify-center " style={{ backgroundColor: '#000000' }}>
        <div 
            className="w-full max-w-2xl p-15 rounded-[40px] shadow-lg" 
            style={{ backgroundColor: '#ffffff' }}
        >
            {/* Login Title */}
            <h1 
                className={`text-4xl font-bold text-center mb-8 ${dmSerifDisplay.className}`}
                style={{ color: '#000000' }}
            >
                Login
            </h1>

            {/* Username/Email Field */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Username/email"
                    className={`w-full p-4 ${plusJakartaSans.className}`}
                    style={{
                        color: '#000000',
                        backgroundColor: '#ff008d',
                        borderRadius: '20px',
                        border: '2px solid #000000'
                    }}
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
              backgroundColor: '#ff008d',
              borderRadius: '20px',
              border: '1px solid #858584'
            }}
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


            {/* Login Button */}
            <button
                className={`w-full py-3 ${plusJakartaSans.className} font-bold mb-6`}
                style={{
                    color: '#FFFFFF',
                    backgroundColor: '#8900ff',
                    borderRadius: '15px',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Login
            </button>

            {/* Sign Up Link */}
            <div className={`text-center ${workSans.className}`} style={{ color: '#858584' }}>
                Don't have an account yet?{' '}
                <Link 
                    href="/signup" 
                    className="hover:underline text-blue-500" 
                >
                    Create one.
                </Link>
            </div>
        </div>
    </div>
);
}