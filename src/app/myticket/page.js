'use client';
import Ticket from "@/component/ticket";
import Header from "@/component/header";
import Footer from "@/component/footer";
import { IoChevronBackOutline } from "react-icons/io5";

export default function MyTicketPage() {
    return (
        <>
            <Header/>
            <div className="h-screen bg-gray-100 flex flex-col items-center  text-black">
                <div className="w-full flex items-center justify-center p-4 z-50">
                    <IoChevronBackOutline
                    className='text-black text-3xl cursor-pointer hover:text-gray-700 transition-colors duration-200 left-40 absolute'
                    onClick={() => window.history.back()}
                    />
                    <h1 className="text-4xl font-bold m-4 mt-4 h-fit bebas tracking-wider">My Tickets</h1>
                </div>
                <Ticket />
            </div>
            <Footer/>
        </>
    );
}