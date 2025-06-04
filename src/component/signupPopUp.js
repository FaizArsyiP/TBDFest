'use client';
import Link from 'next/link';
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { useState, useEffect } from 'react';

const dmSerifDisplay = DM_Serif_Display({ 
    subsets: ['latin'],
    weight: '400' 
});

const plusJakartaSans = Plus_Jakarta_Sans({ 
    subsets: ['latin'],
    weight: '400' 
});

export default function SignupPopup({ 
    isVisible, 
    onClose, 
    title = "Selamat, Anda telah terdaftar",
    buttonText = "Login",
    redirectPath = "/login"
}) {
    const [popupScale, setPopupScale] = useState(0);

    useEffect(() => {
        if (isVisible) {
            setPopupScale(0);
            const timer = setTimeout(() => setPopupScale(1), 10);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div 
                className="bg-white p-8 rounded-[40px] text-center max-w-md mx-4"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    transform: `scale(${popupScale})`,
                    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transformOrigin: 'center'
                }}
            >
                <h2 
                    className={`text-3xl font-bold mb-4 ${dmSerifDisplay.className}`}
                    style={{ color: '#000000' }}
                >
                    {title}
                </h2>
                <Link 
                    href={redirectPath}
                    className={`inline-block px-6 py-3 ${plusJakartaSans.className} font-bold mt-4`}
                    style={{
                        color: '#FFFFFF',
                        backgroundColor: '#000000',
                        borderRadius: '15px',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'none'
                    }}
                    onClick={onClose}
                >
                    {buttonText}
                </Link>
            </div>
        </div>
    );
}