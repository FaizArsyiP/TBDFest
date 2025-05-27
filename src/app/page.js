import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="text-2xl font-bold text-center mt-10">
      hello world
    </div>

    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-5 hover:" href="/about">
      Click Me
    </button>
    
    </div>
  );
}
