"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { getData, getFavoriteResources, getUser, getUserFavorites, toggleFavorite } from "@/components/get-data";
import { useParams } from "next/navigation";

export default function ToggleFavoriteButton({ slug }: Readonly<{ slug: string }>) {
  const [resources, setResources] = useState<any[] | null>(null)
  const [userFavorites, setUserFavorites] = useState<any[] | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  // check if this resource is a favorite



  // make a resource type
  useEffect(() => {
    void (async () => {
      if (!userFavorites) {
        const favorites = await getUserFavorites()
        setUserFavorites(favorites)
        const isFav = favorites.includes(slug)
        setIsFavorite(isFav)
      }

    })()
  } , [])

  useEffect(() => {
    void (async () => {
      if (!userFavorites) {
        return
      }

      if (!resources) {
        const data = await getFavoriteResources(userFavorites)
        setResources(data)
      }
    })()
  } , [userFavorites])

  const handleToggleFavorite = async (slug: string) => {
    setIsFavorite(await toggleFavorite(slug, isFavorite));
  };

  return (
    <Button onClick={() => handleToggleFavorite(slug)}>
      {isFavorite ? "Unfavorite" : "Add to Favorites"}
    </Button>
  );
}
