"use client";

import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { useResourceColumns } from "@/components/columns"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { getData, getFavoriteResources, getUser, getUserFavorites, getUserProfileInfo } from "@/components/get-data";
import { get } from "http";


export default function ProtectedPage() {
  const [resources, setResources] = useState<any[] | null>(null)
  const [userFavorites, setUserFavorites] = useState<any[] | null>(null)

  // make a resource type
  useEffect(() => {
    void (async () => {
      if (!userFavorites) {
        const favorites = await getUserFavorites()
        console.log('favorites', favorites)
        setUserFavorites(favorites)
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
  
  // get the user account information from the profiles table
  const [profileInfo, setProfileInfo] = useState<any | null>(null);
  useEffect(() => {
    void (async () => {
      if (!profileInfo) {
        const profile = await getUserProfileInfo()
        console.log('profile', profile)
        setProfileInfo(profile)
      }
    })()
  } , [])
  // console.error('profileInfo', profileInfo.selected_categories, profileInfo.user_latitude, profileInfo.user_longitude)
  const profileIncomplete = profileInfo?.selected_categories && profileInfo?.user_latitude && profileInfo?.user_longitude

  let columns = useResourceColumns()

  return (
    <div className="flex flex-col space-y-8 p-6 md:p-8">
      {/* My Favorite Resources Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Favorite Resources</h2>
        </div>
        <div className="rounded-md">
          {resources?.length ? (<DataTable data={resources ?? []} columns={columns} />
        ) : (
          <div className="flex items-center justify-center p-4 text-gray-500">
            <InfoIcon className="h-5 w-5 mr-2" />
            No favorite resources yet. View a resource to add it to your favorites.
          </div>
        )}
        </div>
      </div>
      {/* Recommended Resources Section 
          Need to modify resources to be recommended resources in the future
          Also need to modify the resources?.length condition to whatever we want to use for recs
      */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Recommended Resources</h2>
        </div>
        <div className="rounded-md">
          {profileIncomplete ? (<DataTable data={resources ?? []} columns={columns} />
        ) : (
          <div className="flex items-center justify-center p-4 text-gray-500 text-sm">
            <InfoIcon className="h-5 w-5 mr-2" />
            <span>
              Not enough info for recommendations. Go to{' '}
              <Link href="/account" className="text-blue-500 underline hover:text-blue-700">
                your account
              </Link>{' '}
              to get personalized recommendations.
            </span>
          </div>
        )}
        </div>
      </div>
    </div>

  );
}
