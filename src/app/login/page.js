import Link from 'next/link';
import { DM_Serif_Display, Plus_Jakarta_Sans, Work_Sans } from 'next/font/google';

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
return (
    <div className="min-h-screen flex items-center justify-center " style={{ backgroundColor: '#000000' }}>
        <div 
            className="w-full max-w-2xl p-15 rounded-[40px] shadow-lg" 
            style={{ backgroundColor: '#ffffff' }}
        >
            {/* Login Title */}
            <h1 
                className={`text-3xl font-bold text-center mb-8 ${dmSerifDisplay.className}`}
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
            <div className="mb-8">
                <input
                    type="password"
                    placeholder="Password"
                    className={`w-full p-4 ${plusJakartaSans.className}`}
                    style={{
                        color: '#000000',
                        backgroundColor: '#ff008d',
                        borderRadius: '20px',
                        border: '2px solid #000000'
                    }}
                />
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