import { CgProfile } from 'react-icons/cg';
import SettingPopUp from './settingPopUp';
import { useState } from 'react';

export default function Header() {
    const [show, setShow] = useState(false);

    const togglePopUp = () => {
        setShow(!show);
    }
    
    return(
        <>
            <header className="flex justify-between items-center p-5 px-7 bg-white shadow-md sticky top-0 z-40">
                <div 
                    className="foneitwu  text-3xl mx-10 text-black"
                    onClick={() => window.location.href = '/listevent'}
                    style={{ cursor: 'pointer' }}
                >
                    TBDFEST
                </div>
                <CgProfile 
                    className="text-5xl text-red-700 cursor-pointer hover:text-red-800 transition-colors duration-300 mx-10" 
                    onClick ={() => togglePopUp()}
                />
                {show? <SettingPopUp/>:''}
            </header>   
        </>
    )
}