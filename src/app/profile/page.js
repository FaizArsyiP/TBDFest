'use client'

import { useEffect, useState } from 'react';
import Footer from "@/component/footer";
import Header from "@/component/header";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";
import { LuEye, LuEyeClosed } from "react-icons/lu";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    username: "JohnDoe123",
    email: "email@example.com",
    phoneNumber: "081234567890",
    password: "••••••••"
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [actualPassword, setActualPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const id_pengguna = localStorage.getItem('id_pengguna');
    if (!id_pengguna) return
    axios.get(`/api/profile/${id_pengguna}`)
      .then(response => {
        const { user } = response.data;
        setUserData({
          username: user.username,
          email: user.email,
          phoneNumber: user.no_telepon,
          password: '••••••••' // Hide actual password
        });
        setActualPassword(user.password); // Store actual password for editing
      })
      .catch(error => {
        console.error("Gagal mengambil data:", error);
      });
  }, []);

  const startEditing = (field) => {
    setEditingField(field);
    if (field === 'password') {
      setTempValue('');
      setShowPassword(false); // Reset password visibility when starting to edit
    } else {
      setTempValue(userData[field]);
    }
  };

  const saveEditing = (field) => {
    if (tempValue.trim() === '') {
      alert("Field tidak boleh kosong.");
      return;
    }
    if (field === 'password' && tempValue === actualPassword) {
      alert("Password tidak boleh sama dengan password sebelumnya.");
      return;
    }

    const updatedData = { ...userData, [field]: tempValue };
    setUserData(updatedData);
    
    // Update actual password if password field is being edited
    if (field === 'password') {
      setActualPassword(tempValue);
    }

    // Simpan perubahan ke server
    const id_pengguna = localStorage.getItem('id_pengguna');
    const dataToSend = { ...userData, [field]: tempValue };
    axios.put(`/api/profile/${id_pengguna}`, dataToSend)
      .then(response => {
        console.log("Perubahan berhasil disimpan:", response.data);
      })
      .catch(error => {
        console.error("Gagal menyimpan perubahan:", error);
      });
    
    setTempValue(''); // Clear temp value after saving
    setEditingField(null); // Reset editing state
    setShowPassword(false); // Reset password visibility
  };

  const handleButtonClick = (field) => {
    if (editingField === field) {
      saveEditing(field);
    } else {
      startEditing(field);
    }
  };

  const cancelEditing = () => {
    setTempValue('');
    setEditingField(null);
    setShowPassword(false); // Reset password visibility when canceling
  };

  const handleDeleteAccount = () => {
    const id_pengguna = localStorage.getItem('id_pengguna');
    if (!id_pengguna) return;
    if (confirm("Apakah Anda yakin ingin menghapus akun ini?")) {
      axios.delete(`/api/profile/${id_pengguna}`)
        .then(response => {
          console.log("Akun berhasil dihapus:", response.data);
          localStorage.removeItem('id_pengguna'); // Clear user ID from local storage
          // Redirect to home or login page
          window.location.href = '/';
        })
        .catch(error => {
          console.error("Gagal menghapus akun:", error);
        });
    }
  };
  
  const handleKeyDown = (e, fieldId) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleButtonClick(fieldId);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEditing();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <div className="w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-4 bg-[#AF3E3E]"></div>
            <div className="inset-0 flex items-center justify-center">
              <IoChevronBackOutline
                className='text-black text-3xl  left-4 absolute cursor-pointer hover:text-gray-700 transition-colors duration-200'
                onClick={() => window.history.back()}
              />
              <h1 className="text-3xl font-bold text-center py-4 text-black bebas tracking-wider">PROFILE</h1>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center mt-4">
            <div className="relative">
              <Image 
                src="/Image/ProfileIcon.png" 
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
            
            // Fixed input type logic
            let inputType = 'text';
            if (isPassword) {
              // For password field, type depends on showPassword state regardless of editing mode
              inputType = showPassword ? 'text' : 'password';
            } else if (field.id === 'phoneNumber') {
              inputType = 'tel';
            }
            
            // Fixed value logic
            let value;
            if (isEditing) {
              value = tempValue;
            } else if (isPassword) {
              // When not editing, show actual password if toggle is on, otherwise show dots
              value = showPassword ? actualPassword : '••••••••';
            } else {
              value = userData[field.id];
            }

            return (
              <div 
                key={field.id} 
                className={`py-4 px-8 ${field.hasBorder ? 'border-t border-gray-200' : ''}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="bebas tracking-wider text-black text-lg">
                    {field.label}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleButtonClick(field.id)}
                      className="text-[#AF3E3E] bebas text-lg tracking-wide hover:scale-95 transition-transform duration-200"
                    >
                      {isEditing ? "Save" : field.buttonText}
                    </button>
                    {isEditing && (
                      <button
                        onClick={cancelEditing}
                        className="text-gray-500 bebas text-lg tracking-wide hover:scale-95 transition-transform duration-200"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <input
                    type={inputType}
                    value={value}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, field.id)}
                    readOnly={!isEditing}
                    placeholder={isEditing && isPassword ? "Masukkan password baru" : ""}
                    className={`w-full p-3 font-montserrat border border-gray-300 rounded-lg focus:outline-none text-black ${
                      isEditing 
                        ? 'focus:ring-2 focus:ring-[#AF3E3E]' 
                        : 'bg-gray-50 cursor-default'
                    }`}
                  />
                  {isPassword && (
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <LuEye size={24} color="#000000" />
                      ) : (
                        <LuEyeClosed size={24} color="#000000" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <button className="w-full bg-[#AF3E3E] text-white font-bold py-3 mt-5 rounded-b-2xl hover:bg-red-600 transition-colors duration-200 flex items-center justify-center text-lg bebas tracking-wider"
            onClick={handleDeleteAccount}>
            Delete Account
            <MdDelete className="inline-block ml-2 " />
          </button>
        </div>
      </div>
      <Footer />
      
      {/* Font styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700&display=swap');
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </>
  );
}