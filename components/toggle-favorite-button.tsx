"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { getData, getFavoriteResources, getUser, getUserFavorites, toggleFavorite } from "@/components/get-data";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";

export default function ToggleFavoriteButton({ slug, mode }: Readonly<{ slug: string; mode: "icon" | "text" }>) {
  const [resources, setResources] = useState<any[] | null>(null);
  const [userFavorites, setUserFavorites] = useState<any[] | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    void (async () => {
      if (!userFavorites) {
        const favorites = await getUserFavorites();
        setUserFavorites(favorites);
        if (favorites) {
          const isFav = favorites.includes(slug);
          setIsFavorite(isFav);
        }
      }
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      if (!userFavorites) {
        return;
      }

      if (!resources) {
        const data = await getFavoriteResources(userFavorites);
        setResources(data);
      }
    })();
  }, [userFavorites]);

  const handleToggleFavorite = async (slug: string) => {
    setIsFavorite(await toggleFavorite(slug, isFavorite));
  };

  return (
    <div onClick={() => handleToggleFavorite(slug)}>
      {mode === "icon" ? (
        isFavorite ? <Star fill="color-red"/> : <Star/>
      ) : (
        <Button variant="outline">
          {isFavorite ? "Unfavorite" : "Add to Favorites"}
        </Button>
      )}
    </div>
  );
}
