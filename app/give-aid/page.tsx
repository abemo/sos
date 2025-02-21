import Header from "@/components/Header";
import GiveAidNav from "@/components/GiveAidNav";

export default function giveAid() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <GiveAidNav />
      <h2>Give Aid</h2>
      <p>Use the navigation to find ways to give. Please verify any source is still active before donating or volunteering.</p>
    </div>
  );
}
