'use client';
import Link from 'next/link';
import { DM_Serif_Display, Plus_Jakarta_Sans, Work_Sans } from 'next/font/google';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SignupPopup from '@/component/signupPopUp';
import { LuEye, LuEyeClosed } from "react-icons/lu";

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
    const [popupScale, setPopupScale] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

        const validateInput = () => {
        if (!name.trim()) {
            setError('Masukkan username');
            return false;
        }

        if (!email.trim()) {
            setError('Masukkan email');
            return false;
        }

        if (!phone.trim()) {
            setError('Masukkan nomor telepon');
            return false;
        }
        
        if (!password.trim()) {
            setError('Masukkan password');
            return false;
        }
        return true;
    };
    
    const handleSignUp = async () => {
        setLoading(true);
        setError('');

        if (!validateInput()) {
            setLoading(false);
            return;
        }

        try{
            const res = await axios.post('/api/signup', {
                username: name.trim(),
                email: email.trim(),
                no_telepon: phone.trim(),
                password
            });

            if (res.data.message === "Pendaftaran berhasil") {
                setShowSuccessPopup(true);
                setName('');
                setEmail('');
                setPhone('');
                setPassword('');
            } else {
                setError(res.data.error || 'Pendaftaran gagal, silakan coba lagi');
            }   
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || 'Terjadi kesalahan, silakan coba lagi');
            } else {
                setError('Gagal terhubung ke server');
            }
        } finally {
            setLoading(false);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSignUp();
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleClosePopup = () => {
        setShowSuccessPopup(false);
    }

    useEffect(() => {
        if (showSuccessPopup) {
            setPopupScale(0);
            const timer = setTimeout(() => setPopupScale(1), 10);
            return () => clearTimeout(timer);
        }
    }, [showSuccessPopup]);

    return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative">
    {/* Background image with blur */}
    <div className={`absolute inset-0 bg-[url('/image/bgfestival.jpg')] bg-cover bg-center transition-all duration-300 ${showSuccessPopup ? 'blur-md' : 'blur-sm'} opacity-90 -z-10`}/>
    
    {/* Form Container */}
    <div 
        className="w-2xl p-8 rounded-[40px] shadow-lg relative"
        style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(8px)'
        }}
    >
        {/* Sign Up Form (dikondisikan agar tidak muncul saat popup aktif) */}
        {!showSuccessPopup && (
            <form onSubmit={handleSignUp}>
                <h1 
                    className={`text-5xl font-bold text-center mb-8 ${dmSerifDisplay.className}`}
                    style={{ color: '#000000' }}
                >
                    Sign Up
                </h1>

                {/* Username Field */}
                <div className="mb-6">
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                        className={`w-full p-4 ${plusJakartaSans.className}`}
                        style={{
                            color: '#000000',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: '20px',
                            border: '1px solid #000000'
                        }}
                        aria-describedby={error ? "error-message" : ""}
                        required
                    />
                </div>

                {/* Email Field */}
                <div className="mb-6">
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                        className={`w-full p-4 ${plusJakartaSans.className}`}
                        style={{
                            color: '#000000',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: '20px',
                            border: '1px solid #000000'
                        }}
                        aria-describedby={error ? "error-message" : ""}
                        required
                    />
                </div>

                {/* Phone Number Field */}
                <div className="mb-6">
                    <input
                        id="PhoneNumber"
                        type="Phone"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                        className={`w-full p-4 ${plusJakartaSans.className}`}
                        style={{
                            color: '#000000',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: '20px',
                            border: '1px solid #000000'
                        }}
                        aria-describedby={error ? "error-message" : ""}
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="mb-8 relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                        className={`w-full p-4 pr-12 ${plusJakartaSans.className}`}
                        style={{
                            color: '#000000',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: '20px',
                            border: '1px solid #000000'
                        }}
                        aria-describedby={error ? "error-message" : ""}
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-7 top-1/2 transform -translate-y-1/2"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {showPassword ? (
                            <LuEye size={24} color="#000000" />
                        ) : (
                            <LuEyeClosed size={24} color="#000000" />
                        )}
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-500 text-center mb-4">
                        {error}
                    </div>
                )}

                {/* Sign Up Button */}
                <button
                    type="submit"
                    disabled={loading}
                    onClick={handleSignUp}
                    className={`w-full py-3 ${plusJakartaSans.className} font-bold mb-6`}
                    style={{
                        color: '#FFFFFF',
                        backgroundColor: '#000000',
                        borderRadius: '15px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {loading ? 'Loading...' : 'Sign Up'}
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
        )}
    </div>

    {/* Full-page white background and popup */}
    {showSuccessPopup && (
    <>
        {/* Overlay dengan opacity dan blur */}
        <div 
            className="fixed inset-0 z-50" 
            style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                backdropFilter: 'blur(30px)', 
                WebkitBackdropFilter: 'blur(30px)' 
            }} 
        />
        
        {/* Konten popup */}
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <SignupPopup 
                isVisible={showSuccessPopup}
                onClose={handleClosePopup}
            />
        </div>
    </>
)}
</div>
    );
}