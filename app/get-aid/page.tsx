import Header from "@/components/Header";
import GetAidNav from "@/components/GetAidNav";

export default function getAid() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <GetAidNav />
      <h2>Get Aid</h2>
      <p>Use the navigation to find resources. Please verify any resource is still active.</p>
    </div>
  );
}
