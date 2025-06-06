'use client';

import EventCard from '@/component/eventcard';
import Eventdetail from '@/component/eventdetail';
import Footer from '@/component/footer';
import Header from '@/component/header';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


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
      <Header/>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <p className="font-['Montserrat'] text-lg md:text-xl lg:text-2xl font-medium mb-8">
            Temukan event yang cocok dengan dirimu!
          </p>
          <h1 className="bebas font-bold text-4xl md:text-5xl lg:text-6xl tracking-wider relative inline-block pb-2">
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
            href="/makeevent"
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
      <Footer/>
    </div>
  );
}

