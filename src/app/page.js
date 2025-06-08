// src/app/page.js
'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { DM_Serif_Display } from 'next/font/google';

const dmSerifDisplay = DM_Serif_Display({ 
  weight: '400',
  subsets: ['latin'] 
});

export default function HomePage() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ 
        backgroundImage: "url('/Image/bgFestival.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
        
      }}
      
    >

        <h1 className={`absolute top-50 text-8xl font-bold text-white text-center ${dmSerifDisplay.className}`}>
            BERAGAM ACARA SERU MENUNGGUMU
        </h1>
        
        {/* Tombol Login */}
        <Link href="/login">
        <button 
          className="
          absolute
          top-[500px]
          left-1/2 transform -translate-x-1/2
          w-[200px] h-[60px]
          px-6 py-3
          bg-white bg-opacity-10 hover:bg-black hover:bg-opacity-100
          text-black font-bold hover:text-white
          rounded-xl
          shadow-md
          transition-all
          duration-300
          hover:scale-105
          active:scale-95
          z-10
          font-sans
          border border-white border-opacity-30 hover:border-black hover:border-opacity-100
          "
          style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}
        >
        Login
        </button> 
        </Link>
      </div>
    </>
  );
}