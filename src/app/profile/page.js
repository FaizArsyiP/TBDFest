'use client'

import Footer from "@/component/footer";
import Header from "@/component/header";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CgProfile } from 'react-icons/cg';

export default function ProfilePage() {
return (
	<>
	<Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
		<div className="bg-cyan-500 shadow-md rounded-lg p-6 w-full max-w-md flex flex-col items-center">
				<h1 className="text-2xl font-bold mb-4">Profile</h1>
				<Image
						src="/image/ProfileIcon.png"
						alt="Profile Picture"
						width={100}
						height={100}
						className="rounded-full mb-4 fill-white"
				/>
				<div className="flex flex-col w-full gap-2">
						<div className="bg-gray-50 p-4 rounded-lg">
								<label className="block text-sm font-medium text-gray-600 mb-1">
										Nama Lengkap
								</label>
								<p className="text-lg font-semibold text-gray-800">
										John Doe
								</p>
						</div>
						<div className="bg-gray-50 p-4 rounded-lg">
								<label className="block text-sm font-medium text-gray-600 mb-1">
										Email
								</label>
								<p className="text-lg font-semibold text-gray-800">
										email@example.com
								</p>
						</div>
						<div className="bg-gray-50 p-4 rounded-lg">
								<label className="block text-sm font-medium text-gray-600 mb-1">
										Phone Number
								</label>
								<p className="text-lg font-semibold text-gray-800">
										0120192012
								</p>
						</div>
						<div className="bg-gray-50 p-4 rounded-lg">
								<label className="block text-sm font-medium text-gray-600 mb-1">
										Password
								</label>
								<p className="text-lg font-semibold text-gray-800">
										********
								</p>
						</div>
						<div className="flex justify-around">
							<button className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-200 flex items-center justify-center"> 
								Edit Profile
								<FaEdit className="inline ml-2 mb-0.5" />
							</button>
							<button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"> 
								Delete Account
								<MdDelete className="inline ml-2 mb-0.5" />
							</button>
						</div>
				</div>
		</div>
    </div>
	<Footer />
	</>
);
}


