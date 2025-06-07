import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import { IoTicket } from "react-icons/io5";
import { useRouter } from 'next/navigation';

export default function SettingPopUp() {
    const router =  useRouter();
    const handleLogout = () => {
        localStorage.removeItem('id_pengguna');
        router.push('/login');
    }

    return(
        <>
            <div className="flex flex-col items-center justify-center fixed z-50 w-40 h-auto gap-2 bg-white right-20 top-16 rounded-lg shadow-lg ">
                <button className="text-black text-lg p-2 w-full hover:bg-red-700 hover:text-white rounded flex items-center justify-center cursor-pointer" onClick={()=>router.push('/profile')}>
                    <IoMdSettings className="inline-block mr-1" />
                    Setting
                </button>
                <button className="text-black text-lg p-2 w-full hover:bg-red-700 hover:text-white rounded flex items-center justify-center cursor-pointer" onClick={handleLogout}>
                    <IoIosLogOut className="inline-block mr-1" />
                    LogOut
                </button>
                <button className="text-black text-lg p-2 w-full hover:bg-red-700 hover:text-white rounded flex items-center justify-center cursor-pointer" onClick={() => router.push('/myticket')}>
                    <IoTicket className="inline-block mr-1" />
                    Tiket Saya
                </button>
            </div>
        </>
    )
}