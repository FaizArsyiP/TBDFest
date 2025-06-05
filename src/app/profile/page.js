import Image from "next/image";

export default function ProfilePage() {
return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<div className="bg-cyan-500 shadow-md rounded-lg p-6 w-full max-w-md flex flex-col items-center">
						<h1 className="text-2xl font-bold mb-4">Profile</h1>
						<Image
								src="/image/profile.png"
								alt="Profile Picture"
								width={100}
								height={100}
								className="rounded-full mb-4"
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
						</div>
				</div>
    </div>
);
}


