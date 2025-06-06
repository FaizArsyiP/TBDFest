import { IoCloseCircle } from "react-icons/io5";

export default function Eventdetail({ event, onClick }) {
  return(
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden">
        <div className="bg-red-700 p-6 md:p-8 relative">
          <h2 className="bebas text-3xl md:text-4xl text-white tracking-wider">
            {event.nama_event.toUpperCase()}
          </h2>
          <p className="font-['Montserrat'] text-white text-lg mt-2">
            {!event.waktu_selesai ?
              `${event.tanggal} | ${event.waktu_mulai}`
              :
              `${event.tanggal} | ${event.waktu_mulai} - ${event.waktu_selesai}`
            }
          </p>

            <IoCloseCircle 
                className="text-white text-4xl absolute top-8 right-8 ursor-pointer hover:text-red-300 transition-colors duration-300"
                onClick = {onClick}
            />
        </div>
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <InfoBox title="Lokasi" value={event.lokasi} />
            <InfoBox title="Kategori" value={event.kategori} />
            <InfoBox title="Kuota" value={event.kuota} />
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
            <a 
              href={`/event/${event.id_event}`} 
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
  )
}

function InfoBox({ title, value }) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-700">
            <p className="text-gray-600 font-medium">{title.toUpperCase()}</p>
            <p className="font-semibold text-lg">{value}</p>
        </div>
    );
}