//Individual page for each resource
import Resource from "@/components/resource"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import FavoriteResourceButton from "@/components/favorite-resource-button"
import { createServerSupabase } from '@/utils/supabase/supabase'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // console.log("slug", slug) // is the id from all_resources

  // get the currently authenticated user's id
  const supabase = await createServerSupabase()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) console.error('Supabase auth error:', error.message)
  const currentUserId = user?.id ?? null
  // console.log('currentUserId', currentUserId)

  const currentResource = await supabase
    .from("all_resources")
    .select("*")
    .eq("id", slug)
    .single()
  if (currentResource.error) {
    console.error("Error fetching resource:", currentResource.error.message)
    return <div>Error fetching resource!</div>
  }
  // console.log("currentResource", currentResource.data)

  const resourceCategory = currentResource.data.category
  // console.log("resourceCategory", resourceCategory)
  let specificResourceTableId = currentResource.data[resourceCategory + "_id"]
  if (!specificResourceTableId) {
    console.error("Error: No specific resource table ID found.")
    return <div>Error: No specific resource table ID found.</div>
  }
  // console.log("specificResourceTableId", specificResourceTableId)

  return (
    <div>
      <Resource slug={slug} />
      
      {currentUserId && (
        <FavoriteResourceButton
          userId={currentUserId}
          allId={slug}
          resourceId={specificResourceTableId}
          resourceCategory={resourceCategory}
        />
      )}
    </div> 
  )
}