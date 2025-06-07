import axios from "axios";
import { IoCloseCircle } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Eventdetail({ event, onClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tiketData, setTiketData] = useState(null);

  const router = useRouter();

  const formatTanggalIndonesia = (tanggalStr) => {
		const tanggal = new Date(tanggalStr);
		const hari = tanggal.toLocaleDateString('id-ID', { weekday: 'long' });
		const tanggalNum = tanggal.getDate();
		const bulan = tanggal.toLocaleDateString('id-ID', { month: 'long' });
		const tahun = tanggal.getFullYear();

		return `${hari}, ${tanggalNum} ${bulan} ${tahun}`;
	};

  const formatKuota = (kuota) => {
    if (kuota === 0) return "Tidak ada kuota";
    return `${kuota.toLocaleString('id-ID')} orang`;
  };

  const handleGetTicket = async () => {
    setIsLoading(true);
    const userId = localStorage.getItem('id_pengguna');
    if (!userId) {
      alert("Silakan login terlebih dahulu untuk mendapatkan tiket.");
      setIsLoading(false);
      return;
    }
    try{
      axios.post(`/api/tiket/${event.id_event}`, {
        id_pengguna: parseInt(userId)
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const tiketWithEvent = {
            ...response.data.data,
            nama_event: event.nama_event,
            lokasi: event.lokasi
          };
          setTiketData(tiketWithEvent);
          alert("Tiket berhasil didapatkan!");
        }
      })
      .catch((error) => {
        console.error("Error getting ticket:", error);
        alert("Gagal mendapatkan tiket. Silakan coba lagi.");
      });
    }
    catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  const onClose = () => {
    setTiketData(null);
    router.push('/listevent');
  }

  if (tiketData) {
    return <Tiket event={tiketData} onClose={onClose}/>;
  }


  return(
    <div className="fixed inset-0 backdrop-blur-xs bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden">
        <div className="bg-red-700 p-6 md:p-8 relative">
          <h2 className="bebas text-6xl text-white tracking-wider">
            {event.nama_event.toUpperCase()}
          </h2>
          <IoCloseCircle 
              className="text-white text-4xl absolute top-8 right-8 ursor-pointer hover:text-red-300 transition-colors duration-300 cursor-pointer"
              onClick = {onClick}
          />
        </div>
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <InfoBox 
              title="Waktu" 
              value={
                <span>
                  <span>{formatTanggalIndonesia(event.tanggal)}</span>
                  <br />
                  <span>
                    {!event.waktu_selesai 
                      ? event.waktu_mulai
                      : `${event.waktu_mulai} - ${event.waktu_selesai}`
                    }
                  </span>
                </span>
              }
            />
            <InfoBox title="Lokasi" value={event.lokasi} />
            <InfoBox title="Kategori" value={event.kategori} />
            <InfoBox title="Kuota" value={formatKuota(event.kuota)} />
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold pb-3 mb-4 border-b-2 border-red-700 inline-block">
              Deskripsi Event
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {event.deskripsi}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={ handleGetTicket } 
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Dapatkan Tiket
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoBox({ title, value }) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg border-l-6 border-red-700">
            <p className="text-gray-600 font-medium">{title.toUpperCase()}</p>
            <p className="font-semibold text-lg">{value}</p>
        </div>
    );
}

function Tiket({event, onClose}){
  const [ticketData, setTiketDataData] = useState(event);

  if (!ticketData) return null;
  const formatTanggalIndonesia = (tanggalStr) => {
    const tanggal = new Date(tanggalStr);
    const hari = tanggal.toLocaleDateString('id-ID', { weekday: 'long' });
    const tanggalNum = tanggal.getDate();
    const bulan = tanggal.toLocaleDateString('id-ID', { month: 'long' });
    const tahun = tanggal.getFullYear();

    return `${hari}, ${tanggalNum} ${bulan} ${tahun}`;
  };
  if (!event) return null;

  return (
      <div className="fixed inset-0 backdrop-blur-xs bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden">
          <div className="bg-green-700 p-6 md:p-8 relative">
            <h2 className="bebas text-4xl text-white tracking-wider">
              TIKET BERHASIL DIBUAT!
            </h2>
            <IoCloseCircle 
              className="text-white text-4xl absolute top-8 right-8 cursor-pointer hover:text-green-300 transition-colors duration-300"
              onClick={onClose}
            />
          </div>
          <div className="p-6 md:p-8">
            <div className="bg-gray-50 p-6 rounded-lg border-l-6 border-green-700 mb-6">
              <h3 className="text-xl font-bold text-green-700 mb-4">Detail Tiket Anda</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Nomor Tiket: </span>
                  <span className="font-mono text-lg text-green-700">{ticketData.no_tiket}</span>
                </div>
                <div>
                  <span className="font-semibold">Event: </span>
                  <span>{event.nama_event}</span>
                </div>
                <div>
                  <span className="font-semibold">Lokasi: </span>
                  <span>{event.lokasi}</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Simpan nomor tiket ini sebagai bukti keikutsertaan Anda dalam event.
              </p>
              <button
                onClick={onClose}
                className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}