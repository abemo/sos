import Header from "@/components/Header";
import GetAidNav from "@/components/GetAidNav";

export default function getAid() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <GetAidNav />
      <h2>Example Resource</h2>
      <p>Still need to hook this up to example data from supabase.</p>
    </div>
  );
}
