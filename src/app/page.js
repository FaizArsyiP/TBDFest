// src/app/page.js
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { DM_Serif_Display } from 'next/font/google';

const dmSerifDisplay = DM_Serif_Display({ 
  weight: '400',
  subsets: ['latin'] 
});

export default function HomePage() {
  return (
    <>
      <Head>
        <title>ACARA SERU MENUNGGUMU</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1c1c] p-4">
        {/* Container untuk teks dan lingkaran */}
        <div className="relative flex flex-col items-center">
          {/* Lingkaran sebagai mask untuk gambar */}
          <div className="w-150 h-150 rounded-full overflow-hidden mb-8 relative">
            <div className="absolute inset-0 bg-blue-500/30 mix-blend-multiply"></div>
            <Image 
              src="/konser1.jpg" 
              alt="Event Image"
              width={256}
              height={256}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          
        </div>

        <h1 className={`absolute top-70 text-8xl font-bold text-white text-center ${dmSerifDisplay.className}`}>
            ACARA SERU MENUNGGUMU
          </h1>
        
        {/* Tombol Login */}
        <Link href="/login">
          <button 
          className="hover:bg-[#8900ff] hover:scale-105 hover:py-[14px] hover:px-[28px]"
          style={{
          padding: '12px 24px',
          borderRadius: '15px',
          border: 'none',
          backgroundColor: '#4A3C6A',
          color: 'white',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          }}>
          Login
          </button>
        </Link>
      </div>
    </>
  );
}