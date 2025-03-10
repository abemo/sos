import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const boolLoggedIn = true;

const LoggedInTaskBar = () => (
  <div className="flex items-center space-x-2">
    <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
      + Add
    </button>
    <Link href="/notifications" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition">
      🔔
    </Link>
    <Link href="/profile" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100 transition">
      👤
    </Link>
  </div>
);

const LoggedOutTaskBar = () => (
  <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
    Log In
  </Link>
);

const SearchBar = () => (
  <div className="flex items-center">
    <Search className="text-white" /> {/* This is the search component from lucide-react */}
    <Input placeholder="Search..." /> {/* This is the input component from ui/input.tsx */}
  </div>
);

const Header = () => {
  const isLoggedIn = boolLoggedIn; // Using your existing variable

  return (
    <header className="w-full bg-blue-600 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-3 items-center">
        {/* Left Section - Home Button */}
        <div className="flex items-center justify-start">
          <Link href="/" className="text-white text-lg font-bold px-3 py-1 rounded hover:bg-white/10 transition">
            SOS
          </Link>
        </div>

        {/* Middle Section - Search Bar (always centered) */}
        <div className="flex justify-center">
          <SearchBar />
        </div>

        {/* Right Section - Login/TaskBar */}
        <div className="flex justify-end">
          {isLoggedIn ? <LoggedInTaskBar /> : <LoggedOutTaskBar />}
        </div>
      </div>
    </header>
  );
};

export default Header;
