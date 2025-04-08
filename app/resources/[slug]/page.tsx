//Individual page for each resource

// 1. Need to call DB to fetch this resource

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>Resource: {slug}</div>
}