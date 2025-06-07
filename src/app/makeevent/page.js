'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateEventPage() {
    const router = useRouter();

    const [namaEvent, setNamaEvent] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [waktuMulai, setWaktuMulai] = useState('');
    const [waktuSelesai, setWaktuSelesai] = useState('');
    const [kuota, setKuota] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [kategori, setKategori] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function addSecondsToTime(time) {
        if (!time) return null;
        // Jika format waktu cuma HH:MM, tambahkan :00
        if (/^\d{2}:\d{2}$/.test(time)) {
            return time + ':00';
        }
        return time; // kalau sudah ada detik
        }

        
        const validateInput = () => {
            setError(null);
            if (
                !namaEvent.trim() ||
                !lokasi.trim() ||
                !tanggal ||
                !waktuMulai || 
                isNaN(parseInt(kuota)) || parseInt(kuota) <= 0 ||
                !deskripsi.trim() ||
                !kategori
            ) {
                return false;
            }
                    // Validate date is not in the past
            const today = new Date();
            const eventDate = new Date(tanggal);
            today.setHours(0, 0, 0, 0);
            eventDate.setHours(0, 0, 0, 0);
            
            if (eventDate < today) {
                setError("Tanggal event tidak boleh di masa lalu");
                return false;
            }

            return true;
        };
        
        const handleNewEvent = async (e) => {
            e.preventDefault();
            setLoading(true);
            
            if (!validateInput()) {
                setLoading(false);
                return;
            }

                // Di handleNewEvent sebelum kirim request
                const waktuMulaiFormat = addSecondsToTime(waktuMulai);
                const waktuSelesaiFormat = waktuSelesai ? addSecondsToTime(waktuSelesai) : null;
            try {
                const response = await axios.post('/api/event', {
                    nama_event: namaEvent.trim(),
                    lokasi: lokasi.trim(),
                    tanggal,
                    waktu_mulai: waktuMulaiFormat,
                    waktu_selesai: waktuSelesaiFormat,
                    kuota: parseInt(kuota, 10),
                    deskripsi: deskripsi.trim(),
                    kategori
                });

                if (response.status === 201) {
                    alert("Event berhasil dibuat!");
                    router.push('/listevent');
                } else {
                    setError("Gagal membuat event.");
                }
            } catch (err) {
                console.error("Error creating event:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-2xl p-8 rounded-[40px] shadow-lg relative bg-white m-10">
                <form onSubmit={handleNewEvent} className="space-y-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 bebas tracking-wider">Buat Event Baru</h1>

                    {/* NAMA EVENT */}
                    <div className="space-y-4">
                        <span className="text-black bebas tracking-wider text-lg">NAMA EVENT</span>
                        <input
                            type="text"
                            name="nama_event"
                            value={namaEvent}
                            onChange={(e) => setNamaEvent(e.target.value)}
                            placeholder="Masukkan nama event"
                            className="w-full p-3 border bebas tracking-wider border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF3E3E] text-black"
                            required
                        />
                    </div>

                    {/* LOKASI */}
                    <div className="space-y-4">
                        <span className="text-black bebas tracking-wider text-lg">LOKASI</span>
                        <input
                            type="text"
                            name="lokasi"
                            value={lokasi}
                            onChange={(e) => setLokasi(e.target.value)}
                            placeholder="Lokasi event"
                            className="w-full p-3 border bebas tracking-wider border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF3E3E] text-black"
                            required
                        />
                    </div>

                    {/* TANGGAL */}
                    <div className="space-y-4">
                        <span className="text-black bebas tracking-wider text-lg">TANGGAL</span>
                        <input
                            type="date"
                            name="tanggal"
                            value={tanggal}
                            min={new Date().toISOString().split('T')[0]} 
                            onChange={(e) => setTanggal(e.target.value)}
                            className="w-full p-3 border bebas tracking-wider border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF3E3E] text-black"
                            required
                        />
                    </div>

                    {/* WAKTU MULAI & SELESAI */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <span className="text-black bebas tracking-wider text-lg">WAKTU MULAI</span>
                            <input
                                type="time"
                                name="waktu_mulai"
                                value={waktuMulai}
                                onChange={(e) => setWaktuMulai(e.target.value)}
                                className="w-full p-3 border bebas tracking-wider border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF3E3E] text-black"
                                required
                            />
                        </div>
                        <div className="space-y-4">
                            <span className="text-black bebas tracking-wider text-lg">WAKTU SELESAI</span>
                            <input
                                type="time"
                                name="waktu_selesai"
                                value={waktuSelesai}
                                onChange={(e) => setWaktuSelesai(e.target.value)}
                                className="w-full p-3 border bebas tracking-wider border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF3E3E] text-black"
                            />
                        </div>
                    </div>

                    {/* KUOTA */}
                    <div className="space-y-4">
                        <span className="text-black bebas tracking-wider text-lg">KUOTA</span>
                        <input
                            type="number"
                            name="kuota"
                            value={kuota}
                            min="1"
                            onChange={(e) => setKuota(e.target.value)}
                            placeholder="Jumlah kuota event"
                            className="w-full p-3 border bebas tracking-wider border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF3E3E] text-black"
                            required
                        />
                    </div>

                    {/* DESKRIPSI */}
                    <div className="space-y-4">
                        <span className="text-black bebas tracking-wider text-lg">DESKRIPSI</span>
                        <textarea
                            name="deskripsi"
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            placeholder="Deskripsi event"
                            className="w-full p-3 border bebas tracking-wider border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF3E3E] text-black"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* KATEGORI */}
                    <div className="space-y-4">
                        <span className="text-black bebas tracking-wider text-lg">KATEGORI</span>
                        <select
                            name="kategori"
                            value={kategori}
                            onChange={(e) => setKategori(e.target.value)}
                            className="w-full p-3 border bebas tracking-wider border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF3E3E] text-black"
                            required
                        >
                            <option value="">Pilih kategori</option>
                            <option value="konser">Konser</option>
                            <option value="seminar">Seminar</option>
                            <option value="workshop">Workshop</option>
                            <option value="pameran">Pameran</option>
                        </select>
                    </div>

                    {/* ERROR DAN LOADING */}
                    {error && <p className="text-red-600 font-bold">{error}</p>}
                    {loading && <p className="text-gray-500">Membuat event...</p>}

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#AF3E3E] text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 bebas tracking-wider"
                    >
                        Buat Event
                    </button>

                    {/* BATAL */}
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="w-full bg-gray-300 text-black font-bold py-3 rounded-lg hover:bg-gray-400 transition-colors duration-200 bebas tracking-wider"
                    >
                        Batal
                    </button>
                </form>
            </div>
        </div>
    );
}
