

export default function EventCard({ events = [], onClick = () => {} }) {
	const formatTanggalIndonesia = (tanggalStr) => {
		const tanggal = new Date(tanggalStr);
		const hari = tanggal.toLocaleDateString('id-ID', { weekday: 'long' });
		const tanggalNum = tanggal.getDate();
		const bulan = tanggal.toLocaleDateString('id-ID', { month: 'long' });
		const tahun = tanggal.getFullYear();

		return `${hari}, ${tanggalNum} ${bulan} ${tahun}`;
	};

	return (
		<div className="w-full mb-10">
			<div className="grid grid-cols-4 gap-4">
				{events.map((event) => (
					<div
						key={event.id_event}
						className="w-full h-72 bg-red-700 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 shadow-xl"
						onClick={() => onClick(event)}
					>
						<h2 className="bebas font-bold text-3xl text-white tracking-wide mb-2">
							{event.nama_event.toUpperCase()}
						</h2>
						<div className="space-y-2">
							<p className="text-white text-sm">
								{formatTanggalIndonesia(event.tanggal)}
							</p>
							<p className="text-white text-sm">
								{event.waktu_mulai} - {event.waktu_selesai || 'Selesai'}
							</p>
							<p className="text-white text-sm">
								{event.lokasi}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
