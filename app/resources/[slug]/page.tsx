//Individual page for each resource
import Resource from "@/components/resource"
import { useEffect, useState } from "react"

// 1. Need to call DB to fetch this resource
// For now just going to use all_resources_short table

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <Resource slug={slug} />
}