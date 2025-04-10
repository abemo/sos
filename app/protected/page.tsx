import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link"

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome back, {user.user_metadata.full_name}!</h1>
      <p className="text-gray-600 mb-4">Here are your saved resources:</p>
      <ul className="list-disc mb-4">
        <li className="mb-2">Resource 1</li>
        <li className="mb-2">Resource 2</li>
        <li className="mb-2">Resource 3</li>
      </ul>
      <p className="text-gray-600 mb-4">Here are your recommended resources:</p>
      <ul className="list-disc mb-4">
        <li className="mb-2">Recommended Resource 1</li>
        <li className="mb-2">Recommended Resource 2</li>
        <li className="mb-2">Recommended Resource 3</li>
      </ul>
      <p className="text-gray-600 mb-4">
        No recommendations available, update your profile to get recommendations
      </p>
    </div>
  );
}
