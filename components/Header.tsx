import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center bg-blue-600 p-4">
      {/* Home Button */}
      <Link href="/" className="text-white text-lg font-bold px-3 py-1 rounded hover:bg-white/10 transition">
        SOS
      </Link>

      {/* Login Button */}
      <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition">
        Log In
      </Link>
    </header>
  );
};

export default Header;
