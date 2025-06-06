'use client'

import { useState } from 'react';
import Footer from "@/component/footer";
import Header from "@/component/header";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    username: "JohnDoe123",
    email: "email@example.com",
    phoneNumber: "081234567890",
    password: "••••••••"
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [actualPassword, setActualPassword] = useState('secretpassword');

  const startEditing = (field) => {
    setEditingField(field);
    if (field === 'password') {
      setTempValue(actualPassword);
    } else {
      setTempValue(userData[field]);
    }
  };

  const saveEditing = (field) => {
    if (field === 'password') {
      setActualPassword(tempValue);
    } else {
      setUserData(prev => ({ ...prev, [field]: tempValue }));
    }
    setEditingField(null);
  };

  const handleButtonClick = (field) => {
    if (editingField === field) {
      saveEditing(field);
    } else {
      startEditing(field);
    }
  };

  const fields = [
    { 
      id: 'username',
      label: 'Username',
      buttonText: 'Change Username',
      hasBorder: false
    },
    { 
      id: 'email',
      label: 'EMAIL',
      buttonText: 'Change',
      hasBorder: true
    },
    { 
      id: 'password',
      label: 'PASSWORD',
      buttonText: 'Change',
      hasBorder: true
    },
    { 
      id: 'phoneNumber',
      label: 'PHONE NUMBER',
      buttonText: 'Change',
      hasBorder: true
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 py-8 flex flex-col items-center">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-4 bg-[#AF3E3E]"></div>
            <h1 className="text-3xl font-bold text-center py-4 text-black font-bebas tracking-wider">PROFILE</h1>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center mt-4">
            <div className="relative">
              <Image 
                src="/image/ProfileIcon.png" 
                alt="Profile" 
                width={100} 
                height={100} 
                className="rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-2 right-2 bg-[#AF3E3E] rounded-full p-1 hover:scale-95 transition-transform duration-200">
                <FaEdit className="text-white" />
              </button>
            </div>
          </div>

          {/* Profile Fields */}
          {fields.map(field => {
            const isEditing = editingField === field.id;
            const isPassword = field.id === 'password';
            
            let inputType = 'text';
            if (isEditing) {
              if (isPassword) inputType = 'password';
              else if (field.id === 'phoneNumber') inputType = 'tel';
            }
            
            const value = isEditing 
              ? tempValue 
              : (isPassword ? userData.password : userData[field.id]);

            return (
              <div 
                key={field.id} 
                className={`py-4 px-8 ${field.hasBorder ? 'border-t border-gray-200' : ''}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={
                    field.id === 'username' 
                      ? "font-montserrat font-medium text-black" 
                      : "font-bebas tracking-wider text-black text-lg"
                  }>
                    {field.label}
                  </span>
                  <button
                    onClick={() => handleButtonClick(field.id)}
                    className="text-[#AF3E3E] font-bebas text-lg tracking-wide hover:scale-95 transition-transform duration-200"
                  >
                    {isEditing ? "Save" : field.buttonText}
                  </button>
                </div>
                <div>
                  <input
                    type={inputType}
                    value={value}
                    onChange={(e) => setTempValue(e.target.value)}
                    readOnly={!isEditing}
                    className={`w-full p-3 font-montserrat border border-gray-300 rounded-lg focus:outline-none ${
                      isEditing 
                        ? 'focus:ring-2 focus:ring-[#AF3E3E]' 
                        : 'bg-gray-50 cursor-default'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
      
      {/* Font styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700&display=swap');
        
        .font-bebas {
          font-family: 'Bebas Neue', cursive;
        }
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </>
  );
}