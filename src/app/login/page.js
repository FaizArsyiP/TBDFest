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

    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);};

return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-[url('/image/bgfestival.jpg')] bg-cover bg-center blur-sm opacity-90 -z-10"/>
        
        <div 
          className="w-full max-w-2xl p-15 rounded-[40px] shadow-lg relative"
          style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(8px)' // Optional: adds glass morphism effect
          }}
>
            {/* Login Title */}
            <h1 
                className={`text-5xl font-bold text-center mb-8 ${dmSerifDisplay.className}`}
                style={{ color: '#000000' }}
            >
                Login
            </h1>

            {/* Username/Email Field */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Username/email"
                    className={`w-full p-4 ${plusJakartaSans.className} hover:border-[#000000]`}
                    style={{
                        color: '#000000',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Putih 50% opacity
                        borderRadius: '20px',
                        border: '1px solid #000000'
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
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Putih 50% opacity
                    borderRadius: '20px',
                    border: '1px solid #000000'
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
                    backgroundColor: '#000000',
                    borderRadius: '15px',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Login
            </button>

            {/* Sign Up Link */}
            <div className={`text-center ${workSans.className}`} style={{ color: '#000000' }}>
                Don't have an account yet?{' '}
                <Link 
                    href="/signup" 
                    className="hover:underline text-white hover:text-[#0979FC] font-bold" 
                >
                    Create one.
                </Link>
            </div>
        </div>
    </div>
);
}