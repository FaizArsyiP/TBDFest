'use client';

import EventCard from '@/component/eventcard';
import Eventdetail from '@/component/eventdetail';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';

export default function TBDFestPage() {
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/event');
        setEvents(res.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const openEventDetail = (event) => setActiveEvent(event);
  const closeEventDetail = () => setActiveEvent(null);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="flex justify-between items-center p-5 px-7 bg-white shadow-md sticky top-0 z-50">
        <div className="font-['Foneitwu'] text-3xl mx-10">TBDFEST</div>
        <CgProfile 
          className="text-5xl text-red-700 cursor-pointer hover:text-red-800 transition-colors duration-300 mx-10" 
          onClick={() => window.location.href = '/profile'}
        />
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
        <EventCard
          events={events}
          onClick={openEventDetail}
        />

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


      {activeEvent && (
          <Eventdetail
            event={activeEvent}
            onClick={closeEventDetail}
          />
      )}

      {/* Footer */}
      <footer className="bg-gray-100 py-12 mt-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="font-['Foneitwu'] text-3xl mb-6">TBDFEST</div>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['Tentang Kami', 'Kebijakan Privasi', 'Syarat & Ketentuan', 'Kontak', 'FAQ'].map((item, idx) => (
              <a key={idx} href="#" className="text-gray-600 hover:text-red-700 font-medium">
                {item}
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 TBDFEST. Hak Cipta Dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}

