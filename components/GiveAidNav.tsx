import Link from "next/link";

const GiveAidNav = () => {
  return (
    <header className="w-full flex justify-between items-center bg-blue-600 p-4">
      <Link href="/example-resource" className="text-white text-lg font-bold px-3 py-1 rounded hover:bg-white/10 transition">
        Volunteer
      </Link>

      <Link href="/example-resource" className="text-white text-lg font-bold px-3 py-1 rounded hover:bg-white/10 transition">
        Donate
      </Link>
    </header>
  );
};

export default GiveAidNav;
