import { useEffect, useState } from "react";
import axios from "axios";

export default function Ticket() {
    const [tickets, setTickets] = useState([]);

    const formatTanggalIndonesia = (tanggalStr) => {
		const tanggal = new Date(tanggalStr);
		const hari = tanggal.toLocaleDateString('id-ID', { weekday: 'long' });
		const tanggalNum = tanggal.getDate();
		const bulan = tanggal.toLocaleDateString('id-ID', { month: 'long' });
		const tahun = tanggal.getFullYear();

		return `${hari}, ${tanggalNum} ${bulan} ${tahun}`;
	};

    useEffect(() => {
        const userId = localStorage.getItem('id_pengguna');
        if (!userId) {
            alert("Silakan login terlebih dahulu untuk melihat tiket Anda.");
            return;
        }

        axios.get(`/api/mytiket/${userId}`)
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    setTickets(response.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching tickets:", error);
                alert("Gagal mengambil tiket. Silakan coba lagi.");
            });
    }, []);

    return (
        <div className="space-y-4 w-1/2">
            {tickets.map((ticket, index) => (
                <div key={index} className="relative text-black border rounded-lg p-4 bg-white shadow-md w-full ">
                    <span className="absolute h-full bg-red-700 w-4 left-0 top-0 rounded-l-lg mr-2"/>
                    <div className="ml-4">
                        <h1 className="text-xl font-bold">{ticket.event?.nama_event}</h1>
                        <p><strong>Nomor Tiket:</strong> {ticket.no_tiket}</p>
                        <p><strong>Lokasi:</strong> {ticket.event?.lokasi}</p>
                        <p><strong>Tanggal:</strong> {formatTanggalIndonesia(ticket.event?.tanggal)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
