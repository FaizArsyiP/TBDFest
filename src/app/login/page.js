'use client';
import Link from 'next/link';
import { DM_Serif_Display, Plus_Jakarta_Sans, Work_Sans } from 'next/font/google';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
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

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const validateInput = () => {
        if (!identifier.trim()) {
            setError('Masukkan username atau email');
            return false;
        }
        if (!password.trim()) {
            setError('Masukkan password');
            return false;
        }
        return true;
    };

    const handleLogin = async() => {
        setLoading(true);
        setError('');

        if (!validateInput()) {
          setLoading(false);
          return;
        }

        try {
          const res = await axios.post('../api/login', {
            identifier: identifier.trim(),
            password
          })
        
          console.log('Response dari server:', res.data);
          console.log('res.data.user.id_pengguna:', res.data.user.id_pengguna);
        
        if (res.data.message === 'Login Berhasil') {
          const id_pengguna = res.data.user.id_pengguna;
          localStorage.setItem('id_pengguna', id_pengguna);
          console.log('ID Pengguna:', id_pengguna);
          
          alert('Login berhasil!');
          router.push('/listevent');

        }else {
          setError(res.data.message || 'Login gagal');
        }
      
        } catch (err) {
          if (err.response) {
            setError(err.response.data.error || 'Terjadi kesalahan')
          } else {
            setError('Gagal terhubung ke server')
          }
        } finally {
          setLoading(false)
        }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleLogin();
    }
  }

  
return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-[url('/Image/bgfestival.jpg')] bg-cover bg-center blur-sm opacity-90 -z-10"/>
        
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
                    id="identifier"
                    type="text"
                    placeholder="Username/email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    className={`w-full p-4 ${plusJakartaSans.className} hover:border-[#000000]`}
                    style={{
                        color: '#000000',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Putih 50% opacity
                        borderRadius: '20px',
                        border: '1px solid #000000'
                    }}
                    aria-describedby='{error ? "error-message" : ""}' 
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
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Putih 50% opacity
                    borderRadius: '20px',
                    border: '1px solid #000000'
                  }}
                  aria-describedby='{error ? "error-message" : ""}'
              />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={loading}
            className="absolute right-7 top-1/2 transform -translate-y-1/2 "
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label={showPassword ? "Hide password" : "Show password"}
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

            {/* Login Button */}
            <button
                type="submit"
                disabled={loading}
                onClick={handleLogin}
                className={`w-full py-3 ${plusJakartaSans.className} font-bold mb-6 `}
                style={{
                    color: '#FFFFFF',
                    backgroundColor: '#000000',
                    borderRadius: '15px',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                }}
            >
                {loading ? 'Loading...' : 'Login'}
            </button>

            {/* Sign Up Link */}
            <div className={`text-center ${workSans.className}`} style={{ color: '#000000' }}>
                Don&apos;t have an account yet?{' '}
                <Link 
                    href="/SignUp" 
                    className="hover:underline text-white hover:text-[#0979FC] font-bold" 
                >
                    Create one.
                </Link>
            </div>
        </div>
    </div>
);
}