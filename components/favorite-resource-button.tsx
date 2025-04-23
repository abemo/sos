// components/favorite-resource-button.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface FavoriteResourceButtonProps {
  userId: string;
  allId: string;
  resourceId: string;
  resourceCategory: string;
}

export default function FavoriteResourceButton({
  userId,
  allId,
  resourceId,
  resourceCategory,
}: FavoriteResourceButtonProps) {
  const supabase = createClient();
  const [saved, setSaved] = useState(false);

  // On mount: load the user's current saved_resources and see if this one is already there
  useEffect(() => {
    supabase
      .from("profiles")
      .select("saved_resources")
      .eq("id", userId)
      .single()
      .then(({ data, error }) => {
        if (!error) {
          const arr = data?.saved_resources || [];
          setSaved(arr.some((r: any) => r.id === resourceId));
        }
      });
  }, [userId, resourceId, supabase]);

  const handleClick = async () => {
    // 1) fetch the existing array
    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("saved_resources")
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.error("Error fetching profile:", fetchError);
      return;
    }

    const existing: any[] = profile?.saved_resources || [];

    // 2) add or remove this resource
    const updated = saved
      ? existing.filter((r) => r.id !== resourceId)
      : [...existing, { id: resourceId, allId: allId, category: resourceCategory }];

    // 3) write it back
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ saved_resources: updated })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating saved_resources:", updateError);
    } else {
      setSaved(!saved);
    }
  };

  return (
    <button
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}
    >
      {saved ? "Unsave" : "Save"} Resource
    </button>
  );
}
