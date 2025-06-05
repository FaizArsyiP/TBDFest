'use client';

// page.js
import React, { useState } from 'react';

const TBDFestPage = () => {
  const [activeEvent, setActiveEvent] = useState(null);
  
  // Data event
  const events = [
    {
      id: 1,
      title: "WE THE FEST",
      date: "Sabtu, 28 Juni 2025",
      location: "JIExpo Kemayoran, Jakarta",
      time: "12:00 - 23:00 WIB",
      category: "Festival Musik",
      price: "Rp 500.000 - Rp 2.500.000",
      description: "WE THE FEST adalah festival musik dan seni terbesar di Indonesia yang menampilkan berbagai artis lokal dan internasional. Acara ini juga menampilkan berbagai kuliner, instalasi seni, dan aktivitas menarik lainnya."
    },
    {
      id: 2,
      title: "WEX UGM",
      date: "Sabtu, 28 Juni 2025",
      location: "Universitas Gadjah Mada, Yogyakarta",
      time: "09:00 - 21:00 WIB",
      category: "Pameran Edukasi",
      price: "Rp 50.000 - Rp 150.000",
      description: "WEX UGM adalah pameran pendidikan terbesar di Yogyakarta yang menampilkan berbagai inovasi dan prestasi mahasiswa UGM. Acara ini cocok untuk pelajar yang ingin mengetahui lebih banyak tentang dunia perkuliahan."
    },
    {
      id: 3,
      title: "ENFORIAN",
      date: "Sabtu, 28 Juni 2025",
      location: "Surabaya Town Square",
      time: "14:00 - 22:00 WIB",
      category: "Konser Musik",
      price: "Rp 300.000 - Rp 1.200.000",
      description: "ENFORIAN adalah konser musik yang menampilkan artis-artis terbaik dari Indonesia Timur. Dengan konsep yang unik dan penampilan yang spektakuler, acara ini tidak boleh Anda lewatkan."
    },
    {
      id: 4,
      title: "JAZZ FEST",
      date: "Minggu, 29 Juni 2025",
      location: "Plaza Senayan, Jakarta",
      time: "16:00 - 23:00 WIB",
      category: "Festival Jazz",
      price: "Rp 400.000 - Rp 1.800.000",
      description: "JAZZ FEST menghadirkan musisi jazz terbaik dari dalam dan luar negeri. Nikmati malam penuh harmoni dan improvisasi di bawah langit Jakarta."
    },
    {
      id: 5,
      title: "TECH EXPO",
      date: "Senin, 30 Juni 2025",
      location: "Jakarta Convention Center",
      time: "10:00 - 18:00 WIB",
      category: "Pameran Teknologi",
      price: "Rp 100.000",
      description: "TECH EXPO adalah pameran teknologi terbesar di Indonesia yang menampilkan inovasi terbaru dari perusahaan teknologi lokal dan internasional. Temukan gadget terbaru dan teknologi masa depan."
    },
    {
      id: 6,
      title: "FOOD FEST",
      date: "Selasa, 1 Juli 2025",
      location: "Parkir Timur Senayan, Jakarta",
      time: "11:00 - 22:00 WIB",
      category: "Festival Kuliner",
      price: "Gratis - Rp 300.000",
      description: "FOOD FEST menampilkan lebih dari 100 pedagang makanan dari seluruh Indonesia. Nikmati berbagai hidangan tradisional dan modern dalam satu tempat."
    }
  ];

  const openEventDetail = (event) => {
    setActiveEvent(event);
  };

  const closeEventDetail = () => {
    setActiveEvent(null);
  };

  return (
    <div className="min-h-screen bg-white text-black">
    {/* Header */}
      <header className="flex justify-between items-center p-3 md:p-5 bg-white shadow-md sticky top-0 z-50">
        <div className="font-['Foneitwu'] text-3xl md:text-3xl lg:text-3xl">TBDFEST</div>
    
        {/* Profile Icon with Link */}
        <a href="/profile" className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-90">
        {/* Replace with your actual image path */}
        <img src="/Image/ProfileIcon.png" alt="Profile Icon" 
            className="w-full h-full object-cover"
            onError={(e) => {
            e.target.onerror = null;
            e.target.parentElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-gray-700">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>`;
          }}/>
        </a>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <p className="font-['Montserrat'] text-lg md:text-xl lg:text-2xl font-medium mb-8">
            Temukan event yang cocok dengan dirimu!
          </p>
          <h1 className="font-['Bebas_Neue'] text-4xl md:text-5xl lg:text-6xl tracking-wider relative inline-block pb-2">
            PILIHAN EVENT MENARIK UNTUKMU
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-700 rounded-full"></span>
          </h1>
        </div>

        {/* Event Cards */}
        <div className="overflow-x-auto pb-5 mb-14 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="flex space-x-6 pb-4" style={{ minWidth: 'max-content' }}>
            {events.map((event) => (
              <div 
                key={event.id}
                className="flex-shrink-0 w-72 md:w-55 h-70 bg-red-700 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 shadow-xl"
                onClick={() => openEventDetail(event)}
              >
                <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-white tracking-wider">
                  {event.title}
                </h2>
                <p className="font-['Montserrat'] font-medium text-white text-lg">
                  {event.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Create Event Button */}
        <div className="text-center">
          <a 
            href="/eventpage"
            className="inline-block font-['Montserrat'] font-bold text-xl px-10 py-4 border-2 border-black rounded-full transition-all duration-300 hover:bg-black hover:text-white"
          >
            + Buat Event-mu
          </a>
        </div>
      </main>

      {/* Event Detail Modal */}
      {activeEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden">
            {/* Header */}
            <div className="bg-red-700 p-6 md:p-8 relative">
              <h2 className="font-['Bebas_Neue'] text-3xl md:text-4xl text-white tracking-wider">
                {activeEvent.title}
              </h2>
              <p className="font-['Montserrat'] text-white text-lg mt-2">
                {activeEvent.date}
              </p>
              <button 
                onClick={closeEventDetail}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-700">
                  <p className="text-gray-600 font-medium">LOKASI</p>
                  <p className="font-semibold text-lg">{activeEvent.location}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-700">
                  <p className="text-gray-600 font-medium">WAKTU</p>
                  <p className="font-semibold text-lg">{activeEvent.time}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-700">
                  <p className="text-gray-600 font-medium">KATEGORI</p>
                  <p className="font-semibold text-lg">{activeEvent.category}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-700">
                  <p className="text-gray-600 font-medium">TIKET</p>
                  <p className="font-semibold text-lg">{activeEvent.price}</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold pb-3 mb-4 border-b-2 border-red-700 inline-block">
                  Deskripsi Event
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {activeEvent.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href={`/event${activeEvent.id}`} 
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full transition-colors"
                >
                  Beli Tiket Sekarang
                </a>
                <button className="border-2 border-gray-800 hover:bg-gray-800 hover:text-white font-bold py-3 px-8 rounded-full transition-colors">
                  Bagikan Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 py-12 mt-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="font-['Foneitwu'] text-3xl mb-6">TBDFEST</div>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a href="#" className="text-gray-600 hover:text-red-700 font-medium">Tentang Kami</a>
              <a href="#" className="text-gray-600 hover:text-red-700 font-medium">Kebijakan Privasi</a>
              <a href="#" className="text-gray-600 hover:text-red-700 font-medium">Syarat & Ketentuan</a>
              <a href="#" className="text-gray-600 hover:text-red-700 font-medium">Kontak</a>
              <a href="#" className="text-gray-600 hover:text-red-700 font-medium">FAQ</a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 TBDFEST. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>

      {/* Font Embed */}
      <style jsx global>{`
        @font-face {
          font-family: 'Foneitwu';
          src: url('https://fonts.gstatic.com/s/fredokaone/v8/k3kUo8kEI-tA1RRcTZGmTmHB.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        
        @font-face {
          font-family: 'Bebas Neue';
          src: url('https://fonts.gstatic.com/s/bebasneue/v9/JTUSjIg69CK48gW7PXoo9Wlhyw.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #9ca3af #f3f4f6;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #9ca3af;
          border-radius: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default TBDFestPage;