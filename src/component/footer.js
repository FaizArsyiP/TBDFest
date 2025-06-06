export default function Footer(){
    return(
        <footer className="bg-gray-100 py-10 mt-10">
            <div className="container mx-auto px-4 max-w-6xl text-center">
                <div className="foneitwu text-3xl mb-6 text-black">TBDFEST</div>
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
    )
}