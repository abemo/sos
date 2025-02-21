import Header from "@/components/Header";
import FirstVisitPopup from "@/components/FirstVisitPopup";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <FirstVisitPopup />
      {/* Main Content */}
      <main className="flex flex-1 w-full">
        <a href="/give-aid" className="flex-1 flex items-center justify-center bg-green-500 text-white text-3xl font-bold hover:bg-green-600">
          Give Aid
        </a>
        <a href="/get-aid" className="flex-1 flex items-center justify-center bg-red-500 text-white text-3xl font-bold hover:bg-red-600">
          Get Aid
        </a>
      </main>
    </div>
  );
}
